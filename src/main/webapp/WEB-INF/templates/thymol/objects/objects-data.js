thDebug = true;

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var fred;
		var ox1 = new thymol.ThParam("Hello world!");
		var ox2 = new thymol.ThParam("Bonjour tout le monde!");
		var ox3 = new thymol.ThParam("Hola mundo!");
		var ox4 = new thymol.ThParam("Kaixo mundua!");
		var oxArray = ([ox1,null,fred,ox4]).sort();
	    thymol.applicationContext.createVariable("ox1", ox1 );
	    thymol.applicationContext.createVariable("ox2", ox2 );
	    thymol.applicationContext.createVariable("ox3", ox3 );
	    thymol.applicationContext.createVariable("ox4", ox4 );
	    thymol.applicationContext.createVariable("oxArray", oxArray );
	    thymol.applicationContext.createVariable("oxSet", thymol.ThSet.prototype.fromArray(oxArray) );    
	});
});