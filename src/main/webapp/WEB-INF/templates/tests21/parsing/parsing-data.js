var	thRoot="${thDeploy}";
var	thPath="templates/tests21/parsing";

var	thDebug=true;
var thShowNullOperands=true;

var	thVars = [

		["cap1",		"#{'city' : 'Madrid', 'country' : 'Spain'}"],
		["cap2",		"#{'city' : 'Lisboa', 'country' : 'Portugal'}"],
		["cap3",		"#{'city' : 'Paris', 'country' : 'France'}"],

     	["caps",		"#[ #cap1, #cap2, #cap3 ]"],
   	 
    	["msg",		    "Hello, World!"]
				
     ];
