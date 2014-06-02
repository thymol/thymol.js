var	thRoot="${thDeploy}";
var	thPath="templates/tests/include";


var	thDebug=true;

var	thVars = [

   	    ["product1",		"#{ 'name': 'Lettuce',	'price': 12.0 }"],   	        
		["product2",		"#{ 'name': 'Apricot',	'price': 8.0 }"],   	        
     	["productList",		"#[ #product1, #product2 ]"],
     	["atext",			"Lorem ipsum blah blah"],
        
     ];