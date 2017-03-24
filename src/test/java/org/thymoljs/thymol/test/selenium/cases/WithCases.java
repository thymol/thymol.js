package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class WithCases extends SeleniumCases {

	Context withBaseContext = new Context( "tests/with/" );
	
	String with01ResultThymol = 		
			"while evaluating binary expression: a: null, name: name" +
	        "\n\nError in: target/test-classes/templates/tests/with/with01.html at line: 10 column: 1 (1tabs)";
	
	String with01ResultNode = 		
			"while evaluating binary expression: a: null, name: name" +
	        "\n\nError in: tests/with/with01.html at line: 10 column: 1 (1tabs)";
	
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
 	
	private Context getWithContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		Map< String, Object > userVar = new LinkedHashMap< String, Object >();
		userVar.put( "name", "Jack Melon" );
		userVar.put( "role", "finance" );
		userVar.put( "age", Integer.valueOf(24) );
		variables.put( "user", userVar );

	    return withBaseContext.copy().setVariables( variables );
		
	}
	
	private Context withContext = getWithContext();
	
	@Test
	public void with01() {
		localise( withContext );
		String result = getResult( "with01.html", ResultMode.ALERT );
		if( expectThymolResult() ) {
			assertEquals( with01ResultThymol, result );			
		}
		else if( expectNodeResult() ) {
			assertEquals( with01ResultNode, result );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( with01ResultThymeleaf, subs );			
		}
	}

	@Test
	public void with02() {
		localise( withContext );
		String result = getResult( "with02.html", ResultMode.HTML );
		assertEquals( with02Result, result );
	}
	
	@Test
	public void with03() {
		localise( withContext );
		String result = getResult( "with03.html", ResultMode.HTML );
		assertEquals( with03Result, result );
	}

}
