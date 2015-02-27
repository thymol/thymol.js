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
		return initializeTemplateEngine(APP_PREFIX,ThymolTestFilter.APP_SUFFIX,null);
	}

	public static TemplateEngine initializeTemplateEngine(String prefix, String suffix, Locale locale) {
		templateEngine = new TemplateEngine();		
		addResolver(prefix,suffix,locale);
		return templateEngine;
	}
		
	public static void addResolver(String prefix, String suffix, Locale locale) {
		TemplateResolver configurationResolver = new ThymolServletContextTemplateResolver(locale);
		configurationResolver.setTemplateMode( "HTML5" );
		configurationResolver.setPrefix( prefix == null ? APP_PREFIX: prefix );
		configurationResolver.setSuffix( suffix == null ? ThymolTestFilter.APP_SUFFIX: suffix );
		configurationResolver.setCacheTTLMs( Long.valueOf( 3600000L ) );
		configurationResolver.setCharacterEncoding( "UTF-8" );
		templateEngine.addTemplateResolver( configurationResolver );		
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
