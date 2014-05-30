thDebug = true;

thymol.configurePreExecution( function() {
	var planetMessages = [
	  [ "msg.helloplanet", "Hello, Planet {0}!" ]
	];
	if( typeof thMessages === "undefined" ) {
		thMessages = [];
	}
	thMessages = thMessages.concat(planetMessages);
	var planetsArray = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
    thymol.applicationContext.createVariable("planets", planetsArray );
});

