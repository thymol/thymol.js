package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class LinkCases21 extends SeleniumCases {

	Context linkBaseContext = new Context( "tests21/link/" );

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
			"<a href=\"/order/details?one%20parameter=one%20value\">go</a>\n" +
			"\n\n";	 			

	String link04Result =
			"\n" +
			"<a href=\"/order/details?one%20)parameter=one((%20value\">go</a>\n" +
			"\n\n";	 			

	String link05Result =
			"\n" +
			"<a href=\"/order/details/3/show_all\">go</a>\n" +
			"<a href=\"/order/details/3,5/show_all\">go</a>\n" +
			"<a href=\"/order/details/Some%20text%20over%20here\">go</a>\n" +
			"<a href=\"/order/details?o=Some%20text%20over%20here\">go</a>\n" +
			"<a href=\"/order/details?o=Some%20text%20over%20here&amp;two=Other%20text%20(second)\">go</a>\n" +
			"<a href=\"/order/details/Some%20text%20over%20here/personal?two=Other%20text%20(second)\">go</a>\n" +
			"<a href=\"/order/details/Some%20text%20over%20here,hello/personal?two=Other%20text%20(second)\">go</a>\n" +
			"\n\n";	 			
	
	String link06Result =
			"\n" +
			"<div class=\"delete-button\" sec:authorize=\"hasRole('ROLE_ADMIN')\">\n" +
			"<a href=\"/content/node/3/delete\">\n" +
			"<span class=\"glyphicon glyphicon-remove\">\n" +
			"</span></a>\n" +
			"</div>" +
			"\n\n";	 			

	private Context getLinkContext() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "onevar2", "Some text over here" );
		variables.put( "twovar2", "Other text (second)" );
		variables.put( "base_url", "//www.thymeleaf.org/documentation.html" );
		return linkBaseContext.copy().setVariables( variables );
	}
	
	private Context linkContext = getLinkContext(); 
	
	@Test
	public void link01() {
		localise( linkContext );
		String result = getResult( "link01.html", ResultMode.HTML );
		assertEquals( clean( link01Result ), clean( result ) );
	}

	@Test
	public void link01a() {
		localise( linkContext );
		String result = getResult( "link01a.html", ResultMode.HTML );
		assertEquals( clean( link01aResult ), clean( result ) );
	}

	@Test
	public void link02() {
		localise( linkContext );
		String result = getResult( "link02.html", ResultMode.HTML );
		assertEquals( clean( link02Result ), clean( result ) );
	}

	@Test
	public void link03() {
		localise( linkContext );
		String result = getResult( "link03.html", ResultMode.HTML );
		assertEquals( clean( link03Result ), clean( result ) );
	}

	@Test
	public void link04() {
		localise( linkContext );
		String result = getResult( "link04.html", ResultMode.HTML );
		assertEquals( clean( link04Result ), clean( result ) );
	}

	@Test
	public void link05() {
		localise( linkContext );
		String result = getResult( "link05.html", ResultMode.HTML );
		assertEquals( clean( link05Result ), clean( result ) );
	}

	@Test
	public void link06() {
		localise( linkContext );
		String result = getResult( "link06.html", ResultMode.HTML );
		assertEquals( clean( link06Result ), clean( result ) );
	}

}
