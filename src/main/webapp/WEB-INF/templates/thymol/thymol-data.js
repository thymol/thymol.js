var	thDebug=true;
var thShowNullOperands=true;

var	thVars = [

   	["value1",		"Joe Bloggs"],   	        
		["value2",		"was here!"],   	    
		// Simulate missing Expression objects
		["#httpServletRequest.servletPath",    	                        "/ownerDetails.html"],
		["#dates.format(pet.birthDate.toDate(), \'yyyy-MM-dd\')",          "2010-09-05"],
		["#dates.format(visit.pet.birthDate.toDate(), \'yyyy/MM/dd\')",	"2011/10/06"],
		["#fields.hasErrors('*')",	true],
		["#fields.errors('*')",	"#[ 'mistakes', 'errors' ]"],
    ["#lists.isEmpty(allSeedStarters)",	false] // Hack to prevent a debug alert
   	    
];