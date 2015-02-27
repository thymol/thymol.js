package org.thymoljs.thymol.test.selenium;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.Set;

import org.thymoljs.thymol.test.webapp.ThymolTestFilter;


public class FailSafeEnv implements URIGetter {
	
	private static final String BASE_URI = "http://localhost:8080/";
	
	Set<String> knownPrefixes = new LinkedHashSet<String>();

	private String path = "";
	private String suffix = null;
	private Locale locale = null;

	public FailSafeEnv() {
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
	public String getURI( String junk ) {
		StringBuilder sb = new StringBuilder( "/WEB-INF/templates/" );
		sb.append( path );
		String prefix = sb.toString();
		// ThymolTestFilter.addPrefix(prefix);
		issueConfigUpdate( prefix );
		// ThymolTestApplication.setPrefix(prefix);
		return BASE_URI;
	}

	private void issueConfigUpdate( String prefix ) {
		StringBuilder ksb = new StringBuilder( "?prefix=" );
		ksb.append( prefix );
		if( suffix != null ) {
			ksb.append( "&suffix=" );
			ksb.append( suffix );			
		}
		if( locale != null ) {
			int indx = findLocale();
			if( indx >= 0 ) {
				ksb.append( "&locale=" );
				ksb.append( indx );
			}
			else {
				throw new RuntimeException("Cannot match locale: " + locale.toString());
			}
		}
		String key = ksb.toString();
		if( !knownPrefixes.contains( key ) ) {
			URL readBack;
			try {
				StringBuilder sb = new StringBuilder( BASE_URI );
				sb.append( ThymolTestFilter.UPDATE_CONFIG_URI );
				sb.append( key );
				readBack = new URL( sb.toString() );
				try {
					readBack.getContent();
				}
				catch( IOException ioe) {
					System.out.println("readBack.getContent failed: " + sb.toString());
				}
			}
			catch( MalformedURLException e ) {
				e.printStackTrace();
			}
			knownPrefixes.add( key );
		}
		
	}
	
	private int findLocale() {
		int result = -1;
		Locale[] all = Locale.getAvailableLocales();
		for( int i = 0; i < all.length; i++ ) {
			if( locale.equals(all[i]) || locale.toString().equals(all[i].toString())) {
				result = i;
				break;
			}
		}
		return result;
	}

}
