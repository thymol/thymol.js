package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class AttrCases extends SeleniumCases {

	String attr01Result =
			"\n" +
			"<form action=\"/subscribe\">\n" +
			"  <fieldset>\n" +
			"    <input name=\"email\" type=\"text\">\n" +
			"    <input value=\"Subscribe me please!\" type=\"submit\">\n" +
			"  </fieldset>\n" +
			"</form>" +
			"\n\n\n";
	
	String attr02Result = 					
			"\n" +
			"<span class=\"separate\">..</span>" +
			"\n\n\n";

//	String attr03Result = 					
//			"\n" +
//			"<span class=\"separate\" id=\"33\" title=\"Lettuce\">..</span>" +
//			"\n\n\n";
 	//<span class="separate" id="33" title="Lettuce">..</span>
	//<span th:attr="class='separate',id=(${identifier} + 1),title=${product.name}">..</span>

	String attr04Result = 					
			"\n" +
			"<option selected=\"selected\">..</option>\n" +
			"<option multiple=\"multiple\">..</option>\n" +
			"<option>..</option>\n" +
			"<option>..</option>\n" +
			"<option selected=\"selected\">..</option>\n" +
			"<option multiple=\"multiple\">..</option>\n" +
			"<option selected=\"selected\">..</option>\n" +
			"<option multiple=\"multiple\">..</option>\n" +
			"<option>..</option>\n" +
			"<option>..</option>" +
			"\n\n\n";
 	
	@Test
	public void attr01() {
		localise("tests/attr/");
		String result = getResult( "attr01.html", false );
		result = result.replaceAll(";jsessionid=[^\"]*", "");
		assertEquals( attr01Result, result );
	}

	@Test
	public void attr02() {
		localise("tests/attr/");
		String result = getResult( "attr02.html", false );
		assertEquals( attr02Result, result );
	}
	
	@Test
	public void attr03() {
		localise("tests/attr/");
		WebElement result = getResultBody( "attr03.html" );
		WebElement span = result.findElement( By.tagName( "span" ) );
		String classAttr = span.getAttribute( "class" );
		assertEquals( "separate", classAttr );
		String idAttr = span.getAttribute( "id" );
		assertEquals( "33", idAttr );
		String titleAttr = span.getAttribute( "title" );
		assertEquals( "Lettuce", titleAttr );
//		assertEquals( attr03Result, result );
	}
	
	@Test
	public void attr04() {
		localise("tests/attr/");
		String result = getResult( "attr04.html", false );
		assertEquals( attr04Result, result );
	}

}
