package org.thymoljs.thymol.test.selenium.v21cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class BlockCases21 extends SeleniumCases {
	
	Context blockBaseContext = new Context( "tests21/block/" );

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

	String block10aResult =
			"\n" +
			"<table>\n" +
			"<tbody>\n" +
			"<tr><td>admin</td><td>John Jones</td></tr>\n" +
			"<tr><td colspan=\"2\">London</td></tr>\n" +
			"</tbody>\n" +
			"<tbody>\n" +
			"<tr><td>manager</td><td>Fred Bloggs</td></tr><tr>\n" +
			"<td colspan=\"2\">Birmingham</td></tr>\n" +
			"</tbody>\n" +
			"<tbody>\n" +
			"<tr><td>worker</td><td>Adam Smith</td></tr>\n" +
			"<tr><td colspan=\"2\">Liverpool</td></tr>\n" +
			"</tbody>\n" +
			"</table>\n" +
			"\n\n";	 			

	String block10aResultThymeleaf =
			"\n" +
			"<table>\n" +
			"<tbody>\n" +
			"<tr><td>admin</td><td>John Jones</td></tr>\n" +
			"<tr><td colspan=\"2\">London</td></tr>\n" +
			"<tr><td>manager</td><td>Fred Bloggs</td></tr><tr>\n" +
			"<td colspan=\"2\">Birmingham</td></tr>\n" +
			"<tr><td>worker</td><td>Adam Smith</td></tr>\n" +
			"<tr><td colspan=\"2\">Liverpool</td></tr>\n" +
			"</tbody>\n" +
			"</table>\n" +
			"\n\n";	 			

	String block10bResult =
			"\n" +
			"<table>\n" +
			"<tbody>\n" +
			"<tr><td>admin</td><td>John Jones</td></tr>\n" +
			"<tr><td colspan=\"2\">London</td></tr>\n" +
			"<tr><td>manager</td><td>Fred Bloggs</td></tr><tr>\n" +
			"<td colspan=\"2\">Birmingham</td></tr>\n" +
			"<tr><td>worker</td><td>Adam Smith</td></tr>\n" +
			"<tr><td colspan=\"2\">Liverpool</td></tr>\n" +
			"</tbody>\n" +
			"</table>\n" +
			"\n\n";	 			

	String block10bResultThymeleaf =
			"\n" +
			"<table>\n" +
			"<tbody>\n" +
			"<tr><td>admin</td><td>John Jones</td></tr>\n" +
			"<tr><td colspan=\"2\">London</td></tr>\n" +
			"<tr><td>manager</td><td>Fred Bloggs</td></tr><tr>\n" +
			"<td colspan=\"2\">Birmingham</td></tr>\n" +
			"<tr><td>worker</td><td>Adam Smith</td></tr>\n" +
			"<tr><td colspan=\"2\">Liverpool</td></tr>\n" +
			"</tbody>\n" +
			"</table>\n" +
			"\n\n";	 				
	
	private Context getBlockContext() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();

		List< Object > caps = new LinkedList< Object >();
		
		Map< String, Object > cap1Var = new LinkedHashMap< String, Object >();
		cap1Var.put("city", "Madrid");
		cap1Var.put("country", "Spain");
		variables.put( "cap1", "cap1Var" );		
		caps.add(cap1Var);
		
		Map< String, Object > cap2Var = new LinkedHashMap< String, Object >();
		cap2Var.put("city", "Lisboa");
		cap2Var.put("country", "Portugal");
		variables.put( "cap2", "cap2Var" );		
		caps.add(cap2Var);
		
		Map< String, Object > cap3Var = new LinkedHashMap< String, Object >();
		cap3Var.put("city", "Paris");
		cap3Var.put("country", "France");
		variables.put( "cap3", "cap3Var" );		
		caps.add(cap3Var);
		
		variables.put( "caps", caps );		
		
		variables.put( "msg", "Hello, World!" );
		
		variables.put( "caps0", new LinkedList< Object >() );		
		
		variables.put( "text", "Hello!" );		
		
		return blockBaseContext.copy().setVariables( variables );
	}
	
	private Context blockContext = getBlockContext(); 
	
	
	@Test
	public void block01() {
		localise( blockContext );
		String result = getResult( "block01.html", ResultMode.HTML );
		assertEquals( clean( block01Result ), clean( result ) );
	}

	@Test
	public void block02() {
		localise( blockContext );
		String result = getResult( "block02.html", ResultMode.HTML );
		assertEquals( clean( block02Result ), clean( result ) );
	}

	@Test
	public void block03() {
		localise( blockContext );
		String result = getResult( "block03.html", ResultMode.HTML );
		assertEquals( clean( block03Result ), clean( result ) );
	}

	@Test
	public void block04() {
		localise( blockContext );
		String result = getResult( "block04.html", ResultMode.HTML );
		assertEquals( clean( block04Result ), clean( result ) );
	}

	@Test
	public void block05() {
		localise( blockContext );
		String result = getResult( "block05.html", ResultMode.HTML );
		assertEquals( clean( block05Result ), clean( result ) );
	}


	private Context getBlock10Context() {
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		List< Object > users = new LinkedList< Object >();
		
		Map< String, Object > user1Var = new LinkedHashMap< String, Object >();
		user1Var.put("login", "admin");
		user1Var.put("name", "John Jones");
		user1Var.put("address", "London");
		variables.put( "user1", "user1Var" );		
		users.add(user1Var);
		
		Map< String, Object > user2Var = new LinkedHashMap< String, Object >();
		user2Var.put("login", "manager");
		user2Var.put("name", "Fred Bloggs");
		user2Var.put("address", "Birmingham");
		variables.put( "user2", "user2Var" );		
		users.add(user2Var);
		
		Map< String, Object > user3Var = new LinkedHashMap< String, Object >();
		user3Var.put("login", "worker");
		user3Var.put("name", "Adam Smith");
		user3Var.put("address", "Liverpool");
		variables.put( "user3", "user3Var" );		
		users.add(user3Var);
		
		variables.put( "users", users );		
				
		return blockBaseContext.copy().setVariables( variables );
	}
	
	private Context block10Context = getBlock10Context(); 
	
	
	@Test
	public void block10a() {
		localise( block10Context );
		String result = getResult( "block10-a.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( block10aResult ), clean( result ) );
		}
		else {			
			assertEquals( clean( block10aResultThymeleaf ), clean(result) );			
		}
	}

	@Test
	public void block10b() {
		localise( block10Context );
		String result = getResult( "block10-b.html", ResultMode.HTML );		
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( block10bResult ), clean( result ) );
		}
		else {			
			assertEquals( clean( block10bResultThymeleaf ), clean(result) );			
		}
	}
	
}
