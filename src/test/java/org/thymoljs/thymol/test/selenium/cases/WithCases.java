package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class WithCases extends SeleniumCases {

	String with01ResultThymol = 		
			"ThError: while evaluating expression: a: null, name: name";
	
	String with01ResultThymeleaf =			
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /with01.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Exception evaluating OGNL expression: \"a.name\" (with01:10)\n";
	
	String with02Result = 					
			"\n" +
			"<div>Jack Melon</div>\n" +
			"\n\n\n\n";

	String with03Result = 
			"\n" +
			"<div><p>Jack Melon</p></div>\n" +
			"\n";
 	
	@Test
	public void with01() {
		localise("tests/with/");
		String result = getResult( "with01.html", ResultMode.ALERT );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( with01ResultThymol, result );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( with01ResultThymeleaf, subs );			
		}
	}

	@Test
	public void with02() {
		localise("tests/with/");
		String result = getResult( "with02.html", ResultMode.HTML );
		assertEquals( with02Result, result );
	}
	
	@Test
	public void with03() {
		localise("tests/with/");
		String result = getResult( "with03.html", ResultMode.HTML );
		assertEquals( with03Result, result );
	}

}
