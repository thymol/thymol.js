package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class MessagesCases extends SeleniumCases {
	
	Context messagesBaseContext = new Context( "thymol/messages/" );
	
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
		
	private Context getMessagesContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		variables.put( "var01", "John Apricot" );
		variables.put( "var02", "John Apricot Jr." );
		variables.put( "var03", "Saturn" );
		
		String[] var04array = {"John Apricot"};
		variables.put( "var04", var04array );

		String[] var05array = {"John Apricot","John Apricot Jr."};
		variables.put( "var05", var05array );

		String[] var06array = {"John Apricot","John Apricot Jr.","Saturn"};
		variables.put( "var06", var06array );
		
		String[] var07array = {"Joe Bloggs","Grimsby","fish"};
		variables.put( "var07", var07array );
		
		String[] var08array = {"Marie-Antoinette","France","cake"};
		variables.put( "var08", var08array );
		
		String[] var09array = {"Wallace","62 West Wallaby Street","cheese"};
		variables.put( "var09", var09array );
		
		String[] var10array = {"Mr. C. Monster","Sesame Street","cookies"};
		variables.put( "var10", var10array );

		String[] msgArray1 = {"msg05","msg06","msg07"};
		List<String> msgList1 = Arrays.asList( msgArray1 );
		Set<String> msgSet1 = new TreeSet<String>(msgList1);

		variables.put( "msgArray1", msgArray1 );
		variables.put( "msgList1", msgList1 );
		variables.put( "msgSet1", msgSet1 );
		
		return messagesBaseContext.copy().setVariables( variables );
		
	}
	
	private Context messagesContext = getMessagesContext();
	
	@Test
	public void messages01() {
		localise( messagesContext );
		String result = getResult( "messages01.html", ResultMode.HTML );
		assertEquals( clean( messages01Result ), clean( result ) );
	}

	@Test
	public void messages01a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages02.html", ResultMode.HTML );
		assertEquals( clean( messages01Result ), clean( result ) );
	}

	@Test
	public void messages02a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages03.html", ResultMode.HTML );
		assertEquals( clean( messages03Result ), clean( result ) );
	}

	@Test
	public void messages03a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages04.html", ResultMode.HTML );
		assertEquals( clean( messages04Result ), clean( result ) );
	}

	@Test
	public void messages04a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages05.html", ResultMode.HTML );
		assertEquals( clean( messages05Result ), clean( result ) );
	}

	@Test
	public void messages05a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages06.html", ResultMode.HTML );
		assertEquals( clean( messages06Result ), clean( result ) );
	}

	@Test
	public void messages06a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages07.html", ResultMode.HTML );
		assertEquals( clean( messages07Result ), clean( result ) );
	}

	@Test
	public void messages07a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages08.html", ResultMode.HTML );
		assertEquals( clean( messages08Result ), clean( result ) );
	}

	@Test
	public void messages08a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages09.html", ResultMode.HTML );
		assertEquals( clean( messages09Result ), clean( result ) );
	}

	@Test
	public void messages09a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages10.html", ResultMode.HTML );
		assertEquals( clean( messages10Result ), clean( result ) );
	}

	@Test
	public void messages10a() {
		localise( messagesContext );
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
		localise( messagesContext );
		String result = getResult( "messages11.html", ResultMode.HTML );
		assertEquals( clean( messages11Result ), clean( result ) );
	}

	@Test
	public void messages11a() {
		localise( messagesContext );
		String result = getResult( "messages11a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( messages11Result ), clean( result ) );
		}
		else {
			assertTrue(true);
		}
	}

}
