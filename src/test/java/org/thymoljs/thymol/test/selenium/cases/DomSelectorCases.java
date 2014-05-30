package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class DomSelectorCases extends SeleniumCases {

	String domSelector01Result =
			"\n" +
			"<h2>Standard and SpringStandard Dialects</h2>\n" +
			"\n\n";

	String domSelector02Result =
			"\n" +
			"<h2>Core Features</h2><h2>Standard and SpringStandard Dialects</h2>\n" +			
			"\n\n";

	String domSelector03Result =
			"\n" +
			"<h2>Core Features</h2><h2>Standard and SpringStandard Dialects</h2>\n" +			
			"\n\n";

	String domSelector04Result =
			"\n" +
			"<a href=\"index.html\" title=\"Thymeleaf home\"><img src=\"images/thymeleaflogonameverysmall.png\" class=\"logo\" alt=\"Thymeleaf Template Engine\"></a><a href=\"index.html\">thymeleaf</a>\n" +			
			"\n\n";

	String domSelector05Result =
			"\n" +
			"<li>Full (and extensible) <b>internationalization</b> support.</li>\n" +			
			"\n\n";

	String domSelector06Result =
			"\n" +
			"<a href=\"documentation.html\">documentation</a>\n" +			
			"\n\n";

	String domSelector07Result =
			"\n" +
			"<b>Java template engine for XML, XHTML and HTML5</b><b>dialects</b><b>XML</b><b>XHTML 1.0 and 1.1</b><b>HTML5</b><b>internationalization</b><b>parsed template cache</b>\n" +			
			"\n\n";

	String domSelector08Result =
			"\n" +
			"<a href=\"index.html\" title=\"Thymeleaf home\"><img src=\"images/thymeleaflogonameverysmall.png\" class=\"logo\" alt=\"Thymeleaf Template Engine\"></a>\n" +			
			"\n\n";

	String domSelector09Result =
			"\n" +
			"<div id=\"breadcrumb\">\n   <a href=\"index.html\">thymeleaf</a>\n   ::\n   <span class=\"current\">features</span>\n</div>\n" +			
			"\n\n";

	String domSelector10Result =
			"\n" +
			"Core Features\n" +			
			"\n\n";

	String domSelector11Result =
			"\n" +
			"<h2>Core Features</h2>\n" +			
			"\n\n";

	String domSelector12Result =
			"\n" +
			"<li id=\"xml\" class=\"important\"><b>XML</b>: validating against a DTD or not.</li>\n" +			
			"\n\n";

	String domSelector13Result =
			"\n" +
			"<b>hi</b>\n" +			
			"\n\n";

	String domSelector14Result =
			"\n" +
			"<li>List 1, item 3</li><li>List 2, item 3</li>\n" +			
			"\n\n";



	@Test
	public void domSelector01() {
		localise("tests/domselector/");
		String result = getResult( "domselector01.html", false );
		assertEquals( clean( domSelector01Result ), clean( result ) );
	}

	@Test
	public void domSelector02() {
		localise("tests/domselector/");
		String result = getResult( "domselector02.html", false );
		assertEquals( clean( domSelector02Result ), clean( result ) );
	}

	@Test
	public void domSelector03() {
		localise("tests/domselector/");
		String result = getResult( "domselector03.html", false );
		assertEquals( clean( domSelector03Result ), clean( result ) );
	}

	@Test
	public void domSelector04() {
		localise("tests/domselector/");
		String result = getResult( "domselector04.html", false );
		assertEquals( clean( domSelector04Result ), clean( result ) );
	}

	@Test
	public void domSelector05() {
		localise("tests/domselector/");
		String result = getResult( "domselector05.html", false );
		assertEquals( clean( domSelector05Result ), clean( result ) );
	}

	@Test
	public void domSelector06() {
		localise("tests/domselector/");
		String result = getResult( "domselector06.html", false );
		assertEquals( clean( domSelector06Result ), clean( result ) );
	}

	@Test
	public void domSelector07() {
		localise("tests/domselector/");
		String result = getResult( "domselector07.html", false );
		assertEquals( clean( domSelector07Result ), clean( result ) );
	}

	@Test
	public void domSelector08() {
		localise("tests/domselector/");
		String result = getResult( "domselector08.html", false );
		assertEquals( clean( domSelector08Result ), clean( result ) );
	}

	@Test
	public void domSelector09() {
		localise("tests/domselector/");
		String result = getResult( "domselector09.html", false );
		assertEquals( clean( domSelector09Result ), clean( result ) );
	}

	@Test
	public void domSelector10() {
		localise("tests/domselector/");
		String result = getResult( "domselector10.html", false );
		assertEquals( clean( domSelector10Result ), clean( result ) );
	}

	@Test
	public void domSelector11() {
		localise("tests/domselector/");
		String result = getResult( "domselector11.html", false );
		assertEquals( clean( domSelector11Result ), clean( result ) );
	}

	@Test
	public void domSelector12() {
		localise("tests/domselector/");
		String result = getResult( "domselector12.html", false );
		assertEquals( clean( domSelector12Result ), clean( result ) );
	}

	@Test
	public void domSelector13() {
		localise("tests/domselector/");
		String result = getResult( "domselector13.html", false );
		assertEquals( clean( domSelector13Result ), clean( result ) );
	}

	@Test
	public void domSelector14() {
		localise("tests/domselector/");
		String result = getResult( "domselector14.html", false );
		assertEquals( clean( domSelector14Result ), clean( result ) );
	}

}
