package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

import org.junit.Test;

public class BoolsCases extends SeleniumCases {
	
	Context boolsBaseContext = new Context( "thymol/bools/" );
	
	String bools01Result = 
			"\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>Array of booleans: <span>true,false,false,true,true,false</span></p>\n" +
			"\t\t<p>Set of booleans: <span id=\"sort\">false,true</span></p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String bools02Result = 
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>Array of booleans: <span>false,true,true,false,false,true</span></p>\n" +
			"\t\t<p>Set of booleans: <span id=\"sort\">true,false</span></p>\n" +
			"\t\n" +
			"\n\n\n";

	String bools03Result = 
			"\n" +
			"\t\t<p>Array of booleans: <span>false</span></p>\n" +
			"\t\t<p>Set of booleans: <span>false</span></p>\n" +
			"\t\t<p>Array of booleans: <span>true</span></p>\n" +
			"\t\t<p>Set of booleans: <span>true</span></p>\n" +
			"\t\t<p>Array of booleans: <span>false</span></p>\n" +
			"\t\t<p>Set of booleans: <span>false</span></p>\n" +
			"\t\n" +
			"\n\n\n";
		
	String bools04Result = 
			"\n" +
			"\t\t<p>Array of booleans: <span>true</span></p>\n" +
			"\t\t<p>Set of booleans: <span>true</span></p>\n" +
			"\t\t<p>Array of booleans: <span>true</span></p>\n" +
			"\t\t<p>Set of booleans: <span>true</span></p>\n" +
			"\t\t<p>Array of booleans: <span>false</span></p>\n" +
			"\t\t<p>Set of booleans: <span>false</span></p>\n" +
			"\t\n" +
			"\n\n\n";
	
	private Context getBoolsContext() {

		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		Object bx1 = "Hello world!";
	    String bx2 = new String("Hole mundo");
	    String bx3 = "Bonjour tout le monde!";
		double bx4 = 28.2743334/9;
		int bx5 = 1;
		int bx6 = 0;
		Object[] bxArray = {bx1,null,null,bx4,bx5,bx6};
	    variables.put( "bx1", bx1 );
	    variables.put( "bx2", bx2 );
	    variables.put( "bx3", bx3 );
	    variables.put( "bx4", bx4 );
	    variables.put( "bx5", bx5 );
	    variables.put( "bx6", bx6 );
	    variables.put( "bxArray", bxArray );
		List<Object> bxList = Arrays.asList( bxArray );
		variables.put( "bxList", bxList );
		Set<Object> bxSet = new HashSet<Object>( bxList );
		variables.put( "bxSet", bxSet );
	    
		Object[] bx2Array = {Boolean.TRUE,Boolean.TRUE,Boolean.TRUE,Boolean.TRUE};
	    variables.put( "bx2Array", bx2Array );
		List<Object> bx2List = Arrays.asList( bx2Array );
		Set<Object> bx2Set = new HashSet<Object>( bx2List );
		variables.put( "bx2Set", bx2Set );
	    	    
		Object[] bx3Array = {Boolean.FALSE,Boolean.FALSE,Boolean.FALSE,Boolean.FALSE};
	    variables.put( "bx3Array", bx3Array );
		List<Object> bx3List = Arrays.asList( bx3Array );
		Set<Object> bx3Set = new HashSet<Object>( bx3List );
		variables.put( "bx3Set", bx3Set );	    	    
		
		return boolsBaseContext.copy().setVariables( variables );

	}
	
	private Context boolsContext = getBoolsContext();
	
		
	@Test
	public void bools01() {
		localise( boolsContext );
		String result = getResult( "bools01.html", ResultMode.HTML );
		assertEquals( clean( bools01Result ), clean( result ) );
	}

	@Test
	public void bools02() {
		localise( boolsContext );
		String result = getResult( "bools02.html", ResultMode.HTML );
		assertEquals( clean( bools02Result ), clean( result ) );
	}

	@Test
	public void bools03() {
		localise( boolsContext );
		String result = getResult( "bools03.html", ResultMode.HTML );
		assertEquals( clean( bools03Result ), clean( result ) );
	}

	@Test
	public void bools04() {
		localise( boolsContext );
		String result = getResult( "bools04.html", ResultMode.HTML );
		assertEquals( clean( bools04Result ), clean( result ) );
	}

}
