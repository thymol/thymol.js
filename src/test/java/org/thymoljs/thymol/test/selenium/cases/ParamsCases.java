package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class ParamsCases extends SeleniumCases {

	Context paramsBaseContext = new Context( "thymol/params/" );
	
	String params01Result = 
			"\n<p>9</p>\n" +
			"\n";
	
	@Test
	public void params01() {
		localise( paramsBaseContext );
		String result = getResult( "params01.html?euros=9", ResultMode.HTML );
		assertEquals( clean( params01Result ), clean( result ) );
	}

	private Context getParams02Context() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		Map< String, String > pricesVar = new LinkedHashMap< String, String >();
		pricesVar.put( "euros", "9" );
		pricesVar.put( "dollars", "12" );
		Map< String, Object > productVar = new LinkedHashMap< String, Object >();
		productVar.put( "name", "Lettuce" );
		productVar.put( "prices", pricesVar );
		variables.put( "product", productVar );
		variables.put( "p1", productVar );
		
		return paramsBaseContext.copy().setVariables( variables );
		
	}
	
	
	@Test
	public void params02() {
		localise( getParams02Context() );
		String result = getResult( "params02.html?product=%23p1", ResultMode.HTML );
		assertEquals( clean( params01Result ), clean( result ) );
	}

}
