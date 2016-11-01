package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

import org.junit.Test;

public class InlineCases extends SeleniumCases {

	Context inlineBaseContext = new Context( "tests/inline/" );
	
	String inline01Result = 		
			"\n" +
			"<script> \n" +
			"    var foo1 = 'fooo!'; \n" +
			"    var foo2 = 'fooo!'; // some comment like \"will be replaced by thymeleaf\"\n" +
			"</script> \n" +
			"\n\n";
	
	String inline02Result = 		
			"\n" +
			"<script> \n" +
			"    var foo1 = 'fooo!'; \n" +
			"    var foo2 = 'fooo!'; // some comment like \"will be replaced by thymeleaf\"\n" +
			"</script> \n" +
			"\n\n";
 		
	String inline03ResultThymol = 		
			"\n" +
			"<script> \n" +
			"    objArray: {\n" +
			"        obj1: {\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        },\n" +
			"        obj2: {\n" +
			"            attr21: 'fooo!',\n" +
			"            attr22: 'fooo!', // some comment here\n" +
			"            attr23: 'fooo!' // some comment here\n" +
			"        }\n" +
			"    }\n" +
			"</script> \n" +
			"\n\n";
 	
	String inline03ResultThymeleaf = 		
			"\n" +
			"<script> \n" +
			"    objArray: {\n" +
			"        obj1: {\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        },\n" +
			"        obj2: {\n" +
			"            attr21: 'fooo!',\n" +
			"            attr22: 'fooo!', // some comment here\n" +
			"            attr23: 'fooo!'// some comment here\n" +
			"        }\n" +
			"    }\n" +
			"</script> \n" +
			"\n\n";
 	
	String inline04ResultThymol = 		
			"\n" +
			"<script> \n" +
			"    objArray: {\n" +
			"        obj1: {\n" +
			"            attr11: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr12: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr13: 'http://www.thymeleaf.org/download.html'\n" +
			"        },\n" +
			"        obj2: {\n" +
			"            attr21: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr22: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr23: 'http://www.thymeleaf.org/download.html' // some comment here\n" +
			"        },\n" +
			"        obj3: {\n" +
			"            attr11: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr12: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr13: 'http://www.thymeleaf.org/download.html'\n" +
			"        }\n" +
			"    }\n" +
			"</script> \n" +
			"\n\n";
 	
	String inline04ResultThymeleaf = 		
			"\n" +
			"<script> \n" +
			"    objArray: {\n" +
			"        obj1: {\n" +
			"            attr11: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr12: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr13: 'http://www.thymeleaf.org/download.html'\n" +
			"        },\n" +
			"        obj2: {\n" +
			"            attr21: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr22: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr23: 'http://www.thymeleaf.org/download.html'// some comment here\n" +
			"        },\n" +
			"        obj3: {\n" +
			"            attr11: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr12: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr13: 'http://www.thymeleaf.org/download.html'\n" +
			"        }\n" +
			"    }\n" +
			"</script> \n" +
			"\n\n";
 	
	String inline05ResultThymol = 		
			"\n" +
			"<script> \n" +
			"    objArray: {\n" +
			"        obj1: {\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        },\n" +
			"        obj2: {\n" +
			"            attr21: 'fooo!',\n" +
			"            attr22: 'fooo!',\n" +
			"            attr23: 'fooo!' // some comment here\n" +
			"        },\n" +
			"        obj3: {\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        }\n" +
			"    }\n" +
			"</script> \n" +
			"\n\n";
 	
	String inline05ResultThymeleaf = 		
			"\n" +
			"<script> \n" +
			"    objArray: {\n" +
			"        obj1: {\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        },\n" +
			"        obj2: {\n" +
			"            attr21: 'fooo!',\n" +
			"            attr22: 'fooo!',\n" +
			"            attr23: 'fooo!'// some comment here\n" +
			"        },\n" +
			"        obj3: {\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        }\n" +
			"    }\n" +
			"</script> \n" +
			"\n\n";
 	
	String inline06Result = 		
			"\n" +
			"<script> \n" +
			"    var userRoles = ['MANAGER','SALES'];\n" +
			"</script> \n" +
			"\n\n";
 	
	String inline07Result = 		
			"\n" +
			"<script> \n" +
			"    var obj = {'a':'12','ba':'lala'};\n" +
			"    var obj = {'a':'12','ba':'lala'};\n" +
			"</script>\n" +
			"\n\n";
 	
	String inline08Result = 		
			"\n" +
			"<p>before</p>\n" +
			"\n" +
			"Hi there!\n" +
			"\n" +
			"<p>after</p>\n" +
			"\n\n";
 	
	String inline09Result = 		
			"\n" +
			"<p>before</p>\n" +
			"\n" +
			"Hi there!\n" +
			"\n" +
			"<p>after</p>\n" +
			"\n\n";
 	
	String inline10Result = 		
			"\n" +
			"<script>\n" +
			"  var data = {\n" +
			"    id: 'fooo!'\n" +
			"  };\n" +
			"</script>\n" +
			"\n\n";
 	
	String inline11Result = 		
			"\n" +
			"<script type=\"text/javascript\">\n" +
			"    /* <![CDATA[ */\n" +
			"            fooUrl:'/fooservice/foo/',\n" +
			"            barUrl:'/barservice/bar/';\n" +
			"    /* ]]> */\n" +
			"</script>\n" +
			"\n\n";
 	
	String inline12Result = 		
			"\n" +
			"<div>\n" +
			"    Hello, fooo!!\n" +
			"</div>\n" +
			"\n\n";
 	
	String inline13Result = 		
			"\n" +
			"<div>\n" +
			"    Hello, bigger!\n" +
			"</div>\n" +
			"\n\n";
 	
	String inline14Result = 		
			"\n" +
			"<div>\n" +
			"    Hello, bigger!\n" +
			"</div>\n" +
			"\n\n";
 	
	String inline_body_Result = 		
			"\n" +
			"<div>\n" +
			"    Hello, lower :-(\n" +
			"\t<div>\n" +
			"\t    Also, bigger!\n" +
			"\t</div>\n" +
			"\t<div>\n" +
			"\t\t<span>Hello, fooo!!</span>\n" +
			"\t\t<div>\n" +
			"\t\t\t<span>Somevar Test!</span>\n" +
			"\t\t\tHi there!\n" +
			"\t\t</div>\n" +
			"\t</div>\n" +
			"</div>\n" +
			"\n\n";
 		
	private Context getInlineContext() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
				
		Map< String, Object > objVar = new LinkedHashMap< String, Object >();
		objVar.put("a", "12" );
		objVar.put("ba", "lala" );
		variables.put( "obj", objVar );		

		List< String > userRoles = new LinkedList< String >();
		userRoles.add("MANAGER");
		userRoles.add("SALES");
		variables.put( "userRoles", userRoles );		
		
		variables.put( "foo", "fooo!" );		
		variables.put( "someVar", "Hi there!" );		
	
		variables.put( "value", 23 );
		
		return inlineBaseContext.copy().setVariables( variables );
		
	}
	
	private Context inlineContext = getInlineContext();

	
	@Test
	public void inline01() {
		localise( inlineContext );
		String result = getResult( "inline01.html", ResultMode.HTML );
		assertEquals( clean(inline01Result), clean(result) );			
	}

	@Test
	public void inline02() {
		localise( inlineContext );
		String result = getResult( "inline02.html", ResultMode.HTML );
		assertEquals( clean(inline02Result), clean(result) );			
	}

	@Test
	public void inline03() {
		localise( inlineContext );
		String result = getResult( "inline03.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean(inline03ResultThymol), clean(result) );			
		}
		else {			
			assertEquals( clean(inline03ResultThymeleaf), clean(result) );			
		}
	}

	@Test
	public void inline04() {
		localise( inlineContext );
		String result = getResult( "inline04.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean(inline04ResultThymol), clean(result) );			
		}
		else {			
			assertEquals( clean(inline04ResultThymeleaf), clean(result) );			
		}
	}

	@Test
	public void inline05() {
		localise( inlineContext );
		String result = getResult( "inline05.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean(inline05ResultThymol), clean(result) );			
		}
		else {			
			assertEquals( clean(inline05ResultThymeleaf), clean(result) );			
		}
	}

	@Test
	public void inline06() {
		localise( inlineContext );
		String result = getResult( "inline06.html", ResultMode.HTML );
		assertEquals( clean(inline06Result), clean(result) );			
	}

	@Test
	public void inline07() {
		localise( inlineContext );
		String result = getResult( "inline07.html", ResultMode.HTML );
		assertEquals( clean(inline07Result), clean(result) );			
	}

	@Test
	public void inline08() {
		localise( inlineContext );
		String result = getResult( "inline08.html", ResultMode.HTML );
		assertEquals( clean(inline08Result), clean(result) );			
	}

	@Test
	public void inline09() {
		localise( inlineContext );
		String result = getResult( "inline09.html", ResultMode.HTML );
		assertEquals( clean(inline09Result), clean(result) );			
	}

	@Test
	public void inline10() {
		localise( inlineContext );
		String result = getResult( "inline10.html", ResultMode.HTML );
		assertEquals( clean(inline10Result), clean(result) );			
	}

	@Test
	public void inline11() {
		localise( inlineContext );
		String result = getResult( "inline11.html", ResultMode.HTML );
		assertEquals( clean(inline11Result), clean(result) );			
	}

	@Test
	public void inline12() {
		localise( inlineContext );
		String result = getResult( "inline12.html", ResultMode.HTML );
		assertEquals( clean(inline12Result), clean(result) );			
	}

	@Test
	public void inline13() {
		localise( inlineContext );
		String result = getResult( "inline13.html", ResultMode.HTML );
		assertEquals( clean(inline13Result), clean(result) );			
	}

	@Test
	public void inline14() {
		localise( inlineContext );
		String result = getResult( "inline14.html", ResultMode.HTML );
		assertEquals( clean(inline14Result), clean(result) );			
	}

	@Test
	public void inline_body() {
		localise( inlineContext );
		String result = getResult( "inline-body.html", ResultMode.HTML );
		assertEquals( clean(inline_body_Result), clean(result) );			
	}

	@Test
	public void inline21() {
		localise( inlineContext );
		String result = getResult( "inline21.html", ResultMode.HTML );
		assertEquals( clean(inline01Result), clean(result) );			
	}

	@Test
	public void inline26() {
		localise( inlineContext );
		String result = getResult( "inline26.html", ResultMode.HTML );
		assertEquals( clean(inline06Result), clean(result) );			
	}

	@Test
	public void inline27() {
		localise( inlineContext );
		String result = getResult( "inline27.html", ResultMode.HTML );
		assertEquals( clean(inline07Result), clean(result) );			
	}

}