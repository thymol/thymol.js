package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import org.junit.Test;

public class ExprCases extends SeleniumCases {

	public ExprCases() {
		super();
	}

	String noParametersResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User isn't in any known group\n" + 
			"Back";

	String visitedTrueResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again\n" + 
			"do I know you?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello hello hello\n" + 
			"0,0 0,1\n" + 
			"1,0 1,1\n" + 
			"do we know each other?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"User isn't in any known group\n" + 
			"hello again\n" + 
			"do you know me?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"Back";

	String visitedFalseResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User isn't in any known group\n" + 
			"Back";

	String visitedJunkResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again\n" + 
			"do I know you?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello hello hello\n" + 
			"0,0 0,1\n" + 
			"1,0 1,1\n" + 
			"do we know each other?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"User isn't in any known group\n" + 
			"hello again\n" + 
			"do you know me?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"Back";

	String firstNameFredResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User is one of the Bloggs\n" + 
			"Back";

	String firstNameSollyResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User is a member of Grundy\n" + 
			"Back";

	String firstNameJunkResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User isn't in any known group\n" + 
			"Back";

	String visitedTrueAndFredResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again\n" + 
			"do I know you?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello hello hello\n" + 
			"0,0 0,1\n" + 
			"1,0 1,1\n" + 
			"do we know each other?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"User is one of the Bloggs\n" + 
			"hello again\n" + 
			"do you know me?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"Back";

	String visitedTrueAndSollyResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again\n" + 
			"do I know you?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello hello hello\n" + 
			"0,0 0,1\n" + 
			"1,0 1,1\n" + 
			"do we know each other?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"User is a member of Grundy\n" + 
			"hello again\n" + "do you know me?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"Back";

	String visitedTrueAndJunkResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again\n" + 
			"do I know you?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello hello hello\n" + 
			"0,0 0,1\n" + 
			"1,0 1,1\n" + 
			"do we know each other?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"User isn't in any known group\n" + 
			"hello again\n" + 
			"do you know me?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"Back";
	
	String visitedFalseAndFredResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User is one of the Bloggs\n" + 
			"Back";

	String visitedFalseAndSollyResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User is a member of Grundy\n" + 
			"Back";

	String visitedFalseAndJunkResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again again\n" + 
			"hello hello hello\n" + 
			"User isn't in any known group\n" + 
			"Back";
	
	String noImportsResult = 
			"hello\n" + 
			"hello again\n" + 
			"do I know you?\n" + 
			"hello hello hello\n" + 
			"User is one of the Bloggs\n" + 
			"hello again\n" + 
			"do you know me?\n" + 
			"Back";
	
	String firstFileNameVisitedTrueAndFredResult = 
			"hello\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello again\n" + 
			"do I know you?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"hello hello hello\n" + 
			"User is one of the Bloggs\n" + 
			"hello again\n" + 
			"do you know me?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"Back";
	
	String secondFileNameVisitedTrueAndFredResult = 
			"hello\n" + 
			"hello again\n" + 
			"do I know you?\n" + 
			"hello hello hello\n" + 
			"0,0 0,1\n" + 
			"1,0 1,1\n" + 
			"do we know each other?\n" + 
			"© 2011 The Good Thymes Virtual Grocery\n" + 
			"User is one of the Bloggs\n" + 
			"hello again\n" + 
			"do you know me?\n" + 
			"Back";
	
/*	String noParametersResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: blue;\">hello again again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User isn't in any known group</p>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String visitedTrueResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">hello again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">do I know you?</div>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"\t<head>\n" +
			"\t\t<meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">\n" +
			"\t\t<title>Stuff that goes in a title element</title>\n" +
			"\t</head>\n" +
			"\t<body style=\"margin: 0px;\">\n" +
			"\t\t<table th:fragment=\"matrix\">\n" +
			"\t\t\t<tr><td>0,0</td><td>0,1</td></tr>\n" +
			"\t\t\t<tr><td>1,0</td><td>1,1</td></tr>\n" +
			"\t\t</table>\n" +
			"\t\t<div>\n" +
			"\t\t\t<span style=\"color: green;\">do we know each other?</span>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t</body>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User isn't in any known group</p>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: orange;\">hello again</div>\n" +
			"\t\t\t<div>\n" +
			"\t\t\t\t<div style=\"color: purple;\">do you know me?</div>\n" +
			"\t\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t\t</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String visitedFalseResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: blue;\">hello again again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User isn't in any known group</p>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String visitedJunkResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">hello again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">do I know you?</div>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"\t<head>\n" +
			"\t\t<meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">\n" +
			"\t\t<title>Stuff that goes in a title element</title>\n" +
			"\t</head>\n" +
			"\t<body style=\"margin: 0px;\">\n" +
			"\t\t<table th:fragment=\"matrix\">\n" +
			"\t\t\t<tr><td>0,0</td><td>0,1</td></tr>\n" +
			"\t\t\t<tr><td>1,0</td><td>1,1</td></tr>\n" +
			"\t\t</table>\n" +
			"\t\t<div>\n" +
			"\t\t\t<span style=\"color: green;\">do we know each other?</span>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t</body>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User isn't in any known group</p>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: orange;\">hello again</div>\n" +
			"\t\t\t<div>\n" +
			"\t\t\t\t<div style=\"color: purple;\">do you know me?</div>\n" +
			"\t\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t\t</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String firstNameFredResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: blue;\">hello again again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p>User is one of the Bloggs</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String firstNameSollyResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: blue;\">hello again again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User is a member of Grundy</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String firstNameJunkResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: blue;\">hello again again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User isn't in any known group</p>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String visitedTrueAndFredResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">hello again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">do I know you?</div>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"\t<head>\n" +
			"\t\t<meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">\n" +
			"\t\t<title>Stuff that goes in a title element</title>\n" +
			"\t</head>\n" +
			"\t<body style=\"margin: 0px;\">\n" +
			"\t\t<table th:fragment=\"matrix\">\n" +
			"\t\t\t<tr><td>0,0</td><td>0,1</td></tr>\n" +
			"\t\t\t<tr><td>1,0</td><td>1,1</td></tr>\n" +
			"\t\t</table>\n" +
			"\t\t<div>\n" +
			"\t\t\t<span style=\"color: green;\">do we know each other?</span>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t</body>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p>User is one of the Bloggs</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: orange;\">hello again</div>\n" +
			"\t\t\t<div>\n" +
			"\t\t\t\t<div style=\"color: purple;\">do you know me?</div>\n" +
			"\t\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t\t</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String visitedTrueAndSollyResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">hello again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">do I know you?</div>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"\t<head>\n" +
			"\t\t<meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">\n" +
			"\t\t<title>Stuff that goes in a title element</title>\n" +
			"\t</head>\n" +
			"\t<body style=\"margin: 0px;\">\n" +
			"\t\t<table th:fragment=\"matrix\">\n" +
			"\t\t\t<tr><td>0,0</td><td>0,1</td></tr>\n" +
			"\t\t\t<tr><td>1,0</td><td>1,1</td></tr>\n" +
			"\t\t</table>\n" +
			"\t\t<div>\n" +
			"\t\t\t<span style=\"color: green;\">do we know each other?</span>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t</body>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User is a member of Grundy</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: orange;\">hello again</div>\n" +
			"\t\t\t<div>\n" +
			"\t\t\t\t<div style=\"color: purple;\">do you know me?</div>\n" +
			"\t\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t\t</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String visitedTrueAndJunkResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">hello again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">do I know you?</div>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"\t<head>\n" +
			"\t\t<meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">\n" +
			"\t\t<title>Stuff that goes in a title element</title>\n" +
			"\t</head>\n" +
			"\t<body style=\"margin: 0px;\">\n" +
			"\t\t<table th:fragment=\"matrix\">\n" +
			"\t\t\t<tr><td>0,0</td><td>0,1</td></tr>\n" +
			"\t\t\t<tr><td>1,0</td><td>1,1</td></tr>\n" +
			"\t\t</table>\n" +
			"\t\t<div>\n" +
			"\t\t\t<span style=\"color: green;\">do we know each other?</span>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t</body>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User isn't in any known group</p>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: orange;\">hello again</div>\n" +
			"\t\t\t<div>\n" +
			"\t\t\t\t<div style=\"color: purple;\">do you know me?</div>\n" +
			"\t\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t\t</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";
	
	String visitedFalseAndFredResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: blue;\">hello again again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p>User is one of the Bloggs</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String visitedFalseAndSollyResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: blue;\">hello again again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User is a member of Grundy</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";

	String visitedFalseAndJunkResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: blue;\">hello again again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p>User isn't in any known group</p>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";
	
	String noImportsResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>\n" +
			"</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">hello again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">do I know you?</div>\n" +
			"\t\t\t<div>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p>User is one of the Bloggs</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: orange;\">hello again</div>\n" +
			"\t\t\t<div>\n" +
			"\t\t\t\t<div style=\"color: purple;\">do you know me?</div>\n" +
			"\t\t\t\t<div>\n" +
			"</div>\n" +
			"\t\t\t</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";
	
	String firstFileNameVisitedTrueAndFredResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">hello again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">do I know you?</div>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p>User is one of the Bloggs</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: orange;\">hello again</div>\n" +
			"\t\t\t<div>\n" +
			"\t\t\t\t<div style=\"color: purple;\">do you know me?</div>\n" +
			"\t\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t\t</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";
	
	String secondFileNameVisitedTrueAndFredResult = 
			"\n" +
			"\t\t<div style=\"color: red;\">hello</div>\n" +
			"\t\t<div>\n" +
			"</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">hello again</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div></div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: green;\">do I know you?</div>\n" +
			"\t\t\t<div>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div style=\"color: red;\">hello hello hello</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div>\n" +
			"\t<head>\n" +
			"\t\t<meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">\n" +
			"\t\t<title>Stuff that goes in a title element</title>\n" +
			"\t</head>\n" +
			"\t<body style=\"margin: 0px;\">\n" +
			"\t\t<table th:fragment=\"matrix\">\n" +
			"\t\t\t<tr><td>0,0</td><td>0,1</td></tr>\n" +
			"\t\t\t<tr><td>1,0</td><td>1,1</td></tr>\n" +
			"\t\t</table>\n" +
			"\t\t<div>\n" +
			"\t\t\t<span style=\"color: green;\">do we know each other?</span>\n" +
			"\t\t\t<div>© 2011 The Good Thymes Virtual Grocery</div>\n" +
			"\t\t</div>\n" +
			"\t</body>\n" +
			"</div>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<p>User is one of the Bloggs</p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t\t<p></p>\n" +
			"\t\t</div>\n" +
			"\t\t<div>\n" +
			"\t\t\t<div style=\"color: orange;\">hello again</div>\n" +
			"\t\t\t<div>\n" +
			"\t\t\t\t<div style=\"color: purple;\">do you know me?</div>\n" +
			"\t\t\t\t<div>\n" +
			"</div>\n" +
			"\t\t\t</div>\n" +
			"\t\t</div>\n" +
			"\t\t<p><a href=\"index.html\">Back</a></p>\n" +
			"\t\n";
*/	
	@Test
	public void noParameters() {
		localise("expr/");
		String result = getResult( "ex6.html", true );
		assertEquals( noParametersResult, result );
	}

	@Test
	public void visitedTrue() {
		localise("expr/");
		String result = getResult( "ex6.html?visited=true", true );
		assertEquals( visitedTrueResult, result );
	}

	@Test
	public void visitedFalse() {
		localise("expr/");
		String result = getResult( "ex6.html?visited=false", true );
		assertEquals( visitedFalseResult, result );
	}

	@Test
	public void visitedJunk() {
		localise("expr/");
		String result = getResult( "ex6.html?visited=junk", true );
		assertEquals( visitedJunkResult, result );
	}


	@Test
	public void firstNameFred() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName='Fred'", true );
		assertEquals( firstNameFredResult, result );
	}

	@Test
	public void firstNameSolly() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName='Solly'", true );
		assertEquals( firstNameSollyResult, result );
	}


	@Test
	public void userRoleJunk() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName=junk", true );
		assertEquals( firstNameJunkResult, result );
	}

	@Test
	public void visitedTrueAndFred() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName='Fred'&visited=true", true );
		assertEquals( visitedTrueAndFredResult, result );
	}

	@Test
	public void visitedTrueAndSolly() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName='Solly'&visited=true", true );
		assertEquals( visitedTrueAndSollyResult, result );
	}

	@Test
	public void visitedTrueAndJunk() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName=junk&visited=true", true );
		assertEquals( visitedTrueAndJunkResult, result );
	}

	@Test
	public void visitedFalseAndFred() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName='Fred'&visited=false", true );
		assertEquals( visitedFalseAndFredResult, result );
	}

	@Test
	public void visitedFalseAndSolly() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName='Solly'&visited=false", true );
		assertEquals( visitedFalseAndSollyResult, result );
	}

	@Test
	public void visitedFalseAndJunk() {
		localise("expr/");
		String result = getResult( "ex6.html?firstName=junk&visited=false", true );
		assertEquals( visitedFalseAndJunkResult, result );
	}
	
	@Test
	public void noImportsVisitedTrueAndFred() {
		localise("expr/");
		String result = getResult( "ex7.html?firstFile=nil&secondFile=nil&firstName='Fred'&visited=true", true );
		assertEquals( noImportsResult, result );
	}

	@Test
	public void firstFileNameVisitedTrueAndFred() {
		localise("expr/");
		String result = getResult( "ex7.html?firstFile=footer&secondFile=nil&firstName='Fred'&visited=true", true );
		assertEquals( firstFileNameVisitedTrueAndFredResult, result );
	}

	@Test
	public void secondFileNameVisitedTrueAndFred() {
		localise("expr/");
		String result = getResult( "ex7.html?firstFile=nil&secondFile=other&firstName='Fred'&visited=true", true );		
		assertEquals( secondFileNameVisitedTrueAndFredResult, result );
	}

	@Test
	public void fileNamesVisitedTrueAndFred() {
		localise("expr/");
		String result = getResult( "ex7.html?firstFile=footer&secondFile=other&firstName='Fred'&visited=true", true );
		assertEquals( visitedTrueAndFredResult, result );
	}
	

}