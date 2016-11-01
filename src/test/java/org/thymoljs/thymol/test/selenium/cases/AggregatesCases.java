package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.List;
import java.util.TreeSet;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

import org.junit.Test;

public class AggregatesCases extends SeleniumCases {
	
	Context aggregatesBaseContext = new Context( "thymol/aggregates/" );
	
	String aggregates01Result = 
			"\n" +
			"\t\t<p>160.000</p>\n" +
			"\t\t<p>161.960</p>\n" +
			"\t\t<p>103.000</p>\n" +
			"\t\t<p>261.000</p>\n" +
			"\t\t<p>217.000</p>\n" +
			"\t\t<p>165.260</p>\n" +
			"\t\n" +
			"\n\n\n";
					
	String aggregates02ResultThymol = 
			"\n" +
			"\t\t<p>40.000</p>\n" +
			"\t\t<p>40.490</p>\n" +
			"\t\t<p>34.333</p>\n" +
			"\t\t<p>52.200</p>\n" +
			"\t\t<p>43.400</p>\n" +
			"\t\t<p>33.052</p>\n" +
			"\t\n" +
			"\n\n\n";

	String aggregates02ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /aggregates02.html. Reason:\n" +
			"</p><pre>    Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardTextAttrProcessor' (aggregates02:13)<";
		
	String aggregates03Result = 
			"\n" +
			"\t\t<p>160.000</p>\n" +
			"\t\t<p>161.960</p>\n" +
			"\t\t<p>103.000</p>\n" +
			"\t\t<p>261.000</p>\n" +
			"\t\t<p>160.000</p>\n" +
			"\t\t<p>161.960</p>\n" +
			"\t\n" +
			"\n\n\n";

	String aggregates04ResultThymol = 
			"\n" +
			"\t\t<p>40.000</p>\n" +
			"\t\t<p>40.490</p>\n" +
			"\t\t<p>34.333</p>\n" +
			"\t\t<p>52.200</p>\n" +
			"\t\t<p>40.000</p>\n" +
			"\t\t<p>40.490</p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String aggregates04ResultThymeleaf = 		
			"<h2>HTTP ERROR 500</h2>\n" +
			"<p>Problem accessing /aggregates04.html. Reason:\n" +
			"</p><pre>    Error during execution of processor 'org.thymeleaf.standard.processor.attr.StandardTextAttrProcessor' (aggregates04:13)<";

	/*	
\n\t\t<p>40</p>\n\t\t<p>40.489999999999995</p>\n\t\t<p>34.333333333333336</p>\n\t\t<p>52.2</p>\n\t\t<p>40</p>\n\t\t<p>40.489999999999995</p>\n\t\n\n\n\n
	*/	

	String aggregates05Result = 
			"\n" +
			"\t\t<p>isEmpty for tm3: false</p>\n" +
			"\t\t<p>isEmpty for tm5: true</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String aggregates06Result = 
			"\n" +
			"\t\t<p>containsKey(ar1) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar2) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar3) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar4) for tm3: true</p>\n" +
			"\t\t<p>containsKey(ar5) for tm3: false</p>\n" +
			"\t\n" +
			"\n\n\n";
	
	String aggregates07Result = 
			"\n" +
			"\t\t<p>containsValue(ar1) for tm3: true</p>\n" +
			"\t\t<p>containsValue(ar2) for tm3: true</p>\n" +
			"\t\t<p>containsValue(ar3) for tm3: false</p>\n" +
			"\t\t<p>containsValue(ar4) for tm3: false</p>\n" +
			"\t\t<p>containsValue(ar5) for tm3: false</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String aggregates08Result = 
			"\n" +
			"\t\t<p>containsAllKeys(ka1) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ks1) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ka2) for tm1: false</p>\n" +
			"\t\t<p>containsAllKeys(ks2) for tm1: false</p>\n" +
			"\t\t<p>containsAllKeys(ka3) for tm1: true</p>\n" +
			"\t\t<p>containsAllKeys(ks3) for tm1: true</p>\n" +
			"\t\n" +
			"\n\n\n";
				
	String aggregates09Result = 
			"\n" +
			"\t\t<p>containsAllValues(va1) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(vs1) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(va2) for tm1: false</p>\n" +
			"\t\t<p>containsAllValues(vs2) for tm1: false</p>\n" +
			"\t\t<p>containsAllValues(va3) for tm1: true</p>\n" +
			"\t\t<p>containsAllValues(vs3) for tm1: true</p>\n" +
			"\t\n" +
			"\n\n\n";
	
	
	private Context getAggregateVarsContext() {

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
		String[] ar6 = { new String("one"), new String("three"), new String("fifty-seven"), new String("ninety-nine") };
		Arrays.sort( ar6 );
		Boolean[] ar7 = { Boolean.FALSE, Boolean.TRUE, Boolean.FALSE, Boolean.TRUE };
		String[] ar8 = {};

		Integer[] ar9 = { 1, 3, 99 };
//		Arrays.sort( ar9 );
		Integer[] ar10 = { 1, 101, 3, 57, 99 };
//		Arrays.sort( ar10 );
		
		String[] ar11 = { "one", "three", "ninety-nine" };
		Arrays.sort( ar11 );
		String[] ar12 = { "one", "three", "fifty-seven", "ninety-nine", "one-hundred-and-one" };
		Arrays.sort( ar12 );
		
		Integer[] ar13 = { 1, 57, 3, 57, 99 };
		Arrays.sort( ar13 );
		Double[] ar14 = { new Double(1.1), new Double(3.3), new Double(57.57), new Double(3.3), new Double(99.99) };
		String[] ar15 = { "1", "99", "3", "57", "99" };
		Arrays.sort( ar15 );
		String[] ar16 = { new String("1"), new String("3"), new String("57"), new String("99"), new String("1") };
		Arrays.sort( ar16 );
		String[] ar17 = { "one", "three", "three", "three", "fifty-seven", "fifty-seven", "ninety-nine" };
		Arrays.sort( ar17 );
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "eValue1", 100.0 );
		variables.put( "eValue2", 37.397436 );
		
		variables.put( "ar1", ar1 );
		variables.put( "ar2", ar2 );
		variables.put( "ar3", ar3 );
		variables.put( "ar4", ar4 );
		variables.put( "ar5", ar5 );
		variables.put( "ar6", ar6 );
		variables.put( "ar7", ar7 );
		variables.put( "ar8", ar8 );
		
		variables.put( "ar9", ar9 );
		variables.put( "ar10", ar10 );
		variables.put( "ar11", ar11 );
		variables.put( "ar12", ar12 );

		variables.put( "ar13", ar13 );
		variables.put( "ar14", ar14 );
		variables.put( "ar15", ar15 );
		variables.put( "ar16", ar16 );
		variables.put( "ar17", ar17 );
		
		List<Integer> ar1List = Arrays.asList( ar1 );
		List<String> ar5List = Arrays.asList( ar5 );
		List<String> ar6List = Arrays.asList( ar6 );
		List<String> ar8List = Arrays.asList( ar8 );
		List<Integer> ar9List = Arrays.asList( ar9 );
		List<Integer> ar10List = Arrays.asList( ar10 );
		List<String> ar11List = Arrays.asList( ar11 );
		List<String> ar12List = Arrays.asList( ar12 );

		List<Integer> ar13List = Arrays.asList( ar13 );
		List<Double> ar14List = Arrays.asList( ar14 );
		List<String> ar15List = Arrays.asList( ar15 );
		List<String> ar16List = Arrays.asList( ar16 );
		List<String> ar17List = Arrays.asList( ar17 );
		
		variables.put( "ar1List", ar1List );	
		variables.put( "ar5List", ar5List );
		variables.put( "ar6List", ar6List );
		variables.put( "ar8List", ar8List );		
		variables.put( "ar9List", ar9List );
		variables.put( "ar10List", ar10List );
		variables.put( "ar11List", ar11List );
		variables.put( "ar12List", ar12List );

		variables.put( "ar13List", ar13List );	
		variables.put( "ar14List", ar14List );	
		variables.put( "ar15List", ar15List );	
		variables.put( "ar16List", ar16List );	
		variables.put( "ar17List", ar17List );	
		
	    variables.put( "as1", new TreeSet<Object>( ar1List ) );    
	    variables.put( "as2", new TreeSet<Object>( Arrays.asList( ar2 ) ) );    
	    variables.put( "as3", new TreeSet<Object>( Arrays.asList( ar3 ) ) );    
	    variables.put( "as4", new TreeSet<Object>( Arrays.asList( ar4 ) ) );    
	    variables.put( "as5", new TreeSet<Object>( ar5List ) );    
	    variables.put( "as6", new TreeSet<Object>( ar6List ) );    
	    variables.put( "as7", new TreeSet<Object>( Arrays.asList( ar7 ) ) );    
	    
	    variables.put( "as8", new TreeSet<Object>( Arrays.asList( ar8 ) ) );    	    
	    
	    variables.put( "as9", new TreeSet<Object>( ar9List ) );    
	    variables.put( "as10", new TreeSet<Object>( ar10List ) );    
	    variables.put( "as11", new TreeSet<Object>( ar11List ) );    
	    variables.put( "as12", new TreeSet<Object>( ar12List ) );    

	    variables.put( "as13", new TreeSet<Object>( ar13List ) );    
	    variables.put( "as14", new TreeSet<Object>( ar14List ) );    
	    variables.put( "as15", new TreeSet<Object>( ar15List ) );    
	    variables.put( "as16", new TreeSet<Object>( ar16List ) );    
	    variables.put( "as17", new TreeSet<Object>( ar17List ) );    
		
		return aggregatesBaseContext.copy().setVariables( variables );
	    
	}
				
	private Context aggregatesContext = getAggregateVarsContext();
	
	@Test
	public void aggregates01() {
		localise( aggregatesContext );
		String result = getResult( "aggregates01.html", ResultMode.HTML );
		assertEquals( clean( aggregates01Result ), clean( result ) );
	}

	@Test
	public void aggregates02() {
		localise( aggregatesContext );
		String result = getResult( "aggregates02.html", ResultMode.HTML );
		assertEquals( clean( aggregates02ResultThymol ), clean( result ) );			
//		if( expectThymolResult() ) {
//			assertEquals( clean( aggregates02ResultThymol ), clean( result ) );			
//		}
//		else {			
//		String subs = result.substring( 0, result.indexOf( "\tat" ) );
//			assertEquals( clean( aggregates02ResultThymeleaf ), subs );			
//		}
	}

	@Test
	public void aggregates03() {
		localise( aggregatesContext );
		String result = getResult( "aggregates03.html", ResultMode.HTML );
		assertEquals( clean( aggregates03Result ), clean( result ) );
	}

	@Test
	public void aggregates04() {
		localise( aggregatesContext );
		String result = getResult( "aggregates04.html", ResultMode.HTML );
		assertEquals( clean( aggregates04ResultThymol ), clean( result ) );			
//		if( expectThymolResult() ) {
//			assertEquals( clean( aggregates04ResultThymol ), clean( result ) );			
//		}
//		else {			
//		String subs = result.substring( 0, result.indexOf( "\tat" ) );
//			assertEquals( clean( aggregates04ResultThymeleaf ), subs );			
//		}
	}

/*	@Test
	public void aggregates05() {
		localise( aggregatesContext );
		String result = getResult( "aggregates05.html", ResultMode.HTML );		
		assertEquals( clean( aggregates05Result ), clean( result ) );
	}

	@Test
	public void aggregates06() {
		localise( aggregatesContext );
		String result = getResult( "aggregates06.html", ResultMode.HTML );		
		assertEquals( clean( aggregates06Result ), clean( result ) );
	}

	@Test
	public void aggregates07() {
		localise( aggregatesContext );
		String result = getResult( "aggregates07.html", ResultMode.HTML );		
		assertEquals( clean( aggregates07Result ), clean( result ) );
	}

	@Test
	public void aggregates08() {
		localise( aggregatesContext );
		String result = getResult( "aggregates08.html", ResultMode.HTML );		
		assertEquals( clean( aggregates08Result ), clean( result ) );
	}

	@Test
	public void aggregates09() {
		localise( aggregatesContext );
		String result = getResult( "aggregates09.html", ResultMode.HTML );		
		assertEquals( clean( aggregates09Result ), clean( result ) );
	}*/

}
