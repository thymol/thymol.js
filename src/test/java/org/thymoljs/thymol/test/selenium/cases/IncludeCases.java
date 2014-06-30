package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class IncludeCases extends SeleniumCases {

	String include01Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"        <td>Lettuce</td>\n" +
			"        <td>12</td>\n" +
			"    </tr><tr>\n" +
			"        <td>Apricot</td>\n" +
			"        <td>8</td>\n" +
			"    </tr></tbody></table>\n" +
			"\n\n";
 	
	String include02Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"        <td>Lettuce</td>\n" +
			"        <td>12</td>\n" +
			"    </tr><tr>\n" +
			"        <td>Apricot</td>\n" +
			"        <td>8</td>\n" +
			"    </tr></tbody></table>\n" +
			"\n\n";
	
	String include03Result =
			"\n" +
			"<table>\n" +
			"  <tbody>\n" +
			"  <tr class=\"my-class\">\n" +
			"      <td>Lettuce</td>\n" +
			"      <td>12</td>\n" +
			"  </tr>\n" +
			"\n" +
			"  <tr class=\"my-class\">\n" +
			"      <td>Apricot</td>\n" +
			"      <td>8</td>\n" +
			"  </tr>\n" +
			"</tbody></table>\n" +
			"\n\n";
 	
	String include04Result =
			"\n" +
			"<div class=\"one\">\n" +
			"<div>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</div>\n" +
			"</div>\n" +
			"\n\n";
 	
	String include05Result =
			"\n" +
			"\n" +
			"<div>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</div>\n" +
			"\n\n\n";
 	
	String include06Result =
			"\n" +
			"<div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</p>\n" +
			"</div>\n" +
			"\n\n";
 	
	String include07Result =
			"\n" +
			"<div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (1)</span>.\n" +
			"</p>\n" +
			"</div>\n" +
			"\n\n" +
			"<div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (2)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (3)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (4)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (5)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (6)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (7)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (8)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (9)</span>.\n" +
			"</p>\n" +
			"</div><div class=\"one\">\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (10)</span>.\n" +
			"</p>\n" +
			"</div>";
 	
	@Test
	public void include01() {
		localise("tests/include/");
		String result = getResult( "include01.html", ResultMode.HTML );
		assertEquals( clean( include01Result ), clean( result ) );
	}

	@Test
	public void include02() {
		localise("tests/include/");
		String result = getResult( "include02.html", ResultMode.HTML );
		assertEquals( clean( include02Result ), clean( result ) );
	}

	@Test
	public void include03() {
		localise("tests/include/");
		String result = getResult( "include03.html", ResultMode.HTML );
		assertEquals( clean( include03Result ), clean( result ) );
	}

	@Test
	public void include04() {
		localise("tests/include/");
		String result = getResult( "include04.html", ResultMode.HTML );
		assertEquals( clean( include04Result ), clean( result ) );
	}

	@Test
	public void include05() {
		localise("tests/include/");
		String result = getResult( "include05.html", ResultMode.HTML );
		assertEquals( clean( include05Result ), clean( result ) );
	}

	@Test
	public void include06() {
		localise("tests/include/");
		String result = getResult( "include06.html", ResultMode.HTML );
		assertEquals( clean( include06Result ), clean( result ) );
	}

	@Test
	public void include07() {
		localise("tests/include/");
		String result = getResult( "include07.html", ResultMode.HTML );
		assertEquals( clean( include07Result ), clean( result ) );
	}

}
