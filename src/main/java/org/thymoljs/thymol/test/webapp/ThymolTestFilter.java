package org.thymoljs.thymol.test.webapp;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.standard.expression.TextLiteralExpression;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.TemplateResolver;
import org.thymoljs.thymol.test.base64.Base64Utils;
import org.thymoljs.thymol.test.context.Context;
//import org.thymoljs.thymol.test.json.GsonJsonCodec;
import org.thymoljs.thymol.test.json.JDEREGJsonCodec;
import org.thymoljs.thymol.test.json.JSONCodec;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonNull;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

public class ThymolTestFilter implements Filter {

	public static final String UPDATE_CONFIG_URI = "ThymolTestFilter-updateConfig";
	public static final String APP_SUFFIX = ".html";

	private JSONCodec jsonCodec = null;

	private static final String TEMPLATE_BASE = "/WEB-INF/templates/";

	private static TemplateEngine templateEngine;
	static {
		templateEngine = ThymolTestApplication.initializeTemplateEngine();
	}

	public ThymolTestFilter() {
		super();
		if( jsonCodec == null ) {
			jsonCodec = new JDEREGJsonCodec();
		}
	}

	public void doFilter( final ServletRequest request, final ServletResponse response, final FilterChain chain ) throws IOException, ServletException {
		process( ( HttpServletRequest )request, ( HttpServletResponse )response, ( ( HttpServletRequest )request ).getSession( true ).getServletContext() );
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init( FilterConfig arg0 ) throws ServletException {
	}

	private void process( final HttpServletRequest request, final HttpServletResponse response, final ServletContext servletContext ) throws IOException {

		String uriString = request.getRequestURI();
		int lastForm = uriString.lastIndexOf( '/' );

		if( lastForm > 0 ) { // Cut out all junk requests
			String pathExtra = uriString.substring( 1, lastForm );
			String contextJson = Base64Utils.decode( pathExtra );

			StringBuffer uri = new StringBuffer();

			@SuppressWarnings( "unchecked" )
			com.cedarsoftware.util.io.JsonObject< String, Object > contextValue = ( com.cedarsoftware.util.io.JsonObject< String, Object > )jsonCodec.decode( contextJson );
			Context context = new Context();
			context = context.deepCopy( contextValue );

			String template = uriString.substring( lastForm + 1 );
			StringBuffer prefix = new StringBuffer( TEMPLATE_BASE );
			if( template.length() > 0 && !"favicon".equalsIgnoreCase( template.toString() ) ) { // Work around selenium defect 2883 - ignore any requests for favicon from selenium
				Locale locale = null;
				String suffix = APP_SUFFIX;
				if( context.initialised ) {
					String path = context.getPath();
					if( path != null ) {
						prefix.append( path );
					}
					suffix = context.getSuffix();
					if( suffix != null ) {
						if( template.endsWith( suffix ) ) {
							template = template.substring( 0, template.length() - suffix.length() );
						}
					}
					uri.append( template );
					locale = context.getLocale();
					addConfiguration( prefix.toString(), suffix, locale, servletContext );
					
					JsonObject requestHolder = context.getRequest();
					if( requestHolder != null ) {
						for( Entry< String, JsonElement > entry: requestHolder.entrySet() ) {
							JsonElement jse = entry.getValue();
							Object obj = getAsObject( jse );
							request.setAttribute( entry.getKey(), obj );
						}
					}

					JsonObject sessionHolder = context.getSession();
					if( sessionHolder != null ) {
						HttpSession session = request.getSession();
						for( Entry< String, JsonElement > entry: sessionHolder.entrySet() ) {
							JsonElement jse = entry.getValue();
							Object obj = getAsObject( jse );
							session.setAttribute( entry.getKey(), obj );
						}
					}
					
					JsonObject servletContextHolder = context.getContext();
					if( servletContextHolder != null ) {
						for( Entry< String, JsonElement > entry: servletContextHolder.entrySet() ) {
							JsonElement jse = entry.getValue();
							Object obj = getAsObject( jse );
							servletContext.setAttribute( entry.getKey(), obj );
						}
					}
					
					WebContext ctx;
					if( locale == null ) {
						ctx = new WebContext( request, response, servletContext );
					}
					else {
						ctx = new WebContext( request, response, servletContext, locale );
					}
										
					com.cedarsoftware.util.io.JsonObject< String, Object > variables = context.getVariables();
					if( variables != null ) {
						for( Entry< String, Object > entry: variables.entrySet() ) {
							ctx.setVariable( entry.getKey(), entry.getValue() );
						}
					}

					processParameters( request, ctx );
					response.setCharacterEncoding( "UTF-8" );
					templateEngine.process( uri.toString(), ctx, response.getWriter() );

				}

			}

		}

	}

	public void processParameters( final HttpServletRequest request, WebContext ctx ) {
		@SuppressWarnings( "unchecked" )
		Map< String, Object > params = request.getParameterMap();
		for( String key: params.keySet() ) {
			Object objectValue = params.get( key );
			if( objectValue != null ) {
				if( objectValue instanceof String[] ) {
					String[] stringValueArray = ( String[] )objectValue;
					String valueString = stringValueArray[ 0 ];
					valueString = ( new TextLiteralExpression( valueString ) ).getValue().getValue();
					if( !valueString.startsWith( "#" ) ) {
						ctx.setVariable( key, valueString );
					}
				}
			}
		}
	}

	public static void addConfiguration( String prefix, String suffix, Locale locale, ServletContext sctx  ) {
		Set< ITemplateResolver > resolvers = templateEngine.getTemplateResolvers();
		TemplateResolver prefixResolver = null;
		for( ITemplateResolver resolver: resolvers ) {
			ThymolTestApplication.ThymolServletContextTemplateResolver tr = ( ThymolTestApplication.ThymolServletContextTemplateResolver )resolver;
			if( tr.getPrefix().equals( prefix ) ) {
				Locale trl = tr.getLocale();
				if( ( trl == null && locale == null ) || ( trl != null && locale != null && tr.getLocale().toString().equals( locale.toString() ) ) ) {
					if( suffix.equals( tr.getSuffix() ) ) {
						prefixResolver = tr;
						break;
					}
				}
			}
		}
		if( prefixResolver == null ) {
			templateEngine = ThymolTestApplication.initializeTemplateEngine( prefix, suffix, locale, sctx ); //TODO
		}
	}

	private Object getAsObject( JsonElement jse ) {
		Object result = null;
		if( jse instanceof JsonPrimitive ) {
			JsonPrimitive jsp = ( JsonPrimitive )jse;
			if( jsp.isString() ) {
				result = jsp.getAsString();
			}
			else if( jsp.isNumber() ) {
				Number number = jsp.getAsNumber();
				if( number instanceof Integer ) {
					result = number.intValue();
				}
				else if( number instanceof Long ) {
					result = number.longValue();
				}
				else if( number instanceof Float ) {
					result = number.floatValue();
				}
				else if( number instanceof Double ) {
					result = number.doubleValue();
				}
				else if( number instanceof Short ) {
					result = number.shortValue();
				}
				else if( number instanceof Byte ) {
					result = number.byteValue();
				}
				else {
					result = number;
				}
			}
			else if( jsp.isBoolean() ) {
				result = jsp.getAsBoolean();
			}
		}
		else {
			if( jse instanceof JsonObject ) {
				result = ( JsonObject )jse;
			}
			else {
				if( jse instanceof JsonArray ) {
					result = ( JsonArray )jse;
				}
				else {
					if( jse instanceof JsonNull ) {
						result = ( JsonNull )jse;
					}
					else {
						result = jse;
					}
				}
			}
		}
		return result;
	}


	public static class JunkObject {
		String value;

		public JunkObject( String thing ) {
			this.value = thing;
		}
	}

	public static class PCDate {
		Calendar calendar;

		public PCDate( Calendar c ) {
			this.calendar = c;
		}

		public Date toDate() {
			return calendar.getTime();
		}
	}

}
