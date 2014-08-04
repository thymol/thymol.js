package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class LinkCases extends SeleniumCases {
	
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
			"<a href=\"/url0/url1?param1=one+and+two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;name=John+Apricot\">go</a>\n" +
			"<a href=\"/url0/url1?name=The+name+is+John+Apricot\">go</a>\n" +
			"\n\n";

	String link03Result = 
			"\n" +
			"<a href=\"url0/url1\">go</a>\n" +
			"<a href=\"url0/url1?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"url0/url1?param1=one+and+two\">go</a>\n" +
			"<a href=\"url0/url1?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"url0/url1?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"url0/url1?param=one&amp;name=John+Apricot\">go</a>\n" +
			"<a href=\"url0/url1?name=The+name+is+John+Apricot\">go</a>\n" +
			"\n\n";

	String link04Result = 
			"\n" +
			"<a href=\"/url0/url1\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one+and+two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;name=John+Apricot\">go</a>\n" +
			"<a href=\"/url0/url1?name=The+name+is+John+Apricot\">go</a>\n" +
			"\n\n";

	String link05Result = 
			"\n" +
			"<a href=\"/base/url\">go</a>\n" +
			"<a href=\"/base/url?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/base/url\">go</a>\n" +
			"<a href=\"/base/url?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/base/url/doit?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/base/url?param1=one+and+two\">go</a>\n" +
			"<a href=\"/base/url?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"/base/url?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"/base/url?param=one&amp;name=John+Apricot\">go</a>\n" +
			"<a href=\"/base/url?name=The+name+is+John+Apricot\">go</a>\n" +
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
	
	@Test
	public void link01() {
		localise("tests/link/");
		String result = getResult( "link01.html", ResultMode.HTML );
		assertEquals( clean( link01Result ), clean( result ) );
	}

//	@Test
	public void link01a() {
		localise("tests/link/");
		String result = getResult( "link01a.html", ResultMode.HTML );
		assertEquals( clean( link01aResult ), clean( result ) );
	}

	@Test
	public void link02() {
		localise("tests/link/");
		String result = getResult( "link02.html", ResultMode.HTML );
		assertEquals( clean( link02Result ), clean( result ) );
	}

	@Test
	public void link03() {
		localise("tests/link/");
		String result = getResult( "link03.html", ResultMode.HTML );
		assertEquals( clean( link03Result ), clean( result ) );
	}

	@Test
	public void link04() {
		localise("tests/link/");
		String result = getResult( "link04.html", ResultMode.HTML );
		assertEquals( clean( link04Result ), clean( result ) );
	}

	@Test
	public void link05() {
		localise("tests/link/");
		String result = getResult( "link05.html", ResultMode.HTML );
		assertEquals( clean( link05Result ), clean( result ) );
	}

	@Test
	public void link06() {
		localise("tests/link/");
		String result = getResult( "link06.html", ResultMode.HTML );
		assertEquals( clean( link06Result ), clean( result ) );
	}

	@Test
	public void link07() {
		localise("tests/link/");
		String result = getResult( "link07.html", ResultMode.HTML );
		assertEquals( clean( link07Result ), clean( result ) );
	}

	@Test
	public void link08() {
		localise("tests/link/");
		String result = getResult( "link08.html", ResultMode.HTML );
		assertEquals( clean( link08Result ), clean( result ) );
	}

	@Test
	public void link09() {
		localise("tests/link/");
		String result = getResult( "link09.html", ResultMode.HTML );
		assertEquals( clean( link09Result ), clean( result ) );
	}

	@Test
	public void link10() {
		localise("tests/link/");
		String result = getResult( "link10.html", ResultMode.HTML );
		assertEquals( clean( link10Result ), clean( result ) );
	}

	@Test
	public void link11() {
		localise("tests/link/");
		String result = getResult( "link11.html", ResultMode.HTML );
		assertEquals( clean( link11Result ), clean( result ) );
	}

}
