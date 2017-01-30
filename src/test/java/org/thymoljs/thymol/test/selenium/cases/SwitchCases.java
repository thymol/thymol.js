package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class SwitchCases extends SeleniumCases {

	Context switchBaseContext = new Context( "tests/switch/" );
	
	String switch01Result = 					
			"<div></div><div><p>User is an administrator</p></div><div><p>User is a manager</p></div>";

	String switch02Result = 					
			"<div><p>User is some other thing</p></div><div><p>User is an administrator</p></div><div><p>User is a manager</p></div>";

	String switch03Result = 					
			"<div><p>User is some other thing</p></div><div><p>User is some other thing</p></div><div><p>User is some other thing</p></div>";

 	
	private Context getSwitchContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
				
		Map< String, Object > user1Var = new LinkedHashMap< String, Object >();
		user1Var.put( "name", "Jack Melon" );
		user1Var.put( "role", "finance" );
		variables.put( "user1", user1Var );
		
		Map< String, Object > user2Var = new LinkedHashMap< String, Object >();
		user2Var.put( "name", "Elizabeth Carrot" );
		user2Var.put( "role", "admin" );
		variables.put( "user2", user2Var );
		
		Map< String, Object > user3Var = new LinkedHashMap< String, Object >();
		user3Var.put( "name", "Marie Ann Cho" );
		user3Var.put( "role", "mgmnt" );
		variables.put( "user3", user3Var );

//		variables.put( "roles.manager", "mgmnt" );
		
	    return switchBaseContext.copy().setVariables( variables );
		
	}
	
	private Context switchContext = getSwitchContext();
	
	@Test
	public void switch01() {
		localise( switchContext );
		String result = getResult( "switch01.html", ResultMode.HTML );
		assertEquals( clean( switch01Result ), clean( result ) );
	}

	@Test
	public void switch01a() {
		localise( switchContext );
		String result = getResult( "switch01a.html", ResultMode.HTML );
		assertEquals( clean( switch01Result ), clean( result ) );
	}

	@Test
	public void switch02() {
		localise( switchContext );
		String result = getResult( "switch02.html", ResultMode.HTML );
		assertEquals( clean( switch02Result ), clean( result ) );
	}

	@Test
	public void switch02a() {
		localise( switchContext );
		String result = getResult( "switch02a.html", ResultMode.HTML );
		assertEquals( clean( switch02Result ), clean( result ) );
	}
	
	@Test
	public void switch03() {
		localise( switchContext );
		String result = getResult( "switch03.html", ResultMode.HTML );
		assertEquals( clean( switch03Result ), clean( result ) );
	}
	
	@Test
	public void switch03a() {
		localise( switchContext );
		String result = getResult( "switch03a.html", ResultMode.HTML );
		assertEquals( clean( switch03Result ), clean( result ) );
	}

}
