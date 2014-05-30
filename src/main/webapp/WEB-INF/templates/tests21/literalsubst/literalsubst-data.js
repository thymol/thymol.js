var	thRoot="${thRoot}";
var	thPath="templates/tests21/literalsubst";

var	thDebug=true;
var thShowNullOperands=true;

var	thVars = [

   	    ["onevar",		"Hello"],   	        
		["twovar",		"World"],
		
		["planet01",		"Mercury"],
		["planet02",		"Venus"],
		["planet03",		"Earth"],
		["planet04",		"Mars"],
		["planet05",		"Jupiter"],
		["planet06",		"Saturn"],
		["planet07",		"Uranus"],
		["planet08",		"Neptune"],

     	["planets",			"#[ #planet01, #planet02, #planet03, #planet04, #planet05, #planet06, #planet07, #planet08 ]"],     	
     	["msg",				"Hello, World!"]     	
   	    
     ];

var	thMessages = [

	   	["onemsg",					"Red Planet"],   	    
   		["onemsg.test.nosubrefs",	"Red Planet"]   	    
   	    
     ];