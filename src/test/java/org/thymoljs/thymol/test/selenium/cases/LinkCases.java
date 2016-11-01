package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class LinkCases extends SeleniumCases {
	
	Context linkBaseContext = new Context( "tests/link/" );
	
	String link01Result = 
			"\n" +
			"<a href=\"/url?a%5B0%5D=b\">go</a>\n" +
			"<a href=\"/base/url?a%5B0%5D=b\">go</a>\n" +
			"<a href=\"/base/url/doit?a%5B0%5D=b\">go</a>\n" +
			"\n\n";

	String link01aResult = 
			"\n" +
			"<a href=\"/url?a%5B0%5D=b&amp;b-v%23e_123:4=c\">go</a>\n" +
			"\n\n";

	String link02Result = 
			"\n" +
			"<a href=\"/url0/url1\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one%20and%20two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;name=John%20Apricot\">go</a>\n" +
			"<a href=\"/url0/url1?name=The%20name%20is%20John%20Apricot\">go</a>\n" +
			"\n\n";

	String link03Result = 
			"\n" +
			"<a href=\"url0/url1\">go</a>\n" +
			"<a href=\"url0/url1?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"url0/url1?param1=one%20and%20two\">go</a>\n" +
			"<a href=\"url0/url1?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"url0/url1?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"url0/url1?param=one&amp;name=John%20Apricot\">go</a>\n" +
			"<a href=\"url0/url1?name=The%20name%20is%20John%20Apricot\">go</a>\n" +
			"\n\n";

	String link04Result = 
			"\n" +
			"<a href=\"/url0/url1\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one%20and%20two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;name=John%20Apricot\">go</a>\n" +
			"<a href=\"/url0/url1?name=The%20name%20is%20John%20Apricot\">go</a>\n" +
			"\n\n";

	String link05Result = 
			"\n" +
			"<a href=\"/base/url\">go</a>\n" +
			"<a href=\"/base/url?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/base/url\">go</a>\n" +
			"<a href=\"/base/url?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/base/url/doit?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/base/url?param1=one%20and%20two\">go</a>\n" +
			"<a href=\"/base/url?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"/base/url?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"/base/url?param=one&amp;name=John%20Apricot\">go</a>\n" +
			"<a href=\"/base/url?name=The%20name%20is%20John%20Apricot\">go</a>\n" +
			"\n\n";
	
	String link06Result = 
			"\n" +
			"<a href=\"/user/list\">go</a>\n" +
			"\n\n";
	
	String link07Result = 
			"\n" +
			"<a href=\"/url?a%5B0%5D=b&amp;b31=c\">go</a>\n" +
			"\n\n";
	
	String link08Result = 
			"\n" +
			"<a href=\"/url?a%5B0%5D=b&amp;b-ve_123.4=c\">go</a>\n" +
			"\n\n";
	
	String link09Result = 
			"\n" +
			"<a href=\"#?param=1\">go</a>\n" +
			"<a href=\"#?param\">go</a>\n" +
			"\n\n";

	String link10Result = 
			"\n" +
			"<a href=\"?param=1\">go</a>\n" +
			"<a href=\"?param\">go</a>\n" +
			"<a href=\"\">go</a>\n" +
			"\n\n";			
	
	String link11Result = 
			"\n" +
			"<link href=\"/webjars/bootstrap/2.3.0/css/bootstrap.min.css\" rel=\"stylesheet\">\n" +
			"\n\n";
	
	private Context getLinkContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
				
		variables.put( "base_url2", "/base/url" );
		
		Map< String, Object > user2Var = new LinkedHashMap< String, Object >();
		user2Var.put("name", "John Apricot");
		user2Var.put("firstName", "John");
		user2Var.put("lastName", "Apricot");
		user2Var.put("nationality", "Antarctica");
		user2Var.put("age", "(no age specified)");		
		variables.put( "user2", user2Var );		
			
		return linkBaseContext.copy().setVariables( variables );
		
	}
	
	private Context linkContext = getLinkContext();


	
	@Test
	public void link01() {
		localise( linkContext );
		String result = getResult( "link01.html", ResultMode.HTML );
		assertEquals( clean( link01Result ), clean( result ) );
	}

//	@Test
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

	@Test
	public void link07() {
		localise( linkContext );
		String result = getResult( "link07.html", ResultMode.HTML );
		assertEquals( clean( link07Result ), clean( result ) );
	}

	@Test
	public void link08() {
		localise( linkContext );
		String result = getResult( "link08.html", ResultMode.HTML );
		assertEquals( clean( link08Result ), clean( result ) );
	}

	@Test
	public void link09() {
		localise( linkContext );
		String result = getResult( "link09.html", ResultMode.HTML );
		assertEquals( clean( link09Result ), clean( result ) );
	}

	@Test
	public void link10() {
		localise( linkContext );
		String result = getResult( "link10.html", ResultMode.HTML );
		assertEquals( clean( link10Result ), clean( result ) );
	}

	@Test
	public void link11() {
		localise( linkContext );
		String result = getResult( "link11.html", ResultMode.HTML );
		assertEquals( clean( link11Result ), clean( result ) );
	}

}
