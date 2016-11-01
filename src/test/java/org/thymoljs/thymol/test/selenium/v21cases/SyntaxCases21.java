package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.LinkedHashMap;
import java.util.Map;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.thymoljs.thymol.test.webapp.ThymolTestFilter.PCDate;

import com.cedarsoftware.util.io.JsonObject;

import org.junit.Test;

public class SyntaxCases21 extends SeleniumCases {

    Context syntaxBaseContext = new Context( "tests21/syntax/" );

	String fragments01Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <div>\n" +
			"    <p>Joe Bloggs - was here!</p>\n" +
			"</div>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";


	String fragments02Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <div>\n" +
			"    <p>Fred Bloggs + has left the building</p>\n" +
			"</div>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";

	String issue245Result =
			"\n" +
			"    <div class=\"container\">\n" +
			"\n" +
			"        <p>Main include start</p>\n" +
			"        <div>\n" +
			"            <p>Include template value: <span>Main include</span></p>\n" +
			"\n" +
			"            <div>\n" +
			"            <p>Sub include template value: <span>Sub include</span></p>\n" +
			"        </div>\n" +
			"        </div>\n" +
			"        <p>Main include end</p>\n" +
			"\n" +
			"        <p>Main replace start</p>\n" +
			"        <div>\n" +
			"            <p>Replace template value: <span>Main replace</span></p>\n" +
			"\n" +
			"            <div>\n" +
			"            <p>Sub replace template value: <span>Sub replace</span></p>\n" +
			"        </div>\n" +
			"        </div>\n" +
			"        <p>Main replace end</p>\n" +
			"\n" +
			"    </div>\n" +
			"\n" +
			"    \n\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\n\n";

	String issue245aResult =
			"\n" +
			"    <div class=\"container\">\n" +
			"\n" +
			"        <p>Main include start</p>\n" +
			"        <div>\n" +
			"            <p>Include template value: <span>Main include</span></p>\n" +
			"\n" +
			"            <div>\n" +
			"            <p>Sub include template value: <span>Sub include</span></p>\n" +
			"        </div>\n" +
			"        </div>\n" +
			"        <p>Main include end</p>\n" +
			"\n" +
			"    </div>\n" +
			"\n" +
			"\n" +
			"    \n\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\n\n";

	String issue245bResult =
			"\n" +
			"    <div class=\"container\">\n" +
			"\n" +
			"        <p>Main replace start</p>\n" +
			"        <div>\n" +
			"            <p>Replace template value: <span>Main replace</span></p>\n" +
			"\n" +
			"            <div>\n" +
			"            <p>Sub replace template value: <span>Sub replace</span></p>\n" +
			"        </div>\n" +
			"        </div>\n" +
			"        <p>Main replace end</p>\n" +
			"\n" +
			"    </div>\n" +
			"\n" +
			"    \n\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\n\n";

	String syntax01Result =
			"\n" +
			"<div>2008-04-23</div>\n" +
			"\n\n";	
	
/*	 		
	String replace03Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";
 		 	
	String replace04Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";
 	
	String replace05Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <footer>\n" +
			"  <p>Message for you!</p>\n" +
			"</footer>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";
 */	
/*
	String replace06Result =
			"\n\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</p>\n" +
			"\n\n\n";
 	
	String replace07Result =
			"\n\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (null)</span>.\n" +
			"</p>\n" +
			"\n\n\n";
*/

/*	
   	["value1",		"Joe Bloggs"],   	        
		["value2",		"was here!"],   	    
		// Simulate missing Expression objects
		["#httpServletRequest.servletPath",    	                        "/ownerDetails.html"],
		["#dates.format(pet.birthDate.toDate(), \'yyyy-MM-dd\')",          "2010-09-05"],
		["#dates.format(visit.pet.birthDate.toDate(), \'yyyy/MM/dd\')",	"2011/10/06"],
		["#fields.hasErrors('*')",	true],
		["#fields.errors('*')",	"#[ 'mistakes', 'errors' ]"],
    ["#lists.isEmpty(allSeedStarters)",	false] // Hack to prevent a debug alert
*/	
	
	private Context getFragments01Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();

		variables.put( "value1", "Joe Bloggs" );
		variables.put( "value2", "was here!" );
		// Simulate missing Expression objects
		variables.put( "#httpServletRequest.servletPath", "/ownerDetails.html" );
		variables.put( "#dates.format(pet.birthDate.toDate(), \'yyyy-MM-dd\')", "2010-09-05" );
		variables.put( "#dates.format(visit.pet.birthDate.toDate(), \'yyyy/MM/dd\')", "2011/10/06" );
		variables.put( "#fields.hasErrors('*')", true );
		Map< String, Object > errorsVar = new LinkedHashMap< String, Object >();
		errorsVar.put( "mistakes", "errors" );
		variables.put( "#fields.errors('*')", errorsVar );
		variables.put( "#lists.isEmpty(allSeedStarters)", false );

		return syntaxBaseContext.copy().setVariables( variables );
	}		
	
	private Context fragments01Context = getFragments01Context();
	
	@Test
	public void fragments01() {
		localise( fragments01Context );
		String result = getResult( "fragments01.html", ResultMode.HTML );
		assertEquals( clean( fragments01Result ), clean( result ) );
	}

	@Test
	public void fragments02() {
		localise( fragments01Context );
		String result = getResult( "fragments02.html", ResultMode.HTML );
		assertEquals( clean( fragments02Result ), clean( result ) );
	}

	@Test
	public void issue245() {
		localise( syntaxBaseContext );
		String result = getResult( "issue245.html", ResultMode.HTML );
		assertEquals( clean( issue245Result ), clean( result ) );
	}

	@Test
	public void issue245a() {
		localise( syntaxBaseContext );
		String result = getResult( "issue245a.html", ResultMode.HTML );
		assertEquals( clean( issue245aResult ), clean( result ) );
	}

	@Test
	public void issue245b() {
		localise( syntaxBaseContext );
		String result = getResult( "issue245b.html", ResultMode.HTML );
		assertEquals( clean( issue245bResult ), clean( result ) );
	}

	private Context getSyntax01Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();

//	   	    ["bd1", new PCDate('2008-04-23')],
//	   	    ["pet",				"#{ 'id': '23pet1', 'name': 'Tiddles', 'type': { 'name': 'Cat' }, 'owner': #smith1, 'birthDate': #bd1 }"]	       	    
		
		
		Map< String, Object > petVar = new LinkedHashMap< String, Object >();
		//'2008-04-23'
		PCDate petVarBirthDate = new PCDate( new GregorianCalendar(2008, Calendar.APRIL, 23) );
		petVar.put("birthDate", petVarBirthDate);
		variables.put( "pet", petVar );

		variables.put( "#lists.isEmpty(allSeedStarters)", false );

		return syntaxBaseContext.copy().setVariables( variables );
	}		
	
	private Context syntax01Context = getSyntax01Context();	
	
	@Test
	public void syntax01() {
		localise( syntax01Context );
		String result = getResult( "syntax01.html", ResultMode.HTML );
		assertEquals( clean( syntax01Result ), clean( result ) );
	}

/*	@Test
	public void replace02() {
		localise("tests21/replace/");
		String result = getResult( "replace02.html", ResultMode.HTML );
		assertEquals( clean( replace02Result ), clean( result ) );
	}

	@Test
	public void replace03() {
		localise("tests21/replace/");
		String result = getResult( "replace03.html", ResultMode.HTML );
		assertEquals( clean( replace03Result ), clean( result ) );
	}

	@Test
	public void replace04() {
		localise("tests21/replace/");
		String result = getResult( "replace04.html", ResultMode.HTML );
		assertEquals( clean( replace04Result ), clean( result ) );
	}

	@Test
	public void replace05() {
		localise("tests21/replace/");
		String result = getResult( "replace05.html", ResultMode.HTML );
		assertEquals( clean( replace05Result ), clean( result ) );
	}

	@Test
	public void replace05a() {
		localise("tests21/replace/");
		String result = getResult( "replace05a.html", ResultMode.HTML );
		assertEquals( clean( replace05Result ), clean( result ) );
	}
*/
/*
	@Test
	public void replace06() {
		localise("tests/replace/");
		String result = getResult( "replace06.html", ResultMode.HTML );
		assertEquals( clean( replace06Result ), clean( result ) );
	}

	@Test
	public void replace07() {
		localise("tests/replace/");
		String result = getResult( "replace07.html", ResultMode.HTML );
		assertEquals( clean( replace07Result ), clean( result ) );
	}
*/
}
