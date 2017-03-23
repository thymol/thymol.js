package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class DebugCases extends SeleniumCases {
	
	Context debugBaseContext = new Context( "thymol/debug/" );
	
	String debug01Result =
			"\n" +
			"<p></p>" +
			"\n\n";	
		
//	String debug02Result =
//			"thymol.processText cannot process: th:text=\"${euros}\"\n..." +
//			"\n\nError in: target/test-classes/templates/thymol/debug/debug01.html?thDebug=true&thAllowNullText=false.html at line: 9 column: 0";	
			
	String debug02Result =
			"thymol.processText cannot process: th:text=\"${euros}\"\n..." +
			"\n\nError in: target/test-classes/templates/thymol/debug/debug01.html at line: 9 column: 0";	
			
	String debug02NodeResult =
			"thymol.processText cannot process: th:text=\"${euros}\"\n..." +
			"\n\nError in: thymol/debug/debug01.html at line: 9 column: 0";	
			
	String debug03Result =
			"thymol.processText cannot process: th:text=\"${euros}\"\n..." +
			"\n\nError in: target/test-classes/templates/thymol/debug/debug02.html at line: 9 column: 0";	
			
	String debug04Result =
			"thymol.processText cannot process: th:text=\"${euros}\"\n..." +
			"\n\nError in: target/test-classes/templates/thymol/debug/debug03.html at line: 9 column: 0";	
			
	String debug04NodeResult =
			"thymol.processText cannot process: th:text=\"${euros}\"\n..." +
			"\n\nError in: thymol/debug/debug03.html at line: 9 column: 0";	
			
	@Test
	public void debug01() {
		localise( debugBaseContext );
		String result = getResult( "debug01.html", ResultMode.HTML );		
		assertEquals( clean( debug01Result ), clean( result ) );
	}

	@Test
	public void debug02() {
		localise( debugBaseContext );
		String result = getResult( "debug01.html?thDebug=true&thAllowNullText=false", ResultMode.ALERT );
		if( expectThymeleafResult() ) {
			  assertEquals( clean( debug01Result ), clean( result ) );			
		}
		else if( expectNodeResult() ) {
			  assertEquals( clean( debug02NodeResult ), clean( result ) );			
		}
		else {
		  assertEquals( clean( debug02Result ), clean( result ) );
		}
	}

	@Test
	public void debug03() {
		localise( debugBaseContext );
		String result = getResult( "debug02.html", ResultMode.ALERT );		
		if( expectThymeleafResult() || expectNodeResult() ) {
		  assertEquals( clean( debug01Result ), clean( result ) );			
		}
		else {
		  assertEquals( clean( debug03Result ), clean( result ) );
		}
	}

	@Test
	public void debug04() {
		localise( debugBaseContext );
		String result = getResult( "debug03.html", ResultMode.ALERT );
		if( expectThymeleafResult() ) {
			  assertEquals( clean( debug01Result ), clean( result ) );			
		}
		else if( expectNodeResult() ) {
			  assertEquals( clean( debug04NodeResult ), clean( result ) );			
		}
		else {
		  assertEquals( clean( debug04Result ), clean( result ) );
		}
	}

}
