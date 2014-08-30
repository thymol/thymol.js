thDebug = true;
thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var exampleMessages = [
		  [ "my.message", "Your resolved message" ]
		];
		if( typeof thMessages === "undefined" ) {
			thMessages = [];
		}
		thMessages = thMessages.concat(exampleMessages);
	});
});