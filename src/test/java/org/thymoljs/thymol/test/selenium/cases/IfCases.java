package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class IfCases extends SeleniumCases {

	Context ifBaseContext = new Context( "tests/if/" );
	
	String if01Result =
			"\n" +
			"Text before\n\n\n\n" +
			"<div> \n" +
			"    Or equal\n" +
			"</div>\n" +
			"<div> \n" +
			"    Or equal\n" +
			"</div>\n" +
			"<div> \n" +
			"    Or equal\n" +
			"</div>\n" +
			"Text after \n\n\n";
	
	String if02Result = 					
			"\n" +
			"Text before\n\n\n\n" +
			"<div> \n" +
			"    Second value\n" +
			"</div>\n\n" +
			"Text after \n\n\n";

	String if03Result = 					
			"\n" +
			"Text before\n\n\n\n" +
			"<div> \n" +
			"    Second value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Third value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Fourth value\n" +
			"</div>\n\n" +
			"Text after \n\n\n\n";

	String if04Result = 					
			" \n" +
			"Text before\n\n" +
			"<div> \n" +
			"    First value\n" +
			"</div>\n\n\n\n" +
			"<div> \n" +
			"    Third value\n" +
			"</div>\n\n\n\n" +
			"<div> \n" +
			"    Fifth value\n" +
			"</div>\n\n\n\n" +
			"Text after \n\n\n";

	String if05Result = 					
			"\n" +
			"Text before\n\n" +
			"<div> \n" +
			"    First value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Second value\n" +
			"</div>\n\n\n\n\n\n" +
			"<div> \n" +
			"    Fifth value\n" +
			"</div>\n\n" +
			"Text after \n\n\n";
	
	String if06Result = 					
			"\n" +
			"Text before\n\n" +
			"<div> \n" +
			"    First value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Second value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Third value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Fourth value\n" +
			"</div>\n\n" +
			"Text after \n\n\n";
	
	String if07Result = 					
			"\n" +
			"Text before\n\n" +
			"<div> \n" +
			"    First value\n" +
			"</div>\n\n\n\n" +
			"Text after \n\n\n";
	
	String if08Result = 					
			"\n" +
			"Text before\n\n\n\n" +
			" \n" +
			"    Or equal 01\n\n" +
			"<div></div>\n\n" +
			"Text after\n\n\n";

 	
	
	
	private Context getIfContext() {

		JsonObject< String, Object > variables = new JsonObject< String, Object >();
				
		Map< String, Object > userVar = new LinkedHashMap< String, Object >();
		userVar.put( "name", "Jack Melon" );
		userVar.put( "role", "finance" );
		userVar.put( "age", Integer.valueOf(24) );
		variables.put( "user", userVar );

		Map< String, String > subscribeVar = new LinkedHashMap< String, String >();
		variables.put( "subscribe", subscribeVar );

		variables.put( "identifier", new Integer(32) );

		variables.put( "sel", Boolean.TRUE );

		variables.put( "value01", Boolean.FALSE );
		variables.put( "value02", Boolean.TRUE );
		variables.put( "value03", Integer.valueOf(0) );
		variables.put( "value04", Integer.valueOf(1) );
		variables.put( "value05", Integer.valueOf(-1) );
		variables.put( "value06", Integer.valueOf(2) );
		variables.put( "value07", "true" );
		variables.put( "value08", "false" );
		variables.put( "value09", "yes" );
		variables.put( "value10", "no" );
		variables.put( "value11", "YES" );
		variables.put( "value12", "NO" );
		variables.put( "value13", "YeS" );
		variables.put( "value14", "YeS" );
		variables.put( "value15", "No" );
		variables.put( "value16", "nO" );
		variables.put( "value17", "whatever" );
		variables.put( "value18", "Y" );
		variables.put( "value19", "N" );
		variables.put( "value20", "T" );
		variables.put( "value21", "F" );
		variables.put( "value22", new Object() );
		variables.put( "value23", null );
		
		return ifBaseContext.copy().setVariables( variables );

	}
	
	private Context ifContext = getIfContext();
	
	
	@Test
	public void if01() {
		localise( ifContext );
		String result = getResult( "if01.html", ResultMode.HTML );
		assertEquals( clean( if01Result ), clean( result ) );
	}

	@Test
	public void if02() {
		localise( ifContext );
		String result = getResult( "if02.html", ResultMode.HTML );
		assertEquals( clean( if02Result ), clean( result ) );
	}

	@Test
	public void if03() {
		localise( ifContext );
		String result = getResult( "if03.html", ResultMode.HTML );
		assertEquals( clean( if03Result ), clean( result ) );
	}

	@Test
	public void if04() {
		localise( ifContext );
		String result = getResult( "if04.html", ResultMode.HTML );
		assertEquals( clean( if04Result ), clean( result ) );
	}

	@Test
	public void if05() {
		localise( ifContext );
		String result = getResult( "if05.html", ResultMode.HTML );
		assertEquals( clean( if05Result ), clean( result ) );
	}

	@Test
	public void if06() {
		localise( ifContext );
		String result = getResult( "if06.html", ResultMode.HTML );
		assertEquals( clean( if06Result ), clean( result ) );
	}

	@Test
	public void if07() {
		localise( ifContext );
		String result = getResult( "if07.html", ResultMode.HTML );
		assertEquals( clean( if07Result ), clean( result ) );
	}

	@Test
	public void if08() {
		localise( ifContext );
		String result = getResult( "if08.html", ResultMode.HTML );
		assertEquals( clean( if08Result ), clean( result ) );
	}

}
