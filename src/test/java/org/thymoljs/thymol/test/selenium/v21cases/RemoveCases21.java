package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class RemoveCases21 extends SeleniumCases {

    Context removeBaseContext = new Context( "tests21/remove/" );
	
	String remove01Result =
			"\n" +
			"\n    <span>Hi there!</span> \n" +
			" \n" +
			"\n\n";
		
	String remove02Result =
			"\n" +
			"<div></div> \n" +
			"\n\n";		
	
	String remove03Result =
			"\n" +
			"\n" +
			"    <span>Hi there!</span> \n" +
			" \n" +
			"\n\n";	 			

	String remove04Result =
			"\n" +
			"...\n" +
			"<link>\n" +
			"...\n" +
			"\n\n";

	String remove05Result =
			"\n" +
			"<div>\n" +
			"    <span>Hi there!</span> \n" +
			"</div> \n" +
			"\n\n";	 			

	private Context getRemoveContext() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();

		Map< String, Object > testVar = new LinkedHashMap< String, Object >();
		testVar.put("text", "Hi there!");
		variables.put( "test", testVar );				
		variables.put( "condition", true );
		variables.put( "not_condition", false );
		variables.put( "network", "IPTV" );

		return removeBaseContext.copy().setVariables( variables );
	}
	
	private Context removeContext = getRemoveContext(); 
	
	@Test
	public void remove01() {
		localise( removeContext );
		String result = getResult( "remove01.html", ResultMode.HTML );
		assertEquals( clean( remove01Result ), clean( result ) );
	}

	@Test
	public void remove02() {
		localise( removeContext );
		String result = getResult( "remove02.html", ResultMode.HTML );
		assertEquals( clean( remove02Result ), clean( result ) );
	}

	@Test
	public void remove03() {
		localise( removeContext );
		String result = getResult( "remove03.html", ResultMode.HTML );
		assertEquals( clean( remove03Result ), clean( result ) );
	}

	@Test
	public void remove04() {
		localise( removeContext );
		String result = getResult( "remove04.html", ResultMode.HTML );
		assertEquals( clean( remove04Result ), clean( result ) );
	}

	@Test
	public void remove05() {
		localise( removeContext );
		String result = getResult( "remove05.html", ResultMode.HTML );
		assertEquals( clean( remove05Result ), clean( result ) );
	}


}
