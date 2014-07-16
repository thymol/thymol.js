package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class ListsCases extends SeleniumCases {
	
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
			
	@Test
	public void lists01() {
		localise( "thymol/lists/" );
		String result = getResult( "lists01.html", ResultMode.HTML );
		assertEquals( clean( lists01Result ), clean( result ) );
	}

	@Test
	public void lists02() {
		localise( "thymol/lists/" );
		String result = getResult( "lists02.html", ResultMode.HTML );
		assertEquals( clean( lists02Result ), clean( result ) );
	}

	@Test
	public void lists03() {
		localise( "thymol/lists/" );
		String result = getResult( "lists03.html", ResultMode.HTML );
		assertEquals( clean( lists03Result ), clean( result ) );
	}

	@Test
	public void lists04() {
		localise( "thymol/lists/" );
		String result = getResult( "lists04.html", ResultMode.HTML );
		assertEquals( clean( lists04Result ), clean( result ) );
	}

	@Test
	public void lists05() {
		localise( "thymol/lists/" );
		String result = getResult( "lists05.html", ResultMode.HTML );		
		if( expectThymolResult() ) {
			assertEquals( clean( lists05ResultThymol ), clean( result ) );
		}
		else {			
			assertEquals( clean( lists05ResultThymeleaf ), clean( result ) );
		}		
	}

	@Test
	public void lists06() {
		localise( "thymol/lists/" );
		String result = getResult( "lists06.html", ResultMode.HTML );
		assertEquals( clean( lists06Result ), clean( result ) );
	}

}
