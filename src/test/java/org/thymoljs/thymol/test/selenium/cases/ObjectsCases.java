package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class ObjectsCases extends SeleniumCases {

	String objects01Result = 
			"\n" +
			"\t\t<p>ex1-default</p>\n" +
			"\t\t<p></p>\n" +
			"\t\t<p>Hello world!</p>\n" +
			"\t\t<p>Bonjour tout le monde!</p>\n" +
			"\t\t<p>Hola mundo!</p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\n" +
			"\n\n\n";
	
	String objects02Result = 
			"\n" +
			"\t\t<p>Array of strings: <span id=\"sort\">Hello world!,ok,ok,Kaixo mundua!</span></p>\t\t \n" +
			"\t\n" +
			"\n\n\n";
	
	String objects03Result = 
			"\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">d'accord,Kaixo mundua!,Hello world!</span></p>\n" +
			"\t\n" +
			"\n\n\n";
	
	@Test
	public void objects01() {
		localise( "thymol/objects/" );
		String result = getResult( "objects01.html", false );
		assertEquals( clean( objects01Result ), clean( result ) );
	}

	@Test
	public void objects02() {
		localise( "thymol/objects/" );
		String result = getResult( "objects02.html", false );
		assertEquals( clean( objects02Result ), clean( result ) );
	}

	@Test
	public void objects03() {
		localise( "thymol/objects/" );
		String result = getResult( "objects03.html", false );
		assertEquals( clean( objects03Result ), clean( result ) );
	}

}
