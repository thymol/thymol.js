package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class SetsCases extends SeleniumCases {
	
	String sets01ResultThymol = 
			"\n" +
			"\t\t<p>Set 1: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 2: <span>1.1,3.3,57.57,99.99</span></p>\n" +
			"\t\t<p>Set 3: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 4: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 5: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 6: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 7: <span>false,true</span></p>\n" +
			"\t\t<p>Set 8: <span></span></p>\n" +
			"\t\t<p>Set 9: <span>1,3,99</span></p>\n" +
			"\t\t<p>Set 10: <span>1,3,57,99,101</span></p>\n" +
			"\t\t<p>Set 11: <span>ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 12: <span>fifty-seven,ninety-nine,one,one-hundred-and-one,three</span></p>\n" +
			"\t\t<p>Set 13: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 14: <span>1.1,3.3,57.57,99.99</span></p>\n" +
			"\t\t<p>Set 15: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 16: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 17: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 17: <span>two,[1, 3, 57, 99]</span></p>\n" +
			"\t\n" +
			"\n\n\n";
					
	String sets01ResultThymeleaf = 
			"\n" +
			"\t\t<p>Set 1: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 2: <span>1.1,3.3,57.57,99.99</span></p>\n" +
			"\t\t<p>Set 3: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 4: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 5: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 6: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 7: <span>false,true</span></p>\n" +
			"\t\t<p>Set 8: <span></span></p>\n" +
			"\t\t<p>Set 9: <span>1,3,99</span></p>\n" +
			"\t\t<p>Set 10: <span>1,101,3,57,99</span></p>\n" +
			"\t\t<p>Set 11: <span>ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 12: <span>fifty-seven,ninety-nine,one,one-hundred-and-one,three</span></p>\n" +
			"\t\t<p>Set 13: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 14: <span>1.1,3.3,57.57,99.99</span></p>\n" +
			"\t\t<p>Set 15: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 16: <span>1,3,57,99</span></p>\n" +
			"\t\t<p>Set 17: <span>fifty-seven,ninety-nine,one,three</span></p>\n" +
			"\t\t<p>Set 17: <span>two,[1, 3, 57, 99]</span></p>\n" +
			"\t\n" +
			"\n\n\n";
					
	String sets02Result = 
			"\n" +
			"\t\t<p>size of as1: 4</p>\n" +
			"\t\t<p>size of as2: 4</p>\n" +
			"\t\t<p>size of as3: 4</p>\n" +
			"\t\t<p>size of as4: 4</p>\n" +
			"\t\t<p>size of as5: 4</p>\n" +
			"\t\t<p>size of as6: 4</p>\n" +
			"\t\t<p>size of as7: 2</p>\n" +
			"\t\t<p>size of as8: 0</p>\n" +
			"\t\t<p>size of as9: 3</p>\n" +
			"\t\t<p>size of as10: 5</p>\n" +
			"\t\t<p>size of as11: 3</p>\n" +
			"\t\t<p>size of as12: 5</p>\n" +
			"\t\t<p>size of as13: 4</p>\n" +
			"\t\t<p>size of as14: 4</p>\n" +
			"\t\t<p>size of as15: 4</p>\n" +
			"\t\t<p>size of as16: 4</p>\n" +
			"\t\t<p>size of as17: 4</p>\n" +
			"\t\n" +
			"\n\n\n";

	String sets03Result = 
			"\n" +
			"\t\t<p>check as7: false</p>\n" +
			"\t\t<p>check as8: true</p>\n" +
			"\t\t<p>check as9: false</p>\n" +
			"\t\n" +
			"\n\n\n";		

	String sets04Result = 
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String sets05Result = 
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
	public void sets01() {
		localise( "thymol/sets/" );
		String result = getResult( "sets01.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( sets01ResultThymol ), clean( result ) );
		}
		else {			
			assertEquals( clean( sets01ResultThymeleaf ), clean( result ) );
		}		
	}

	@Test
	public void sets02() {
		localise( "thymol/sets/" );
		String result = getResult( "sets02.html", ResultMode.HTML );
		assertEquals( clean( sets02Result ), clean( result ) );
	}

	@Test
	public void sets03() {
		localise( "thymol/sets/" );
		String result = getResult( "sets03.html", ResultMode.HTML );
		assertEquals( clean( sets03Result ), clean( result ) );
	}

	@Test
	public void sets04() {
		localise( "thymol/sets/" );
		String result = getResult( "sets04.html", ResultMode.HTML );
		assertEquals( clean( sets04Result ), clean( result ) );
	}

	@Test
	public void sets05() {
		localise( "thymol/sets/" );
		String result = getResult( "sets05.html", ResultMode.HTML );		
		assertEquals( clean( sets05Result ), clean( result ) );
	}

}
