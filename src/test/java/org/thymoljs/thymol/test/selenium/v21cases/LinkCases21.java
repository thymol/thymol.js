package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class LinkCases21 extends SeleniumCases {

	String link01Result =
			"\n" +
			"<a href=\"//www.thymeleaf.org\">go</a>\n" +
			"<a href=\"//www.thymeleaf.org/documentation.html?a%5B0%5D=b\">go</a>\n" +
			"\n\n";
	
	String link01aResult =
			"\n" +
			"<a href=\"/home?action=show#all_info\">go</a>\n" +
			"\n\n";
	
	String link02Result =
			"\n" +
			"<a href=\"?param=1\">go</a>\n" +
			"<a href=\"?param\">go</a>\n" +
			"<a href=\"\">go</a>\n" +
			"\n\n";	 			

	String link03Result =
			"\n" +
			"<a href=\"/order/details?one+parameter=one+value\">go</a>\n" +
			"\n\n";	 			

	String link04Result =
			"\n" +
			"<a href=\"/order/details?one+%29parameter=one%28%28+value\">go</a>\n" +
			"\n\n";	 			

	String link05Result =
			"\n" +
			"<a href=\"/order/details/3/show_all\">go</a>\n" +
			"<a href=\"/order/details/3,5/show_all\">go</a>\n" +
			"<a href=\"/order/details/Some%20text%20over%20here\">go</a>\n" +
			"<a href=\"/order/details?o=Some+text+over+here\">go</a>\n" +
			"<a href=\"/order/details?o=Some+text+over+here&amp;two=Other+text+%28second%29\">go</a>\n" +
			"<a href=\"/order/details/Some%20text%20over%20here/personal?two=Other+text+%28second%29\">go</a>\n" +
			"<a href=\"/order/details/Some%20text%20over%20here,hello/personal?two=Other+text+%28second%29\">go</a>\n" +
			"\n\n";	 			
	
	@Test
	public void link01() {
		localise("tests21/link/");
		String result = getResult( "link01.html", ResultMode.HTML );
		assertEquals( clean( link01Result ), clean( result ) );
	}

	@Test
	public void link01a() {
		localise("tests21/link/");
		String result = getResult( "link01a.html", ResultMode.HTML );
		assertEquals( clean( link01aResult ), clean( result ) );
	}

	@Test
	public void link02() {
		localise("tests21/link/");
		String result = getResult( "link02.html", ResultMode.HTML );
		assertEquals( clean( link02Result ), clean( result ) );
	}

	@Test
	public void link03() {
		localise("tests21/link/");
		String result = getResult( "link03.html", ResultMode.HTML );
		assertEquals( clean( link03Result ), clean( result ) );
	}

	@Test
	public void link04() {
		localise("tests21/link/");
		String result = getResult( "link04.html", ResultMode.HTML );
		assertEquals( clean( link04Result ), clean( result ) );
	}

	@Test
	public void link05() {
		localise("tests21/link/");
		String result = getResult( "link05.html", ResultMode.HTML );
		assertEquals( clean( link05Result ), clean( result ) );
	}

}
