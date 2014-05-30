package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class ExpressionCases21 extends SeleniumCases {

	String expression01Result =
			"\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +			
			"<p>true</p>\n" +
			"\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +			
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +			
			"\n" +	
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +			
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +			
			"\n\n";
	
	String expression02Result =
			"\n" +
			"<p></p>\n\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +			
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"\n\n";

	String expression03Result =
			"\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"\n\n";

	@Test
	public void expression01() {
		localise("tests21/expression/");
		String result = getResult( "expression01.html", false );
		assertEquals( clean( expression01Result ), clean( result ) );
	}

	@Test
	public void expression02() {
		localise("tests21/expression/");
		String result = getResult( "expression02.html", false );
		assertEquals( clean( expression02Result ), clean( result ) );
	}

	@Test
	public void expression03() {
		localise("tests21/expression/");
		String result = getResult( "expression03.html", false );
		assertEquals( clean( expression03Result ), clean( result ) );
	}


}
