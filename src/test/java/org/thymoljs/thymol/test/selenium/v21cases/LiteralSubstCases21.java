package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class LiteralSubstCases21 extends SeleniumCases {

	String literalsubst01Result =
			"\n" +
			"<p>Hello World</p>\n" +
			"\n\n";

	String literalsubst02Result =
			"\n" +
			"<p>John Apricot's message is: Hello, World!</p>\n" +
			"\n\n";
	 		
	String literalsubst03Result =
			"\n" +
			"<p>John Apricot's message is: Hello, Red Planet!</p>\n" +
			"\n\n";
 		 	
	String literalsubst04Result =
			"\n" +
			"<ul>\n" +
			"  <li>We say hello to planet: Mercury</li>\n" +
			"<li>We say hello to planet: Venus</li><li>We say hello to planet: Earth</li><li>We say hello to planet: Mars</li><li>We say hello to planet: Jupiter</li><li>We say hello to planet: Saturn</li><li>We say hello to planet: Uranus</li><li>We say hello to planet: Neptune</li></ul>\n" +
			"\n\n";
 	
	String literalsubst05Result =
			"\n" +
			"<ul>\n" +
			"  <li>We say hello to planet: Mercury</li>\n" +
			"<li>We say hello to planet: Venus</li><li>We say hello to planet: Earth</li><li>We say hello to planet: Mars</li><li>We say hello to planet: Jupiter</li><li>We say hello to planet: Saturn</li><li>We say hello to planet: Uranus</li><li>We say hello to planet: Neptune</li></ul>\n" +
			"\n\n";
 	
	String literalsubst06Result =
			"\n" +
			"<ul>\n" +
			"  <li>We say hello to planet: Mercury</li>\n" +
			"<li>We say hello to planet: Venus</li><li>We say hello to planet: Earth</li><li>We say hello to planet: Mars</li><li>We say hello to planet: Jupiter</li><li>We say hello to planet: Saturn</li><li>We say hello to planet: Uranus</li><li>We say hello to planet: Neptune</li></ul>\n" +
			"\n\n";
 	
	String literalsubst07Result =
			"\n" +
			"<span>|Hello, World!|</span>\n" +
			"<span>'|\\\\Hello, World!|</span>\n" +
			"<span data-validator-message=\"Hello, World!|Hello, World!\">...</span>\n" +
			"\n\n";
 	
	@Test
	public void literalSubst01() {
		localise("tests21/literalsubst/");
		String result = getResult( "literalsubst01.html", false );
		assertEquals( clean( literalsubst01Result ), clean( result ) );
	}

	@Test
	public void literalSubst02() {
		localise("tests21/literalsubst/");
		String result = getResult( "literalsubst02.html", false );
		assertEquals( clean( literalsubst02Result ), clean( result ) );
	}

	@Test
	public void literalSubst03() {
		localise("tests21/literalsubst/");
		String result = getResult( "literalsubst03.html", false );
		assertEquals( clean( literalsubst03Result ), clean( result ) );
	}

	@Test
	public void literalSubst03a() {
		localise("tests21/literalsubst/");
		String result = getResult( "literalsubst03a.html", false );
		assertEquals( clean( literalsubst03Result ), clean( result ) );
	}

	@Test
	public void literalSubst04() {
		localise("tests21/literalsubst/");
		String result = getResult( "literalsubst04.html", false );
		assertEquals( clean( literalsubst04Result ), clean( result ) );
	}

	@Test
	public void literalSubst05() {
		localise("tests21/literalsubst/");
		String result = getResult( "literalsubst05.html", false );
		assertEquals( clean( literalsubst05Result ), clean( result ) );
	}

	@Test
	public void literalSubst06() {
		localise("tests21/literalsubst/");
		String result = getResult( "literalsubst06.html", false );
		assertEquals( clean( literalsubst06Result ), clean( result ) );
	}

	@Test
	public void literalSubst07() {
		localise("tests21/literalsubst/");
		String result = getResult( "literalsubst07.html", false );
		assertEquals( clean( literalsubst07Result ), clean( result ) );
	}

}
