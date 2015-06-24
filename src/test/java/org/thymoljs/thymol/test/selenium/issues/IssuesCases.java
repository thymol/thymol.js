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
			"<td style=\"padding: 0px 21px 0px 21px;\" valign=\"center\" align=\"right\">\n" +
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

//	String issue08aResultMould = 
//			"\n" +
//			"<div><img src=\"%s/templates/image/?id=path_image_one\"></div><div><img src=\"%s/templates/image/?id=path_image_two\"></div>\n" +
//			"\n\n";

//	String issue08aResult = 
//			"\n" +
//			"<div><img src=\"/image/?id=path_image_one\"></div><div><img src=\"/image/?id=path_image_two\"></div>\n" +
//			"\n\n";

	String issue08aResult = 
			"\n" +
			"<div><img src=\"/image/?id=path_image_one\"></div><div><img src=\"/image/?id=path_image_two\"></div>\n" +
			"\n\n";

	String issue10Result = 
			"\n" +
			"<span>TRUE_VALUE</span>\n" +
			"<span>TRUE_VALUE</span>\n" +
			"<span>TRUE_VALUE</span>\n" +
			"\n";

	String issue11Result = 
			"\n" +
			"<div>\n" +
			"<p>This is some text</p>\n" +
			"<div>This is some text</div>\n" +
			"<p>This is some text</p>\n" +
			"</div>\n" +
			"\n";

//	String issue11ResultThymeleaf = 
//			"\n" +
//			"<div>\n" +
//			"<p>This is some text</p>\n" +
//			"<div>This is some text</div>\n" +
//			"<p>This is some text</p>\n" +
//			"</div>\n" +
//			"\n";

	String issue11aResult = 
			"\n" +
			"<div>\n" +
			"<p>This is some text</p>\n" +
			"<div th:include=\" this   ::frag\">...</div>\n" +
			"<p th:fragment=\"frag\">This is some text</p>\n" +
			"</div>\n" +
			"\n";

	String issue12Result =
			"\n" +
			"<h1>Contents</h1>\n" +
			"<div>\n" +
			"\t<input name=\"command\" value=\"selected items\">\n" +
			"\t<input name=\"preamble\" value=\"items to be deleted\">\n" +
			"</div>\n" +
			"\n\n";			

	String issue12ResultThymeleaf =
			"\n" +
			"<h1>Contents</h1>\n" +
			"<div>\n" +
			"\t<input name=\"command\" value=\"selected items\" type=\"text\">\n" +
			"\t<input name=\"preamble\" value=\"items to be deleted\" type=\"text\">\n" +
			"</div>\n" +
			"\n\n";			

	String issue12aResult = 
			"\n" +
			"<h1>Contents</h1>\n" +
			"<div>\n" +
			"\t<input name=\"command\" value=\"Review\">\n" +
			"\t<input name=\"preamble\" value=\"Clear\">\n" +
			"</div>\n" +
			"\n\n";
	
	String issue13ResultThymol = 
			"\n<div style=\"color: red;\">hello</div>\n" +
			" 		<div>\n" +
			"		    <div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			" 		</div>\n" +
			"		<div>\n" +
			"			<div>\n\n" +	
			"		<table>\n" +
			"			<tbody><tr><td>0,0</td><td>0,1</td></tr>\n" +
			"			<tr><td>1,0</td><td>1,1</td></tr>\n" +
			"		</tbody></table>\n\n\n\n\n\n" +
			"</div>\n" +
			"		</div>\n" +
			"		<p><a href=\"index.html\">Back</a></p>\n" +
			"	\n";

	
	String issue13ResultThymeleaf =	"\n" +
			" \t\t<div style=\"color: red;\">hello</div>\n" +
			" \t\t<div>\n" +
			"\t\t    <div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			" \t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"\n" +
			"\t\n" +
			"\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
			"\t\t<title>Stuff that goes in a title element</title>\n" +
			"\t\n" +
			"\t\n" +
			"\t\t<table>\n" +
			"\t\t\t<tbody><tr><td>0,0</td><td>0,1</td></tr>\n" +
			"\t\t\t<tr><td>1,0</td><td>1,1</td></tr>\n" +
			"\t\t</tbody></table>\n" +
			"\t\t\n" +
			"\t\n\n\n\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String issue14Result = 
			"\n" +
			" Literal : Literal<br>\n" +
			" Variable : Alex<br>\n" +
			" Object : Alex<br>\n" +
			" Object : Jim<br> \n" +
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
		if( expectThymolResult() || expectNodeResult() ) {
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
		if( expectThymolResult() || expectNodeResult() ) {
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

//	@Test
//	public void issue08a() {
//		localise("issues/");		
//		String refValue = issue08aResult;
//		String result;
//		if( expectNodeResult() ) {			
//			String thDeploy = System.getProperty("thDeploy");						
//			refValue = String.format(issue08aResultMould, thDeploy, thDeploy);			
//			result = getResult( "issue08a-node.html", ResultMode.HTML );			
//		}
//		else {
//			result = getResult( "issue08a.html", ResultMode.HTML );
//		}
//		assertEquals( clean( refValue ), clean( result ) );
//	}

	@Test
	public void issue08a() {
		localise("issues/");		
		String result;
		if( expectNodeResult() ) {			
			result = getResult( "issue08a-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "issue08a.html", ResultMode.HTML );
		}
		assertEquals( clean( issue08aResult ), clean( result ) );
	}

	@Test
	public void issue08_ru_RU() {
		localise("issues/", new Locale( "ru", "RU", "" ) );
		String result;
		if( expectNodeResult() ) {					
			result = getResult("issue08_russian-node.html", ResultMode.HTML);		
		}
		else {
			result = getResult("issue08_russian.html", ResultMode.HTML);
		}
		assertEquals(clean(issue08Result_ru_RU), clean(result));
		localise("issues/", new Locale( "en", "GB", "" ));
	}

	@Test
	public void issue10() {
		localise("issues/" );
		String result = getResult("issue10.html", ResultMode.HTML);
		assertEquals(clean(issue10Result), clean(result));
	}

	@Test
	public void issue11() {
		localise("issues/" );
		String result = getResult("issue11.html", ResultMode.HTML);
		assertEquals(clean(issue11Result), clean(result));
	}

	@Test
	public void issue11a() {
		localise("issues/" );
		String result;
		if( expectNodeResult() ) {					
			result = getResult("issue11a-node.html", ResultMode.HTML);	
		}
		else {
			result = getResult("issue11a.html", ResultMode.HTML);
		}
		if( expectThymeleafResult() ) {
			assertEquals(clean(issue11Result), clean(result));			
		}
		else {
			assertEquals(clean(issue11aResult), clean(result));			
		}
	}

	@Test
	public void issue11b() {
		localise("issues/" );
		String result = getResult("issue11b.html", ResultMode.HTML);
		assertEquals(clean(issue11Result), clean(result));
	}

	@Test
	public void issue12() {
		localise("issues/" );
		String result = getResult("issue12.html", ResultMode.HTML);
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals(clean(issue12Result), clean(result));
		}
		else {
			assertEquals(clean(issue12ResultThymeleaf), clean(result));
		}		
	}

	@Test
	public void issue12a() {
		localise("issues/" );
		String result = getResult("issue12a.html", ResultMode.HTML);
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals(clean(issue12aResult), clean(result));
		}
		else {
			assertEquals(clean(issue12ResultThymeleaf), clean(result));
		}		
	}

	@Test
	public void issue13() {
		localise("issues/" );
		String result = getResult("issue13.html", ResultMode.HTML);
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals(clean(issue13ResultThymol), clean(result));
		}
		else {
			assertEquals(clean(issue13ResultThymeleaf), clean(result));
		}		
	}

	@Test
	public void issue13a() {
		localise("issues/" );
		String result = getResult("issue13a.html", ResultMode.HTML);
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals(clean(issue13ResultThymol), clean(result));
		}
		else {
			assertEquals(clean(issue13ResultThymeleaf), clean(result));
		}		
	}

	@Test
	public void issue13b() {
		localise("issues/", "" );
		String result = getResult("issue13b.html", ResultMode.HTML);
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals(clean(issue13ResultThymol), clean(result));
		}
		else {
			assertEquals(clean(issue13ResultThymeleaf), clean(result));
		}		
	}

	@Test
	public void issue14() {
		localise("issues/", "" );
		String result = getResult("issue14.html", ResultMode.HTML);
		assertEquals(clean(issue14Result), clean(result));
	}

}
