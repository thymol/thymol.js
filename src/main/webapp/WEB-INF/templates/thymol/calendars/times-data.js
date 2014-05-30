thDebug = true;

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var time1 = new Date(1501, 3, 12, 8, 25, 9, 321);
		var time2 = new Date(1711, 4, 13, 12, 35, 19, 543);
		var time3 = new Date(1921, 5, 14, 14, 45, 29, 765);
		var time4 = new Date(2031, 6, 15, 16, 55, 39, 987);
		var timeArray = [time1,time2,time3,time4];
	    thymol.applicationContext.createVariable("calendarTime1", time1 );
	    thymol.applicationContext.createVariable("calendarTime2", time2 );
	    thymol.applicationContext.createVariable("calendarTime3", time3 );
	    thymol.applicationContext.createVariable("calendarTime4", time4 );
	    thymol.applicationContext.createVariable("calendarTimeArray", timeArray );
	    thymol.applicationContext.createVariable("calendarTimeSet", ThSet.prototype.fromArray(timeArray) );
	});
});