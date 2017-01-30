package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class IncludeCases21 extends SeleniumCases {

	Context includeBaseContext = new Context( "tests21/include/" );
	
	String include01Result = 		
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <div>This is some text</div>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";	 
	
	String include02Result = 		
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <div>This is some text</div>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";	 
	
	String include03Result = 		
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <div>This is some text</div>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";	 
	
	String include04Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <div>This is some text</div>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";	 

	String include05Result = 		
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			
	
	String include06Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include07Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div><footer>\n" +
			"  <p>Message for you!</p>\n" +
			"</footer>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			
	
	String include08Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include09Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>Message for you!</p>\n" +
			"  <p>...and for you too!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include10ResultThymol = 		
			"ThError: getImportNode cannot match fragment: \"frag-1\"";	 			
	
	String include10ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /include10.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Cannot resolve fragment. Signature \"frag-1 (mesg,mss2)\" declares 2 parameters, but fragment selection specifies 1 parameters. Fragment selection does not correctly match. (include10:11)\n";

	String include11Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>uuuh - Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include12Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>uuuh - Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include13Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>oh! - Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include14ResultThymol = 		
			"ThError: getImportNode cannot match fragment: \"frag-1\"";	 			
	
	String include14ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /include14.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Cannot resolve fragment. Signature \"frag-1 (mesg,mss2)\" declares parameter \"mss2\", which is not specified at the fragment selection. (include14:11)\n";

	String include15ResultThymol = 		
			"ThError: getImportNode cannot match fragment: \"frag-1\"";	 			
	
	String include15ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /include15.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Cannot resolve fragment. Signature \"frag-1 (mesg,mss2)\" declares parameter \"mesg\", which is not specified at the fragment selection. (include15:11)\n";

	String include16Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>oh! - Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include17Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>oh! - Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include18Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>oh! - Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include19Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <div>\n" +
			"  <p>oh! - Message for you!</p>\n" +
			"</div>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";	 			

	String include20ResultThymol = 		
			"ThError: getImportNode cannot match fragment: \"%frag-1\"";	 			
	
	String include20ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /include20.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Cannot resolve fragment. Signature \"frag-1 (mesg,mss2)\" declares parameter \"mss2\", which is not specified at the fragment selection. (include20:11)\n";

	String include21ResultThymol = 		
			"ThError: getImportNode cannot match fragment: \"footer%frag-1\"";	 			
	
	String include21ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /include21.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Cannot resolve fragment. Signature \"frag-1 (mesg,mss2)\" declares parameter \"mss2\", which is not specified at the fragment selection. (include21:11)\n";

	private Context getIncludeContext() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "m22", "...and for you too!" );		
		return includeBaseContext.copy().setVariables( variables );
	}
	
	private Context includeContext = getIncludeContext(); 
	
	@Test
	public void include01() {
		localise( includeContext );
		String result = getResult( "include01.html", ResultMode.HTML );
		assertEquals( clean( include01Result ), clean( result ) );
	}
	
	@Test
	public void include02() {
		localise( includeContext );
		String result = getResult( "include02.html", ResultMode.HTML );
		assertEquals( clean( include02Result ), clean( result ) );
	}
	
	@Test
	public void include03() {
		localise( includeContext );
		String result = getResult( "include03.html", ResultMode.HTML );
		assertEquals( clean( include03Result ), clean( result ) );
	}
	
	@Test
	public void include04() {
		localise( includeContext );
		String result = getResult( "include04.html", ResultMode.HTML );
		assertEquals( clean( include04Result ), clean( result ) );
	}
	
	@Test
	public void include05() {
		localise( includeContext );
		String result = getResult( "include05.html", ResultMode.HTML );
		assertEquals( clean( include05Result ), clean( result ) );
	}
	
	@Test
	public void include06() {
		localise( includeContext );
		String result = getResult( "include06.html", ResultMode.HTML );
		assertEquals( clean( include06Result ), clean( result ) );
	}
	
	@Test
	public void include07() {
		localise( includeContext );
		String result = getResult( "include07.html", ResultMode.HTML );
		assertEquals( clean( include07Result ), clean( result ) );
	}
	
	@Test
	public void include08() {
		localise( includeContext );
		String result = getResult( "include08.html", ResultMode.HTML );
		assertEquals( clean( include08Result ), clean( result ) );
	}
	
	@Test
	public void include09() {
		localise( includeContext );
		String result = getResult( "include09.html", ResultMode.HTML );
		assertEquals( clean( include09Result ), clean( result ) );
	}
	
	@Test
	public void include10() {
		localise( includeContext );
		String result = getResult( "include10.html", ResultMode.ALERT );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( include10ResultThymol, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( include10ResultThymeleaf, subs );			
		}
	}
	
	@Test
	public void include11() {
		localise( includeContext );
		String result = getResult( "include11.html", ResultMode.HTML );
		assertEquals( clean( include11Result ), clean( result ) );
	}
	
	@Test
	public void include12() {
		localise( includeContext );
		String result = getResult( "include12.html", ResultMode.HTML );
		assertEquals( clean( include12Result ), clean( result ) );
	}
	
	@Test
	public void include13() {
		localise( includeContext );
		String result = getResult( "include13.html", ResultMode.HTML );
		assertEquals( clean( include13Result ), clean( result ) );
	}
		
	@Test
	public void include14() {
		localise( includeContext );
		String result = getResult( "include14.html", ResultMode.ALERT );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( include14ResultThymol ), clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( include14ResultThymeleaf, subs );			
		}
	}
	
	@Test
	public void include15() {
		localise( includeContext );
		String result = getResult( "include15.html", ResultMode.ALERT );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( include15ResultThymol ), clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( include15ResultThymeleaf, subs );			
		}
	}
	
	@Test
	public void include16() {
		localise( includeContext );
		String result = getResult( "include16.html", ResultMode.HTML );
		assertEquals( clean( include16Result ), clean( result ) );
	}
	
	@Test
	public void include17() {
		localise( includeContext );
		String result = getResult( "include17.html", ResultMode.HTML );
		assertEquals( clean( include17Result ), clean( result ) );
	}
	
	@Test
	public void include18() {
		localise( includeContext );
		String result = getResult( "include18.html", ResultMode.HTML );
		assertEquals( clean( include18Result ), clean( result ) );
	}
	
	@Test
	public void include19() {
		localise( includeContext );
		String result = getResult( "include19.html", ResultMode.HTML );
		assertEquals( clean( include19Result ), clean( result ) );
	}
	
	@Test
	public void include20() {
		localise( includeContext );
		String result = getResult( "include20.html", ResultMode.ALERT );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( include20ResultThymol ), clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( include20ResultThymeleaf, subs );			
		}
	}
	
	@Test
	public void include21() {
		localise( includeContext );
		String result = getResult( "include21.html", ResultMode.ALERT );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( include21ResultThymol ), clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( include21ResultThymeleaf, subs );			
		}
	}

}
