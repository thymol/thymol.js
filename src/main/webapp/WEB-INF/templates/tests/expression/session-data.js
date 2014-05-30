var	thRoot="${thRoot}";
var	thPath="templates/tests/expression";

var	thDebug=true;

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		thymol.sessionContext.createVariable("a","Some text");
		thymol.sessionContext.createVariable("b",123);
		thymol.sessionContext.createVariable("c","Hello");
	});
	thymol.configurePostExecution( function() {
		thymol.sessionContext = [];
	});
});                
