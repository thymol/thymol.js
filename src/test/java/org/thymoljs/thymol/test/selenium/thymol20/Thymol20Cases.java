package org.thymoljs.thymol.test.selenium.thymol20;

import static org.junit.Assert.assertEquals;

import java.util.Locale;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class Thymol20Cases extends SeleniumCases {

	String with01Result =
			"\n" +
			"<div>\n" +
			"<div>First name is: <span>Frederick Bloggs</span></div>\n" +
			"<div>Other name is: <span>Joseph Smith</span></div>\n" +
			"</div>\n" +
			"\n";

	String with02ResultThymol =
			"\n" +
			"<div class=\"margin\">\n" +
			"<div><a href=\"../../documentation.html\" onclick=\"clickthing(this,'../../index.html')\">documentation</a></div>\n" +
			"</div>\n" +
			"\n\n\n";

	String with02ResultThymeleaf =
			"\n" +
			"<div class=\"margin\">\n" +
			"<div><a onclick=\"clickthing(this,'../../index.html')\" href=\"../../documentation.html\">documentation</a></div>\n" +
			"</div>\n" +
			"\n\n\n";

	String locale01Result =
			"\n" +
			"<div>Sausage is sausage!</div>\n" +
			"<div>We went to Downing St to meet with Harold Wilson and share some beer &amp; sandwiches.</div>\n" +
			"\n";

	String locale02Result =
			"\n" +
			"<div>Banger is sausage!</div>\n" +
			"<div>We went to Downing St to meet with Harold Wilson and share some beer &amp; sandwiches.</div>\n" +
			"\n";

	String locale03Result =
			"\n" +
			"<div>Hot Dog is sausage!</div>\n" +
			"<div>We went to Downing St to meet with Harold Wilson and share some beer &amp; sandwiches.</div>\n" +
			"\n";

	String locale04Result =
			"\n" +
			"<div>Sausage is sausage!</div>\n" +
			"<div>We went to Downing St to meet with Harold Wilson and share some beer &amp; sandwiches.</div>\n" +
			"\n";

	String locale05Result =
			"\n" +
			"<div>\"I CUmberland 4J\" is sausage!</div>\n" +
			"<div>We went to Downing St to meet with Harold Wilson and share some beer &amp; sandwiches.</div>\n" +
			"\n";

	String prefix01Result = 
			"hello\n" + 
			"\u00a9 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User isn't in any known group\n" + 
			"Back";

	private Context thymol20WithBaseContext = new Context( "thymol20/with/" );
	
	@Test
	public void with01() {
		localise(  thymol20WithBaseContext );
		String result = getResult( "with01.html", ResultMode.HTML );
		assertEquals( clean( with01Result ), clean( result ) );
	}

	private Context getThymol20With02Context() {		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();		
		variables.put( "level", "../../" );
	    return thymol20WithBaseContext.copy().setVariables( variables );		
	}
	
	@Test
	public void with02() {
		localise( getThymol20With02Context() );
		String result = getResult( "with02.html", ResultMode.HTML );		
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( with02ResultThymol ), clean( result ) );			
		}
		else {			
			assertEquals( clean( with02ResultThymeleaf ), clean( result ) );			
		}
	}

	Context thymol20LocaleBaseContext = new Context( "thymol20/locale/" );
	
	
	@Test
	public void locale01() {
		localise( thymol20LocaleBaseContext.copy().setLocale( new Locale( "es", "", "" ) ) );		
		String result;
		if( expectNodeResult() ) {
			result = getResult( "locale-example1-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "locale-example1.html", ResultMode.HTML );
		}
		assertEquals( clean( locale01Result ), clean( result ) );
	}

	@Test
	public void locale02() {
		localise( thymol20LocaleBaseContext.copy().setLocale( new Locale( "en", "GB", "" ) ) );		
		String result;
		if( expectNodeResult() ) {
			result = getResult( "locale-example2-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "locale-example2.html", ResultMode.HTML );
		}
		assertEquals( clean( locale02Result ), clean( result ) );
	}

	@Test
	public void locale03() {
		localise( thymol20LocaleBaseContext.copy().setLocale( new Locale( "en", "US", "" ) ) );		
		String result;
		if( expectNodeResult() ) {
			result = getResult( "locale-example3-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "locale-example3.html", ResultMode.HTML );
		}
		assertEquals( clean( locale03Result ), clean( result ) );
	}

	@Test
	public void locale04() {
		localise( thymol20LocaleBaseContext.copy().setLocale( new Locale( "gl", "" ) ) );		
		String result;
		if( expectNodeResult() ) {
			result = getResult( "locale-example4-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "locale-example4.html", ResultMode.HTML );
		}
		assertEquals( clean( locale04Result ), clean( result ) );
	}

	@Test
	public void locale05() {
		localise( thymol20LocaleBaseContext.copy().setLocale( new Locale( "en", "GB", "ICU4J" ) ) );		
		String result;
		if( expectNodeResult() ) {
			result = getResult( "locale-example5-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "locale-example5.html", ResultMode.HTML );
		}
		assertEquals( clean( locale05Result ), clean( result ) );
	}

	Context thymol20PrefixContext = new Context( "thymol20/prefix/" );
	
	@Test
	public void prefix01() {
		localise( thymol20PrefixContext );
		String result = getResult( "prefix01.html", ResultMode.TEXT );
		if( expectThymolResult() ) {
			assertEquals( clean( prefix01Result ), clean( result ) );			
		}
	}

	@Test
	public void prefix02() {
		localise( thymol20PrefixContext );
		String result = getResult( "prefix02.html", ResultMode.TEXT );
		if( expectThymolResult() ) {
			assertEquals( clean( prefix01Result ), clean( result ) );			
		}
	}

	@Test
	public void prefix02a() {
		localise( thymol20PrefixContext );
		String result = getResult( "prefix02a.html", ResultMode.TEXT );
		if( expectThymolResult() ) {
			assertEquals( clean( prefix01Result ), clean( result ) );			
		}
	}

	@Test
	public void prefix02b() {
		localise( thymol20PrefixContext );
		String result = getResult( "prefix02b.html", ResultMode.TEXT );
		if( expectThymolResult() ) {
			assertEquals( clean( prefix01Result ), clean( result ) );			
		}
	}

	@Test
	public void prefix03() {
		localise( thymol20PrefixContext );
		String result = getResult( "prefix03.html", ResultMode.TEXT );
		if( expectThymolResult() ) {
			assertEquals( clean( prefix01Result ), clean( result ) );			
		}
	}
//here
	@Test
	public void prefix04() {
		localise( thymol20PrefixContext );
		String result = getResult( "prefix04.html", ResultMode.TEXT );
		if( expectThymolResult() ) {
			assertEquals( clean( prefix01Result ), clean( result ) );			
		}
	}

	@Test
	public void prefix05() {
		localise( thymol20PrefixContext );
		String result = getResult( "prefix05.html", ResultMode.TEXT );
		if( expectThymolResult() ) {
			assertEquals( clean( prefix01Result ), clean( result ) );			
		}
	}

}
