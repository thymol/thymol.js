package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedList;
import java.util.List;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

import org.junit.Test;

public class LiteralSubstCases21 extends SeleniumCases {

	Context literalSubstBaseContext = new Context( "tests21/literalsubst/" );
	
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
	
	private Context getLiteralSubstContext() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();

		variables.put( "onevar", "Hello" );
		variables.put( "twovar", "World" );
		
		variables.put( "planet01", "Mercury" );		
		variables.put( "planet02", "Venus" );		
		variables.put( "planet03", "Earth" );		
		variables.put( "planet04", "Mars" );		
		variables.put( "planet05", "Jupiter" );		
		variables.put( "planet06", "Saturn" );		
		variables.put( "planet07", "Uranus" );		
		variables.put( "planet08", "Neptune" );

		List< Object > planetList = new LinkedList< Object >();
		planetList.add( variables.get( "planet01" ) );
		planetList.add( variables.get( "planet02" ) );
		planetList.add( variables.get( "planet03" ) );
		planetList.add( variables.get( "planet04" ) );
		planetList.add( variables.get( "planet05" ) );
		planetList.add( variables.get( "planet06" ) );
		planetList.add( variables.get( "planet07" ) );
		planetList.add( variables.get( "planet08" ) );
		
		variables.put( "planets", planetList );
		
		variables.put( "msg", "Hello, World!" );     	
		
		return literalSubstBaseContext.copy().setVariables( variables );
	}
	
	private Context literalSubstContext = getLiteralSubstContext(); 
	
	
	@Test
	public void literalSubst01() {
		localise( literalSubstContext );
		String result = getResult( "literalsubst01.html", ResultMode.HTML );
		assertEquals( clean( literalsubst01Result ), clean( result ) );
	}

	@Test
	public void literalSubst02() {
		localise( literalSubstContext );
		String result = getResult( "literalsubst02.html", ResultMode.HTML );
		assertEquals( clean( literalsubst02Result ), clean( result ) );
	}

	@Test
	public void literalSubst03() {
		localise( literalSubstContext );
		String result = getResult( "literalsubst03.html", ResultMode.HTML );
		assertEquals( clean( literalsubst03Result ), clean( result ) );
	}

	@Test
	public void literalSubst03a() {
		localise( literalSubstContext );
		String result = getResult( "literalsubst03a.html", ResultMode.HTML );
		assertEquals( clean( literalsubst03Result ), clean( result ) );
	}

	@Test
	public void literalSubst04() {
		localise( literalSubstContext );
		String result = getResult( "literalsubst04.html", ResultMode.HTML );
		assertEquals( clean( literalsubst04Result ), clean( result ) );
	}

	@Test
	public void literalSubst05() {
		localise( literalSubstContext );
		String result = getResult( "literalsubst05.html", ResultMode.HTML );
		assertEquals( clean( literalsubst05Result ), clean( result ) );
	}

	@Test
	public void literalSubst06() {
		localise( literalSubstContext );
		String result = getResult( "literalsubst06.html", ResultMode.HTML );
		assertEquals( clean( literalsubst06Result ), clean( result ) );
	}

	@Test
	public void literalSubst07() {
		localise( literalSubstContext );
		String result = getResult( "literalsubst07.html", ResultMode.HTML );
		assertEquals( clean( literalsubst07Result ), clean( result ) );
	}

}
