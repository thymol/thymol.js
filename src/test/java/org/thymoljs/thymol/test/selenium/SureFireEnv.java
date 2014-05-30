package org.thymoljs.thymol.test.selenium;


public class SureFireEnv implements URIGetter {
	
	private String suffix = "";

	public SureFireEnv() {
		super();
	}

	@Override
	public void localise(String path) {
		this.suffix = path;
	}
	
	@Override
	public String getURI(String path) {
		StringBuilder sb = new StringBuilder("target/test-classes/templates/");
		sb.append(suffix);
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
