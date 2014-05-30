var thRoot = "";
var thPath = "";
var thProtocol = "";

var thDebug = true;
var thShowNullOperands = true;

var thVars = [
	[ "element_example", "#{'value':'Einsteinium'}" ]
];

var thMappings = [
	[ "/session01", "session-page-01.html" ],
	[ "/session02", "session-page-02.html" ]
];


function doCopyToSession(fromVar,toVar) {
	var value = thymol.requestContext[fromVar];
	if( typeof value !== "undefined" && value !== null && value.length > 0 ) {
		value = value[0];
	}
	thymol.sessionContext.createVariable(toVar,value);
	var showNew = document.getElementById("session-element");
	var newValue = document.createTextNode(value);
	showNew.replaceChild(newValue,showNew.firstChild);
}