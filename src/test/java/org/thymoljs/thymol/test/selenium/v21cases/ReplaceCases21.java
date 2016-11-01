package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class ReplaceCases21 extends SeleniumCases {

    Context replaceContext = new Context( "tests21/replace/" );
	
	String replace01Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";
 		
	String replace02Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";
 		
	String replace03Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";
 		 	
	String replace04Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"  <p>This is some text</p>\n" +
			"</div>\n" +
			"\n\n";
 	
	String replace05Result =
			"\n" +
			"<div>\n" +
			"  <p>This is some text before</p>\n" +
			"  <footer>\n" +
			"  <p>Message for you!</p>\n" +
			"</footer>\n" +
			"  <p>This is some text after</p>\n" +
			"</div>\n" +
			"\n\n";
 	

	String replace06Result =
			"\n\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah</span>.\n" +
			"</p>\n" +
			"\n\n\n";
 	
	String replace07Result =
			"\n\n" +
			"<p>\n" +
			"  This is a text <b>with some parts in bold</b> and a text: <span>Lorem ipsum blah blah (null)</span>.\n" +
			"</p>\n" +
			"\n\n\n";


	@Test
	public void replace01() {
		localise( replaceContext );
		String result = getResult( "replace01.html", ResultMode.HTML );
		assertEquals( clean( replace01Result ), clean( result ) );
	}

	@Test
	public void replace02() {
		localise( replaceContext );
		String result = getResult( "replace02.html", ResultMode.HTML );
		assertEquals( clean( replace02Result ), clean( result ) );
	}

	@Test
	public void replace03() {
		localise( replaceContext );
		String result = getResult( "replace03.html", ResultMode.HTML );
		assertEquals( clean( replace03Result ), clean( result ) );
	}

	@Test
	public void replace04() {
		localise( replaceContext );
		String result = getResult( "replace04.html", ResultMode.HTML );
		assertEquals( clean( replace04Result ), clean( result ) );
	}

	@Test
	public void replace05() {
		localise( replaceContext );
		String result = getResult( "replace05.html", ResultMode.HTML );
		assertEquals( clean( replace05Result ), clean( result ) );
	}

	@Test
	public void replace05a() {
		localise( replaceContext );
		String result = getResult( "replace05a.html", ResultMode.HTML );
		assertEquals( clean( replace05Result ), clean( result ) );
	}


/*	@Test
	public void replace06() {
		localise("tests/replace/");
		String result = getResult( "replace06.html", ResultMode.HTML );
		assertEquals( clean( replace06Result ), clean( result ) );
	}

	@Test
	public void replace07() {
		localise("tests/replace/");
		String result = getResult( "replace07.html", ResultMode.HTML );
		assertEquals( clean( replace07Result ), clean( result ) );
	}*/

}
