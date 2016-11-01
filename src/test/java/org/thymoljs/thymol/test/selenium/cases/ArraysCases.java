package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.List;
import java.util.TreeSet;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.thymoljs.thymol.test.webapp.ThymolTestFilter;

import com.cedarsoftware.util.io.JsonObject;

import org.junit.Test;

public class ArraysCases extends SeleniumCases {
	
	Context arraysBaseContext = new Context( "thymol/arrays/" );
	
	String arrays01Result = 
			"\n" +
			"\t\t<p>Array 1: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Array 2: <span>1.1,3.3,57.57,99.99</span></p>\n" +
			"\t\t<p>Array 3: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Array 4: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Array 5: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Array 6: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\n" +
			"\t\t<p>Set 1: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 2: <span>1.1,3.3,57.57,99.99</span></p>\n" +
			"\t\t<p>Set 3: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 4: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 5: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 6: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\n" +
			"\n\n\n";
	
	String arrays02Result = 
			"\n" +
			"\t\t<p>Array 3 ('string'): <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Array 4 ('string'): <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Array 5 ('string'): <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Array 6 ('string'): <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\n" +
			"\t\t<p>Set 3 ('string'): <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 4 ('string'): <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 5 ('string'): <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 6 ('string'): <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\n" +
			"\n\n\n";

	String arrays03Result = 
			"\n" +
			"\t\t<p>Array 1 ('number'): <span>1,3,57,99</span></p>\n" +
			"\n" +
			"\t\t<p>Set 1 ('number'): <span>1,3,57,99</span></p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String arrays04Result = 
			"\n" +
			"\t\t<p>Array 7 ('boolean'): <span>false,true,false,true</span></p>\n" +
			"\n" +
			"\t\t<p>Set 7 ('boolean'): <span>false,true</span></p>\n" +
			"\t\n" +
			"\n\n\n";
			
	String arrays05Result = 
			"\n" +
			"\t\t<p>4</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String arrays06Result = 
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String arrays07Result = 
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\n" +
			"\n\n\n";

	
	private Context getArrayVarsContext() {

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
		
	    Object junkInstance = new ThymolTestFilter.JunkObject("junk");
	    Class<?> junktype = junkInstance.getClass();
	    variables.put( "jt", junktype );
	    
		return arraysBaseContext.copy().setVariables( variables );
	    
	}
				
	private Context arraysContext = getArrayVarsContext();
	

	
	@Test
	public void arrays01() {
		localise( arraysContext );
		String result = getResult( "arrays01.html", ResultMode.HTML );
		assertEquals( clean( arrays01Result ), clean( result ) );
	}

	@Test
	public void arrays02() {
		localise( arraysContext );
		String result = getResult( "arrays02.html", ResultMode.HTML );
		assertEquals( clean( arrays02Result ), clean( result ) );
	}

	@Test
	public void arrays03() {
		localise( arraysContext );
		String result = getResult( "arrays03.html", ResultMode.HTML );
		assertEquals( clean( arrays03Result ), clean( result ) );
	}

	@Test
	public void arrays04() {
		localise( arraysContext );
		String result = getResult( "arrays04.html", ResultMode.HTML );
		assertEquals( clean( arrays04Result ), clean( result ) );
	}

	@Test
	public void arrays05() {
		localise( arraysContext );
		String result = getResult( "arrays05.html", ResultMode.HTML );
		assertEquals( clean( arrays05Result ), clean( result ) );
	}

	@Test
	public void arrays06() {
		localise( arraysContext );
		String result = getResult( "arrays06.html", ResultMode.HTML );
		assertEquals( clean( arrays06Result ), clean( result ) );
	}

	@Test
	public void arrays07() {
		localise( arraysContext );
		String result = getResult( "arrays07.html", ResultMode.HTML );
		assertEquals( clean( arrays07Result ), clean( result ) );
	}

}
