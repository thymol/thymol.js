package org.thymoljs.thymol.test.selenium;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.Set;

import org.thymoljs.thymol.test.webapp.ThymolTestFilter;


public class FailSafeEnvNode implements URIGetter {
	
	private static final String BASE_URI = "http://localhost:3000/";
	
	Set<String> knownPrefixes = new LinkedHashSet<String>();

	private String path = "";
	private String suffix = null;
	private Locale locale = null;

	public FailSafeEnvNode() {
		super();
	}

	@Override
	public void localise( String path ) {
		localise( path, null, null );
	}

	@Override
	public void localise( String path, Locale locale ) {
		localise( path, null, locale );
	}

	@Override
	public void localise( String path, String suffix ) {
		localise( path, suffix, null );
	}

	@Override
	public void localise( String path, String suffix, Locale locale ) {
		this.path = path;
		this.suffix = suffix;
		this.locale = locale;
	}

	@Override
	public String getURI( String part ) {
		StringBuilder sb = new StringBuilder( BASE_URI );
		sb.append( path );
		sb.append( part );
		String uri = sb.toString();
		return uri;
	}

}
