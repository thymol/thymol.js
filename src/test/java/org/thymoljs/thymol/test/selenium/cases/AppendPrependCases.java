package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class AppendPrependCases extends SeleniumCases {
	
	String attrappend01Result =
			"\n" +
			"<div style=\"color:blue;\">..</div>\n" +
			"<div style=\"width:300px;\">..</div>\n" +
			"<div>..</div>\n" +
			"<div>..</div>\n" +
			"\n" +
			"<div style=\"color:blue;text-align:center;\">..</div>\n" +
			"<div style=\"color:blue;width:300px;\">..</div>\n" +
			"<div style=\"color:blue;\">..</div>\n" +
			"<div style=\"color:blue;\">..</div>\n" +
			"\n" +
			"<div style=\"text-align:center;\">..</div>\n" +
			"<div style=\"width:300px;\">..</div>\n" +
			"<div style=\"\">..</div>\n" +
			"<div style=\"\">..</div>\n" +	
			"\n\n";

	String attrprepend01Result =
			"\n" +
			"<div style=\"color:blue;\">..</div>\n" +
			"<div style=\"width:300px;\">..</div>\n" +
			"<div>..</div>\n" +
			"<div>..</div>\n" +
			"\n" +
			"<div style=\"text-align:center;color:blue;\">..</div>\n" +
			"<div style=\"width:300px;color:blue;\">..</div>\n" +
			"<div style=\"color:blue;\">..</div>\n" +
			"<div style=\"color:blue;\">..</div>\n" +
			"\n" +
			"<div style=\"text-align:center;\">..</div>\n" +
			"<div style=\"width:300px;\">..</div>\n" +
			"<div style=\"\">..</div>\n" +
			"<div style=\"\">..</div>\n" +
			"\n\n\n";

	String classappend01Result =
			"\n" +
			"<div class=\"intro\">doh</div>\n" +
			"<div class=\"intro\">reh</div>\n" +
			"<div>mi</div>\n" +
			"<div>fa</div>\n" +
			"\n" +
			"<div class=\"outro intro\">doh</div>\n" +
			"<div class=\"outro intro\">reh</div>\n" +
			"<div class=\"outro\">mi</div>\n" +
			"<div class=\"outro\">fa</div>\n" +
			"\n" +
			"<div class=\"intro\">doh</div>\n" +
			"<div class=\"intro\">reh</div>\n" +
			"<div class=\"\">mi</div>\n" +
			"<div class=\"\">fa</div>\n" +
			"\n\n";

	@Test
	public void attrAppend01() {
		localise("tests/appendprepend/");
		String result = getResult( "attrappend01.html", false );
		assertEquals( attrappend01Result, result );
	}

	@Test
	public void attrPrepend01() {
		localise("tests/appendprepend/");
		String result = getResult( "attrprepend01.html", false );
		assertEquals( attrprepend01Result, result );
	}

	@Test
	public void classAppend01() {
		localise("tests/appendprepend/");
		String result = getResult( "classappend01.html", false );
		assertEquals( classappend01Result, result );
	}

}
