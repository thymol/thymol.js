/*

create(Object, Object, Object)
create(Object, Object, Object, Object, Object)
create(Object, Object, Object, Object, Object, Object)
create(Object, Object, Object, Object, Object, Object, Object)
createForTimeZone(Object, Object, Object, Object)
createForTimeZone(Object, Object, Object, Object, Object, Object)
createForTimeZone(Object, Object, Object, Object, Object, Object, Object)
createForTimeZone(Object, Object, Object, Object, Object, Object, Object, Object)
createNow()
createNowForTimeZone(Object)
createToday()
createTodayForTimeZone(Object)
format(Calendar)
arrayFormat(Object[])
listFormat(List<? extends Calendar>)
setFormat(Set<? extends Calendar>)
format(Calendar, String)
arrayFormat(Object[], String)
listFormat(List<? extends Calendar>, String)
setFormat(Set<? extends Calendar>, String)
day(Calendar)
arrayDay(Object[])
listDay(List<? extends Calendar>)
setDay(Set<? extends Calendar>)
month(Calendar)
arrayMonth(Object[])
listMonth(List<? extends Calendar>)
setMonth(Set<? extends Calendar>)
monthName(Calendar)
arrayMonthName(Object[])
listMonthName(List<? extends Calendar>)
setMonthName(Set<? extends Calendar>)
monthNameShort(Calendar)
arrayMonthNameShort(Object[])
listMonthNameShort(List<? extends Calendar>)
setMonthNameShort(Set<? extends Calendar>)
year(Calendar)
arrayYear(Object[])
listYear(List<? extends Calendar>)
setYear(Set<? extends Calendar>)
dayOfWeek(Calendar)
arrayDayOfWeek(Object[])
listDayOfWeek(List<? extends Calendar>)
setDayOfWeek(Set<? extends Calendar>)
dayOfWeekName(Calendar)
arrayDayOfWeekName(Object[])
listDayOfWeekName(List<? extends Calendar>)
setDayOfWeekName(Set<? extends Calendar>)
dayOfWeekNameShort(Calendar)
arrayDayOfWeekNameShort(Object[])
listDayOfWeekNameShort(List<? extends Calendar>)
setDayOfWeekNameShort(Set<? extends Calendar>)
hour(Calendar)
arrayHour(Object[])
listHour(List<? extends Calendar>)
setHour(Set<? extends Calendar>)
minute(Calendar)
arrayMinute(Object[])
listMinute(List<? extends Calendar>)
setMinute(Set<? extends Calendar>)
second(Calendar)
arraySecond(Object[])
listSecond(List<? extends Calendar>)
setSecond(Set<? extends Calendar>)
millisecond(Calendar)
arrayMillisecond(Object[])
listMillisecond(List<? extends Calendar>)
setMillisecond(Set<? extends Calendar>)
*/

thymol.objects.thCalendarsObject = function() {

	var thExpressionObjectName = "#calendars";

	return {
		thExpressionObjectName : thExpressionObjectName,
		create : thymol.objects.thDatesObject.create,
		createNow : thymol.objects.thDatesObject.createNow,
		createNowForTimeZone : thymol.objects.thDatesObject.createNow,
		createToday : thymol.objects.thDatesObject.createToday,
		createTodayForTimeZone : thymol.objects.thDatesObject.createToday,
		format : thymol.objects.thDatesObject.format,
		dateFormat : thymol.objects.thDatesObject.dateFormat,
		arrayFormat : thymol.objects.thDatesObject.arrayFormat,
		listFormat : thymol.objects.thDatesObject.arrayFormat,
		setFormat : thymol.objects.thDatesObject.setFormat,
		day : thymol.objects.thDatesObject.day,
		arrayDay : thymol.objects.thDatesObject.arrayDay,
		listDay : thymol.objects.thDatesObject.arrayDay,
		setDay : thymol.objects.thDatesObject.setDay,
		month : thymol.objects.thDatesObject.month,
		arrayMonth : thymol.objects.thDatesObject.arrayMonth,
		listMonth : thymol.objects.thDatesObject.arrayMonth,
		setMonth : thymol.objects.thDatesObject.setMonth,
		monthName : thymol.objects.thDatesObject.monthName,
		arrayMonthName : thymol.objects.thDatesObject.arrayMonthName,
		listMonthName : thymol.objects.thDatesObject.arrayMonthName,
		setMonthName : thymol.objects.thDatesObject.setMonthName,
		monthNameShort : thymol.objects.thDatesObject.monthNameShort,
		arrayMonthNameShort : thymol.objects.thDatesObject.arrayMonthNameShort,
		listMonthNameShort : thymol.objects.thDatesObject.arrayMonthNameShort,
		setMonthNameShort : thymol.objects.thDatesObject.setMonthNameShort,
		year : thymol.objects.thDatesObject.year,
		arrayYear : thymol.objects.thDatesObject.arrayYear,
		listYear : thymol.objects.thDatesObject.arrayYear,
		setYear : thymol.objects.thDatesObject.setYear,
		dayOfWeek : thymol.objects.thDatesObject.dayOfWeek,
		arrayDayOfWeek : thymol.objects.thDatesObject.arrayDayOfWeek,
		listDayOfWeek : thymol.objects.thDatesObject.arrayDayOfWeek,
		setDayOfWeek : thymol.objects.thDatesObject.setDayOfWeek,
		dayOfWeekName : thymol.objects.thDatesObject.dayOfWeekName,
		arrayDayOfWeekName : thymol.objects.thDatesObject.arrayDayOfWeekName,
		listDayOfWeekName : thymol.objects.thDatesObject.arrayDayOfWeekName,
		setDayOfWeekName : thymol.objects.thDatesObject.setDayOfWeekName,
		dayOfWeekNameShort : thymol.objects.thDatesObject.dayOfWeekNameShort,
		arrayDayOfWeekNameShort : thymol.objects.thDatesObject.arrayDayOfWeekNameShort,
		listDayOfWeekNameShort : thymol.objects.thDatesObject.arrayDayOfWeekNameShort,
		setDayOfWeekNameShort : thymol.objects.thDatesObject.setDayOfWeekNameShort,
		hour : thymol.objects.thDatesObject.hour,
		arrayHour : thymol.objects.thDatesObject.arrayHour,
		listHour : thymol.objects.thDatesObject.arrayHour,
		setHour : thymol.objects.thDatesObject.setHour,
		minute : thymol.objects.thDatesObject.minute,
		arrayMinute : thymol.objects.thDatesObject.arrayMinute,
		listMinute : thymol.objects.thDatesObject.arrayMinute,
		setMinute : thymol.objects.thDatesObject.setMinute,
		second : thymol.objects.thDatesObject.second,
		arraySecond : thymol.objects.thDatesObject.arraySecond,
		listSecond : thymol.objects.thDatesObject.arraySecond,
		setSecond : thymol.objects.thDatesObject.setSecond,
		millisecond : thymol.objects.thDatesObject.millisecond,
		arrayMillisecond : thymol.objects.thDatesObject.arrayMillisecond,
		listMillisecond : thymol.objects.thDatesObject.arrayMillisecond,
		setMillisecond : thymol.objects.thDatesObject.setMillisecond
	};

}();