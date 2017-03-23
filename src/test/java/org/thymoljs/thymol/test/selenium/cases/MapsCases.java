package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class MapsCases extends SeleniumCases {
	
	Context mapsBaseContext = new Context( "thymol/maps/" );
	
	String maps01Result = 
			"\n" +
			"\t\t<p>size of tm1: 4</p>\n" +
			"\t\n" +
			"\n\n\n";
					
	String maps02ResultThymol = 
			"#maps.size Cannot get size of non-map type \"object\"" +
	        "Error in: target/test-classes/templates/thymol/maps/maps02.html at line: 10 column: 2 (2tabs)";

	String maps02ResultNode = 
			"#maps.size Cannot get size of non-map type \"object\"" +
	        "Error in: thymol/maps/maps02.html at line: 10 column: 2 (2tabs)";

	String maps02ResultThymeleaf =			
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /maps02.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Exception evaluating OGNL expression: \"#maps.size(tm2)\" (maps02:10)\n";		
	
	String maps03Result = 
			"\n" +
			"\t\t<p>size of tm3: 4</p>\n" +
			"\t\n" +
			"\n\n\n";

	String maps04ResultThymol = 
			"#maps.size Cannot get size of non-map type \"object\"" +
            "Error in: target/test-classes/templates/thymol/maps/maps04.html at line: 10 column: 2 (2tabs)";
		
	String maps04ResultNode = 
			"#maps.size Cannot get size of non-map type \"object\"" +
            "Error in: thymol/maps/maps04.html at line: 10 column: 2 (2tabs)";
		
	String maps04ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /maps04.html. Reason:\n" +
			"</p><pre>    Server Error</pre><p></p><h3>Caused by:</h3><pre>org.thymeleaf.exceptions.TemplateProcessingException: Exception evaluating OGNL expression: \"#maps.size(tm4)\" (maps04:10)\n";

	String maps05Result = 
			"\n" +
			"\t\t<p>isEmpty for tm3: false</p>\n" +
			"\t\t<p>isEmpty for tm5: true</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String maps06Result = 
			"\n" +
			"\t\t<p>containsKey(ar1) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar2) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar3) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar4) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar5) for tm3: false</p>\n" +
			"\t\n" +
			"\n\n\n";
	
	String maps07Result = 
			"\n" +
			"\t\t<p>containsValue(ar1) for tm3: true</p>\n" +
			"\t\t<p>containsValue(ar2) for tm3: true</p>\n" +
			"\t\t<p>containsValue(ar3) for tm3: false</p>\n" +
			"\t\t<p>containsValue(ar4) for tm3: false</p>\n" +
			"\t\t<p>containsValue(ar5) for tm3: false</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String maps08Result = 
			"\n" +
			"\t\t<p>containsAllKeys(ka1) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ks1) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ka2) for tm1: false</p>\n" +
			"\t\t<p>containsAllKeys(ks2) for tm1: false</p>\n" +
			"\t\t<p>containsAllKeys(ka3) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ks3) for tm1: true</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String maps09Result = 
			"\n" +
			"\t\t<p>containsAllValues(va1) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(vs1) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(va2) for tm1: false</p>\n" +
			"\t\t<p>containsAllValues(vs2) for tm1: false</p>\n" +
			"\t\t<p>containsAllValues(va3) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(vs3) for tm1: true</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	private Context getMapsContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
				
		
		Integer[] ar1 = { new Integer(1), new Integer(3), new Integer(57), new Integer(99) };
//		int[] ar1 = { 1, 3, 57, 99 };
//		Arrays.sort( ar1 );

		Double[] ar2 = { new Double(1.1), new Double(3.3), new Double(57.57), new Double(99.99) };
//		Arrays.sort( ar2 );
		String[] ar3 = { "1", "3", "57", "99" };
		Arrays.sort( ar3 );
		String[] ar4 = { new String("1"), new String("3"), new String("57"), new String("99") };
		Arrays.sort( ar4 );
		String[] ar5 = { "one", "three", "fifty-seven", "ninety-nine" };
		Arrays.sort( ar5 );
		
		variables.put( "ar1", ar1 );
		variables.put( "ar2", ar2 );
		variables.put( "ar3", ar3 );
		variables.put( "ar4", ar4 );
		variables.put( "ar5", ar5 );			   	 	    
	    
		Map<String,Object[]> tm1 = new HashMap<String,Object[]>();
		tm1.put("ar1",ar1);
		tm1.put("ar2",ar2);
		tm1.put("ar3",ar3);
		tm1.put("ar4",ar4);
		
		variables.put( "tm1", tm1 );
		
		String[] ka1 = {"ar1","ar2","ar3","ar4"};
		variables.put( "ka1", ka1 );
	    
		Object[] va1 = {ar1,ar2,ar3,ar4};
		variables.put( "va1", va1 );
	    
		Set< String > ks1 = new HashSet< String >();
		ks1.add("ar1");
		ks1.add("ar2");
		ks1.add("ar3");
		ks1.add("ar4");
		variables.put( "ks1", ks1 );
	    
		Set< Object[] > vs1 = new HashSet< Object[] >();
		vs1.add(ar1);
		vs1.add(ar2);
		vs1.add(ar3);
		vs1.add(ar4);
		variables.put( "vs1", vs1 );
	    
		String[] ka2 = {"ar1","ar2","ar3","ar4","ar5"};
		variables.put( "ka2", ka2 );
	   
		Object[] va2 = {ar1,ar2,ar3,ar4,ar5};
		variables.put( "va2", va2 );
		
		Set< String > ks2 = new HashSet< String >();
		ks2.add("ar1");
		ks2.add("ar2");
		ks2.add("ar3");
		ks2.add("ar4");
		ks2.add("ar5");
		variables.put( "ks2", ks2 );
	    
		Set< Object[] > vs2 = new HashSet< Object[] >();
		vs2.add(ar1);
		vs2.add(ar2);
		vs2.add(ar3);
		vs2.add(ar4);
		vs2.add(ar5);
		variables.put( "vs2", vs2 );
	    
		String[] ka3 = {"ar1","ar2","ar3"};
		variables.put( "ka3", ka3 );
	    
		Object[] va3 = {ar1,ar2,ar3};
		variables.put( "va3", va3 );
	    
		Set< String > ks3 = new HashSet< String >();
		ks3.add("ar1");
		ks3.add("ar2");
		ks3.add("ar3");
		variables.put( "ks3", ks3 );
	    
		Set< Object[] > vs3 = new HashSet< Object[] >();
		vs3.add(ar1);
		vs3.add(ar2);
		vs3.add(ar3);
		variables.put( "vs3", vs3 );
	    
		Set< Object[] > tm2 = new HashSet< Object[] >();
		tm2.add(ar1);
		tm2.add(ar2);
		tm2.add(ar3);
		tm2.add(ar4);
		
		variables.put( "tm2", tm2 );
	    
		Map<String,Object[]> tm3 = new HashMap<String,Object[]>();
		tm3.put("ar1",ar1);
		tm3.put("ar2",ar2);
		tm3.put("ar3",ar1);
		tm3.put("ar4",null);
		
		variables.put( "tm3", tm3 );

		Object tm4 = new Object();
//		Map<String,Object[]> tm4m = new HashMap<String,Object[]>();
//		tm4m.put( "ar1", ar1 );
//		tm4m.put( "ar2", ar2 );
//		tm4m.put( "ar3", ar3 );
//		tm4m.put( "ar4", ar4 );
//		tm4 = tm4m;
		
		variables.put( "tm4", tm4 );
		
		Map<String,Object[]> tm5 = new HashMap<String,Object[]>();
		variables.put( "tm5", tm5 );
			
		return mapsBaseContext.copy().setVariables( variables );
		
	}
	
	private Context mapsContext = getMapsContext();

	
	@Test
	public void maps01() {
		localise( mapsContext );
		String result = getResult( "maps01.html", ResultMode.HTML );
		assertEquals( clean( maps01Result ), clean( result ) );
	}

	@Test
	public void maps02() {
		localise( mapsContext );
		String result = getResult( "maps02.html", ResultMode.ALERT );
		if( expectThymolResult() ) {
			assertEquals( maps02ResultThymol, clean( result ) );			
		}
		else if( expectNodeResult() ) {
			assertEquals( maps02ResultNode, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( maps02ResultThymeleaf, subs );			
		}
	}

	@Test
	public void maps03() {
		localise( mapsContext );
		String result = getResult( "maps03.html", ResultMode.HTML );
		assertEquals( clean( maps03Result ), clean( result ) );
	}

	@Test
	public void maps04() {
		localise( mapsContext );
		String result = getResult( "maps04.html", ResultMode.ALERT );
		if( expectThymolResult() ) {
			assertEquals( maps04ResultThymol, clean( result ) );			
		}
		else if( expectNodeResult() ) {
			assertEquals( maps04ResultNode, clean( result ) );			
		}
		else {			
			String subs = result.substring( 0, result.indexOf( "\tat" ) );
			assertEquals( maps04ResultThymeleaf, subs );			
		}
	}

	@Test
	public void maps05() {
		localise( mapsContext );
		String result = getResult( "maps05.html", ResultMode.HTML );		
		assertEquals( clean( maps05Result ), clean( result ) );
	}

	@Test
	public void maps06() {
		localise( mapsContext );
		String result = getResult( "maps06.html", ResultMode.HTML );		
		assertEquals( clean( maps06Result ), clean( result ) );
	}

	@Test
	public void maps07() {
		localise( mapsContext );
		String result = getResult( "maps07.html", ResultMode.HTML );		
		assertEquals( clean( maps07Result ), clean( result ) );
	}

	@Test
	public void maps08() {
		localise( mapsContext );
		String result = getResult( "maps08.html", ResultMode.HTML );		
		assertEquals( clean( maps08Result ), clean( result ) );
	}

	@Test
	public void maps09() {
		localise( mapsContext );
		String result = getResult( "maps09.html", ResultMode.HTML );		
		assertEquals( clean( maps09Result ), clean( result ) );
	}

}
