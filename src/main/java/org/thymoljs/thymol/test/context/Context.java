package org.thymoljs.thymol.test.context;

import java.util.Locale;

import com.cedarsoftware.util.io.JsonObject;

public class Context extends JsonObject< String, Object > {

	private static final long serialVersionUID = -2285295650947509633L;

	public boolean initialised = false;
	
	public Context() {
		super();
	}

	public Context( String path ) {
		this( path, ".html" );
	}

	public Context( String path, String suffix ) {
		this();
		setPath( path );
		setSuffix( suffix );
	}

	public Context copy() {
		Context thiz;
		String suffix = this.getSuffix();
		String path = this.getPath();
		if( path != null ) {
			if( suffix != null ) {
				thiz = new Context( path, suffix );
			}
			else {
				thiz = new Context( path );
			}
		}
		else {
			thiz = new Context();
			if( suffix != null ) {
				thiz.setSuffix( suffix );
			}
		}
		return thiz;
	}

	public Context copy( JsonObject< String, Object > that ) {
		Context thiz;
		String suffix = ( String )that.get( "suffix" );
		String path = ( String )that.get( "path" );
		if( path != null ) {
			if( suffix != null ) {
				thiz = new Context( path, suffix );
			}
			else {
				thiz = new Context( path );
			}
		}
		else {
			thiz = new Context();
			if( suffix != null ) {
				thiz.setSuffix( suffix );
			}
		}
		return thiz;
	}

	public Context deepCopy() {
		Context thiz = this.copy();
		JsonObject< String, Object > variables = this.getVariables();
		if( variables != null ) {
			thiz.setVariables( variables );
		}
		Locale locale = this.getLocale();
		if( locale != null ) {
			thiz.setLocale( locale );
		}
		com.google.gson.JsonObject session = this.getSession();
		if( session != null ) {
			thiz.setSession( session );
		}
		com.google.gson.JsonObject context = this.getContext();
		if( context != null ) {
			thiz.setSession( context );
		}
		return thiz;
	}

	public Context deepCopy( JsonObject< String, Object > that ) {
		Context thiz = this.copy( that );
		@SuppressWarnings( "unchecked" )
		JsonObject< String, Object > variables = ( JsonObject< String, Object > )that.get( "variables" );
		if( variables != null ) {
			thiz.setVariables( variables );
		}
		Locale locale = (Locale)that.get( "locale" );
		if( locale != null ) {
			thiz.setLocale( locale );
		}
		com.google.gson.JsonObject session = ( com.google.gson.JsonObject )that.get( "session" );
		if( session != null ) {
			thiz.setSession( session );
		}
		com.google.gson.JsonObject context = ( com.google.gson.JsonObject )that.get( "context" );
		if( context != null ) {
			thiz.setContext( context );
		}
		return thiz;
	}

	public JsonObject< String, Object > getVariables() {
		@SuppressWarnings( "unchecked" )
		JsonObject< String, Object > variables = ( JsonObject< String, Object > )this.get( "variables" );
		return variables;
	}

	public Context setVariables( JsonObject< String, Object > variables ) {
		this.put( "variables", variables );
		return this;
	}

	public String getPath() {
		return ( String )this.get( "path" );
	}

	public Context setPath( String path ) {
		this.put( "path", path );
		return this;
	}

	public String getSuffix() {
		return ( String )this.get( "suffix" );
	}

	public Context setSuffix( String suffix ) {
		this.put( "suffix", suffix );
		initialised = true;
		return this;
	}

	public Locale getLocale() {
		return ( Locale )this.get( "locale" );
	}

	public Context setLocale( Locale locale ) {
		this.put( "locale", locale );
		return this;
	}

	/*
			HttpSession session = ctx.getHttpSession();
			
			session.setAttribute( "a", "Some text" );
			session.setAttribute( "b", 123 );
			session.setAttribute( "c", "Hello" );
	*/
	public com.google.gson.JsonObject getSession() {
		return ( com.google.gson.JsonObject )this.get( "session" );
	}

	public Context setSession( com.google.gson.JsonObject session ) {
		this.put( "session", session );
		return this;
	}

	/*	
		ServletContext servletContext = ctx.getServletContext();
	
		servletContext.setAttribute( "a", "Some text" );
		servletContext.setAttribute( "b", 123 );
		servletContext.setAttribute( "c", "Hello" );
	
	*/

	public com.google.gson.JsonObject getContext() {
		return ( com.google.gson.JsonObject )this.get( "context" );
	}

	public Context setContext( com.google.gson.JsonObject context ) {
		this.put( "context", context );
		return this;
	}

}
