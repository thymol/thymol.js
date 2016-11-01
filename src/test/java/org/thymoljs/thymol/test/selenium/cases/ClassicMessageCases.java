package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Locale;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class ClassicMessageCases extends SeleniumCases {
	
	Context messagesBaseContext = new Context( "tests/messages/" );

	String messages01Result = 
			"\n" +
			"<span>Hello!</span>\n" +
			"<span>Hello Jack Lettuce!</span>\n" +
			"<span>Hello John Apricot!</span>\n" +
			"<span>Hello John Apricot Jr.!</span>\n" +
			"<span>Hello John Apricot Jr.!</span>\n" +
			"<span>Hello John Apricot Jr.!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Saturn!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span>\n" +
			"\n\n" +
			"\n\n";

	String messages02Result = 
			"\n" +
			"<a href=\"/url0/url1\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one&amp;param2=two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one+and+two\">go</a>\n" +
			"<a href=\"/url0/url1?param1=one%3Dtwo\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;param=two\">go</a>\n" +
			"<a href=\"/url0/url1?param=one&amp;name=John+Apricot\">go</a>\n" +
			"<a href=\"/url0/url1?name=The+name+is+John+Apricot\">go</a>\n" +
			"\n\n";

	String messages03Result = 
			"\n" +
			"<span>Ola!</span>\n" +
			"<span>Ola Jack Lettuce!</span>\n" +
			"<span>Ola John Apricot!</span>\n" +
			"<span>Ola John Apricot Jr.!</span>\n" +
			"<span>Ola John Apricot Jr.!</span>\n" +
			"<span>Ola John Apricot Jr.!</span>\n" +
			"<span>Ola John Apricot Jr., benvido ao planeta Saturn!</span>\n" +
			"<span>Ola John Apricot Jr., benvido ao planeta Mars!</span>\n" +
			"<span>Ola John Apricot Jr., benvido ao planeta Mars!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Saturn!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span>\n" +
			"\n" +
			"\n\n";

	String messages04Result = 
			"\n" +
			"<p>Yes!</p>\n" +
			"<p>No!</p>\n" +
			"<p>Yes!</p>\n" +
			"<p>No!</p>\n" +
			"\n" +
			"\n\n";

	String messages05Result = 
			"\n" +
			"<span>Howdy!</span>\n" +
			"<span>Howdy Jack Lettuce!</span>\n" +
			"<span>Howdy John Apricot!</span>\n" +
			"<span>Howdy John Apricot Jr.!</span>\n" +
			"<span>Howdy John Apricot Jr.!</span>\n" +
			"<span>Howdy John Apricot Jr.!</span>\n" +
			"<span>Howdy John Apricot Jr., welcome to planet Saturn!</span>\n" +
			"<span>Howdy John Apricot Jr.,  welcome to planet Mars!</span>\n" +
			"<span>Howdy John Apricot Jr., welcome to planet Mars!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Saturn!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span>\n" +
			"<span>Hello John Apricot Jr., welcome to planet Mars!</span>\n" +
			"\n" +
			"\n\n";
	
	private Context getMessagesContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
				
		variables.put( "var01", "John Apricot" );
		variables.put( "var02", "John Apricot Jr." );
		variables.put( "var03", "Saturn" );

		variables.put( "value01", Boolean.FALSE );
		variables.put( "value02", Boolean.TRUE );
	
		return messagesBaseContext.copy().setVariables( variables );
		
	}
	
	private Context messagesContext = getMessagesContext();
	
	@Test
	public void messages01() {
		localise( messagesContext );
		String result = getResult( "messages01.html", ResultMode.HTML );
		assertEquals( clean( messages01Result ), clean( result ) );
	}

	@Test
	public void messages02() {
		localise( messagesContext );
		String result = getResult( "messages02.html", ResultMode.HTML );
		assertEquals( clean( messages01Result ), clean( result ) );
	}

	@Test
	public void messages03() {
		localise( messagesContext.deepCopy().setLocale( new Locale( "gl", "ES", "" ) ) );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "messages03-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "messages03.html", ResultMode.HTML );
		}
		assertEquals( clean( messages03Result ), clean( result ) );
	}

	@Test
	public void messages04() {
		localise( messagesContext );
		String result = getResult( "messages04.html", ResultMode.HTML );
		assertEquals( clean( messages04Result ), clean( result ) );
	}


	@Test
	public void messages05() {
		localise( messagesContext.deepCopy().setLocale( new Locale( "en", "US", "" ) ) );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "messages05-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "messages05.html", ResultMode.HTML );
		}
		assertEquals( clean( messages05Result ), clean( result ) );
	}

}
