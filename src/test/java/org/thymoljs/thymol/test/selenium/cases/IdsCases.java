package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class IdsCases extends SeleniumCases {
	
	String ids01Result = 
			"\n" +
			"<div id=\"thing1\">\n" +
			"<p>Next: <span>thing2</span></p>\n" +
			"</div>\n" +
			"\n" +
			"\n" +
			"<div id=\"thing2\">\n" +
			"<p>Next: <span>thing3</span></p>\n" +
			"</div><div id=\"thing3\">\n" +
			"<p>Next: <span>thing4</span></p>\n" +
			"</div><div id=\"thing4\">\n" +
			"<p>Next: <span>thing5</span></p>\n" +
			"</div><div id=\"thing5\">\n" +
			"<p>Next: <span>thing6</span></p>\n" +
			"</div><div id=\"thing6\">\n" +
			"<p>Next: <span>thing7</span></p>\n" +
			"</div><div id=\"thing7\">\n" +
			"<p>Next: <span>thing8</span></p>\n" +
			"</div><div id=\"thing8\">\n" +
			"<p>Next: <span>thing9</span></p>\n" +
			"</div><div id=\"thing9\">\n" +
			"<p>Next: <span>thing10</span></p>\n" +
			"</div><div id=\"thing10\">\n" +
			"<p>Next: <span>thing11</span></p>\n" +
			"</div>";

	String ids02Result = 
			"\n" +
			"<div id=\"thing1\">\n" +
			"<p>Next: <span>thing1</span></p>\n" +
			"</div>\n" +
			"\n" +
			"\n" +
			"<div id=\"thing2\">\n" +
			"<p>Next: <span>thing2</span></p>\n" +
			"</div><div id=\"thing3\">\n" +
			"<p>Next: <span>thing3</span></p>\n" +
			"</div><div id=\"thing4\">\n" +
			"<p>Next: <span>thing4</span></p>\n" +
			"</div><div id=\"thing5\">\n" +
			"<p>Next: <span>thing5</span></p>\n" +
			"</div><div id=\"thing6\">\n" +
			"<p>Next: <span>thing6</span></p>\n" +
			"</div><div id=\"thing7\">\n" +
			"<p>Next: <span>thing7</span></p>\n" +
			"</div><div id=\"thing8\">\n" +
			"<p>Next: <span>thing8</span></p>\n" +
			"</div><div id=\"thing9\">\n" +
			"<p>Next: <span>thing9</span></p>\n" +
			"</div><div id=\"thing10\">\n" +
			"<p>Next: <span>thing10</span></p>\n" +
			"</div>";
				
	@Test
	public void ids01() {
		localise( "thymol/ids/" );
		String result = getResult( "ids01.html", ResultMode.HTML );
		assertEquals( clean( ids01Result ), clean( result ) );
	}

	@Test
	public void ids02() {
		localise( "thymol/ids/" );
		String result = getResult( "ids02.html", ResultMode.HTML );
		assertEquals( clean( ids02Result ), clean( result ) );			
	}

}
