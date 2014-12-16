Date.prototype.toString = Date.prototype.toUTCString;
thDebug = true;
thymol.ready(function () {
	thymol.configurePreExecution( function() {
	  thymol.applicationContext.createVariable("birthDate2",thymol.objects.thDatesObject.create(1940, 10, 9));
	  thymol.conversionService = function(arg) {
	    if( arg instanceof Date ) {
	      return thymol.objects.thDatesObject.format(arg,'ddd MMM dd HH:mm:ss Z yyyy');
	    }
	    return arg;
	  };
	});
});