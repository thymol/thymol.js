package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class RefCases extends SeleniumCases {

	Context refsBaseContext = new Context( "refs/" );
	
	String ref01Result =
			"\n" +
			"Text before\n" +
			"<div>Is Equal 1</div>\n" +
			"<div>Is Equal 2</div>\n" +
			"<div>Is Equal 3</div>\n" +
			"<div>Is Equal 4</div>\n" +
			"<div>Is Equal 4a</div>\n" +
			"<div>Is Equal 4b</div>\n" +
			"<div>Is Equal 5</div>\n" +
			"<div>Is Equal 5a</div>\n" +
			"Text after \n" +
			"\n\n\n\n\n";
 		
	String ref02Result =
			"\n" +
			"Text before\n" +
			"<div>1</div>\n" +
			"<div>Pineapple</div>\n" +
			"Text after \n" +
			"\n\n\n\n\n";
 	
	String ref03Result =
			"\n" +
			"Text before\n" +
			"<div>Peach</div>\n" +
			"<div>Celery</div>\n" +
			"<div>Pineapple</div>\n" +
			"<div>Peach</div>\n" +
			"<div>Apricot</div>\n" +
			"Text after \n" +
			"\n\n\n\n\n";
 	
	
	public Context getRefsContext() {
		
		JsonObject< String, Object > variables = new JsonObject<String,Object>();

		Map< String, Object > fatherVar = new LinkedHashMap< String, Object >();
		fatherVar.put("name", "Joe");
		Map< String, Object > personVar = new LinkedHashMap< String, Object >();
		personVar.put( "father", fatherVar );
		variables.put( "person", personVar );
		
		List< Object > products = new LinkedList< Object >();
		Map< String, Object > product1Var = new LinkedHashMap< String, Object >();
		product1Var.put("name", "Lettuce");
		product1Var.put("price", "12");
		products.add(product1Var);
		Map< String, Object > product2Var = new LinkedHashMap< String, Object >();
		product2Var.put("name", "Apricot");
		product2Var.put("price", "8");
		products.add(product2Var);		
		variables.put( "product2", product2Var );				
		
		Map< String, Object > product3Var = new LinkedHashMap< String, Object >();
		product3Var.put("name", "Thyme");
		product3Var.put("price", "1.23");
		products.add(product3Var);
		Map< String, Object > product4Var = new LinkedHashMap< String, Object >();
		product4Var.put("name", "Carrot");
		product4Var.put("price", "2");
		products.add(product4Var);
		variables.put( "products", products );		
		
		Map< String, Object > product5Var = new LinkedHashMap< String, Object >();
		product5Var.put("name", "Cucumber");
		product5Var.put("price", "1.0");

		Map< String, Object > product6Var = new LinkedHashMap< String, Object >();
		product6Var.put("name", "Melon");
		product6Var.put("price", "6.0");

		Map< String, Object > product7Var = new LinkedHashMap< String, Object >();
		product7Var.put("name", "Beetroot");
		product7Var.put("price", "1.45");

		Map< String, Object > product8Var = new LinkedHashMap< String, Object >();
		product8Var.put("name", "Peach");
		product8Var.put("price", "0.75");

		Map< String, Object > product9Var = new LinkedHashMap< String, Object >();
		product9Var.put("name", "Celery");
		product9Var.put("price", "2.0");

		Map< String, Object > product10Var = new LinkedHashMap< String, Object >();
		product10Var.put("name", "Pineapple");
		product10Var.put("price", "28.0");

		List< Object > productList2 = new LinkedList< Object >(products);
		productList2.add(product5Var);
		productList2.add(product6Var);
		productList2.add(product7Var);
		productList2.add(product8Var);
		productList2.add(product9Var);
		productList2.add(product10Var);
		
		variables.put( "productList2", productList2 );		
		
		variables.put( "v1", new Integer(3) );		
		
		Integer[] numListArray = {5, 3, 9, 4, 1, 6, 2, 10, 8, 7};
		List< Integer > numList = Arrays.asList( numListArray );
		variables.put( "numList", numList );		
				
		return refsBaseContext.copy().setVariables( variables );		
	}	
	
	Context refsContext = getRefsContext();
	
	@Test
	public void ref01() {
		localise( refsContext );
		String result = getResult( "ref01.html", ResultMode.HTML );
		assertEquals( clean(ref01Result), clean(result) );
	}

	@Test
	public void ref02() {
		localise( refsContext );
		String result = getResult( "ref02.html", ResultMode.HTML );
		assertEquals( clean(ref02Result), clean(result) );
	}

	@Test
	public void ref03() {
		localise( refsContext );
		String result = getResult( "ref03.html", ResultMode.HTML );
		assertEquals( clean(ref03Result), clean(result) );
	}

}
