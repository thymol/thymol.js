package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class RemoveCases extends SeleniumCases {

	Context removeBaseContext = new Context( "tests/remove/" );
	
	String remove01Result = 
			"\n\n" +
			"<span>Hi there!</span>\n" +
			"\n\n\n";

	String remove02Result = 
			"\n"+
			"<div></div>\n"+
			"<div></div>\n"+
			"\n";

	String remove03Result = 
			"\n<div>\n"+
			"<span>Hi there!</span>\n\n"+
			"</div>\n"+
			"<div>\n"+
			"<span>Hi there!</span>\n"+
			"\n \n\n"+
			"</div>\n"+
			"<div>\n"+
			"<span>Hi there!</span>\n\n"+
			"</div>\n"+
			"\n";

	String remove04Result = 
			"\n"+
			"<div>\n"+
			"Some text here that will not be removed because it is not an element, and\n"+
			"only elements will be removed!.\n"+
			"<!-- And we can even have a comment! -->\n"+
			"<span>Hi there!</span>\n"+
			"<!-- This one goes after, but it is not an element so it won't be removed! -->\n"+
			"and some text here!\n"+
			"</div>\n"+
			"<div>\n"+
			"Some text here that will not be removed because it is not an element, and \n"+
			"only elements will be removed!.\n"+
			"<!-- And we can even have a comment! -->\n"+
			"<span>Hi there!</span>\n"+
			"<!-- This one goes after, but it is not an element so it won't be removed! -->\n"+
			" and some text here!\n"+
			"</div>\n\n";

	String remove05Result = 
			"\n"+
			"<div>\n"+
			"<!-- This will be a bit weird because only the bold text will be removed\n"+
			"(it is the only element) -->\n"+
			"Some text here and counting: <b>one</b>, , three\n"+
			"</div>\n"+
			"\n";

	String remove06Result = 		
			"\n\n"+
			"<span>Nothing before this!</span>\n"+
			"\n";

	public Context getRemoveContext() {
		
		JsonObject< String, Object > variables = new JsonObject<String,Object>();

		Map< String, String > testVar = new LinkedHashMap< String, String >();
		testVar.put( "text", "Hi there!" );
		variables.put( "test", testVar );

		Map< String, String > pricesVar = new LinkedHashMap< String, String >();
		pricesVar.put( "euros", "9" );
		pricesVar.put( "dollars", "12" );
		Map< String, Object > productVar = new LinkedHashMap< String, Object >();
		productVar.put( "name", "Lettuce" );
		productVar.put( "prices", pricesVar );
		variables.put( "product", productVar );
		
		return removeBaseContext.copy().setVariables( variables );		
	}	
	
	private Context removeContext = getRemoveContext();

	
	@Test
	public void remove01() {
		localise( removeContext );
		String result = getResult( "remove01.html", ResultMode.HTML );
		assertEquals( clean(remove01Result), clean(result) );
	}

	@Test
	public void remove02() {
		localise( removeContext );
		String result = getResult( "remove02.html", ResultMode.HTML );
		assertEquals( remove02Result, result );
	}

	@Test
	public void remove03() {
		localise( removeContext );
		String result = getResult( "remove03.html", ResultMode.HTML );
		assertEquals( remove03Result, result );
	}

	@Test
	public void remove04() {
		localise( removeContext );
		String result = getResult( "remove04.html", ResultMode.HTML );
		assertEquals( remove04Result, result );
	}

	@Test
	public void remove05() {
		localise( removeContext );
		String result = getResult( "remove05.html", ResultMode.HTML );
		assertEquals( remove05Result, result );
	}

	@Test
	public void remove06() {
		localise( removeContext );
		String result = getResult( "remove06.html", ResultMode.HTML );
		assertEquals( remove06Result, result );
	}

}