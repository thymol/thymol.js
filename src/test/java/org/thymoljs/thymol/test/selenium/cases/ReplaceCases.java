package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

import org.junit.Test;

public class ReplaceCases extends SeleniumCases {

	Context replaceBaseContext = new Context( "tests/replace/" );
	
	String replace01Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"        <td></td>\n" +
			"        <td></td>\n" +
			"    </tr></tbody></table>\n" +
			"\n\n";
 	
	String replace02Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"        <td></td>\n" +
			"        <td></td>\n" +
			"    </tr></tbody></table>\n" +
			"\n\n";
 	
	String replace03Result =
			"\n" +
			"<table>\n" +
			"  <tbody class=\"t\">\n" +
			"  <tr class=\"my-class\">\n" +
			"      <td></td>\n" +
			"      <td></td>\n" +
			"  </tr>\n" +
			"</tbody></table>\n" +
			"\n\n";
 	
	String replace04Result =
			"\n\n" +
			"<div>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</div>\n" +
			"\n\n\n";
 	
	String replace05Result =
			"\n\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</p>\n" +
			"\n\n\n";
 	
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
 	
	public Context getReplaceContext() {
		
		JsonObject< String, Object > variables = new JsonObject<String,Object>();

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
		
		return replaceBaseContext.copy().setVariables( variables );		
	}	
	
	private Context replaceContext = getReplaceContext();
	
	@Test
	public void replace01() {
		localise( replaceContext );
		String result = getResult( "replace01.html", ResultMode.HTML );
		assertEquals( clean( replace01Result ), clean( result ) );
	}

	@Test
	public void replace02() {
		localise( replaceContext );
		String result = getResult( "replace02.html", ResultMode.HTML );
		assertEquals( clean( replace02Result ), clean( result ) );
	}

//	@Test
//	public void replace03() {
//		localise( replaceContext );
//		String result = getResult( "replace03.html", ResultMode.HTML );
//		assertEquals( clean( replace03Result ), clean( result ) );
//	}

	@Test
	public void replace04() {
		localise( replaceContext );
		String result = getResult( "replace04.html", ResultMode.HTML );
		assertEquals( clean( replace04Result ), clean( result ) );
	}

	@Test
	public void replace05() {
		localise( replaceContext );
		String result = getResult( "replace05.html", ResultMode.HTML );
		assertEquals( clean( replace05Result ), clean( result ) );
	}

	@Test
	public void replace06() {
		localise( replaceContext );
		String result = getResult( "replace06.html", ResultMode.HTML );
		assertEquals( clean( replace06Result ), clean( result ) );
	}

	@Test
	public void replace07() {
		localise( replaceContext );
		String result = getResult( "replace07.html", ResultMode.HTML );
		assertEquals( clean( replace07Result ), clean( result ) );
	}

}
