package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class ArraysCases extends SeleniumCases {
	
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

	@Test
	public void arrays01() {
		localise( "thymol/arrays/" );
		String result = getResult( "arrays01.html", ResultMode.HTML );
		assertEquals( clean( arrays01Result ), clean( result ) );
	}

	@Test
	public void arrays02() {
		localise( "thymol/arrays/" );
		String result = getResult( "arrays02.html", ResultMode.HTML );
		assertEquals( clean( arrays02Result ), clean( result ) );
	}

	@Test
	public void arrays03() {
		localise( "thymol/arrays/" );
		String result = getResult( "arrays03.html", ResultMode.HTML );
		assertEquals( clean( arrays03Result ), clean( result ) );
	}

	@Test
	public void arrays04() {
		localise( "thymol/arrays/" );
		String result = getResult( "arrays04.html", ResultMode.HTML );
		assertEquals( clean( arrays04Result ), clean( result ) );
	}

	@Test
	public void arrays05() {
		localise( "thymol/arrays/" );
		String result = getResult( "arrays05.html", ResultMode.HTML );
		assertEquals( clean( arrays05Result ), clean( result ) );
	}

	@Test
	public void arrays06() {
		localise( "thymol/arrays/" );
		String result = getResult( "arrays06.html", ResultMode.HTML );
		assertEquals( clean( arrays06Result ), clean( result ) );
	}

	@Test
	public void arrays07() {
		localise( "thymol/arrays/" );
		String result = getResult( "arrays07.html", ResultMode.HTML );
		assertEquals( clean( arrays07Result ), clean( result ) );
	}

}
