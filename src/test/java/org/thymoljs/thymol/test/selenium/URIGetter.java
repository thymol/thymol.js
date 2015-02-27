package org.thymoljs.thymol.test.selenium;

import java.util.Locale;

public interface URIGetter {	
	public void localise( String path );
	public void localise( String path, Locale locale );
	public void localise( String path, String suffix );
	public void localise( String path, String suffix, Locale locale );
	public String getURI( String path );	
}
