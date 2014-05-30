package org.thymoljs.thymol.test.webapp;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;
import org.thymeleaf.templateresolver.TemplateResolver;

public class ThymolTestApplication {

	private static TemplateEngine templateEngine;
	
	private static final String APP_PREFIX = "/WEB-INF/templates/";

	private ThymolTestApplication() {
		super();
	}

	public static TemplateEngine initializeTemplateEngine() {
		return initializeTemplateEngine(APP_PREFIX);
	}

	public static TemplateEngine initializeTemplateEngine(String prefix) {
		templateEngine = new TemplateEngine();
		addResolver(prefix);
		return templateEngine;
	}

	public static void addResolver(String prefix) {
		TemplateResolver prefixResolver = new ServletContextTemplateResolver();
		prefixResolver.setTemplateMode( "HTML5" );
		prefixResolver.setPrefix( prefix );
		prefixResolver.setSuffix( ".html" );
		prefixResolver.setCacheTTLMs( Long.valueOf( 3600000L ) );
		templateEngine.addTemplateResolver( prefixResolver );
		templateEngine.initialize();
	}

}
