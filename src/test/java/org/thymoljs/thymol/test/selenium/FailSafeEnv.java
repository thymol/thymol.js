package org.thymoljs.thymol.test.selenium;

import org.thymoljs.thymol.test.base64.Base64Utils;


public class FailSafeEnv extends FailSafeEnvBase {
	
	private static final String BASE_URI = "http://localhost:8080/";
	

	public FailSafeEnv() {
		super();
	}
		

	@Override
	public String getURI( String relative ) {
		StringBuilder sb = new StringBuilder( BASE_URI );		
		sb.append( Base64Utils.encode( jsonCodec.encode( context ) ) );		
		sb.append( '/' );
		sb.append( relative );
		return sb.toString();
	}


}
