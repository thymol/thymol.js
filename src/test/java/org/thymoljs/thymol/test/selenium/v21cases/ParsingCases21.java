package org.thymoljs.thymol.test.selenium.v21cases;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class ParsingCases21 extends SeleniumCases {

	String parsing01Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"  <span>Something here!</span>\n" +
			"</div>\n" +
			"\n\n";	 			
	
	String parsing02Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"  <span>Something here!</span>\n" +
			"</div>\n" +
			"\n\n";	 			

	String parsing03Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"    <td>Spain</td>\n" +
			"  </tr>\n" +
			"  \n" +
			"<tr>\n" +
			"    <td>Lisboa</td>\n" +
			"    <td>Portugal</td>\n" +
			"  </tr><tr>\n" +
			"    <td>Paris</td>\n" +
			"    <td>France</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";	 			

	String parsing04Result =
			"\n" +
			"<table>\n" +
			"  </table>\n" +
			"\n\n";	 			

	String parsing05Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"    \n" +
			"  </tr>\n" +
			"  \n<tr>\n" +
			"    <td>Lisboa</td>\n" +
			"    \n" +
			"  </tr><tr>\n" +
			"    <td>Paris</td>\n" +
			"    \n" +
			"  </tr></tbody></table>\n" +
			"\n\n";	 			

	String parsing06Result =
			"\n" +
			"<span>before</span>\n" +
			"<div>Hello, World!</div>\n" +
			"<span>after</span>\n" +
			"\n\n";	 			

	String parsing07ResultThymol =
			"\n" +
			"<table>\n" +
			"   \n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Spain</td>\n" +
			"  </tr>\n" +
			"  \n" +
			"  \n" +
			"</tbody> \n" +
			"  <tbody><tr>\n" +
			"    <td>Lisboa</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Portugal</td>\n" +
			"  </tr>\n" +
			"  \n" +
			"  \n" +
			"</tbody> \n" +
			"  <tbody><tr>\n" +
			"    <td>Paris</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>France</td>\n" +
			"  </tr>\n" +
			"  \n" +
			"  \n" +
			"</tbody></table>\n" +
			"\n\n";	 			

	String parsing07ResultThymeleaf =
			"\n" +
			"<table>\n" +
			"    \n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Spain</td>\n" +
			"  </tr>\n" +
			"   \n" +
			"    \n" +
			"  <tr>\n" +
			"    <td>Lisboa</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Portugal</td>\n" +
			"  </tr>\n" +
			"   \n" +
			"    \n" +
			"  <tr>\n" +
			"    <td>Paris</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>France</td>\n" +
			"  </tr>\n" +
			"    \n" +
			"  \n" +
			"</tbody></table>\n" +
			"\n\n";	 			
	
	String parsing07aResultThymol = 		
			"\n" +
			"<table>\n" +
			"    \n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Spain</td>\n" +
			"  </tr>\n" +
			"   \n" +
			"    \n" +
			"  <tr>\n" +
			"    <td>Lisboa</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Portugal</td>\n" +
			"  </tr>\n" +
			"   \n" +
			"    \n" +
			"  <tr>\n" +
			"    <td>Paris</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>France</td>\n" +
			"  </tr>\n" +
			"    \n" +
			"  \n" +
			"</tbody></table>\n" +
			"\n\n";	 			
	
	String parsing07aResultThymeleaf = 		
			"\n" +
			"<table>\n" +
			"    \n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Spain</td>\n" +
			"  </tr>\n" +
			"   \n" +
			"    \n" +
			"  <tr>\n" +
			"    <td>Lisboa</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Portugal</td>\n" +
			"  </tr>\n" +
			"   \n" +
			"    \n" +
			"  <tr>\n" +
			"    <td>Paris</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>France</td>\n" +
			"  </tr>\n" +
			"    \n" +
			"  \n" +
			"</tbody></table>\n" +
			"\n\n";	 			
	
	String parsing07bResultThymol = 		
			"\n" +
			"<table>\n" +
			"    \n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Spain</td>  <td>Other</td>  \n" +
			"  </tr>\n" +
			"  \n" +
			"  \n" +
			"</tbody> \n" +
			"  <tbody><tr>\n" +
			"    <td>Lisboa</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Portugal</td>  <td>Other</td>  \n" +
			"  </tr>\n" +
			"  \n" +
			"  \n" +
			"</tbody> \n" +
			"  <tbody><tr>\n" +
			"    <td>Paris</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>France</td>  <td>Other</td>  \n" +
			"  </tr>\n" +
			"  \n" +
			"  \n" +
			"</tbody></table>\n" +
			"\n\n";	 			
	
	String parsing07bResultThymeleaf = 		
			"\n" +
			"<table>\n" +
			"    \n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Spain</td>  <td>Other</td>  \n" +
			"  </tr>\n" +
			"   \n" +
			"    \n" +
			"  <tr>\n" +
			"    <td>Lisboa</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>Portugal</td>  <td>Other</td>  \n" +
			"  </tr>\n" +
			"   \n" +
			"    \n" +
			"  <tr>\n" +
			"    <td>Paris</td>\n" +
			"  </tr>\n" +
			"  <tr>\n" +
			"    <td>France</td>  <td>Other</td>  \n" +
			"  </tr>\n" +
			"    \n" +
			"  \n" +
			"</tbody></table>\n" +
			"\n\n";	 			
	
	String parsing08Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"  <span>Something here!</span>\n" +
			"</div>\n" +
			"\n\n";	 			

	String parsing09Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"  <span>Something here!</span>\n" +
			"</div>\n" +
			"\n\n";	 			

	String parsing10Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"    <td>Spain</td>\n" +
			"  </tr>\n" +
			"  \n" +
			"<tr>\n" +
			"    <td>Lisboa</td>\n" +
			"    <td>Portugal</td>\n" +
			"  </tr><tr>\n" +
			"    <td>Paris</td>\n" +
			"    <td>France</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";	 			

	String parsing11Result =
			"\n" +
			"<table>\n" +
			"  </table>\n" +
			"\n\n";	 			

	String parsing12Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"  <span>Something here!</span>\n" +
			"</div>\n" +
			"\n\n";	 			

	String parsing13Result =
			"\n" +
			"<div>\n" +
			"  \n" +
			"  <span>Something here!</span>\n" +
			"</div>\n" +
			"\n\n";	 			

	String parsing14Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>Madrid</td>\n" +
			"    <td>Spain</td>\n" +
			"  </tr>\n" +
			"  \n" +
			"<tr>\n" +
			"    <td>Lisboa</td>\n" +
			"    <td>Portugal</td>\n" +
			"  </tr><tr>\n" +
			"    <td>Paris</td>\n" +
			"    <td>France</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";	 			

	String parsing15Result =
			"\n" +
			"<table>\n  </table>\n" +
			"\n\n";	 			

	String parsing16Result =
			"\n" +
			"<!-- Hello! -->\n" +
			"\n\n\n\n" +
			"\n\n";	 			

	String parsing17Result =
			"\n" +
			"<!-- Hello! -->\n" +
			"\n\n\n\n" +
			"\n\n";	 			

	String parsing18Result =
			"\n" +
			"<!-- Hello! -->\n" +
			"\n\n\n\n" +
			"\n\n";	 			

	@Test
	public void parsing01() {
		localise("tests21/parsing/");
		String result = getResult( "parsing01.html", false );
		assertEquals( clean( parsing01Result ), clean( result ) );
	}

	@Test
	public void parsing02() {
		localise("tests21/parsing/");
		String result = getResult( "parsing02.html", false );
		assertEquals( clean( parsing02Result ), clean( result ) );
	}

	@Test
	public void parsing03() {
		localise("tests21/parsing/");
		String result = getResult( "parsing03.html", false );
		assertEquals( clean( parsing03Result ), clean( result ) );
	}

	@Test
	public void parsing04() {
		localise("tests21/parsing/");
		String result = getResult( "parsing04.html", false );
		assertEquals( clean( parsing04Result ), clean( result ) );
	}

	@Test
	public void parsing05() {
		localise("tests21/parsing/");
		String result = getResult( "parsing05.html", false );
		assertEquals( clean( parsing05Result ), clean( result ) );
	}

	@Test
	public void parsing06() {
		localise("tests21/parsing/");
		String result = getResult( "parsing06.html", false );
		assertEquals( clean( parsing06Result ), clean( result ) );
	}

	@Test
	public void parsing07() {
		localise("tests21/parsing/");
		String result = getResult( "parsing07.html", false );
		if( expectThymolResult() ) {
			assertEquals( clean( parsing07ResultThymol ), clean( result ) );			
		}
		else {			
			assertEquals( "**WARNING** test parsing07 using Thymeleaf passed with concession!", clean( parsing07ResultThymeleaf ), clean( result ) );			
		}
	}

	@Test
	public void parsing07a() {
		localise("tests21/parsing/");
		String result = getResult( "parsing07a.html", false );
		if( expectThymolResult() ) {
			assertEquals( clean( parsing07aResultThymol ), clean( result ) );			
		}
		else {			
			assertEquals( "**WARNING** test parsing07a using Thymeleaf passed with concession!", clean( parsing07aResultThymeleaf ), clean( result ) );			
		}
	}

	@Test
	public void parsing07b() {
		localise("tests21/parsing/");
		String result = getResult( "parsing07b.html", false );
		if( expectThymolResult() ) {
			assertEquals( clean( parsing07bResultThymol ), clean( result ) );			
		}
		else {			
			assertEquals( "**WARNING** test parsing07b using Thymeleaf passed with concession!", clean( parsing07bResultThymeleaf ), clean( result ) );			
		}
	}

	@Test
	public void parsing08() {
		localise("tests21/parsing/");
		String result = getResult( "parsing08.html", false );
		assertEquals( clean( parsing08Result ), clean( result ) );
	}

	@Test
	public void parsing09() {
		localise("tests21/parsing/");
		String result = getResult( "parsing09.html", false );
		assertEquals( clean( parsing09Result ), clean( result ) );
	}

	@Test
	public void parsing10() {
		localise("tests21/parsing/");
		String result = getResult( "parsing10.html", false );
		assertEquals( clean( parsing10Result ), clean( result ) );
	}

	@Test
	public void parsing11() {
		localise("tests21/parsing/");
		String result = getResult( "parsing11.html", false );
		assertEquals( clean( parsing11Result ), clean( result ) );
	}

	@Test
	public void parsing12() {
		localise("tests21/parsing/");
		String result = getResult( "parsing12.html", false );
		assertEquals( clean( parsing12Result ), clean( result ) );
	}

	@Test
	public void parsing13() {
		localise("tests21/parsing/");
		String result = getResult( "parsing13.html", false );
		assertEquals( clean( parsing13Result ), clean( result ) );
	}

	@Test
	public void parsing14() {
		localise("tests21/parsing/");
		String result = getResult( "parsing14.html", false );
		assertEquals( clean( parsing14Result ), clean( result ) );
	}

	@Test
	public void parsing15() {
		localise("tests21/parsing/");
		String result = getResult( "parsing15.html", false );
		assertEquals( clean( parsing15Result ), clean( result ) );
	}

	@Test
	public void parsing16() {
		localise("tests21/parsing/");
		String result = getResult( "parsing16.html", false );
		assertEquals( clean( parsing16Result ), clean( result ) );
	}

	@Test
	public void parsing17() {
		localise("tests21/parsing/");
		String result = getResult( "parsing17.html", false );
		assertEquals( clean( parsing17Result ), clean( result ) );
	}

	@Test
	public void parsing18() {
		localise("tests21/parsing/");
		String result = getResult( "parsing18.html", false );
		assertEquals( clean( parsing18Result ), clean( result ) );
	}

}
