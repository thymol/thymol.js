thDebug = true;

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var calendar0 = thymol.objects.thCalendarsObject.create(1492,10,12);
		var calendar1 = thymol.objects.thCalendarsObject.create(1666,9,2);
		var calendar2 = thymol.objects.thCalendarsObject.create(1835,12,16);
		var calendar3 = thymol.objects.thCalendarsObject.create(1901,5,3);
		var calendar4 = thymol.objects.thCalendarsObject.create(1922,9,13);
		var calendarArray = [calendar0,calendar1,calendar2,calendar3,calendar4];
	    thymol.applicationContext.createVariable("calendar0", calendar0 );
	    thymol.applicationContext.createVariable("calendar1", calendar1 );
	    thymol.applicationContext.createVariable("calendar2", calendar2 );
	    thymol.applicationContext.createVariable("calendar3", calendar3 );
	    thymol.applicationContext.createVariable("calendar4", calendar4 );
	    thymol.applicationContext.createVariable("calendarArray", calendarArray );
	    thymol.applicationContext.createVariable("calendarSet", thymol.ThSet.prototype.fromArray(calendarArray) );
	});
});