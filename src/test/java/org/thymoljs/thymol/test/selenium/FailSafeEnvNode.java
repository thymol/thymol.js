package org.thymoljs.thymol.test.selenium;

public class FailSafeEnvNode extends FailSafeEnvBase {
	
	private static final String BASE_URI = "http://localhost:3000/";
	

	public FailSafeEnvNode() {
		super();
	}

	@Override
	public String getURI( String part ) {
		StringBuilder sb = new StringBuilder( BASE_URI );
		sb.append( context.getPath() );
		sb.append( part );
		String uri = sb.toString();
		return uri;
	}

}
