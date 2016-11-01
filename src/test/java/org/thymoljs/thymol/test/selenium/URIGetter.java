package org.thymoljs.thymol.test.selenium;

import org.thymoljs.thymol.test.context.Context;

public interface URIGetter {
	public void localise( Context context );
	public String getURI( String relative );
}