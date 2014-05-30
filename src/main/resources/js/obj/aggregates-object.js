/*

	sum(Iterable<? extends Number>)
	sum(Number[])
	sum(byte[])
	sum(short[])
	sum(int[])
	sum(long[])
	sum(float[])
	sum(double[])
	avg(Iterable<? extends Number>)
	avg(Number[])
	avg(byte[])
	avg(short[])
	avg(int[])
	avg(long[])
	avg(float[])
	avg(double[])

*/

thymol.objects.thAggregatesObject = function() {

	var thExpressionObjectName = "#aggregates";

	function sum(target) {
		return aggregate(target,false,"sum");
	}
	
	function avg(target) {
		return aggregate(target,true,"avg");
	}
	
	function aggregate(target,doAvg,label) {
		if (target !== null) {
			var result = 0;
			var count;
			var tt = typeof target;
			var ptc = Object.prototype.toString.call(target);
			if ( tt === "Array" || ptc === '[object Array]') {
				count = target.length;
				for( var i = 0; i < count; i++  ) {
					if( target[i] !== null ) {
						result += target[i];
					}
					else {
						throw new ThError("#aggregates."+label+" Cannot aggregate on object containing nulls");						
					}
				}
			}
			else {
				count = 0;
				for ( var k in target) {					
					var value = target[k];
					var process = false;
					if( value !== null ) {
						if( target instanceof ThSet ) {
							process = target.isContent(k);
						}
						else {
							process = target.hasOwnProperty(k) && typeof value !== "function";
						}										
					}
					else {
						throw new ThError("#aggregates."+label+" Cannot aggregate on object containing nulls");												
					}
					if( process ) {
						result += value;
						count++;
					}
				}				
			}
			if( doAvg ) {
				if( count == 0 ) {
					throw new ThError("#aggregates."+label+" Cannot get size of object");												
				}
				result = result / count;								
			}
			return result;
		}
		throw new ThError("#aggregates."+label+" Cannot aggregate on null");		
	}

	return {
		thExpressionObjectName : thExpressionObjectName,
		sum : sum,
		avg : avg
	};

}();