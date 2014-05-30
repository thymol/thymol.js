var	thRoot="${thRoot}";
var	thPath="templates/tests/inline";

var	thDebug=true;
var thAllowNullText=false;

var	thVars = [
   	    ["foo",		    "fooo!"],
        ["userRoles",   "#[ 'MANAGER', 'SALES' ]"],
	    ["obj", 		"#{ 'a': '12', 'ba': 'lala' }" ],
	    ["someVar",		"Hi there!"],
	    ["value",		23]
	];

var	thMessages = [
   	    ["foo",		    "fooo!"],
   	   	["foo2",	"http://www.thymeleaf.org/download.html"]
   	];
