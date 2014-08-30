package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class MessagesCases extends SeleniumCases {
	
	String messages01Result = 
			"\n" +
			"<span>Hello!</span><br>\n" +
			"<span>Hello Jack Lettuce!</span><br>\n" +
			"<span>Hello John Apricot!</span><br>\n" +
			"<span>Hello John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Saturn!</span><br>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span><br>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span><br>\n" +
			"<span>??msg99_en_GB??</span><br>\n" +
			"\n" +
			"\n\n\n";

	String messages03Result = 
			"\n" +
			"<span>Hello John Apricot!</span><br>\n" +
			"<span>Hello John Apricot, welcome to planet {1}!</span><br>\n" +
			"<span>Hello John Apricot and {1}, welcome to planet {2}!</span><br>\n" +
			"<span>Hello John Apricot!</span><br>\n" +
			"<span>Hello John Apricot, welcome to planet John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot and John Apricot Jr., welcome to planet {2}!</span><br>\n" +
			"<span>Hello John Apricot!</span><br>\n" +
			"<span>Hello John Apricot, welcome to planet John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot and John Apricot Jr., welcome to planet Saturn!</span><br>\n" +
			"<span>??msg99_en_GB??</span><br>\n" +
			"\n" +
			"\n\n\n";	
	
	String messages04Result = 
			"\n" +
			"<span>Hello!</span><br>\n" +
			"<span>Hello Jack Lettuce!</span><br>\n" +
			"<span>Hello John Apricot!</span><br>\n" +
			"<span>Hello John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Saturn!</span><br>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span><br>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span><br>\n" +
			"<span></span><br>\n" +
			"\n" +
			"\n\n\n";

	String messages05Result = 
			"\n" +
			"<span>Hello John Apricot!</span><br>\n" +
			"<span>Hello John Apricot, welcome to planet {1}!</span><br>\n" +
			"<span>Hello John Apricot and {1}, welcome to planet {2}!</span><br>\n" +
			"<span>Hello John Apricot!</span><br>\n" +
			"<span>Hello John Apricot, welcome to planet John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot and John Apricot Jr., welcome to planet {2}!</span><br>\n" +
			"<span>Hello John Apricot!</span><br>\n" +
			"<span>Hello John Apricot, welcome to planet John Apricot Jr.!</span><br>\n" +
			"<span>Hello John Apricot and John Apricot Jr., welcome to planet Saturn!</span><br>\n" +
			"<span></span><br>\n" +
			"\n" +
			"\n\n\n";	
	
	String messages06Result = 
			"\n" +
		    "<p>Message Array 1: <span>My friend John Smith, comes from Bradford and likes to eat Vindaloo.,??msg06_en_GB??,We went to Bradford to meet with John Smith and share some Vindaloo.</span></p>\n" +
			"<p>Message Array 2: <span>My friend Joe Bloggs, comes from Grimsby and likes to eat fish.,??msg06_en_GB??,We went to Grimsby to meet with Joe Bloggs and share some fish.</span></p>\n" +
			"<p>Message Array 3: <span>My friend Marie-Antoinette, comes from France and likes to eat cake.,??msg06_en_GB??,We went to France to meet with Marie-Antoinette and share some cake.</span></p>\n" +
			"<p>Message Array 4: <span>My friend Wallace, comes from 62 West Wallaby Street and likes to eat cheese.,??msg06_en_GB??,We went to 62 West Wallaby Street to meet with Wallace and share some cheese.</span></p>\n" +
			"<p>Message Array 5: <span>My friend Mr. C. Monster, comes from Sesame Street and likes to eat cookies.,??msg06_en_GB??,We went to Sesame Street to meet with Mr. C. Monster and share some cookies.</span></p>\n" +
			"\n\n";	
		
	String messages07Result = 
			"\n" +
		    "<p>Message Set 1: <span>My friend John Smith, comes from Bradford and likes to eat Vindaloo.,??msg06_en_GB??,We went to Bradford to meet with John Smith and share some Vindaloo.</span></p>\n" +
			"<p>Message Set 2: <span>My friend Joe Bloggs, comes from Grimsby and likes to eat fish.,??msg06_en_GB??,We went to Grimsby to meet with Joe Bloggs and share some fish.</span></p>\n" +
			"<p>Message Set 3: <span>My friend Marie-Antoinette, comes from France and likes to eat cake.,??msg06_en_GB??,We went to France to meet with Marie-Antoinette and share some cake.</span></p>\n" +
			"<p>Message Set 4: <span>My friend Wallace, comes from 62 West Wallaby Street and likes to eat cheese.,??msg06_en_GB??,We went to 62 West Wallaby Street to meet with Wallace and share some cheese.</span></p>\n" +
			"<p>Message Set 5: <span>My friend Mr. C. Monster, comes from Sesame Street and likes to eat cookies.,??msg06_en_GB??,We went to Sesame Street to meet with Mr. C. Monster and share some cookies.</span></p>\n" +
			"\n\n";	
	
	String messages08Result = 
			"\n" +
		    "<p>Message Array 1: <span>My friend John Smith, comes from Bradford and likes to eat Vindaloo.,null,We went to Bradford to meet with John Smith and share some Vindaloo.</span></p>\n" +
			"<p>Message Array 2: <span>My friend Joe Bloggs, comes from Grimsby and likes to eat fish.,null,We went to Grimsby to meet with Joe Bloggs and share some fish.</span></p>\n" +
			"<p>Message Array 3: <span>My friend Marie-Antoinette, comes from France and likes to eat cake.,null,We went to France to meet with Marie-Antoinette and share some cake.</span></p>\n" +
			"<p>Message Array 4: <span>My friend Wallace, comes from 62 West Wallaby Street and likes to eat cheese.,null,We went to 62 West Wallaby Street to meet with Wallace and share some cheese.</span></p>\n" +
			"<p>Message Array 5: <span>My friend Mr. C. Monster, comes from Sesame Street and likes to eat cookies.,null,We went to Sesame Street to meet with Mr. C. Monster and share some cookies.</span></p>\n" +
			"\n\n";	
		
	String messages09Result = 
			"\n" +
		    "<p>Message Set 1: <span>My friend John Smith, comes from Bradford and likes to eat Vindaloo.,null,We went to Bradford to meet with John Smith and share some Vindaloo.</span></p>\n" +
			"<p>Message Set 2: <span>My friend Joe Bloggs, comes from Grimsby and likes to eat fish.,null,We went to Grimsby to meet with Joe Bloggs and share some fish.</span></p>\n" +
			"<p>Message Set 3: <span>My friend Marie-Antoinette, comes from France and likes to eat cake.,null,We went to France to meet with Marie-Antoinette and share some cake.</span></p>\n" +
			"<p>Message Set 4: <span>My friend Wallace, comes from 62 West Wallaby Street and likes to eat cheese.,null,We went to 62 West Wallaby Street to meet with Wallace and share some cheese.</span></p>\n" +
			"<p>Message Set 5: <span>My friend Mr. C. Monster, comes from Sesame Street and likes to eat cookies.,null,We went to Sesame Street to meet with Mr. C. Monster and share some cookies.</span></p>\n" +
			"\n\n";	
	
	String messages10Result = 
			"\n" +
		    "<p>Message List 1: <span>My friend John Smith, comes from Bradford and likes to eat Vindaloo.,??msg06_en_GB??,We went to Bradford to meet with John Smith and share some Vindaloo.</span></p>\n" +
			"<p>Message List 2: <span>My friend Joe Bloggs, comes from Grimsby and likes to eat fish.,??msg06_en_GB??,We went to Grimsby to meet with Joe Bloggs and share some fish.</span></p>\n" +
			"<p>Message List 3: <span>My friend Marie-Antoinette, comes from France and likes to eat cake.,??msg06_en_GB??,We went to France to meet with Marie-Antoinette and share some cake.</span></p>\n" +
			"<p>Message List 4: <span>My friend Wallace, comes from 62 West Wallaby Street and likes to eat cheese.,??msg06_en_GB??,We went to 62 West Wallaby Street to meet with Wallace and share some cheese.</span></p>\n" +
			"<p>Message List 5: <span>My friend Mr. C. Monster, comes from Sesame Street and likes to eat cookies.,??msg06_en_GB??,We went to Sesame Street to meet with Mr. C. Monster and share some cookies.</span></p>\n" +
			"\n\n";	
		
	String messages11Result = 
			"\n" +
		    "<p>Message List 1: <span>My friend John Smith, comes from Bradford and likes to eat Vindaloo.,null,We went to Bradford to meet with John Smith and share some Vindaloo.</span></p>\n" +
			"<p>Message List 2: <span>My friend Joe Bloggs, comes from Grimsby and likes to eat fish.,null,We went to Grimsby to meet with Joe Bloggs and share some fish.</span></p>\n" +
			"<p>Message List 3: <span>My friend Marie-Antoinette, comes from France and likes to eat cake.,null,We went to France to meet with Marie-Antoinette and share some cake.</span></p>\n" +
			"<p>Message List 4: <span>My friend Wallace, comes from 62 West Wallaby Street and likes to eat cheese.,null,We went to 62 West Wallaby Street to meet with Wallace and share some cheese.</span></p>\n" +
			"<p>Message List 5: <span>My friend Mr. C. Monster, comes from Sesame Street and likes to eat cookies.,null,We went to Sesame Street to meet with Mr. C. Monster and share some cookies.</span></p>\n" +
			"\n\n";	
	
	
	@Test
	public void messages01() {
		localise( "thymol/messages/" );
		String result = getResult( "messages01.html", ResultMode.HTML );
		assertEquals( clean( messages01Result ), clean( result ) );
	}

	@Test
	public void messages01a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages01a.html", ResultMode.HTML );	
		if( expectThymolResult() ) {
			assertEquals( clean( messages01Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	
	}

	@Test
	public void messages02() {
		localise( "thymol/messages/" );
		String result = getResult( "messages02.html", ResultMode.HTML );
		assertEquals( clean( messages01Result ), clean( result ) );
	}

	@Test
	public void messages02a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages02a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages01Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages03() {
		localise( "thymol/messages/" );
		String result = getResult( "messages03.html", ResultMode.HTML );
		assertEquals( clean( messages03Result ), clean( result ) );
	}

	@Test
	public void messages03a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages03a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages03Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages04() {
		localise( "thymol/messages/" );
		String result = getResult( "messages04.html", ResultMode.HTML );
		assertEquals( clean( messages04Result ), clean( result ) );
	}

	@Test
	public void messages04a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages04a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages04Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages05() {
		localise( "thymol/messages/" );
		String result = getResult( "messages05.html", ResultMode.HTML );
		assertEquals( clean( messages05Result ), clean( result ) );
	}

	@Test
	public void messages05a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages05a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages05Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages06() {
		localise( "thymol/messages/" );
		String result = getResult( "messages06.html", ResultMode.HTML );
		assertEquals( clean( messages06Result ), clean( result ) );
	}

	@Test
	public void messages06a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages06a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages06Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages07() {
		localise( "thymol/messages/" );
		String result = getResult( "messages07.html", ResultMode.HTML );
		assertEquals( clean( messages07Result ), clean( result ) );
	}

	@Test
	public void messages07a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages07a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages07Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages08() {
		localise( "thymol/messages/" );
		String result = getResult( "messages08.html", ResultMode.HTML );
		assertEquals( clean( messages08Result ), clean( result ) );
	}

	@Test
	public void messages08a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages08a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages08Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages09() {
		localise( "thymol/messages/" );
		String result = getResult( "messages09.html", ResultMode.HTML );
		assertEquals( clean( messages09Result ), clean( result ) );
	}

	@Test
	public void messages09a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages09a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages09Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages10() {
		localise( "thymol/messages/" );
		String result = getResult( "messages10.html", ResultMode.HTML );
		assertEquals( clean( messages10Result ), clean( result ) );
	}

	@Test
	public void messages10a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages10a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages10Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

	@Test
	public void messages11() {
		localise( "thymol/messages/" );
		String result = getResult( "messages11.html", ResultMode.HTML );
		assertEquals( clean( messages11Result ), clean( result ) );
	}

	@Test
	public void messages11a() {
		localise( "thymol/messages/" );
		String result = getResult( "messages11a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages11Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

}
