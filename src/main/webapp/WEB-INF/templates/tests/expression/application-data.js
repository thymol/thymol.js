var	thDebug=true;

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		thymol.applicationContext.createVariable("a","Some text");
		thymol.applicationContext.createVariable("b",123);
		thymol.applicationContext.createVariable("c","Hello");
	});
});                
