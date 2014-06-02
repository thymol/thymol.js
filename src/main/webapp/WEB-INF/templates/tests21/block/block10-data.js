var	thRoot="${thDeploy}";
var	thPath="templates/tests21/block";

var	thDebug=true;
var thShowNullOperands=true;

var	thVars = [

		["user1",		"#{'login' : 'admin', 'name' : 'John Jones', 'address' : 'London'}"],
		["user2",		"#{'login' : 'manager', 'name' : 'Fred Bloggs', 'address' : 'Birmingham'}"],
		["user3",		"#{'login' : 'worker', 'name' : 'Adam Smith', 'address' : 'Liverpool'}"],

     	["users",		"#[ #user1, #user2, #user3 ]"],
      	 
     ];
