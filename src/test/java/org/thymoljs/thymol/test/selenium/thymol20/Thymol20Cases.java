package org.thymoljs.thymol.test.selenium.thymol20;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertEquals;

import java.util.Locale;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

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


	@Test
	public void with01() {
		localise("thymol20/with/");
		String result = getResult( "with01.html", ResultMode.HTML );
		assertEquals( clean( with01Result ), clean( result ) );
	}

	@Test
	public void with02() {
		localise("thymol20/with/");
		String result = getResult( "with02.html", ResultMode.HTML );		
		if( expectThymolResult() ) {
			assertEquals( clean( with02ResultThymol ), clean( result ) );			
		}
		else {			
			assertEquals( clean( with02ResultThymeleaf ), clean( result ) );			
		}
	}

	@Test
	public void locale01() {
		localise("thymol20/locale/", new Locale( "es", "", "" ) );
		String result = getResult( "locale-example1.html", ResultMode.HTML );
		assertEquals( clean( locale01Result ), clean( result ) );
	}

	@Test
	public void locale02() {
		localise("thymol20/locale/", new Locale( "en", "GB", "" ));
		String result = getResult( "locale-example2.html", ResultMode.HTML );
		assertEquals( clean( locale02Result ), clean( result ) );
	}

	@Test
	public void locale03() {
		localise("thymol20/locale/", new Locale( "en", "US", "" ));
		String result = getResult( "locale-example3.html", ResultMode.HTML );
		assertEquals( clean( locale03Result ), clean( result ) );
	}

	@Test
	public void locale04() {
		localise("thymol20/locale/", new Locale( "gl", "", "" ));
		String result = getResult( "locale-example4.html", ResultMode.HTML );
		assertEquals( clean( locale04Result ), clean( result ) );
	}

	@Test
	public void locale05() {
		localise("thymol20/locale/", new Locale( "en", "GB", "ICU4J" ));
		String result = getResult( "locale-example5.html", ResultMode.HTML );
		assertEquals( clean( locale05Result ), clean( result ) );
	}

}
