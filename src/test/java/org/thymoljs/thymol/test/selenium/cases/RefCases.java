package org.thymoljs.thymol.test.selenium.cases;

//import static org.junit.Assert.assertEquals;
import static org.junit.Assert.*;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class RefCases extends SeleniumCases {

	String ref01Result =
			"\n" +
			"Text before\n" +
			"<div>Is Equal 1</div>\n" +
			"<div>Is Equal 2</div>\n" +
			"<div>Is Equal 3</div>\n" +
			"<div>Is Equal 4</div>\n" +
			"<div>Is Equal 4a</div>\n" +
			"<div>Is Equal 4b</div>\n" +
			"<div>Is Equal 5</div>\n" +
			"<div>Is Equal 5a</div>\n" +
			"Text after \n" +
			"\n\n\n\n\n";
 		
	String ref02Result =
			"\n" +
			"Text before\n" +
			"<div>1</div>\n" +
			"<div>Pineapple</div>\n" +
			"Text after \n" +
			"\n\n\n\n\n";
 	
	String ref03Result =
			"\n" +
			"Text before\n" +
			"<div>Peach</div>\n" +
			"<div>Celery</div>\n" +
			"<div>Pineapple</div>\n" +
			"<div>Peach</div>\n" +
			"<div>Apricot</div>\n" +
			"Text after \n" +
			"\n\n\n\n\n";
 	
	@Test
	public void ref01() {
		localise("refs/");
		String result = getResult( "ref01.html", ResultMode.HTML );
		assertEquals( clean(ref01Result), clean(result) );
	}

	@Test
	public void ref02() {
		localise("refs/");
		String result = getResult( "ref02.html", ResultMode.HTML );
		assertEquals( clean(ref02Result), clean(result) );
	}

	@Test
	public void ref03() {
		localise("refs/");
		String result = getResult( "ref03.html", ResultMode.HTML );
		assertEquals( clean(ref03Result), clean(result) );
	}

}
