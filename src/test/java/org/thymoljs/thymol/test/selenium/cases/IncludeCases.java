package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class IncludeCases extends SeleniumCases {

	Context includeBaseContext = new Context( "tests/include/" );
	
	String include01Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"        <td>Lettuce</td>\n" +
			"        <td>12</td>\n" +
			"    </tr><tr>\n" +
			"        <td>Apricot</td>\n" +
			"        <td>8</td>\n" +
			"    </tr></tbody></table>\n" +
			"\n\n";
 	
	String include02Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"        <td>Lettuce</td>\n" +
			"        <td>12</td>\n" +
			"    </tr><tr>\n" +
			"        <td>Apricot</td>\n" +
			"        <td>8</td>\n" +
			"    </tr></tbody></table>\n" +
			"\n\n";
	
	String include03Result =
			"\n" +
			"<table>\n" +
			"  <tbody>\n" +
			"  <tr class=\"my-class\">\n" +
			"      <td>Lettuce</td>\n" +
			"      <td>12</td>\n" +
			"  </tr>\n" +
			"\n" +
			"  <tr class=\"my-class\">\n" +
			"      <td>Apricot</td>\n" +
			"      <td>8</td>\n" +
			"  </tr>\n" +
			"</tbody></table>\n" +
			"\n\n";
 	
	String include04Result =
			"\n" +
			"<div class=\"one\">\n" +
			"<div>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</div>\n" +
			"</div>\n" +
			"\n\n";
 	
	String include05Result =
			"\n" +
			"\n" +
			"<div>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</div>\n" +
			"\n\n\n";
 	
	String include06Result =
			"\n" +
			"<div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</p>\n" +
			"</div>\n" +
			"\n\n";
 	
	String include07Result =
			"\n" +
			"<div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (1)</span>.\n" +
			"</p>\n" +
			"</div>\n" +
			"\n\n" +
			"<div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (2)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (3)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (4)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (5)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (6)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (7)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (8)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (9)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (10)</span>.\n" +
			"</p>\n" +
			"</div>";
 	
	private Context getIncludeContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
				
		Map< String, Object > product1Var = new LinkedHashMap< String, Object >();
		product1Var.put("name", "Lettuce");
		product1Var.put("price", "12");		
		variables.put( "product1", product1Var );				

		Map< String, Object > product2Var = new LinkedHashMap< String, Object >();
		product2Var.put("name", "Apricot");
		product2Var.put("price", "8");
		variables.put( "product2", product2Var );				

		List< Object > productList = new LinkedList< Object >();
		productList.add(product1Var);
		productList.add(product2Var);
		variables.put( "productList", productList );		

		variables.put( "atext", "Lorem ipsum blah blah" );		
	
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

}
