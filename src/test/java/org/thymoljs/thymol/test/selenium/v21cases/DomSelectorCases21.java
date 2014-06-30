package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class DomSelectorCases21 extends SeleniumCases {

	String domSelector01Result =
			"\n" +
			"<h2 ref=\"two\">Standard and SpringStandard Dialects</h2>\n" +
			"\n\n";

	String domSelector05Result =
			"\n" +
			"<span class=\"current\">features</span>\n" +			
			"\n\n";

	String domSelector06Result =
			"\n" +
			"<li id=\"xml\" class=\"important\"><b>XML</b>: validating against a DTD or not.</li>\n" +			
			"\n\n";

	String domSelector10Result =
			"\n" +
			"<li id=\"xml\" class=\"important\"><b>XML</b>: validating against a DTD or not.</li>\n" +			
			"\n\n";

	String domSelector14Result =
			"\n" +
			"<li class=\"last not-important\">Extremely extensible: can be used as a <i>template engine framework</i> if needed.</li>\n" +			
			"\n\n";

	String domSelector15Result =
			"\n" +
			"<h2 class=\"not-important\">Core Features</h2><li class=\"last not-important\">Extremely extensible: can be used as a <i>template engine framework</i> if needed.</li>\n" +			
			"\n\n";

	String domSelector16Result =
			"\n" +
			"<li class=\"last not-important\">Extremely extensible: can be used as a <i>template engine framework</i> if needed.</li>\n" +			
			"\n\n";

	String domSelector17Result =
			"\n" +
			"<li id=\"xml\" class=\"important\"><b>XML</b>: validating against a DTD or not.</li>\n" +			
			"\n\n";

	String domSelector18Result =
			"\n" +
			"<li class=\"four\">Dialect features (e.g.: evaluation, iteration, etc.) are applied by linking them to template's tags and/or attributes.</li><li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector19Result =
			"\n" +
			"<li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector20Result =
			"\n" +
			"<li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector21Result =
			"\n" +
			"<li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector22Result =
			"\n" +
			"<li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector24Result =
			"\n" +
			"<li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector25Result =
			"\n" +
			"<li class=\"last not-important\">Extremely extensible: can be used as a <i>template engine framework</i> if needed.</li>\n" +			
			"\n\n";

	String domSelector26Result =
			"\n" +
			"<li class=\"last not-important\">Extremely extensible: can be used as a <i>template engine framework</i> if needed.</li>\n" +			
			"\n\n";

	String domSelector27Result =
			"\n" +
			"<h2 class=\"not-important\">Core Features</h2><li class=\"last not-important\">Extremely extensible: can be used as a <i>template engine framework</i> if needed.</li>\n" +			
			"\n\n";

	String domSelector28Result =
			"\n" +
			"<li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector29Result =
			"\n" +
			"<li id=\"xml\" class=\"important\"><b>XML</b>: validating against a DTD or not.</li>\n" +			
			"\n\n";

	String domSelector30Result =
			"\n" +
			"<li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector31Result =
			"\n" +
			"<li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector32Result =
			"\n" +
			"<li class=\"four\">Dialect features (e.g.: evaluation, iteration, etc.) are applied by linking them to template's tags and/or attributes.</li><li class=\"four five\">Two dialects available out-of-the-box: <i>Standard</i> and <i>SpringStandard</i> (for Spring MVC apps, same syntax as <i>Standard</i>).</li>\n" +			
			"\n\n";

	String domSelector33Result =
			"\n" +
			"<a href=\"index2.html\">thymeleaf</a><a href=\"documentation.html\" ref=\"two\">documentation</a>\n" +			
			"\n\n";

	String domSelector34Result =
			"\n" +
			"<a href=\"index2.html\">thymeleaf</a>\n" +			
			"\n\n";

	String domSelector35Result =
			"\n" +
			"<a href=\"index.html\" title=\"Thymeleaf home\"><img src=\"images/thymeleaflogonameverysmall.png\" class=\"logo\" alt=\"Thymeleaf Template Engine\"></a><a href=\"index2.html\">thymeleaf</a>\n" +			
			"\n\n";

	String domSelector36Result =
			"\n" +
			"<h2 class=\"not-important\">Core Features</h2><h2 ref=\"two\">Standard and SpringStandard Dialects</h2>\n" +			
			"\n\n";

	String domSelector37Result =
			"\n" +
			"<a href=\"index.html\" title=\"Thymeleaf home\"><img src=\"images/thymeleaflogonameverysmall.png\" class=\"logo\" alt=\"Thymeleaf Template Engine\"></a><a href=\"index2.html\">thymeleaf</a><a href=\"documentation.html\" ref=\"two\">documentation</a>\n" +			
			"\n\n";

	String domSelector38Result =
			"\n" +
			"<a href=\"index.html\" title=\"Thymeleaf home\"><img src=\"images/thymeleaflogonameverysmall.png\" class=\"logo\" alt=\"Thymeleaf Template Engine\"></a><a href=\"index2.html\">thymeleaf</a>\n" +			
			"\n\n";

	String domSelector39Result =
			"\n" +
			"<li id=\"xml\" class=\"important\"><b>XML</b>: validating against a DTD or not.</li>\n" +			
			"\n\n";
	
	String domSelector40Result =
			"\n" +
			"<a href=\"index2.html\">thymeleaf</a>\n" +			
			"\n\n";

	@Test
	public void domSelector01() {
		localise("tests21/domselector/");
		String result = getResult( "domselector01.html", ResultMode.HTML );
		assertEquals( clean( domSelector01Result ), clean( result ) );
	}

	@Test
	public void domSelector05() {
		localise("tests21/domselector/");
		String result = getResult( "domselector05.html", ResultMode.HTML );
		assertEquals( clean( domSelector05Result ), clean( result ) );
	}

	@Test
	public void domSelector06() {
		localise("tests21/domselector/");
		String result = getResult( "domselector06.html", ResultMode.HTML );
		assertEquals( clean( domSelector06Result ), clean( result ) );
	}

	@Test
	public void domSelector10() {
		localise("tests21/domselector/");
		String result = getResult( "domselector10.html", ResultMode.HTML );
		assertEquals( clean( domSelector10Result ), clean( result ) );
	}

	@Test
	public void domSelector14() {
		localise("tests21/domselector/");
		String result = getResult( "domselector14.html", ResultMode.HTML );
		assertEquals( clean( domSelector14Result ), clean( result ) );
	}

	@Test
	public void domSelector15() {
		localise("tests21/domselector/");
		String result = getResult( "domselector15.html", ResultMode.HTML );
		assertEquals( clean( domSelector15Result ), clean( result ) );
	}

	@Test
	public void domSelector16() {
		localise("tests21/domselector/");
		String result = getResult( "domselector16.html", ResultMode.HTML );
		assertEquals( clean( domSelector16Result ), clean( result ) );
	}

	@Test
	public void domSelector17() {
		localise("tests21/domselector/");
		String result = getResult( "domselector17.html", ResultMode.HTML );
		assertEquals( clean( domSelector17Result ), clean( result ) );
	}

	@Test
	public void domSelector18() {
		localise("tests21/domselector/");
		String result = getResult( "domselector18.html", ResultMode.HTML );
		assertEquals( clean( domSelector18Result ), clean( result ) );
	}

	@Test
	public void domSelector19() {
		localise("tests21/domselector/");
		String result = getResult( "domselector19.html", ResultMode.HTML );
		assertEquals( clean( domSelector19Result ), clean( result ) );
	}

	@Test
	public void domSelector20() {
		localise("tests21/domselector/");
		String result = getResult( "domselector20.html", ResultMode.HTML );
		assertEquals( clean( domSelector20Result ), clean( result ) );
	}

	@Test
	public void domSelector21() {
		localise("tests21/domselector/");
		String result = getResult( "domselector21.html", ResultMode.HTML );
		assertEquals( clean( domSelector21Result ), clean( result ) );
	}

	@Test
	public void domSelector22() {
		localise("tests21/domselector/");
		String result = getResult( "domselector22.html", ResultMode.HTML );
		assertEquals( clean( domSelector22Result ), clean( result ) );
	}

	@Test
	public void domSelector24() {
		localise("tests21/domselector/");
		String result = getResult( "domselector24.html", ResultMode.HTML );
		assertEquals( clean( domSelector24Result ), clean( result ) );
	}

	@Test
	public void domSelector25() {
		localise("tests21/domselector/");
		String result = getResult( "domselector25.html", ResultMode.HTML );
		assertEquals( clean( domSelector25Result ), clean( result ) );
	}

	@Test
	public void domSelector26() {
		localise("tests21/domselector/");
		String result = getResult( "domselector26.html", ResultMode.HTML );
		assertEquals( clean( domSelector26Result ), clean( result ) );
	}

	@Test
	public void domSelector27() {
		localise("tests21/domselector/");
		String result = getResult( "domselector27.html", ResultMode.HTML );
		assertEquals( clean( domSelector27Result ), clean( result ) );
	}

	@Test
	public void domSelector28() {
		localise("tests21/domselector/");
		String result = getResult( "domselector28.html", ResultMode.HTML );
		assertEquals( clean( domSelector28Result ), clean( result ) );
	}

	@Test
	public void domSelector29() {
		localise("tests21/domselector/");
		String result = getResult( "domselector29.html", ResultMode.HTML );
		assertEquals( clean( domSelector29Result ), clean( result ) );
	}

	@Test
	public void domSelector30() {
		localise("tests21/domselector/");
		String result = getResult( "domselector30.html", ResultMode.HTML );
		assertEquals( clean( domSelector30Result ), clean( result ) );
	}

	@Test
	public void domSelector31() {
		localise("tests21/domselector/");
		String result = getResult( "domselector31.html", ResultMode.HTML );
		assertEquals( clean( domSelector31Result ), clean( result ) );
	}

	@Test
	public void domSelector32() {
		localise("tests21/domselector/");
		String result = getResult( "domselector32.html", ResultMode.HTML );
		assertEquals( clean( domSelector32Result ), clean( result ) );
	}

	@Test
	public void domSelector33() {
		localise("tests21/domselector/");
		String result = getResult( "domselector33.html", ResultMode.HTML );
		assertEquals( clean( domSelector33Result ), clean( result ) );
	}

	@Test
	public void domSelector34() {
		localise("tests21/domselector/");
		String result = getResult( "domselector34.html", ResultMode.HTML );
		assertEquals( clean( domSelector34Result ), clean( result ) );
	}

	@Test
	public void domSelector35() {
		localise("tests21/domselector/");
		String result = getResult( "domselector35.html", ResultMode.HTML );
		assertEquals( clean( domSelector35Result ), clean( result ) );
	}

	@Test
	public void domSelector36() {
		localise("tests21/domselector/");
		String result = getResult( "domselector36.html", ResultMode.HTML );
		assertEquals( clean( domSelector36Result ), clean( result ) );
	}

	@Test
	public void domSelector37() {
		localise("tests21/domselector/");
		String result = getResult( "domselector37.html", ResultMode.HTML );
		assertEquals( clean( domSelector37Result ), clean( result ) );
	}

	@Test
	public void domSelector38() {
		localise("tests21/domselector/");
		String result = getResult( "domselector38.html", ResultMode.HTML );
		assertEquals( clean( domSelector38Result ), clean( result ) );
	}

	@Test
	public void domSelector39() {
		localise("tests21/domselector/");
		String result = getResult( "domselector39.html", ResultMode.HTML );
		assertEquals( clean( domSelector39Result ), clean( result ) );
	}/**/

	@Test
	public void domSelector40() {
		localise("tests21/domselector/");
		String result = getResult( "domselector40.html", ResultMode.HTML );
		assertEquals( clean( domSelector40Result ), clean( result ) );
	}

}
