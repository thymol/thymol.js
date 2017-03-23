thymol.applicationContext.createVariable("foo", 'foo' );
thymol.applicationContext.createVariable("obj", { "foo": "bar" } );
thymol.ready(function () {
	thymol.configurePreExecution( function() {
		thymol.inlineQuote="\"";
	});
});