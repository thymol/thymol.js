package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class RemoveCases21 extends SeleniumCases {

	String remove01Result =
			"\n" +
			"\n    <span>Hi there!</span> \n" +
			" \n" +
			"\n\n";
		
	String remove02Result =
			"\n" +
			"<div></div> \n" +
			"\n\n";		
	
	String remove03Result =
			"\n" +
			"\n" +
			"    <span>Hi there!</span> \n" +
			" \n" +
			"\n\n";	 			

	String remove04Result =
			"\n" +
			"...\n" +
			"<link>\n" +
			"...\n" +
			"\n\n";

	String remove05Result =
			"\n" +
			"<div>\n" +
			"    <span>Hi there!</span> \n" +
			"</div> \n" +
			"\n\n";	 			

	@Test
	public void remove01() {
		localise("tests21/remove/");
		String result = getResult( "remove01.html", false );
		assertEquals( clean( remove01Result ), clean( result ) );
	}

	@Test
	public void remove02() {
		localise("tests21/remove/");
		String result = getResult( "remove02.html", false );
		assertEquals( clean( remove02Result ), clean( result ) );
	}

	@Test
	public void remove03() {
		localise("tests21/remove/");
		String result = getResult( "remove03.html", false );
		assertEquals( clean( remove03Result ), clean( result ) );
	}

	@Test
	public void remove04() {
		localise("tests21/remove/");
		String result = getResult( "remove04.html", false );
		assertEquals( clean( remove04Result ), clean( result ) );
	}

	@Test
	public void remove05() {
		localise("tests21/remove/");
		String result = getResult( "remove05.html", false );
		assertEquals( clean( remove05Result ), clean( result ) );
	}


}
