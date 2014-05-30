thDebug = true;

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var date0 = thymol.objects.thDatesObject.create(1492,10,12);
		var date1 = thymol.objects.thDatesObject.create(1666,9,2);
		var date2 = thymol.objects.thDatesObject.create(1835,12,16);
		var date3 = thymol.objects.thDatesObject.create(1901,5,3);
		var date4 = thymol.objects.thDatesObject.create(1922,9,13);
		var dateArray = [date0,date1,date2,date3,date4];
	    thymol.applicationContext.createVariable("date0", date0 );
	    thymol.applicationContext.createVariable("date1", date1 );
	    thymol.applicationContext.createVariable("date2", date2 );
	    thymol.applicationContext.createVariable("date3", date3 );
	    thymol.applicationContext.createVariable("date4", date4 );
	    thymol.applicationContext.createVariable("dateArray", dateArray );
	    thymol.applicationContext.createVariable("dateSet", ThSet.prototype.fromArray(dateArray) );
	});
});
