package org.thymoljs.thymol.test.selenium;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.LinkedHashSet;
import java.util.Set;

import org.thymoljs.thymol.test.webapp.ThymolTestFilter;


public class FailSafeEnv implements URIGetter {
	
	private static final String BASE_URI = "http://localhost:8080/";
	
	Set<String> knownPrefixes = new LinkedHashSet<String>();

	private String suffix = "";

	public FailSafeEnv() {
		super();
	}

	@Override
	public void localise( String path ) {
		this.suffix = path;
	}

	@Override
	public String getURI( String path ) {
		StringBuilder sb = new StringBuilder( "/WEB-INF/templates/" );
		sb.append( suffix );
		String prefix = sb.toString();
		// ThymolTestFilter.addPrefix(prefix);
		issuePrefixUpdate( prefix );
		// ThymolTestApplication.setPrefix(prefix);
		return BASE_URI;
	}

	private void issuePrefixUpdate( String prefix ) {
		if( !knownPrefixes.contains( prefix ) ) {
			URL readBack;
			try {
				StringBuilder sb = new StringBuilder( BASE_URI );
				sb.append( ThymolTestFilter.UPDATE_PREFIX_URI );
				sb.append( "?prefix=" );
				sb.append( prefix );
				readBack = new URL( sb.toString() );
				Object resp = readBack.getContent();
				System.out.println( "readback: " + resp );
			}
			catch( MalformedURLException e ) {
//				e.printStackTrace();
			}
			catch( IOException e ) {
//				e.printStackTrace();
			}
			knownPrefixes.add( prefix );
		}
		
	}

}
