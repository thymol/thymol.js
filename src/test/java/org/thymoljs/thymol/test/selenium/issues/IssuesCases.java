package org.thymoljs.thymol.test.selenium.issues;

import static junit.framework.Assert.assertEquals;

import org.junit.Test;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

public class IssuesCases extends SeleniumCases {

	String issue01Result = 
			"\n" +
			"<table>\n" +
			"<tbody>\n" +
			"<tr>\n" +
			"<td style=\"padding: 0px 21px 0px 21px;\" align=\"right\" valign=\"center\">\n" +
			"<span>Card Issue No.</span>\n" +
			"<span>01</span>\n" +
			"</td>\n" +
			"</tr>\n" +
			"</tbody>\n" +
			"</table>\n" +
			"\n";

	String issue06Result = 
			"\n" +
			"<span>Wed Oct 09 00:00:00 BST 1940</span>\n" +
			"\n";

	String issue06aResult = 
			"\n" +
			"<span>Wed Oct 09 00:00:00 BST 1940</span>\n" +
			"\n";

	@Test
	public void issue01() {
		localise("issues/");
		String result = getResult( "issue01.html", ResultMode.HTML );
		assertEquals( clean( issue01Result ), clean( result ) );
	}

	@Test
	public void issue06() {
		localise("issues/");
		String result = getResult( "issue06.html", ResultMode.HTML );
		assertEquals( clean( issue06Result ), clean( result ) );
	}

	@Test
	public void issue06a() {
		localise("issues/");
		String result = getResult( "issue06a.html", ResultMode.HTML );
		assertEquals( clean( issue06aResult ), clean( result ) );
	}


}
