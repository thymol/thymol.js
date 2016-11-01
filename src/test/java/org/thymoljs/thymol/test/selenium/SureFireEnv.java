package org.thymoljs.thymol.test.selenium;

import org.thymoljs.thymol.test.context.Context;


public class SureFireEnv implements URIGetter {
	
	private static final String BASE_URI = "target/test-classes/templates/";
	
	Context context = null;
	
	public SureFireEnv() {
		super();
	}

	@Override
	public void localise( Context contextValue ) {
		this.context = contextValue;
	}	
	
	
	@Override
	public String getURI(String relative ) {
		StringBuffer sb = new StringBuffer( BASE_URI );
		if( context != null ) {
			sb.append( context.getPath() );
		}
//		sb.append('/');
		sb.append( relative );
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
			sb.append( '/' ).append( userdir );
		}
		else {
			sb.append( userdir ).append( '/' );
		}
		return sb.append( pathname ).toString();
	}

}
