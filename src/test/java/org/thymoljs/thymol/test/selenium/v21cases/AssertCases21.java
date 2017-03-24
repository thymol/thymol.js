package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class AssertCases21 extends SeleniumCases {

	Context assertBaseContext = new Context( "tests21/assert/" );
	
	String assert01ResultThymol = 		
			"processAssert assertion failure - false term is: \"${not_onevar01}\"" +
	        "Error in: target/test-classes/templates/tests21/assert/assert01.html at line: 9 column: 0";	 
	
	String assert01ResultNode = 		
			"processAssert assertion failure - false term is: \"${not_onevar01}\"" +
	        "Error in: tests21/assert/assert01.html at line: 9 column: 0";	 
	
	String assert01ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /assert01.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardAssertAttrProcessor' (assert01:9)\n";

	String assert02ResultThymol = 		
			"processAssert assertion failure - false term is: \"${not_onevar01}\"" +
	        "Error in: target/test-classes/templates/tests21/assert/assert02.html at line: 10 column: 2";	 		
	
	String assert02ResultNode = 		
			"processAssert assertion failure - false term is: \"${not_onevar01}\"" +
	        "Error in: tests21/assert/assert02.html at line: 10 column: 2";	 		
	
	String assert02ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /assert02.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardAssertAttrProcessor' (assert02:10)\n";

	String assert03ResultThymol = 		
			"processAssert assertion failure - list is: ${onevar01},${threevar} false term is: \"${threevar}\"" +
	        "Error in: target/test-classes/templates/tests21/assert/assert03.html at line: 10 column: 2";
	
	String assert03ResultNode = 		
			"processAssert assertion failure - list is: ${onevar01},${threevar} false term is: \"${threevar}\"" +
	        "Error in: tests21/assert/assert03.html at line: 10 column: 2";
	
	String assert03ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /assert03.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardAssertAttrProcessor' (assert03:10)\n";

	String assert04Result =
			"\n" +
			"<div>\n" +
			"  <div class=\"a\">tururu</div>\n" +
			"</div>\n" +
			"\n\n";	 			

	String assert05ResultThymol = 		
			"processAssert assertion failure - list is: ${onevar01},(${twovar01} < 10) false term is: \"(${twovar01} < 10)\""+
	        "Error in: target/test-classes/templates/tests21/assert/assert05.html at line: 10 column: 2";	 			
	
	String assert05ResultNode = 		
			"processAssert assertion failure - list is: ${onevar01},(${twovar01} &lt; 10) false term is: \"(${twovar01} &lt; 10)\""+
	        "Error in: tests21/assert/assert05.html at line: 10 column: 2";	 			
	
//	String assert05ResultNode = 		
//			"thymol.processAssert assertion failure - list is: ${onevar01},(${twovar01} &lt; 10) false term is: \"(${twovar01} &lt; 10)\"";	 			
	
	String assert05ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /assert05.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardAssertAttrProcessor' (assert05:10)\n";

	String assert06Result =
			"\n" +
			"<div>\n" +
			"  <div class=\"a\">tururu</div>\n" +
			"</div>\n" +
			"\n\n";	 			

	String assert07Result =
			"\n" +
			"<div>\n" +
			"  <div class=\"a\">tururu</div>\n" +
			"</div>\n" +
			"\n\n";	 			
	
	String assert08Result =
			"\n" +
			"<div>\n" +
			"  <div class=\"a\">tururu</div>\n" +
			"</div>\n" +
			"\n\n";	 			

	String assert09Result =
			"\n" +
			"<div>\n" +
			"  tururu\n" +
			"</div>\n" +
			"\n\n";	 			

	String assert10ResultThymol = 		
			"processAssert assertion failure - false term is: \"*{value} > 25\""+
	        "Error in: target/test-classes/templates/tests21/assert/assert10.html at line: 10 column: 2";	 			
	
	String assert10ResultNode = 		
			"processAssert assertion failure - false term is: \"*{value} &gt; 25\""+
	        "Error in: tests21/assert/assert10.html at line: 10 column: 2";	 			
	
//	String assert10ResultNode = 		
//			"thymol.processAssert assertion failure - false term is: \"*{value} &gt; 25\"";	 			
	
	String assert10ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /assert10.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardAssertAttrProcessor' (assert10:11)\n";

	
	private Context getAssertContext() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "onevar01", "hello" );		
		variables.put( "twovar01", 20 );		
		Map< String, Object > fourvar01Var = new LinkedHashMap< String, Object >();
		fourvar01Var.put("value", 25 );
		variables.put( "fourvar01", fourvar01Var );		
		return assertBaseContext.copy().setVariables( variables );
	}
	
	private Context assertContext = getAssertContext(); 
	
	@Test
	public void assert01() {
		localise( assertContext );
		String result = getResult( "assert01.html", ResultMode.ALERT );
		if( expectThymolResult() ) {
			assertEquals( assert01ResultThymol, clean( result ) );			
		}
		else if( expectNodeResult() ) {
			assertEquals( assert01ResultNode, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( assert01ResultThymeleaf, subs );			
		}
	}

	@Test
	public void assert02() {
		localise( assertContext );
		String result = getResult( "assert02.html", ResultMode.ALERT );
		if( expectThymolResult() ) {
			assertEquals( assert02ResultThymol, clean( result ) );			
		}
		else if( expectNodeResult() ) {
			assertEquals( assert02ResultNode, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( assert02ResultThymeleaf, subs );			
		}
	}

	@Test
	public void assert03() {
		localise( assertContext );
		String result = getResult( "assert03.html", ResultMode.ALERT );
		if( expectThymolResult() ) {
			assertEquals( assert03ResultThymol, clean( result ) );			
		}
		else if( expectNodeResult() ) {
			assertEquals( assert03ResultNode, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( assert03ResultThymeleaf, subs );			
		}
	}

	@Test
	public void assert04() {
		localise( assertContext );
		String result = getResult( "assert04.html", ResultMode.HTML );
		assertEquals( clean( assert04Result ), clean( result ) );
	}

	@Test
	public void assert05() {
		localise( assertContext );
		String result = getResult( "assert05.html", ResultMode.ALERT );
		if( expectThymolResult() ) {
			assertEquals( clean( assert05ResultThymol ), clean( result ) );			
		}
		else if( expectNodeResult() ) {
			assertEquals( assert05ResultNode, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( assert05ResultThymeleaf, subs );			
		}
	}

	@Test
	public void assert06() {
		localise( assertContext );
		String result = getResult( "assert06.html", ResultMode.HTML );
		assertEquals( clean( assert06Result ), clean( result ) );
	}

	@Test
	public void assert07() {
		localise( assertContext );
		String result = getResult( "assert07.html", ResultMode.HTML );
		assertEquals( clean( assert07Result ), clean( result ) );
	}

	@Test
	public void assert08() {
		localise( assertContext );
		String result = getResult( "assert08.html", ResultMode.HTML );
		assertEquals( clean( assert08Result ), clean( result ) );
	}

	@Test
	public void assert09() {
		localise( assertContext );
		String result = getResult( "assert09.html", ResultMode.HTML );
		assertEquals( clean( assert09Result ), clean( result ) );
	}

	@Test
	public void assert10() {
		localise( assertContext );
		String result = getResult( "assert10.html", ResultMode.ALERT );
		if( expectThymolResult() ) {
			assertEquals( assert10ResultThymol, clean( result ) );			
		}
		else if( expectNodeResult() ) {
			assertEquals( assert10ResultNode, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( assert10ResultThymeleaf, subs );			
		}
	}


}
