package org.thymoljs.thymol.test.selenium.issues;

import static junit.framework.Assert.assertEquals;

import java.util.Locale;

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

	String issue06ResultThymol = 
			"\n" +
			"<span>Wed Oct 09 00:00:00 GMT 1940</span>\n" +
			"\n";

	String issue06ResultThymeleaf = 
			"\n" +
			"<span>Wed Oct 09 00:00:00 BST 1940</span>\n" +
			"\n";

	String issue08Result = 
			"\n" +
			"<h1>Product list</h1>\n" +
			"<table>\n" +
			"<tbody><tr>\n" +
			"<th rowspan=\"1\" colspan=\"1\">NAME</th>\n" +
			"<th rowspan=\"1\" colspan=\"1\">PRICE</th>\n" +
			"</tr>\n" +
			"<tr>\n" +
			"<td rowspan=\"1\" colspan=\"1\">Potatoes</td>\n" +
			"<td rowspan=\"1\" colspan=\"1\">£2.43</td>\n" +
			"</tr>\n" +
			"</tbody></table>\n" +
			"\n\n";

	String issue08Result_ru_RU = 
			"\n" +
			"<h1>Product list</h1>\n" +
			"<table>\n" +
			"<tbody><tr>\n" +
			"<th rowspan=\"1\" colspan=\"1\">NAME</th>\n" +
			"<th rowspan=\"1\" colspan=\"1\">PRICE</th>\n" +
			"</tr>\n" +
			"<tr>\n" +
//			"<td rowspan=\"1\" colspan=\"1\">\u041A\u0430\u0440\u0442\u043E\u0444\u0435\u043B\u044C</td>\n" +
			"<td rowspan=\"1\" colspan=\"1\">Картофель</td>\n" +
			"<td rowspan=\"1\" colspan=\"1\">2.43</td>\n" +
			"</tr>\n" +
			"</tbody></table>\n" +
			"\n\n";

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
		if( expectThymolResult() ) {
			assertEquals( clean( issue06ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( issue06ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void issue06a() {
		localise("issues/");
		String result = getResult( "issue06a.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( issue06ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( issue06ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void issue08() {
		localise("issues/");
		String result = getResult( "issue08.html", ResultMode.HTML );
		assertEquals( clean( issue08Result ), clean( result ) );
	}

	@Test
	public void issue08_ru_RU() {
		localise("issues/", new Locale( "ru", "RU", "" ) );
		String result = getResult("issue08_russian.html", ResultMode.HTML);
		assertEquals(clean(issue08Result_ru_RU), clean(result));
	}

}
