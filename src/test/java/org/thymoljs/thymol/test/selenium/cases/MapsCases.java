package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class MapsCases extends SeleniumCases {
	
	String maps01Result = 
			"\n" +
			"\t\t<p>size of tm1: 4</p>\n" +
			"\t\n" +
			"\n\n\n";
					
	String maps02ResultThymol = 
			"ThError: #maps.size Cannot get size of non-map type \"object\"";

	String maps02ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /maps02.html. Reason:\n" +
			"</p><pre>    Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardTextAttrProcessor' (maps02:10)<";
		
	String maps03Result = 
			"\n" +
			"\t\t<p>size of tm3: 4</p>\n" +
			"\t\n" +
			"\n\n\n";

	String maps04ResultThymol = 
			"ThError: #maps.size Cannot get size of non-map type \"object\"";
		
	String maps04ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /maps04.html. Reason:\n" +
			"</p><pre>    Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardTextAttrProcessor' (maps04:10)<";

	String maps05Result = 
			"\n" +
			"\t\t<p>isEmpty for tm3: false</p>\n" +
			"\t\t<p>isEmpty for tm5: true</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String maps06Result = 
			"\n" +
			"\t\t<p>containsKey(ar1) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar2) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar3) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar4) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar5) for tm3: false</p>\n" +
			"\t\n" +
			"\n\n\n";
	
	String maps07Result = 
			"\n" +
			"\t\t<p>containsValue(ar1) for tm3: true</p>\n" +
			"\t\t<p>containsValue(ar2) for tm3: true</p>\n" +
			"\t\t<p>containsValue(ar3) for tm3: false</p>\n" +
			"\t\t<p>containsValue(ar4) for tm3: false</p>\n" +
			"\t\t<p>containsValue(ar5) for tm3: false</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String maps08Result = 
			"\n" +
			"\t\t<p>containsAllKeys(ka1) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ks1) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ka2) for tm1: false</p>\n" +
			"\t\t<p>containsAllKeys(ks2) for tm1: false</p>\n" +
			"\t\t<p>containsAllKeys(ka3) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ks3) for tm1: true</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String maps09Result = 
			"\n" +
			"\t\t<p>containsAllValues(va1) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(vs1) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(va2) for tm1: false</p>\n" +
			"\t\t<p>containsAllValues(vs2) for tm1: false</p>\n" +
			"\t\t<p>containsAllValues(va3) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(vs3) for tm1: true</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	@Test
	public void maps01() {
		localise( "thymol/maps/" );
		String result = getResult( "maps01.html", false );
		assertEquals( clean( maps01Result ), clean( result ) );
	}

	@Test
	public void maps02() {
		localise( "thymol/maps/" );
		String result = getResult( "maps02.html", false );
		if( expectThymolResult() ) {
			assertEquals( maps02ResultThymol, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, clean( result ).indexOf( "</pre>" ) + 6);
			assertEquals( maps02ResultThymeleaf, subs );			
		}
	}

	@Test
	public void maps03() {
		localise( "thymol/maps/" );
		String result = getResult( "maps03.html", false );
		assertEquals( clean( maps03Result ), clean( result ) );
	}

	@Test
	public void maps04() {
		localise( "thymol/maps/" );
		String result = getResult( "maps04.html", false );
		if( expectThymolResult() ) {
			assertEquals( maps04ResultThymol, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, clean( result ).indexOf( "</pre>" ) + 6);
			assertEquals( maps04ResultThymeleaf, subs );			
		}
	}

	@Test
	public void maps05() {
		localise( "thymol/maps/" );
		String result = getResult( "maps05.html", false );		
		assertEquals( clean( maps05Result ), clean( result ) );
	}

	@Test
	public void maps06() {
		localise( "thymol/maps/" );
		String result = getResult( "maps06.html", false );		
		assertEquals( clean( maps06Result ), clean( result ) );
	}

	@Test
	public void maps07() {
		localise( "thymol/maps/" );
		String result = getResult( "maps07.html", false );		
		assertEquals( clean( maps07Result ), clean( result ) );
	}

	@Test
	public void maps08() {
		localise( "thymol/maps/" );
		String result = getResult( "maps08.html", false );		
		assertEquals( clean( maps08Result ), clean( result ) );
	}

	@Test
	public void maps09() {
		localise( "thymol/maps/" );
		String result = getResult( "maps09.html", false );		
		assertEquals( clean( maps09Result ), clean( result ) );
	}

}
