package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.thymoljs.thymol.test.selenium.SureFireEnv;

import org.junit.Test;

public class ObjectCases extends SeleniumCases {

	String object01Result = 					
			"\n" +
			"<p>9</p>\n" +
			"<p>\n" +
			"<span>9</span>\n" +
			"</p>\n" +
			"<p>\n" +
			"<span>9</span>\n" +
			"</p>\n" +
			"<p>\n" +
			"<span>\n" +
			"<span>9</span>\n" +
			"</span>\n" +
			"</p>\n" +
			"\n";
	
	String object02ResultThymol = 		
			"thymol.processText cannot process: th:text=\"*{euros}\"\n...";
	
	String object02ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /object02.html. Reason:\n" +
			"</p><pre>    Exception evaluating OGNL expression: \"euros\" (object02:9)</pre>";	

	String object03Result = 		
			"\n" +
			"<p>9</p>\n" +
			"<p>\n" +
			"<span>9</span>\n" +
			"</p>\n" +
			"<p>9</p>\n" +
			"<p>\n" +
			"<span>9</span>\n" +
			"</p>\n" +
			"\n";
	
	String object04Result = 		
			"\n" +
			"<p>9</p>\n" +
			"<p>\n" +
			"<span>9</span>\n" +
			"</p>\n" +
			"<p>9</p>\n" +
			"<p>\n" +
			"<span>9</span>\n" +
			"</p>\n" +
			"\n";

	@Test
	public void object01() {
		localise("tests/object/");
		String result = getResult( "object01.html", false );
		assertEquals( object01Result, result );
	}

	@Test
	public void object02() {
		localise("tests/object/");
		String result = getResult( "object02.html", false );
		if( getter.getClass().isAssignableFrom( SureFireEnv.class ) ) {
			assertEquals( object02ResultThymol, result );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "</pre>" ) + 6);
			assertEquals( object02ResultThymeleaf, subs );			
		}
	}

	@Test
	public void object03() {
		localise("tests/object/");
		String result = getResult( "object03.html", false );
		assertEquals( object03Result, result );
	}

	@Test
	public void object04() {
		localise("tests/object/");
		String result = getResult( "object04.html", false );
		assertEquals( object04Result, result );
	}

}