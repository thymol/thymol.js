package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class BoolsCases extends SeleniumCases {
	
	String bools01Result = 
			"\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>Array of booleans: <span>true,false,false,true,true,false</span></p>\n" +
			"\t\t<p>Set of booleans: <span id=\"sort\">false,true</span></p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String bools02Result = 
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>Array of booleans: <span>false,true,true,false,false,true</span></p>\n" +
			"\t\t<p>Set of booleans: <span id=\"sort\">true,false</span></p>\n" +
			"\t\n" +
			"\n\n\n";

	String bools03Result = 
			"\n" +
			"\t\t<p>Array of booleans: <span>false</span></p>\n" +
			"\t\t<p>Set of booleans: <span>false</span></p>\n" +
			"\t\t<p>Array of booleans: <span>true</span></p>\n" +
			"\t\t<p>Set of booleans: <span>true</span></p>\n" +
			"\t\t<p>Array of booleans: <span>false</span></p>\n" +
			"\t\t<p>Set of booleans: <span>false</span></p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String bools04Result = 
			"\n" +
			"\t\t<p>Array of booleans: <span>true</span></p>\n" +
			"\t\t<p>Set of booleans: <span>true</span></p>\n" +
			"\t\t<p>Array of booleans: <span>true</span></p>\n" +
			"\t\t<p>Set of booleans: <span>true</span></p>\n" +
			"\t\t<p>Array of booleans: <span>false</span></p>\n" +
			"\t\t<p>Set of booleans: <span>false</span></p>\n" +
			"\t\n" +
			"\n\n\n";
		
	@Test
	public void bools01() {
		localise( "thymol/bools/" );
		String result = getResult( "bools01.html", false );
		assertEquals( clean( bools01Result ), clean( result ) );
	}

	@Test
	public void bools02() {
		localise( "thymol/bools/" );
		String result = getResult( "bools02.html", false );
		assertEquals( clean( bools02Result ), clean( result ) );
	}

	@Test
	public void bools03() {
		localise( "thymol/bools/" );
		String result = getResult( "bools03.html", false );
		assertEquals( clean( bools03Result ), clean( result ) );
	}

	@Test
	public void bools04() {
		localise( "thymol/bools/" );
		String result = getResult( "bools04.html", false );
		assertEquals( clean( bools04Result ), clean( result ) );
	}

}
