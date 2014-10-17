package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class ParamsCases extends SeleniumCases {

	String params01Result = 
			"\n<p>9</p>\n" +
			"\n";
	
	@Test
	public void params01() {
		localise( "thymol/params/" );
		String result = getResult( "params01.html?euros=9", ResultMode.HTML );
		assertEquals( clean( params01Result ), clean( result ) );
	}

	@Test
	public void params02() {
		localise( "thymol/params/" );
		String result = getResult( "params02.html?product=%23p1", ResultMode.HTML );
		assertEquals( clean( params01Result ), clean( result ) );
	}

}
