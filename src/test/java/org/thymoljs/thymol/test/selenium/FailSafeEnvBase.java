package org.thymoljs.thymol.test.selenium;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.json.JDEREGJsonCodec;
import org.thymoljs.thymol.test.json.JSONCodec;


public class FailSafeEnvBase implements URIGetter {
	
	
	protected Context context;
		
	protected static JSONCodec jsonCodec = null;

	public FailSafeEnvBase() {
		super();
		if( jsonCodec == null ) {
			jsonCodec = new JDEREGJsonCodec();
		}
	}
		
	@Override
	public void localise( Context contextValue ) {
		this.context = contextValue;
	}

	@Override
	public String getURI( String relative ) {
		throw new IllegalStateException( "Must Ovveride FailSafeEnvBase class!" );
	}

}
