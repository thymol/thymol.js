package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class IfCases extends SeleniumCases {

	String if01Result =
			"\n" +
			"Text before\n\n\n\n" +
			"<div> \n" +
			"    Or equal\n" +
			"</div>\n" +
			"<div> \n" +
			"    Or equal\n" +
			"</div>\n" +
			"<div> \n" +
			"    Or equal\n" +
			"</div>\n" +
			"Text after \n\n\n";
	
	String if02Result = 					
			"\n" +
			"Text before\n\n\n\n" +
			"<div> \n" +
			"    Second value\n" +
			"</div>\n\n" +
			"Text after \n\n\n";

	String if03Result = 					
			"\n" +
			"Text before\n\n\n\n" +
			"<div> \n" +
			"    Second value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Third value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Fourth value\n" +
			"</div>\n\n" +
			"Text after \n\n\n\n";

	String if04Result = 					
			" \n" +
			"Text before\n\n" +
			"<div> \n" +
			"    First value\n" +
			"</div>\n\n\n\n" +
			"<div> \n" +
			"    Third value\n" +
			"</div>\n\n\n\n" +
			"<div> \n" +
			"    Fifth value\n" +
			"</div>\n\n\n\n" +
			"Text after \n\n\n";

	String if05Result = 					
			"\n" +
			"Text before\n\n" +
			"<div> \n" +
			"    First value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Second value\n" +
			"</div>\n\n\n\n\n\n" +
			"<div> \n" +
			"    Fifth value\n" +
			"</div>\n\n" +
			"Text after \n\n\n";
	
	String if06Result = 					
			"\n" +
			"Text before\n\n" +
			"<div> \n" +
			"    First value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Second value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Third value\n" +
			"</div>\n\n" +
			"<div> \n" +
			"    Fourth value\n" +
			"</div>\n\n" +
			"Text after \n\n\n";
	
	String if07Result = 					
			"\n" +
			"Text before\n\n" +
			"<div> \n" +
			"    First value\n" +
			"</div>\n\n\n\n" +
			"Text after \n\n\n";
	
	String if08Result = 					
			"\n" +
			"Text before\n\n\n\n" +
			" \n" +
			"    Or equal 01\n\n" +
			"<div></div>\n\n" +
			"Text after\n\n\n";

 	
	@Test
	public void if01() {
		localise("tests/if/");
		String result = getResult( "if01.html", ResultMode.HTML );
		assertEquals( clean( if01Result ), clean( result ) );
	}

	@Test
	public void if02() {
		localise("tests/if/");
		String result = getResult( "if02.html", ResultMode.HTML );
		assertEquals( clean( if02Result ), clean( result ) );
	}

	@Test
	public void if03() {
		localise("tests/if/");
		String result = getResult( "if03.html", ResultMode.HTML );
		assertEquals( clean( if03Result ), clean( result ) );
	}

	@Test
	public void if04() {
		localise("tests/if/");
		String result = getResult( "if04.html", ResultMode.HTML );
		assertEquals( clean( if04Result ), clean( result ) );
	}

	@Test
	public void if05() {
		localise("tests/if/");
		String result = getResult( "if05.html", ResultMode.HTML );
		assertEquals( clean( if05Result ), clean( result ) );
	}

	@Test
	public void if06() {
		localise("tests/if/");
		String result = getResult( "if06.html", ResultMode.HTML );
		assertEquals( clean( if06Result ), clean( result ) );
	}

	@Test
	public void if07() {
		localise("tests/if/");
		String result = getResult( "if07.html", ResultMode.HTML );
		assertEquals( clean( if07Result ), clean( result ) );
	}

	@Test
	public void if08() {
		localise("tests/if/");
		String result = getResult( "if08.html", ResultMode.HTML );
		assertEquals( clean( if08Result ), clean( result ) );
	}

}
