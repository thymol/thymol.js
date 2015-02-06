package org.thymoljs.thymol.test.selenium;

import java.util.Locale;


public class SureFireEnv implements URIGetter {
	
	private String path = "";

	public SureFireEnv() {
		super();
	}

	@Override
	public void localise(String path) {
		this.path = path;
	}
	
	@Override
	public void localise(String path, Locale locale) {
		this.path = path;
	}
	
	@Override
	public void localise(String path, String suffix) {
		this.path = path;
	}
	
	@Override
	public void localise(String path, String suffix, Locale locale) {		
		this.path = path;
	}
	
	
	@Override
	public String getURI(String junk) {
		StringBuilder sb = new StringBuilder("target/test-classes/templates/");
		sb.append(this.path);
//		sb.append('/');
		String uri = makeURI( sb.toString() );
		return uri;
	}
	
	private String makeURI( String pathname ) {
		StringBuffer sb = new StringBuffer( "file://" );
		if( pathname.startsWith( "/" ) ) {
			return sb.append( pathname ).toString();
		}
		String userdir = System.getProperty( "user.dir" );
		userdir = userdir.replace( '\\', '/' );
		if( userdir.endsWith( "/" ) ) {
			return sb.append( '/' ).append( userdir ).append( pathname ).toString();
		}
		else {
//			return sb.append( '/' ).append( userdir ).append( '/' ).append( pathname ).toString();
			return sb.append( userdir ).append( '/' ).append( pathname ).toString();
		}
	}

}
