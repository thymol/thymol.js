package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class BlockCases21 extends SeleniumCases {

	String block01Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"    <p>Madrid</p>\n" +
			"    <span>Spain</span>\n" +
			"  \n\n" +
			"    <p>Lisboa</p>\n" +
			"    <span>Portugal</span>\n" +
			"  \n" +
			"    <p>Paris</p>\n" +
			"    <span>France</span>\n" +
			"  </div>\n" +
			"\n\n";
		
	String block02Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"    <p>Madrid</p>\n" +
			"    <span>Spain</span>\n" +
			"  \n\n" +
			"    <p>Lisboa</p>\n" +
			"    <span>Portugal</span>\n" +
			"  \n" +
			"    <p>Paris</p>\n" +
			"    <span>France</span>\n" +
			"  </div>\n" +
			"\n\n";		
	
	String block03Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"    <span>1</span>\n" +
			"    <p>Madrid</p>\n" +
			"    <span>Spain</span>\n" +
			"  \n\n" +
			"    <span>2</span>\n" +
			"    <p>Lisboa</p>\n" +
			"    <span>Portugal</span>\n" +
			"  \n" +
			"    <span>3</span>\n" +
			"    <p>Paris</p>\n" +
			"    <span>France</span>\n" +
			"  </div>\n" +
			"\n\n";

	String block04Result =
			"\n" +
			"<div>\n" +
//			"  \n" +
//			"    <span></span>\n" +
//			"    <p></p>\n" +
//			"    <span></span>\n" +
//			"  \n" +
			"</div>\n" +
			"\n\n";	 			

	String block05Result =
			"\n" +
			"<div>\n  Hello!\n</div>\n" +
			"\n\n";	 			

	@Test
	public void block01() {
		localise("tests21/block/");
		String result = getResult( "block01.html", ResultMode.HTML );
		assertEquals( clean( block01Result ), clean( result ) );
	}

	@Test
	public void block02() {
		localise("tests21/block/");
		String result = getResult( "block02.html", ResultMode.HTML );
		assertEquals( clean( block02Result ), clean( result ) );
	}

	@Test
	public void block03() {
		localise("tests21/block/");
		String result = getResult( "block03.html", ResultMode.HTML );
		assertEquals( clean( block03Result ), clean( result ) );
	}

	@Test
	public void block04() {
		localise("tests21/block/");
		String result = getResult( "block04.html", ResultMode.HTML );
		assertEquals( clean( block04Result ), clean( result ) );
	}

	@Test
	public void block05() {
		localise("tests21/block/");
		String result = getResult( "block05.html", ResultMode.HTML );
		assertEquals( clean( block05Result ), clean( result ) );
	}


}
