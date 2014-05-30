package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class LinkCases21 extends SeleniumCases {

	String link01Result =
			"\n" +
			"<a href=\"//www.thymeleaf.org\">go</a>\n" +
			"<a href=\"//www.thymeleaf.org/documentation.html?a%5B0%5D=b\">go</a>\n" +
			"\n\n";
	
	String link02Result =
			"\n" +
			"<a href=\"?param=1\">go</a>\n" +
			"<a href=\"?param\">go</a>\n" +
			"<a href=\"\">go</a>\n" +
			"\n\n";	 			

	@Test
	public void link01() {
		localise("tests21/link/");
		String result = getResult( "link01.html", false );
		assertEquals( clean( link01Result ), clean( result ) );
	}

	@Test
	public void link02() {
		localise("tests21/link/");
		String result = getResult( "link02.html", false );
		assertEquals( clean( link02Result ), clean( result ) );
	}


}
