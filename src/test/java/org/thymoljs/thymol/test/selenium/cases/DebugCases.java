package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class DebugCases extends SeleniumCases {
	
	String debug01Result =
			"\n" +
			"<p></p>" +
			"\n\n";	
		
	String debug02Result =
			"thymol.processText cannot process: th:text=\"${euros}\"\n...";	
			
	@Test
	public void debug01() {
		localise( "thymol/debug/" );
		String result = getResult( "debug01.html", ResultMode.HTML );		
		assertEquals( clean( debug01Result ), clean( result ) );
	}

	@Test
	public void debug02() {
		localise( "thymol/debug/" );
		String result = getResult( "debug01.html?thDebug=true&thAllowNullText=false", ResultMode.ALERT );
		if( expectThymeleafResult() ) {
			  assertEquals( clean( debug01Result ), clean( result ) );			
		}
		else {
		  assertEquals( clean( debug02Result ), clean( result ) );
		}
	}

	@Test
	public void debug03() {
		localise( "thymol/debug/" );
		String result = getResult( "debug02.html", ResultMode.ALERT );		
		if( expectThymeleafResult() || expectNodeResult() ) {
		  assertEquals( clean( debug01Result ), clean( result ) );			
		}
		else {
		  assertEquals( clean( debug02Result ), clean( result ) );
		}
	}

	@Test
	public void debug04() {
		localise( "thymol/debug/" );
		String result = getResult( "debug03.html", ResultMode.ALERT );
		if( expectThymeleafResult() ) {
			  assertEquals( clean( debug01Result ), clean( result ) );			
		}
		else {
		  assertEquals( clean( debug02Result ), clean( result ) );
		}
	}

}
