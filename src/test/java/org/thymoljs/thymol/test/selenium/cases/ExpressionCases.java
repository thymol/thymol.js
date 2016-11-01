package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Locale;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class ExpressionCases extends SeleniumCases {

	Context expressionContext = new Context( "tests/expression/" );
	
	String expression01Result =
			"\n" +
			"<p at=\"test1\">...</p>\n" +
			"<p at=\"test__1__\">...</p>\n" +
			"<p at=\"test\\_1\\_\">...</p>\n" +
			"<p at=\"test\\_1__\\_\">...</p>\n" +
			"<p at=\"test__\\_1__\\_\">...</p>\n" +
			"<p at=\"__\">...</p>\n" +
			"<p at=\"____\">...</p>\n" +
			"\n\n";

	String expression02Result =
			"\n" +
			"<p>33.3333333333</p>\n" +
			"<p>33.3333333333</p>\n" +
			"<p>33.3333333333</p>\n" +
			"<p>33.333333333333</p>\n" +
			"<p>12.465812</p>\n" +
			"<p>12.465812</p>\n" +
			"<p>12.465812</p>\n" +
			"\n\n";

	String expression03Result =
			"\n" +
			"<p>300.000</p>\n" +
			"<p>300.0</p>\n" +
			"<p>300</p>\n" +
			"<p>112.192308</p>\n" +
			"<p>112.192308</p>\n" +
			"<p>112.192308</p>\n" +
			"\n\n";

	String expression04ResultThymol =
			"\n" +
			"<p>[Thymol.ThParam]</p>\n" +
			"<p>1</p>\n" +
			"<p>'Some text'</p>\n" +
			"<p>[Thymol.ThParam]</p>\n" +
			"<p>1</p>\n" +
			"<p>123</p>\n" +
			"<p>[Thymol.ThParam]</p>\n" +
			"<p>3</p>\n" +
			"<p>'Hello'</p>\n" +
			"<p>'World'</p>\n" +
			"<p>0</p>\n" +
			"\n\n";

	String expression04ResultThymeleaf =
			"\n" +
			"<p>[Ljava.lang.String;</p>\n" +
			"<p>1</p>\n" +
			"<p>'Some text'</p>\n" +
			"<p>[Ljava.lang.String;</p>\n" +
			"<p>1</p>\n" +
			"<p>123</p>\n" +
			"<p>[Ljava.lang.String;</p>\n" +
			"<p>3</p>\n" +
			"<p>'Hello'</p>\n" +
			"<p>'World'</p>\n" +
			"<p>0</p>\n" +
			"\n\n";

	String expression05Result =
			"\n" +
			"<div>\n" +
			"    <p>'Some text'</p>\n" +
			"</div>\n" +
			"<div>\n" +
			"    <p>123</p>\n" +
			"</div>\n" +
			"<div>\n" +
			"    <p>'Hello'</p>\n" +
			"<p>'World'</p><p>0</p></div>\n" +
			"\n";
	
	String expression06ResultThymol =
			"\n" +
			"<p>JavaScript:string</p>\n" +
			"<p>'Some text'</p>\n" +
			"<p>JavaScript:string</p>\n" +
			"<p>123</p>\n" +
			"<p>'Hello'</p>\n" +
			"\n\n";

	String expression06ResultThymeleaf =
			"\n" +
			"<p>java.lang.String</p>\n" +
			"<p>Some text</p>\n" +
			"<p>java.lang.String</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";

	String expression07Result =
			"\n" +
			"<p>Some text</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";
	
	String expression08ResultThymol =
			"\n" +
			"<p>Thymol.ThParam</p>\n" +
			"<p>Some text</p>\n" +
			"<p>Thymol.ThParam</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";

	String expression08ResultThymeleaf =
			"\n" +
			"<p>java.lang.String</p>\n" +
			"<p>Some text</p>\n" +
			"<p>java.lang.Integer</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";

/*	String expression09ResultThymol =
			"\n" +
			"<p>Thymol.ThObject</p>\n" +
			"<p>Some text</p>\n" +
			"<p>Thymol.ThObject</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";

	String expression09ResultThymeleaf =
			"\n" +
			"<p>java.lang.String</p>\n" +
			"<p>Some text</p>\n" +
			"<p>java.lang.Integer</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";
*/
	String expression10Result =
			"\n" +
			"<p>Some text</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";

	String expression12ResultThymol =
			"\n" +
			"<p>Thymol.ThParam</p>\n" +
			"<p>Some text</p>\n" +
			"<p>Thymol.ThParam</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";

	String expression12ResultThymeleaf =
			"\n" +
			"<p>java.lang.String</p>\n" +
			"<p>Some text</p>\n" +
			"<p>java.lang.Integer</p>\n" +
			"<p>123</p>\n" +
			"<p>Hello</p>\n" +
			"\n\n";
	
	String expression16Result =
			"\n" +
			"<p>pt_PT</p>\n" +
			"<p>pt</p>\n" +
			"\n\n";

	String expression17Result =
			"\n" +
			"\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"\n" +
			"<p>1</p>\n" +
			"<p>1</p>\n" +
			"\n" +
			"<p></p>\n" +
			"<p>2</p>\n" +
			"\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"\n\n\n";
 	
	String expression18Result =
			"\n" +
			"\n" +
			"<p>not null</p>\n" +
			"<p>2</p>\n" +
			"<p>not null</p>\n" +
			"<p>two</p>\n" +
			"\n\n\n";
 	
	String expression19Result =
			"\n" +
			"\n" +
			"<p>not null</p>\n" +
			"<p>not null</p>\n" +
			"<p>not null</p>\n" +
			"<p>not null</p>\n" +
			"\n\n\n";
 	
	String expression20Result =
			"\n" +
			"\n" +
			"<p>one</p>\n" +
			"<p>one</p>\n" +
			"<p></p>\n" +
			"<p>two</p>\n" +
			"\n\n\n";

	String expression21Result =
			"\n" +
			"\n" +					
			"<p>0</p>\n" +
			"<p>1</p>\n" +
			"<p>1234</p>\n" +
			"<p>-351</p>\n" +
			"<p>-1000</p>\n" +
			"<p>0</p>\n" +
			"\n\n\n";

	String expression22Result =
			"\n" +
			"\n" +					
			"<p>0.000</p>\n" +
			"<p>1.000</p>\n" +
			"<p>1234.000</p>\n" +
			"<p>-351.000</p>\n" +
			"<p>-1000.000</p>\n" +
			"<p>0.000</p>\n" +
			"\n\n\n";

	String expression23Result =
			"\n" +
			"\n" +					
			"<p>0.0</p>\n" +
			"<p>1.0</p>\n" +
			"<p>1234.0</p>\n" +
			"<p>-351.0</p>\n" +
			"<p>-1000.0</p>\n" +
			"<p>0.0</p>\n" +
			"\n\n\n";

	String expression24Result =
			"\n" +
			"\n" +					
			"<p>0.0</p>\n" +
			"<p>0.5</p>\n" +
			"<p>617.0</p>\n" +
			"<p>-175.5</p>\n" +
			"<p>-500.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>-175.5</p>\n" +
			"<p>-500.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>175.5</p>\n" +
			"<p>500.0</p>\n" +
			"<p>0.0</p>\n" +
			"\n\n\n";	
	
	String expression25Result =
			"\n" +
			"<p>0.0</p>\n" +
			"<p>2.0</p>\n" +
			"<p>2468.0</p>\n" +
			"<p>-702.0</p>\n" +
			"<p>-2000.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>-702.0</p>\n" +
			"<p>-2000.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>702.0</p>\n" +
			"<p>2000.0</p>\n" +
			"<p>0.0</p>\n" +
			"\n\n";	
			
	String expression26Result =
			"\n" +
			"<p>2.0</p>\n" +
			"<p>3.0</p>\n" +
			"<p>1236.0</p>\n" +
			"<p>-349.0</p>\n" +
			"<p>-998.0</p>\n" +
			"<p>2.0</p>\n" +
			"<p>349.0</p>\n" +
			"<p>998.0</p>\n" +
			"<p>-2.0</p>\n" +
			"<p>-353.0</p>\n" +
			"<p>-1002.0</p>\n" +
			"<p>-2.0</p>\n" +
			"\n\n";	
	
	String expression27Result =
			"\n" +
			"<p>2.02</p>\n" +
			"<p>3.02</p>\n" +
			"<p>1236.02</p>\n" +
			"<p>-349.02</p>\n" +
			"<p>-998.02</p>\n" +
			"<p>1.98</p>\n" +
			"<p>349.02</p>\n" +
			"<p>998.02</p>\n" +
			"<p>-1.98</p>\n" +
			"<p>-353.02</p>\n" +
			"<p>-1002.02</p>\n" +
			"<p>-2.02</p>\n" +
			"\n\n";

	String expression28Result =
			"\n" +
			"<p>2.024</p>\n" +
			"<p>3.024</p>\n" +
			"<p>1236.024</p>\n" +
			"<p>-349.016</p>\n" +
			"<p>-998.016</p>\n" +
			"<p>1.984</p>\n" +
			"\n\n";	
	
	String expression29Result =
			"\n" +
			"<p>-1.984</p>\n" +
			"<p>-0.984</p>\n" +
			"<p>1232.016</p>\n" +
			"<p>-353.024</p>\n" +
			"<p>-1002.024</p>\n" +
			"<p>-2.024</p>\n" +
			"\n\n";	
	
	String expression30Result =
			"\n" +
			"<p>0.0</p>\n" +
			"<p>1.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>-1.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>1.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>-1.0</p>\n" +
			"<p>0.0</p>\n" +
			"<p>0.0</p>\n" +
			"\n\n";
	
	String expression31Result =
			"\n" +
			"<p>hello</p>\n" +
			"<p>goodbye</p>\n" +
			"<p>hello, world</p>\n" +
			"\n\n";
	
	String expression32Result =
			"\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"\n\n";	
	
	String expression33Result =
			"\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"\n\n";	
	
	String expression34Result =
			"\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"\n\n";	
	
	String expression35Result =
			"\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>false</p>\n" +
			"<p>false</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"<p>true</p>\n" +
			"\n\n";	
	
	String expression36Result =
			"\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
	        "\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
			"\n\n";	
	
	String expression37Result =
			"\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
	        "\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
			"\n\n";	
	
	String expression38Result =
			"\n" +
            "<p>true</p>\n" +
            "<p>false</p>\n" +
            "<p>false</p>\n" +
            "<p>true</p>\n" +
            "\n" +
            "<p>true</p>\n" +
            "<p>false</p>\n" +
            "<p>false</p>\n" +
            "<p>true</p>\n" +
            "\n" +
            "<p>true</p>\n" +
            "<p>false</p>\n" +
            "<p>false</p>\n" +
            "<p>false</p>\n" +
            "<p>true</p>\n" +
            "<p>true</p>\n" +
            "\n" +
            "<p>true</p>\n" +
            "<p>false</p>\n" +
            "<p>false</p>\n" +
            "<p>false</p>\n" +
            "<p>true</p>\n" +
            "<p>true</p>\n" +
			"\n\n";	
	
	String expression39Result =
			"\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
			"\n\n";	
	
	String expression40Result =
			"\n" +
	        "<p>0.0</p>\n" +
	        "<p>0.5</p>\n" +
	        "<p>617.0</p>\n" +
	        "<p>-175.5</p>\n" +
	        "<p>-500.0</p>\n" +
	        "<p>0.0</p>\n" +
	        "<p>-175.5</p>\n" +
	        "<p>-500.0</p>\n" +
	        "<p>0.0</p>\n" +
	        "<p>175.5</p>\n" +
	        "<p>500.0</p>\n" +
	        "<p>0.0</p>\n" +
			"\n\n";	
	
	String expression41Result =
			"\n" +
	        "<p>0.0</p>\n" +
	        "<p>1.0</p>\n" +
	        "<p>0.0</p>\n" +
	        "<p>-1.0</p>\n" +
	        "<p>0.0</p>\n" +
	        "<p>0.0</p>\n" +
	        "<p>1.0</p>\n" +
	        "<p>0.0</p>\n" +
	        "<p>0.0</p>\n" +
	        "<p>-1.0</p>\n" +
	        "<p>0.0</p>\n" +
	        "<p>0.0</p>\n" +
			"\n\n";	
	
	String expression42Result =
			"\n" +
	        "<p>123</p>\n" +
			"\n\n";	
	
	private Context getExpression02Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "eValue1", 100.0 );
		variables.put( "eValue2", 37.397436 );
		return expressionContext.copy().setVariables( variables );
	}	
	
	private Context expression02Context = getExpression02Context();
	
	@Test
	public void expression01() {
		localise( expressionContext );
		String result = getResult( "expression01.html", ResultMode.HTML );
		assertEquals( clean( expression01Result ), clean( result ) );
	}
	
	@Test
	public void expression02() {
		localise( expression02Context );
		String result = getResult( "expression02.html", ResultMode.HTML );
		assertEquals( clean( expression02Result ), clean( result ) );
	}

	@Test
	public void expression03() {
		localise( expression02Context );
		String result = getResult( "expression03.html", ResultMode.HTML );
		assertEquals( clean( expression03Result ), clean( result ) );
	}

	@Test
	public void expression04() {
		localise( expressionContext );
		String result = getResult( "expression04.html?a='Some text'&b=123&c='Hello'&c='World'&c=0", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( expression04ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( expression04ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void expression05() {
		localise( expressionContext );
		String result = getResult( "expression05.html?a='Some text'&b=123&c='Hello'&c='World'&c=0", ResultMode.HTML );
		assertEquals( clean( expression05Result ), clean( result ) );
	}

	@Test
	public void expression06() {
		localise( expressionContext );
		String result = getResult( "expression06.html?a6='Some text'&b6=123&c6='Hello'", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( expression06ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( expression06ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void expression07() {
		localise( expressionContext );
		String result = getResult( "expression07.html?a7='Some text'&b7=123&c7='Hello'", ResultMode.HTML );
		assertEquals( clean( expression07Result ), clean( result ) );
	}

	@Test
	public void expression07a() {
		localise( expressionContext );
		String result = getResult( "expression07a.html?a7='Some text'&b7=123&c7='Hello'", ResultMode.HTML );
		assertEquals( clean( expression07Result ), clean( result ) );
	}

	private Context getExpression08Context() {		
		com.google.gson.JsonObject session = new com.google.gson.JsonObject();		
		session.addProperty( "a", "Some text" );
		session.addProperty( "b", 123 );
		session.addProperty( "c", "Hello" );
		return expressionContext.copy().setSession( session );		
	}		
	
	private Context expression08Context = getExpression08Context();
	
	@Test
	public void expression08() {
		localise( expression08Context );
		String result = getResult( "expression08.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( expression08ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( expression08ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void expression09() {
		localise( expression08Context );
		String result = getResult( "expression09.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( expression08ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( expression08ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void expression10() {
		localise( expression08Context );
		String result = getResult( "expression10.html", ResultMode.HTML );
		assertEquals( clean( expression10Result ), clean( result ) );
	}

	@Test
	public void expression10a() {
		localise( expression08Context );
		String result = getResult( "expression10a.html", ResultMode.HTML );
		assertEquals( clean( expression10Result ), clean( result ) );
	}

	@Test
	public void expression11() {
		localise( expression08Context );
		String result = getResult( "expression11.html", ResultMode.HTML );
		assertEquals( clean( expression10Result ), clean( result ) );
	}

	@Test
	public void expression11a() {
		localise( expression08Context );
		String result = getResult( "expression11a.html", ResultMode.HTML );
		assertEquals( clean( expression10Result ), clean( result ) );
	}
	
	private Context getExpression12Context() {		
		com.google.gson.JsonObject servletContext = new com.google.gson.JsonObject();	
		servletContext.addProperty( "a", "Some text" );
		servletContext.addProperty( "b", 123 );
		servletContext.addProperty( "c", "Hello" );		
		Context ctx = expressionContext.copy();
		ctx.setContext( servletContext );
		return ctx;		
	}
//	Context expression15Context = getExpression15Context();
//	private Context getExpression12Context() {
//		JsonObject< String, Object > variables = new JsonObject< String, Object >();
//		variables.put( "a", "Some text" );
//		variables.put( "b", new Integer(123) );
//		variables.put( "c", "Hello" );
//		return expressionContext.copy().setVariables( variables );
//	}	
	
	private Context expression12Context = getExpression12Context();

	@Test
	public void expression12() {
		localise( expression12Context );
		String result = getResult( "expression12.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( expression12ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( expression12ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void expression12a() {
		localise( expression12Context );
		String result = getResult( "expression12a.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( expression12ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( expression12ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void expression13() {
		localise( expression12Context );
		String result = getResult( "expression13.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( expression12ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( expression12ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void expression14() {
		localise( expression12Context );
		String result = getResult( "expression14.html", ResultMode.HTML );
		assertEquals( clean( expression10Result ), clean( result ) );
	}
	
//	private Context getExpression15Context() {		
//		com.google.gson.JsonObject servletContext = new com.google.gson.JsonObject();	
//		servletContext.addProperty( "a", "Some text" );
//		servletContext.addProperty( "b", 123 );
//		servletContext.addProperty( "c", "Hello" );		
//		Context ctx = expressionContext.copy();
//		ctx.setContext( servletContext );
//		return ctx;		
//	}
//	Context expression15Context = getExpression15Context();

	@Test
	public void expression15() {
		localise( expression12Context );
		String result = getResult( "expression15.html", ResultMode.HTML );
		assertEquals( clean( expression10Result ), clean( result ) );
	}

	@Test
	public void expression15a() {
		localise( expression12Context );
		String result = getResult( "expression15a.html", ResultMode.HTML );
		assertEquals( clean( expression10Result ), clean( result ) );
	}

	@Test
	public void expression16() {
		Context expression16Context = expressionContext.copy().setLocale( new Locale( "pt", "PT" ) );
		localise( expression16Context );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "expression16-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "expression16.html", ResultMode.HTML );			
		}
		assertEquals( clean( expression16Result ), clean( result ) );
	}

	private Context getExpression17Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "aa1", 'a' );				
		variables.put( "aa2", true );		
		variables.put( "aa3", false );	
		variables.put( "aa4", "aa" );		
		variables.put( "ab1", 1 );		
		variables.put( "ab2", "one" );	
		variables.put( "ac1", 2 );		
		variables.put( "ac2", "two" );	
		return expressionContext.copy().setVariables( variables );
	}	
	
//	private Context expression12Context = getExpression12Context();
	
	
	@Test
	public void expression17() {
		localise( getExpression17Context() );
		String result = getResult( "expression17.html", ResultMode.HTML );
		assertEquals( clean( expression17Result ), clean( result ) );
	}


	private Context getExpression18Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "bb1", "not null" );
		variables.put( "bb2", null );
		variables.put( "bc1", 2 );
		variables.put( "bc2", "two" );
		return expressionContext.copy().setVariables( variables );
	}	
	
	private Context expression18Context = getExpression18Context();
	
	@Test
	public void expression18() {
		localise( expression18Context );
		String result = getResult( "expression18.html", ResultMode.HTML );
		assertEquals( clean( expression18Result ), clean( result ) );
	}

	@Test
	public void expression19() {
		localise( expression18Context );
		String result = getResult( "expression19.html", ResultMode.HTML );
		assertEquals( clean( expression19Result ), clean( result ) );
	}

	private Context getExpression20Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "ca1", true );
		variables.put( "ca2", false );
		variables.put( "cb1", null );
		variables.put( "cb2", "one" );
		return expressionContext.copy().setVariables( variables );
	}	
		
	
	@Test
	public void expression20() {
		localise( getExpression20Context() );
		String result = getResult( "expression20.html", ResultMode.HTML );
		assertEquals( clean( expression20Result ), clean( result ) );
	}

	@Test
	public void expression21() {
		localise( expressionContext );
		String result = getResult( "expression21.html", ResultMode.HTML );
		assertEquals( clean( expression21Result ), clean( result ) );
	}

	@Test
	public void expression22() {
		localise( expressionContext );
		String result = getResult( "expression22.html", ResultMode.HTML );
		assertEquals( clean( expression22Result ), clean( result ) );
	}

	@Test
	public void expression23() {
		localise( expressionContext );
		String result = getResult( "expression23.html", ResultMode.HTML );
		assertEquals( clean( expression23Result ), clean( result ) );
	}

	@Test
	public void expression24() {
		localise( expressionContext );
		String result = getResult( "expression24.html", ResultMode.HTML );
		assertEquals( clean( expression24Result ), clean( result ) );
	}

	@Test
	public void expression25() {
		localise( expressionContext );
		String result = getResult( "expression25.html", ResultMode.HTML );
		assertEquals( clean( expression25Result ), clean( result ) );
	}

	@Test
	public void expression26() {
		localise( expressionContext );
		String result = getResult( "expression26.html", ResultMode.HTML );
		assertEquals( clean( expression26Result ), clean( result ) );
	}

	@Test
	public void expression27() {
		localise( expressionContext );
		String result = getResult( "expression27.html", ResultMode.HTML );
		assertEquals( clean( expression27Result ), clean( result ) );
	}

	@Test
	public void expression28() {
		localise( expressionContext );
		String result = getResult( "expression28.html", ResultMode.HTML );
		assertEquals( clean( expression28Result ), clean( result ) );
	}

	@Test
	public void expression29() {
		localise( expressionContext );
		String result = getResult( "expression29.html", ResultMode.HTML );
		assertEquals( clean( expression29Result ), clean( result ) );
	}

	@Test
	public void expression30() {
		localise( expressionContext );
		String result = getResult( "expression30.html", ResultMode.HTML );
		assertEquals( clean( expression30Result ), clean( result ) );
	}

	@Test
	public void expression31() {
		localise( expressionContext );
		String result = getResult( "expression31.html", ResultMode.HTML );
		assertEquals( clean( expression31Result ), clean( result ) );
	}

	@Test
	public void expression32() {
		localise( expressionContext );
		String result = getResult( "expression32.html", ResultMode.HTML );
		assertEquals( clean( expression32Result ), clean( result ) );
	}

	@Test
	public void expression33() {
		localise( expressionContext );
		String result = getResult( "expression33.html", ResultMode.HTML );
		assertEquals( clean( expression33Result ), clean( result ) );
	}

	@Test
	public void expression34() {
		localise( expressionContext );
		String result = getResult( "expression34.html", ResultMode.HTML );
		assertEquals( clean( expression34Result ), clean( result ) );
	}

	@Test
	public void expression35() {
		localise( expressionContext );
		String result = getResult( "expression35.html", ResultMode.HTML );
		assertEquals( clean( expression35Result ), clean( result ) );
	}

	@Test
	public void expression36() {
		localise( expressionContext );
		String result = getResult( "expression36.html", ResultMode.HTML );
		assertEquals( clean( expression36Result ), clean( result ) );
	}

	@Test
	public void expression37() {
		localise( expressionContext );
		String result = getResult( "expression37.html", ResultMode.HTML );
		assertEquals( clean( expression37Result ), clean( result ) );
	}

	private Context getExpression38Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "a1", "a" );
		variables.put( "a2", 12 );
		return expressionContext.copy().setVariables( variables );
	}	
		
	
	@Test
	public void expression38() {
		localise( getExpression38Context() );
		String result = getResult( "expression38.html", ResultMode.HTML );
		assertEquals( clean( expression38Result ), clean( result ) );
	}

	@Test
	public void expression39() {
		localise( expressionContext );
		String result = getResult( "expression39.html", ResultMode.HTML );
		assertEquals( clean( expression39Result ), clean( result ) );
	}

	@Test
	public void expression40() {
		localise( expressionContext );
		String result = getResult( "expression40.html", ResultMode.HTML );
		assertEquals( clean( expression40Result ), clean( result ) );
	}

	@Test
	public void expression41() {
		localise( expressionContext );
		String result = getResult( "expression41.html", ResultMode.HTML );
		assertEquals( clean( expression41Result ), clean( result ) );
	}

	private Context getExpression42Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		variables.put( "size", 123 );
		return expressionContext.copy().setVariables( variables );
	}	
	
	@Test
	public void expression42() {
		localise( getExpression42Context() );		
		String result;
		if( expectNodeResult() ) {
			result = getResult( "expression42-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "expression42.html", ResultMode.HTML );			
		}
		assertEquals( clean( expression42Result ), clean( result ) );
	}

}
