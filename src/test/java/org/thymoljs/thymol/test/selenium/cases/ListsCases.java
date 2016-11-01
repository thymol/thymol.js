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

public class ListsCases extends SeleniumCases {
	
	Context listsBaseContext = new Context( "thymol/lists/" );
	
	String lists01Result = 
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
				
	String lists02Result = 
			"\n" +
			"\t\t<p>4</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String lists03Result = 
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String lists04Result = 
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
		
	// In javascript, the default sort for list of integers is by alpha-numeric value

	String lists05ResultThymol = 
			"\n" +
			"\t\t<p>[1, 3, 57, 99]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, three]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, three]</p>\n" +
			"\n" +
			"\t\t<p>[]</p>\n" +			
			"\n" +
			"\t\t<p>[1, 3, 99]</p>\n" +
			"\t\t<p>[1, 101, 3, 57, 99]</p>\n" +
			"\t\t<p>[ninety-nine, one, three]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, one-hundred-and-one, three]</p>\n" +
			"\t\n" +
			"\n\n\n";
	
	// In java, the default sort for list of integers is by numeric value
	
	String lists05ResultThymeleaf = 
			"\n" +
			"\t\t<p>[1, 3, 57, 99]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, three]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, three]</p>\n" +
			"\n" +
			"\t\t<p>[]</p>\n" +			
			"\n" +
			"\t\t<p>[1, 3, 99]</p>\n" +
			"\t\t<p>[1, 3, 57, 99, 101]</p>\n" +
			"\t\t<p>[ninety-nine, one, three]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, one-hundred-and-one, three]</p>\n" +
			"\t\n" +
			"\n\n\n";
	
	String lists06Result = 
			"\n" +
			"\t\t<p>[1, 3, 57, 99]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, three]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, three]</p>\n" +
			"\n" +
			"\t\t<p>[]</p>\n" +			
			"\t\t<p>[]</p>\n" +			
			"\n" +
			"\t\t<p>[1, 3, 99]</p>\n" +
			"\t\t<p>[1, 3, 57, 99, 101]</p>\n" +
			"\t\t<p>[ninety-nine, one, three]</p>\n" +
			"\t\t<p>[fifty-seven, ninety-nine, one, one-hundred-and-one, three]</p>\n" +
			"\t\n" +
			"\n\n\n";
			
	private Context getListsContext() {
		
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

		List<Integer> ar1List = Arrays.asList( ar1 );
		List<String> ar5List = Arrays.asList( ar5 );
		List<String> ar6List = Arrays.asList( ar6 );
		List<String> ar8List = Arrays.asList( ar8 );
		List<Integer> ar9List = Arrays.asList( ar9 );
		List<Integer> ar10List = Arrays.asList( ar10 );
		List<String> ar11List = Arrays.asList( ar11 );
		List<String> ar12List = Arrays.asList( ar12 );

		variables.put( "ar1List", ar1List );	
		variables.put( "ar5List", ar5List );
		variables.put( "ar6List", ar6List );
		variables.put( "ar8List", ar8List );		
		variables.put( "ar9List", ar9List );
		variables.put( "ar10List", ar10List );
		variables.put( "ar11List", ar11List );
		variables.put( "ar12List", ar12List );

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
	
		return listsBaseContext.copy().setVariables( variables );
		
	}
	
	private Context listsContext = getListsContext();

	
	@Test
	public void lists01() {
		localise( listsContext );
		String result = getResult( "lists01.html", ResultMode.HTML );
		assertEquals( clean( lists01Result ), clean( result ) );
	}

	@Test
	public void lists02() {
		localise( listsContext );
		String result = getResult( "lists02.html", ResultMode.HTML );
		assertEquals( clean( lists02Result ), clean( result ) );
	}

	@Test
	public void lists03() {
		localise( listsContext );
		String result = getResult( "lists03.html", ResultMode.HTML );
		assertEquals( clean( lists03Result ), clean( result ) );
	}

	@Test
	public void lists04() {
		localise( listsContext );
		String result = getResult( "lists04.html", ResultMode.HTML );
		assertEquals( clean( lists04Result ), clean( result ) );
	}

	@Test
	public void lists05() {
		localise( listsContext );
		String result = getResult( "lists05.html", ResultMode.HTML );		
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( lists05ResultThymol ), clean( result ) );
		}
		else {			
			assertEquals( clean( lists05ResultThymeleaf ), clean( result ) );
		}		
	}

	@Test
	public void lists06() {
		localise( listsContext );
		String result = getResult( "lists06.html", ResultMode.HTML );
		assertEquals( clean( lists06Result ), clean( result ) );
	}

}
