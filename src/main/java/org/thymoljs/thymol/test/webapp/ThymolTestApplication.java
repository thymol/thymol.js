package org.thymoljs.thymol.test.webapp;

import java.util.Locale;
import java.util.Properties;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.messageresolver.StandardMessageResolver;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;
import org.thymeleaf.templateresolver.TemplateResolver;
import org.thymeleaf.util.MessageResolutionUtils;

public class ThymolTestApplication {

	private static TemplateEngine templateEngine;
	
	private static final String APP_PREFIX = "/WEB-INF/templates/";

	private ThymolTestApplication() {
		super();
	}

	public static TemplateEngine initializeTemplateEngine() {
		return initializeTemplateEngine(APP_PREFIX,null);
	}

	public static TemplateEngine initializeTemplateEngine(String prefix, Locale locale) {
		templateEngine = new TemplateEngine();		
		addResolver(prefix,locale);
		return templateEngine;
	}
		
	public static void addResolver(String prefix, Locale locale) {
		TemplateResolver prefixResolver = new ThymolServletContextTemplateResolver(locale);
		prefixResolver.setTemplateMode( "HTML5" );
		prefixResolver.setPrefix( prefix );
		prefixResolver.setSuffix( ".html" );
		prefixResolver.setCacheTTLMs( Long.valueOf( 3600000L ) );
		templateEngine.addTemplateResolver( prefixResolver );		
		if( locale != null ) {
			Properties props = MessageResolutionUtils.loadCombinedMessagesFilesFromBaseName(null, null, "Messages", locale, null);
			StandardMessageResolver messageResolver = new StandardMessageResolver();			
			messageResolver.setDefaultMessages(props);
			templateEngine.addMessageResolver(messageResolver);
		}
		templateEngine.initialize();		
	}
		
	public static class ThymolServletContextTemplateResolver extends ServletContextTemplateResolver {
		private Locale locale;
		ThymolServletContextTemplateResolver(Locale localeValue) {
			super();
			locale = localeValue;
		}
		public Locale getLocale() {
			return locale;
		}
	}

}
