package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class ExpressionDerivedCases extends SeleniumCases {
	
	String allexpressionutil01Result =
	        "\n" +
	        "\n" +
	        "<p>dates exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Dates@class.isAssignableFrom(#dates.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>calendars exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Calendars@class.isAssignableFrom(#calendars.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>numbers exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Numbers@class.isAssignableFrom(#numbers.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>strings exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Strings@class.isAssignableFrom(#strings.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>objects exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Objects@class.isAssignableFrom(#objects.class)}\">...</p> -->\n" +
	        " \n" +
	        "<p>bools exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Bools@class.isAssignableFrom(#bools.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>arrays exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Arrays@class.isAssignableFrom(#arrays.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>lists exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Lists@class.isAssignableFrom(#lists.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>sets exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Sets@class.isAssignableFrom(#sets.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>maps exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Maps@class.isAssignableFrom(#maps.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>aggregates exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Aggregates@class.isAssignableFrom(#aggregates.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>messages exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Messages@class.isAssignableFrom(#messages.class)}\">...</p> -->\n" +
	        "\n" +
	        "<p>ids exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.expression.Ids@class.isAssignableFrom(#ids.class)}\">...</p> -->\n" +
	        "\n\n";	
	
	String ctx01Result =
			"\n" +
	        "<p>ctx exists</p>\n" +
	        "<!-- <p th:text=\"${@org.thymeleaf.context.IContext@class.isAssignableFrom(#ctx.class)}\">...</p> -->\n" +
			"\n\n";	
	
	String ctx02Result =
			"\n" +
//	        "<p>ctx.variables exists</p>\n" +
//			"<p>true</p>\n" +
//			"<p>false</p>\n" +
            "<p>Letter A</p>\n" +
	        "<p>Letter B</p>\n" +
			"\n\n";	
	
	String ctx03Result =
			"\n" +
//	        "<p>This is a class text</p>\n" +
	        "<p>This is a class text</p>\n" +
			"\n\n";	
	
	String ctx04Result =
			"\n" +
	        "<div>\n" +
	        "  <p>Lettuce</p>\n" +
	        "</div>\n" +
	        "\n\n" +
			"\n\n";	
	
	String numbers01ResultThymol =
			"\n" +
	        "<p>123</p>\n" +
	        "<p>254123154123124</p>\n" +
	        "<p>0.124</p>\n" +
	        "<p>0.12435412311231231</p>\n" +
	        "<p>254123154123124.13</p>\n" +
	        "\n" +
			"\n\n";	

	String numbers01ResultThymeleaf =
			"\n" +
	        "<p>123</p>\n" +
	        "<p>254123154123124</p>\n" +
	        "<p>0.124</p>\n" +
	        "<p>0.12435412311231231</p>\n" +
	        "<p>254123154123124.1250</p>\n" +
	        "\n" +
			"\n\n";	

	String numbers02Result =
			"\n" +
	        "<p>00123</p>\n" +
	        "<p>254123154123124</p>\n" +
	        "<p>00000</p>\n" +
	        "<p>00000</p>\n" +
	        "<p>254123154123124</p>\n" +
			"\n\n";	

	String numbers03Result =
			"\n" +
	        "<p>00.123</p>\n" +
	        "<p>254.123.154.123.124</p>\n" +
	        "<p>00.000</p>\n" +
	        "<p>00.000</p>\n" +
	        "<p>254.123.154.123.124</p>\n" +
			"\n\n";	

	String numbers04Result =
			"\n" +
	        "<p>00,123</p>\n" +
	        "<p>254,123,154,123,124</p>\n" +
	        "<p>00,000</p>\n" +
	        "<p>00,000</p>\n" +
	        "<p>254,123,154,123,124</p>\n" +
			"\n\n";	

	String numbers05Result =
			"\n" +
	        "<p>00123</p>\n" +
	        "<p>254123154123124</p>\n" +
	        "<p>00000</p>\n" +
	        "<p>00000</p>\n" +
	        "<p>254123154123124</p>\n" +
			"\n\n";	

	String numbers06Result =
			"\n" +
	        "<p>00,123</p>\n" +
	        "<p>254,123,154,123,124</p>\n" +
	        "<p>00,000</p>\n" +
	        "<p>00,000</p>\n" +
	        "<p>254,123,154,123,124</p>\n" +
			"\n\n";	

//	String numbers07Result =
//			"\n" +
//	        "<p>00,123</p>\n" +
//	        "<p>254,123,154,123,124</p>\n" +
//	        "<p>00,000</p>\n" +
//	        "<p>00,000</p>\n" +
//	        "<p>254,123,154,123,124</p>\n" +
//			"\n\n";	

	String numbers07Result =
			"\n" +
	        "<p>00,123</p>\n" +
	        "<p>254,123,154,123,124</p>\n" +
	        "<p>00,000</p>\n" +
	        "<p>00,000</p>\n" +
	        "<p>254,123,154,123,124</p>\n" +
			"\n\n";	

	String numbers08Result =
			"\n" +
	        "<p>00123.0000</p>\n" +
	        "<p>254123154123124.0000</p>\n" +
	        "<p>00000.1240</p>\n" +
	        "<p>00000.1244</p>\n" +
	        "<p>254123154123124.1250</p>\n" +
			"\n\n";	

	String numbers09Result =
			"\n" +
	        "<p>00123.0000</p>\n" +
	        "<p>254123154123124.0000</p>\n" +
	        "<p>00000.1240</p>\n" +
	        "<p>00000.1244</p>\n" +
	        "<p>254123154123124.1250</p>\n" +
			"\n\n";	

	String numbers10Result =
			"\n" +
	        "<p>00123,0000</p>\n" +
	        "<p>254123154123124,0000</p>\n" +
	        "<p>00000,1240</p>\n" +
	        "<p>00000,1244</p>\n" +
	        "<p>254123154123124,1250</p>\n" +
			"\n\n";	

	String numbers11Result =
			"\n" +
	        "<p>00123?0000</p>\n" +
	        "<p>254123154123124?0000</p>\n" +
	        "<p>00000?1240</p>\n" +
	        "<p>00000?1244</p>\n" +
	        "<p>254123154123124?1250</p>\n" +
	        "\n" +
			"\n\n";	

	String numbers12Result =
			"\n" +
	        "<p>00123.0000</p>\n" +
	        "<p>254123154123124.0000</p>\n" +
	        "<p>00000.1240</p>\n" +
	        "<p>00000.1244</p>\n" +
	        "<p>254123154123124.1250</p>\n" +
			"\n\n";	

	String numbers13Result =
			"\n" +
	        "<p>00123.0000</p>\n" +
	        "<p>254123154123124.0000</p>\n" +
	        "<p>00000.1240</p>\n" +
	        "<p>00000.1244</p>\n" +
	        "<p>254123154123124.1250</p>\n" +
			"\n\n";	

	String numbers14Result =
			"\n" +
	        "<p>00,123.0000</p>\n" +
	        "<p>254,123,154,123,124.0000</p>\n" +
	        "<p>00,000.1240</p>\n" +
	        "<p>00,000.1244</p>\n" +
	        "<p>254,123,154,123,124.1250</p>\n" +
			"\n\n";	

	String numbers15Result =
			"\n" +
	        "<p>00,123.0000</p>\n" +
	        "<p>254,123,154,123,124.0000</p>\n" +
	        "<p>00,000.1240</p>\n" +
	        "<p>00,000.1244</p>\n" +
	        "<p>254,123,154,123,124.1250</p>\n" +
			"\n\n";	

	String root01Result =
			"\n" +
//	        "<p>root exists</p>\n" +
//	        "<p>false</p>\n" +
	        "<p>Letter A</p>\n" +
	        "<p>Letter B</p>\n" +
			"\n\n";	
	
	String root02Result =
			"\n" +
//	        "<p>This is a class text</p>\n" +
	        "<p>This is a class text</p>\n" +
			"\n\n";	
	
	String root03Result =
			"\n" +
	        "<div>\n" +
	        "  <p>Lettuce</p>\n" +
	        "</div>\n" +
			"\n\n";	
	
	String strings01Result =
			"\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
	        "<p>false</p>\n" +
	        "<p>true</p>\n" +
			"\n\n";	
	
	String strings02ResultThymol =
			"\n" +
	        "<p>oneone</p>\n" +
	        "<p>oneoneone</p>\n" +
	        "<p>twoTWO</p>\n" +
	        "<p>**one**</p>\n" +
	        "<p>one**two</p>\n" +
			"\n\n";	
	
	String strings02ResultThymeleaf =
			"\n" +
	        "<p>oneone</p>\n" +
	        "<p>oneoneone</p>\n" +
	        "<p>twoTWO</p>\n" +
	        "<p>one</p>\n" +
	        "<p>onetwo</p>\n" +
			"\n\n";	
	
	String vars01Result =
			"\n" +
//	        "<p>vars exists</p>\n" +
//	        "<p>true</p>\n" +
	        "<p>Letter A</p>\n" +
	        "<p>Letter B</p>\n" +
			"\n\n";	
	
	String vars02Result =
			"\n" +
//	        "<p>This is a class text</p>\n" +
	        "<p>This is a class text</p>\n" +
			"\n\n";	
	
	String vars03Result =
			"\n" +
	        "<div>\n" +
	        "  <p>Lettuce</p>\n" +
	        "</div>\n" +
			"\n\n";	
	
	@Test
	public void allexpressionutil01() {
		localise( "tests/expression/allexpressionutil/" );
		String result = getResult( "allexpressionutil01.html", ResultMode.HTML );
		assertEquals( clean( allexpressionutil01Result ), clean( result ) );
	}

	@Test
	public void ctx01() {
		localise( "tests/expression/ctx/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "ctx01-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "ctx01.html", ResultMode.HTML );
		}
		assertEquals( clean( ctx01Result ), clean( result ) );
	}

	@Test
	public void ctx02() {
		localise( "tests/expression/ctx/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "ctx02-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "ctx02.html", ResultMode.HTML );
		}				
		assertEquals( clean( ctx02Result ), clean( result ) );
	}

	@Test
	public void ctx03() {
		localise( "tests/expression/ctx/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "ctx03-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "ctx03.html", ResultMode.HTML );
		}				
		
		
		assertEquals( clean( ctx03Result ), clean( result ) );
	}

	@Test
	public void ctx04() {
		localise( "tests/expression/ctx/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "ctx04-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "ctx04.html", ResultMode.HTML );
		}				
		assertEquals( clean( ctx04Result ), clean( result ) );
	}

	@Test
	public void numbers01() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers01.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( numbers01ResultThymol ), clean( result ) );			
		}
		else {			
			assertEquals( clean( numbers01ResultThymeleaf ), clean( result ) );			
		}
	}	

	@Test
	public void numbers02() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers02.html", ResultMode.HTML );
		assertEquals( clean( numbers02Result ), clean( result ) );
	}

	@Test
	public void numbers03() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers03.html", ResultMode.HTML );
		assertEquals( clean( numbers03Result ), clean( result ) );
	}

	@Test
	public void numbers04() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers04.html", ResultMode.HTML );
		assertEquals( clean( numbers04Result ), clean( result ) );
	}

	@Test
	public void numbers05() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers05.html", ResultMode.HTML );
		assertEquals( clean( numbers05Result ), clean( result ) );
	}

	@Test
	public void numbers06() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers06.html", ResultMode.HTML );
		assertEquals( clean( numbers06Result ), clean( result ) );
	}

	@Test
	public void numbers07() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers07.html", ResultMode.HTML );
		assertEquals( clean( numbers07Result ), clean( result ) );
	}

	@Test
	public void numbers08() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers08.html", ResultMode.HTML );
		assertEquals( clean( numbers08Result ), clean( result ) );
	}

	@Test
	public void numbers09() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers09.html", ResultMode.HTML );
		assertEquals( clean( numbers09Result ), clean( result ) );
	}

	@Test
	public void numbers10() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers10.html", ResultMode.HTML );
		assertEquals( clean( numbers10Result ), clean( result ) );
	}

	@Test
	public void numbers11() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers11.html", ResultMode.HTML );
		assertEquals( clean( numbers11Result ), clean( result ) );
	}

	@Test
	public void numbers12() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers12.html", ResultMode.HTML );
		assertEquals( clean( numbers12Result ), clean( result ) );
	}

	@Test
	public void numbers13() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers13.html", ResultMode.HTML );
		assertEquals( clean( numbers13Result ), clean( result ) );
	}

	@Test
	public void numbers14() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers14.html", ResultMode.HTML );
		assertEquals( clean( numbers14Result ), clean( result ) );
	}

	@Test
	public void numbers15() {
		localise( "tests/expression/numbers/" );
		String result = getResult( "numbers15.html", ResultMode.HTML );
		assertEquals( clean( numbers15Result ), clean( result ) );
	}

	@Test
	public void root01() {
		localise( "tests/expression/root/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "root01-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "root01.html", ResultMode.HTML );
		}				
		assertEquals( clean( root01Result ), clean( result ) );
	}

	@Test
	public void root02() {
		localise( "tests/expression/root/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "root02-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "root02.html", ResultMode.HTML );
		}				
		assertEquals( clean( root02Result ), clean( result ) );
	}

	@Test
	public void root03() {
		localise( "tests/expression/root/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "root03-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "root03.html", ResultMode.HTML );
		}				
		assertEquals( clean( root03Result ), clean( result ) );
	}

	@Test
	public void strings01() {
		localise( "tests/expression/strings/" );
		String result = getResult( "strings01.html", ResultMode.HTML );
		assertEquals( clean( strings01Result ), clean( result ) );
	}

	@Test
	public void strings02() {
		localise( "tests/expression/strings/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "strings02-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "strings02.html", ResultMode.HTML );
		}				
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( strings02ResultThymol ), clean( result ) );
		}
		else {			
			assertEquals( clean( strings02ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void vars01() {
		localise( "tests/expression/vars/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "vars01-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "vars01.html", ResultMode.HTML );
		}				
		assertEquals( clean( vars01Result ), clean( result ) );
	}

	@Test
	public void vars02() {
		localise( "tests/expression/vars/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "vars02-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "vars02.html", ResultMode.HTML );
		}				
		assertEquals( clean( vars02Result ), clean( result ) );
	}

	@Test
	public void vars03() {
		localise( "tests/expression/vars/" );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "vars03-node.html", ResultMode.HTML );
		}
		else {
			result = getResult( "vars03.html", ResultMode.HTML );
		}				
		assertEquals( clean( vars03Result ), clean( result ) );
	}

}
