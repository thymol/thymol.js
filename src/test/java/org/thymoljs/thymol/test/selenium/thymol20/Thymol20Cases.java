package org.thymoljs.thymol.test.selenium.thymol20;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class Thymol20Cases extends SeleniumCases {

	String with01Result =
			"\n" +
			"<div>\n" +
			"<div>First name is: <span>Frederick Bloggs</span></div>\n" +
			"<div>Other name is: <span>Joseph Smith</span></div>\n" +
			"</div>\n" +
			"\n";

	String with02ResultThymol =
			"\n" +
			"<div class=\"margin\">\n" +
			"<div><a href=\"../../documentation.html\" onclick=\"clickthing(this,'../../index.html')\">documentation</a></div>\n" +
			"</div>\n" +
			"\n\n\n";

	String with02ResultThymeleaf =
			"\n" +
			"<div class=\"margin\">\n" +
			"<div><a onclick=\"clickthing(this,'../../index.html')\" href=\"../../documentation.html\">documentation</a></div>\n" +
			"</div>\n" +
			"\n\n\n";


	@Test
	public void with01() {
		localise("thymol20/with/");
		String result = getResult( "with01.html", ResultMode.HTML );
		assertEquals( clean( with01Result ), clean( result ) );
	}

	@Test
	public void with02() {
		localise("thymol20/with/");
		String result = getResult( "with02.html", ResultMode.HTML );		
		if( expectThymolResult() ) {
			assertEquals( clean( with02ResultThymol ), clean( result ) );			
		}
		else {			
			assertEquals( clean( with02ResultThymeleaf ), clean( result ) );			
		}
	}


}
