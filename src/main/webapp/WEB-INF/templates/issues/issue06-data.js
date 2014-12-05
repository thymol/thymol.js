Date.prototype.toString = Date.prototype.toUTCString;
thDebug = true;
thymol.ready(function () {
	thymol.configurePreExecution( function() {
	  thymol.applicationContext.createVariable("birthDate1", thymol.objects.thDatesObject.format( thymol.objects.thDatesObject.create(1940, 10, 9),'ddd MMM dd HH:mm:ss Z yyyy')	  		
	  );
	});
});                
