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

public class EachCases extends SeleniumCases {

	Context eachBaseContext = new Context( "tests/each/" );
	
	String each01Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"  </tr>\n<tr>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"  </tr><tr>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"  </tr><tr>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";
 	
	String each02Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>0</td>\n" +
			"    <td>1</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"  </tr>\n<tr>\n" +
			"    <td>1</td>\n" +
			"    <td>2</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"  </tr><tr>\n" +
			"    <td>2</td>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"  </tr><tr>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";
 	
	String each03Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>0</td>\n" +
			"    <td>1</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"  </tr>\n<tr>\n" +
			"    <td>1</td>\n" +
			"    <td>2</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"  </tr><tr>\n" +
			"    <td>2</td>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"  </tr><tr>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";
  	
	String each04Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>0</td>\n" +
			"    <td>1</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"  </tr>\n<tr>\n" +
			"    <td>1</td>\n" +
			"    <td>2</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"  </tr><tr>\n" +
			"    <td>2</td>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"  </tr><tr>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";
 	
	String each05Result =
			"\n" +
			"<div>\n" +
			"  <span>Galicia</span> : <span>Santiago de Compostela</span>\n" +
			"</div>\n" +
			"\n\n" +
			"<div>\n" +
			"  <span>Asturias</span> : <span>Oviedo</span>\n" +
			"</div><div>\n" +
			"  <span>Cantabria</span> : <span>Santander</span>\n" +
			"</div>";
 	
	private Context getEachContext() {

		JsonObject< String, Object > variables = new JsonObject< String, Object >();
				
		List< Object > products = new LinkedList< Object >();
		Map< String, Object > product1Var = new LinkedHashMap< String, Object >();
		product1Var.put("name", "Lettuce");
		product1Var.put("price", "12");
		products.add(product1Var);
		Map< String, Object > product2Var = new LinkedHashMap< String, Object >();
		product2Var.put("name", "Apricot");
		product2Var.put("price", "8");
		products.add(product2Var);
		Map< String, Object > product3Var = new LinkedHashMap< String, Object >();
		product3Var.put("name", "Thyme");
		product3Var.put("price", "1.23");
		products.add(product3Var);
		Map< String, Object > product4Var = new LinkedHashMap< String, Object >();
		product4Var.put("name", "Carrot");
		product4Var.put("price", "2");
		products.add(product4Var);
		variables.put( "products", products );		
		
		Map< String, String > capitals = new LinkedHashMap< String, String >();
		capitals.put("Galicia", "Santiago de Compostela" );
		capitals.put("Asturias", "Oviedo" );
		capitals.put("Cantabria", "Santander" );
		variables.put( "capitals", capitals );
		
		
		return eachBaseContext.copy().setVariables( variables );

	}
	
	private Context eachContext = getEachContext();
	
	@Test
	public void each01() {
		localise( eachContext );
		String result = getResult( "each01.html", ResultMode.HTML );
		assertEquals( clean(each01Result), clean(result) );
	}

	@Test
	public void each02() {
		localise( eachContext );
		String result = getResult( "each02.html", ResultMode.HTML );
		assertEquals( clean(each02Result), clean(result) );
	}

	@Test
	public void each03() {
		localise( eachContext );
		String result = getResult( "each03.html", ResultMode.HTML );
		assertEquals( clean(each03Result), clean(result) );
	}

	@Test
	public void each04() {
		localise( eachContext );
		String result = getResult( "each04.html", ResultMode.HTML );
		assertEquals( clean(each04Result), clean(result) );
	}

	@Test
	public void each05() {
		localise( eachContext );
		String result = getResult( "each05.html", ResultMode.HTML );
		assertEquals( clean(each05Result), clean(result) );
	}

}
