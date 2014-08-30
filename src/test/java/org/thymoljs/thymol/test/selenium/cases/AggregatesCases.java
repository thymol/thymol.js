package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class AggregatesCases extends SeleniumCases {
	
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
				
	@Test
	public void aggregates01() {
		localise( "thymol/aggregates/" );
		String result = getResult( "aggregates01.html", ResultMode.HTML );
		assertEquals( clean( aggregates01Result ), clean( result ) );
	}

	@Test
	public void aggregates02() {
		localise( "thymol/aggregates/" );
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
		localise( "thymol/aggregates/" );
		String result = getResult( "aggregates03.html", ResultMode.HTML );
		assertEquals( clean( aggregates03Result ), clean( result ) );
	}

	@Test
	public void aggregates04() {
		localise( "thymol/aggregates/" );
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
		localise( "thymol/aggregates/" );
		String result = getResult( "aggregates05.html", ResultMode.HTML );		
		assertEquals( clean( aggregates05Result ), clean( result ) );
	}

	@Test
	public void aggregates06() {
		localise( "thymol/aggregates/" );
		String result = getResult( "aggregates06.html", ResultMode.HTML );		
		assertEquals( clean( aggregates06Result ), clean( result ) );
	}

	@Test
	public void aggregates07() {
		localise( "thymol/aggregates/" );
		String result = getResult( "aggregates07.html", ResultMode.HTML );		
		assertEquals( clean( aggregates07Result ), clean( result ) );
	}

	@Test
	public void aggregates08() {
		localise( "thymol/aggregates/" );
		String result = getResult( "aggregates08.html", ResultMode.HTML );		
		assertEquals( clean( aggregates08Result ), clean( result ) );
	}

	@Test
	public void aggregates09() {
		localise( "thymol/aggregates/" );
		String result = getResult( "aggregates09.html", ResultMode.HTML );		
		assertEquals( clean( aggregates09Result ), clean( result ) );
	}*/

}
