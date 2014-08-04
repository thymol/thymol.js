/*

	create(Object, Object, Object)
	create(Object, Object, Object, Object, Object)
	create(Object, Object, Object, Object, Object, Object)
	create(Object, Object, Object, Object, Object, Object, Object)
	createNow()
	createNowForTimeZone(Object)
	createToday()
	createTodayForTimeZone(Object)
	format(Date)
	arrayFormat(Object[])
listFormat(List<? extends Date>)
	setFormat(Set<? extends Date>)
	format(Date, String)
	arrayFormat(Object[], String)
listFormat(List<? extends Date>, String)
	setFormat(Set<? extends Date>, String)
	day(Date)
	arrayDay(Object[])
listDay(List<? extends Date>)
	setDay(Set<? extends Date>)
	month(Date)
	arrayMonth(Object[])
listMonth(List<? extends Date>)
	setMonth(Set<? extends Date>)
	monthName(Date)
	arrayMonthName(Object[])
listMonthName(List<? extends Date>)
	setMonthName(Set<? extends Date>)
	monthNameShort(Date)
	arrayMonthNameShort(Object[])
listMonthNameShort(List<? extends Date>)
	setMonthNameShort(Set<? extends Date>)
	year(Date)
	arrayYear(Object[])
listYear(List<? extends Date>)
	setYear(Set<? extends Date>)
	dayOfWeek(Date)
	arrayDayOfWeek(Object[])
listDayOfWeek(List<? extends Date>)
	setDayOfWeek(Set<? extends Date>)
	dayOfWeekName(Date)
	arrayDayOfWeekName(Object[])
listDayOfWeekName(List<? extends Date>)
	setDayOfWeekName(Set<? extends Date>)
	dayOfWeekNameShort(Date)
	arrayDayOfWeekNameShort(Object[])
listDayOfWeekNameShort(List<? extends Date>)
	setDayOfWeekNameShort(Set<? extends Date>)
	hour(Date)
	arrayHour(Object[])
listHour(List<? extends Date>)
	setHour(Set<? extends Date>)
	minute(Date)
	arrayMinute(Object[])
listMinute(List<? extends Date>)
	setMinute(Set<? extends Date>)
	second(Date)
	arraySecond(Object[])
listSecond(List<? extends Date>)
	setSecond(Set<? extends Date>)
	millisecond(Date)
	arrayMillisecond(Object[])
listMillisecond(List<? extends Date>)
	setMillisecond(Set<? extends Date>)

 */

thymol.objects.thDatesObject = function() {

	var thExpressionObjectName = "#dates";

	function createProxy() {
		if (arguments !== null) {
			if (arguments.length > 6) {
				return create(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
			}
			else if (arguments.length > 5) {
				return create(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], 0);
			}
			else if (arguments.length > 4) {
				return create(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], 0, 0);
			}
			return create(arguments[0], arguments[1], arguments[2], 0, 0, 0, 0);
		}
	}

	function create(year, month, day, hour, minute, second, millisecond) {
//		var result = new Date(Date.UTC(year, month-1, day, hour, minute, second, millisecond));
		var result = new Date();
		result.setMilliseconds(millisecond);
		result.setSeconds(second);
		result.setMinutes(minute);
		result.setHours(hour);
		result.setDate(day);
		result.setMonth(month - 1);		
		result.setFullYear(year);
		return result;
	}

//	Date.prototype.getDay = function() {
	function getDay(dateValue) {
//		var month = this.getMonth() + 1;
//		var year = this.getFullYear();
//		var day = this.getDate();
		var month = dateValue.getMonth() + 1;
		var year = dateValue.getFullYear();
		var day = dateValue.getDate();
		var a = Math.floor((14 - month)/12);
		var y = year + 4800 - a;
		var m = month + 12 * a - 3;
		var jdn = day + Math.floor((153 * m + 2)/5) + 365 * y + Math.floor(y/4);
		if(  jdn < 2331254 ) { // Result of above on Gregorian change date Fri Oct 15 1582
			jdn = jdn - 32083;
		}
		else {
			jdn = jdn - Math.floor(y/100) + Math.floor(y/400) - 32045;
		}
		var mjdn = (jdn + 1) % 7;
		return mjdn;
	};
	
	function createNow() {
		return new Date();
	}

	function createToday() {
		var today = new Date();
		today.setHours(0, 0, 0, 0);
		return today;
	}

	function format(dateParam, patternParam, locale) {
		var pattern = "";
		var date;
		if (arguments === null) {
			date = new Date();
		}
		else {
			if (arguments.length > 1) {
				pattern = patternParam;
			}
			date = dateParam;
		}
		return formatDate(date, pattern, locale);
	}

	function formatDate(target, patternParam, locale) {
		var pattern = "";
		if (arguments.length > 1) {
			pattern = patternParam;
		}
		var result = dateFormat(target, pattern, false);
		return result;
	}

	function arrayFormat(target, patternParam) {
		var pattern = "";
		if (arguments.length > 1) {
			pattern = patternParam;
		}
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(dateFormat(target[i], pattern, false));
		}
		return result;
	}

	function setFormat(target, patternParam) {
		var pattern = "";
		if (arguments.length > 1) {
			pattern = patternParam;
		}
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(dateFormat(target[k], pattern, false));
			}
		}
		return result;
	}
	
	function day(target) {
		return target.getDate();
	}
	
	function arrayDay(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(target[i].getDate());
		}
		return result;
	}
	
	function setDay(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(target[k].getDate());
			}
		}
		return result;
	}

	function month(target) {
		return target.getMonth() + 1;
	}
	
	function arrayMonth(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(target[i].getMonth() + 1);
		}
		return result;
	}
	
	function setMonth(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(target[k].getMonth() + 1);
			}
		}
		return result;
	}

	function monthName(target) {						
		return dateFormat.i18n.monthNames[target.getMonth()+12];
	}

	function arrayMonthName(target) {						
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push( dateFormat.i18n.monthNames[target[i].getMonth()+12]);
		}
		return result;
	}

	function setMonthName(target) {						
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(dateFormat.i18n.monthNames[target[k].getMonth()+12]);
			}
		}
		return result;
	}
	
	function monthNameShort(target) {						
		return dateFormat.i18n.monthNames[target.getMonth()];
	}

	function arrayMonthNameShort(target) {						
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push( dateFormat.i18n.monthNames[target[i].getMonth()]);
		}
		return result;
	}

	function setMonthNameShort(target) {						
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(dateFormat.i18n.monthNames[target[k].getMonth()]);
			}
		}
		return result;
	}
	
	function year(target) {
		return target.getFullYear();
	}
	
	function arrayYear(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(target[i].getFullYear());
		}
		return result;
	}
	
	function setYear(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(target[k].getFullYear());
			}
		}
		return result;
	}
	
	function dayOfWeek(target) {
		return getDay(target) + 1;
	}
	
	function arrayDayOfWeek(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(getDay(target[i]) + 1);
		}
		return result;
	}
	
	function setDayOfWeek(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(getDay(target[k]) + 1);
			}
		}
		return result;
	}
	
	function dayOfWeekName(target) {
		return dateFormat.i18n.dayNames[getDay(target)+7];
	}
	
	function arrayDayOfWeekName(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(dateFormat.i18n.dayNames[getDay(target[i])+7]);
		}
		return result;
	}
	
	function setDayOfWeekName(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(dateFormat.i18n.dayNames[getDay(target[k])+7]);
			}
		}
		return result;
	}
	
	function dayOfWeekNameShort(target) {
		return dateFormat.i18n.dayNames[getDay(target)];
	}
	
	function arrayDayOfWeekNameShort(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(dateFormat.i18n.dayNames[getDay(target[i])]);
		}
		return result;
	}
	
	function setDayOfWeekNameShort(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(dateFormat.i18n.dayNames[getDay(target[k])]);
			}
		}
		return result;
	}

	function hour(target) {
		return target.getHours();
	}
	
	function arrayHour(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(target[i].getHours());
		}
		return result;
	}
	
	function setHour(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(target[k].getHours());
			}
		}
		return result;
	}

	function minute(target) {
		return target.getMinutes();
	}
	
	function arrayMinute(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(target[i].getMinutes());
		}
		return result;
	}
	
	function setMinute(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(target[k].getMinutes());
			}
		}
		return result;
	}
	
	function second(target) {
		return target.getSeconds();
	}
	
	function arraySecond(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(target[i].getSeconds());
		}
		return result;
	}
	
	function setSecond(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(target[k].getSeconds());
			}
		}
		return result;
	}
	
	function millisecond(target) {
		return target.getMilliseconds();
	}
	
	function arrayMillisecond(target) {
		var result = [];
		for (var i = 0, iLimit = target.length; i < iLimit; i++) {
			result.push(target[i].getMilliseconds());
		}
		return result;
	}
	
	function setMillisecond(target) {
		var result = new ThSet();
		for ( var k in target) {
			if (target.isContent(k)) {
				result.add(target[k].getMilliseconds());
			}
		}
		return result;
	}
	
	
/*
 * Date Format 1.2.3 (c) 2007-2009 Steven Levithan <stevenlevithan.com> MIT license
 * 
 * Includes enhancements by Scott Trenda <scott.trenda.net> and Kris Kowal <cixar.com/~kris.kowal/>
 * 
 * Accepts a date, a mask, or a date and a mask. Returns a formatted version of the given date. The date defaults to the current date/time. The mask defaults to dateFormat.masks.default.
 */
	
/*

The MIT License (MIT)

Copyright © 2014 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/	
	
// The MIT License applies to code starting here // The MIT License applies to code starting here // The MIT License applies to code starting here // The MIT License applies to code starting here
	
	var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, timezoneClip = /[^-+\dA-Z]/g; 

	function processTZ(target) {
		var toStr = String(target);
		var result = toStr;
		result = (result.match(timezone) || [ "" ]).pop();
		if( "" !== result ) {
			result = result.replace(timezoneClip, "");			
			var tail = toStr.match( /[\(]((?:[GL]M|BS)T[^\)]*?)[\)]/ );
			if( tail ) {
				if( target.getFullYear() > 1916 || (target.getFullYear() === 1916 && target.getMonth() > 4) || (target.getFullYear() === 1916 && target.getMonth() === 4 && target.getDate() > 20) ) {
					result = result.replace(/GMT\+\d{1,4}/,"BST");
				}
				else {
					result = result.replace(/GMT\+\d{1,4}/,"GMT");					
				}
			}
		}
		return result;
	}
	
	var dateFormat = function() {
		var token = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, 
			pad = function(valp, lenp) {
				var val = String(valp), len = lenp || 2;
				while (val.length < len)
					val = "0" + val;
				return val;
			};

		// Regexes and supporting functions are cached through closure
		return function(datep, maskp, utcp) {
			var dF = dateFormat, mask = maskp, date = datep, utc = utcp;

			// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
			if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
				mask = date;
				date = undefined;
			}
			
			// Passing date through Date applies Date.parse, if necessary
			date = date ? new Date(date) : new Date();
			if (isNaN(date))
				throw SyntaxError("invalid date");

			mask = String(dF.masks[mask] || mask || dF.masks["default"]);

			// Allow setting the utc argument via the mask
			if (mask.slice(0, 4) == "UTC:") {
				mask = mask.slice(4);
				utc = true;
			}

			var _ = utc ? "getUTC" : "get", 
				d = date[_ + "Date"](), 
				D = getDay(date), 
				M = date[_ + "Month"](), 
				y = date[_ + "FullYear"](), 
				H = date[_ + "Hours"](), 
				m = date[_ + "Minutes"](), 
				s = date[_ + "Seconds"](), 
				L = date[_ + "Milliseconds"](), 
				o = utc ? 0 : date.getTimezoneOffset(), 
				flags = {
					d : d,
					dd : pad(d),
					ddd : dF.i18n.dayNames[D],
					dddd : dF.i18n.dayNames[D + 7],
					M : M + 1,
					MM : pad(M + 1),
					MMM : dF.i18n.monthNames[M],
					MMMM : dF.i18n.monthNames[M + 12],
					yy : String(y).slice(2),
					yyyy : y,
					h : H % 12 || 12,
					hh : pad(H % 12 || 12),
					H : H,
					HH : pad(H),
					m : m,
					mm : pad(m),
					s : s,
					ss : pad(s),
					l : pad(L, 3),
					L : pad(L > 99 ? Math.round(L / 10) : L),
					t : H < 12 ? "a" : "p",
					tt : H < 12 ? "am" : "pm",
					T : H < 12 ? "A" : "P",
					TT : H < 12 ? "AM" : "PM",
					Z : utc ? "UTC" : processTZ(date),
					o : (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
					S : [ "th", "st", "nd", "rd" ][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
				};

			return mask.replace(token, function($0) {
				return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
			});
		};
	}();

	// Some common format strings
	dateFormat.masks = {
		"default" : "dd MMMM yyyy HH:mm:ss Z",
		shortDate : "M/d/yy",
		mediumDate : "MMM d, yyyy",
//		longDate : "MMMM d, yyyy",
		longDate : "d MMMM yyyy",
		fullDate : "dddd, MMMM d, yyyy",
		shortTime : "h:mm TT",
		mediumTime : "h:mm:ss TT",
		longTime : "h:mm:ss TT Z",
		isoDate : "yyyy-MM-dd",
		isoTime : "HH:mm:ss",
		isoDateTime : "yyyy-MM-dd'T'HH:mm:ss",
		isoUtcDateTime : "UTC:yyyy-MM-dd'T'HH:mm:ss'Z'"
	};

	// Internationalization strings
	dateFormat.i18n = {
		dayNames : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
		monthNames : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
	};

	// The MIT License applies to code ending here // The MIT License applies to code ending here // The MIT License applies to code ending here // The MIT License applies to code ending here
	
	// For convenience...
	Date.prototype.format = function(mask, utc) {
		return dateFormat(this, mask, utc);
	};

	return {
		thExpressionObjectName : thExpressionObjectName,
		create : createProxy,
		createNow : createNow,
		createNowForTimeZone : createNow,
		createToday : createToday,
		createTodayForTimeZone : createToday,
		format : format,
		dateFormat : dateFormat,
		arrayFormat : arrayFormat,
		listFormat : arrayFormat,
		setFormat : setFormat,
		day : day,
		arrayDay : arrayDay,
		listDay : arrayDay,
		setDay : setDay,
		month : month,
		arrayMonth : arrayMonth,
		listMonth : arrayMonth,
		setMonth : setMonth,
		monthName : monthName,
		arrayMonthName : arrayMonthName,
		listMonthName : arrayMonthName,
		setMonthName : setMonthName,
		monthNameShort : monthNameShort,
		arrayMonthNameShort : arrayMonthNameShort,
		listMonthNameShort : arrayMonthNameShort,
		setMonthNameShort : setMonthNameShort,
		year : year,
		arrayYear : arrayYear,
		listYear : arrayYear,
		setYear : setYear,
		dayOfWeek : dayOfWeek,
		arrayDayOfWeek : arrayDayOfWeek,
		listDayOfWeek : arrayDayOfWeek,
		setDayOfWeek : setDayOfWeek,
		dayOfWeekName : dayOfWeekName,
		arrayDayOfWeekName : arrayDayOfWeekName,
		listDayOfWeekName : arrayDayOfWeekName,
		setDayOfWeekName : setDayOfWeekName,
		dayOfWeekNameShort : dayOfWeekNameShort,
		arrayDayOfWeekNameShort : arrayDayOfWeekNameShort,
		listDayOfWeekNameShort : arrayDayOfWeekNameShort,
		setDayOfWeekNameShort : setDayOfWeekNameShort,
		hour : hour,
		arrayHour : arrayHour,
		listHour : arrayHour,
		setHour : setHour,
		minute : minute,
		arrayMinute : arrayMinute,
		listMinute : arrayMinute,
		setMinute : setMinute,
		second : second,
		arraySecond : arraySecond,
		listSecond : arraySecond,
		setSecond : setSecond,
		millisecond : millisecond,
		arrayMillisecond : arrayMillisecond,
		listMillisecond : arrayMillisecond,
		setMillisecond : setMillisecond
	};

}();