package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class ObjectsCases extends SeleniumCases {

	Context objectsBaseContext = new Context( "thymol/objects/" );
	
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
	
	private Context getObjectsContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		String ox1 = "Hello world!";
		String ox2 = "Bonjour tout le monde!";
		String ox3 = "Hola mundo!";
		String ox4 = "Kaixo mundua!";

		String[] oxArray = {ox1,null,null,ox4};
//		Arrays.sort( oxArray );

		variables.put( "ox1", ox1 );
	    variables.put( "ox2", ox2 );
	    variables.put( "ox3", ox3 );
	    variables.put( "ox4", ox4 );
	    variables.put( "oxArray", oxArray );
		List<String> oxList = Arrays.asList( oxArray );
		variables.put( "oxList", oxList );
		Set<String> oxSet = new HashSet<String>( oxList );
	    variables.put( "oxSet", oxSet );    
		
		return objectsBaseContext.copy().setVariables( variables );
		
	}
	
	private Context objectsContext = getObjectsContext();

	@Test
	public void objects01() {
		localise( objectsContext );
		String result = getResult( "objects01.html", ResultMode.HTML );
		assertEquals( clean( objects01Result ), clean( result ) );
	}

	@Test
	public void objects02() {
		localise( objectsContext );
		String result = getResult( "objects02.html", ResultMode.HTML );
		assertEquals( clean( objects02Result ), clean( result ) );
	}

	@Test
	public void objects03() {
		localise( objectsContext );
		String result = getResult( "objects03.html", ResultMode.HTML );
		assertEquals( clean( objects03Result ), clean( result ) );
	}

}
