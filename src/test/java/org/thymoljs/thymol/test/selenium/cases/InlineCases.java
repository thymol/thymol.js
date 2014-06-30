package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class InlineCases extends SeleniumCases {

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
			"        obj1:{\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        },\n" +
			"        obj2:{\n" +
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
			"        obj1:{\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        },\n" +
			"        obj2:{\n" +
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
			"        obj1:{\n" +
			"            attr11: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr12: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr13: 'http://www.thymeleaf.org/download.html'\n" +
			"        },\n" +
			"        obj2:{\n" +
			"            attr21: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr22: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr23: 'http://www.thymeleaf.org/download.html' // some comment here\n" +
			"        },\n" +
			"        obj3:{\n" +
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
			"        obj1:{\n" +
			"            attr11: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr12: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr13: 'http://www.thymeleaf.org/download.html'\n" +
			"        },\n" +
			"        obj2:{\n" +
			"            attr21: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr22: 'http://www.thymeleaf.org/download.html',\n" +
			"            attr23: 'http://www.thymeleaf.org/download.html'// some comment here\n" +
			"        },\n" +
			"        obj3:{\n" +
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
			"        obj1:{\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        },\n" +
			"        obj2:{\n" +
			"            attr21: 'fooo!',\n" +
			"            attr22: 'fooo!',\n" +
			"            attr23: 'fooo!' // some comment here\n" +
			"        },\n" +
			"        obj3:{\n" +
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
			"        obj1:{\n" +
			"            attr11: 'fooo!',\n" +
			"            attr12: 'fooo!',\n" +
			"            attr13: 'fooo!'\n" +
			"        },\n" +
			"        obj2:{\n" +
			"            attr21: 'fooo!',\n" +
			"            attr22: 'fooo!',\n" +
			"            attr23: 'fooo!'// some comment here\n" +
			"        },\n" +
			"        obj3:{\n" +
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
			"            barUrl:'/barservice/bar/'\n" +
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
 		
	@Test
	public void inline01() {
		localise("tests/inline/");
		String result = getResult( "inline01.html", ResultMode.HTML );
		assertEquals( clean(inline01Result), clean(result) );			
	}

	@Test
	public void inline02() {
		localise("tests/inline/");
		String result = getResult( "inline02.html", ResultMode.HTML );
		assertEquals( clean(inline02Result), clean(result) );			
	}

	@Test
	public void inline03() {
		localise("tests/inline/");
		String result = getResult( "inline03.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean(inline03ResultThymol), clean(result) );			
		}
		else {			
			assertEquals( clean(inline03ResultThymeleaf), clean(result) );			
		}
	}

	@Test
	public void inline04() {
		localise("tests/inline/");
		String result = getResult( "inline04.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean(inline04ResultThymol), clean(result) );			
		}
		else {			
			assertEquals( clean(inline04ResultThymeleaf), clean(result) );			
		}
	}

	@Test
	public void inline05() {
		localise("tests/inline/");
		String result = getResult( "inline05.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean(inline05ResultThymol), clean(result) );			
		}
		else {			
			assertEquals( clean(inline05ResultThymeleaf), clean(result) );			
		}
	}

	@Test
	public void inline06() {
		localise("tests/inline/");
		String result = getResult( "inline06.html", ResultMode.HTML );
		assertEquals( clean(inline06Result), clean(result) );			
	}

	@Test
	public void inline07() {
		localise("tests/inline/");
		String result = getResult( "inline07.html", ResultMode.HTML );
		assertEquals( clean(inline07Result), clean(result) );			
	}

	@Test
	public void inline08() {
		localise("tests/inline/");
		String result = getResult( "inline08.html", ResultMode.HTML );
		assertEquals( clean(inline08Result), clean(result) );			
	}

	@Test
	public void inline09() {
		localise("tests/inline/");
		String result = getResult( "inline09.html", ResultMode.HTML );
		assertEquals( clean(inline09Result), clean(result) );			
	}

	@Test
	public void inline10() {
		localise("tests/inline/");
		String result = getResult( "inline10.html", ResultMode.HTML );
		assertEquals( clean(inline10Result), clean(result) );			
	}

	@Test
	public void inline11() {
		localise("tests/inline/");
		String result = getResult( "inline11.html", ResultMode.HTML );
		assertEquals( clean(inline11Result), clean(result) );			
	}

	@Test
	public void inline12() {
		localise("tests/inline/");
		String result = getResult( "inline12.html", ResultMode.HTML );
		assertEquals( clean(inline12Result), clean(result) );			
	}

	@Test
	public void inline13() {
		localise("tests/inline/");
		String result = getResult( "inline13.html", ResultMode.HTML );
		assertEquals( clean(inline13Result), clean(result) );			
	}

	@Test
	public void inline14() {
		localise("tests/inline/");
		String result = getResult( "inline14.html", ResultMode.HTML );
		assertEquals( clean(inline14Result), clean(result) );			
	}

	@Test
	public void inline_body() {
		localise("tests/inline/");
		String result = getResult( "inline-body.html", ResultMode.HTML );
		assertEquals( clean(inline_body_Result), clean(result) );			
	}

	@Test
	public void inline21() {
		localise("tests/inline/");
		String result = getResult( "inline21.html", ResultMode.HTML );
		assertEquals( clean(inline01Result), clean(result) );			
	}

	@Test
	public void inline26() {
		localise("tests/inline/");
		String result = getResult( "inline26.html", ResultMode.HTML );
		assertEquals( clean(inline06Result), clean(result) );			
	}

	@Test
	public void inline27() {
		localise("tests/inline/");
		String result = getResult( "inline27.html", ResultMode.HTML );
		assertEquals( clean(inline07Result), clean(result) );			
	}

}