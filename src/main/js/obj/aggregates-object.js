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

  function sum( target ) {
    return aggregate( target, false, "sum" );
  }

  function avg( target ) {
    return aggregate( target, true, "avg" );
  }

  function aggregate( target, doAvg, label ) {
    if( target !== null ) {
      var result = 0;
      var count;
      var tt = typeof target;
      var ptc = Object.prototype.toString.call( target );
      if( tt === "Array" || ptc === '[object Array]' ) {
        count = target.length;
        for( var i = 0; i < count; i++ ) {
          if( target[ i ] !== null ) {
            result += target[ i ];
          }
          else {
            aggregatesError( "Cannot aggregate on object containing nulls", this );
          }
        }
      }
      else {
        count = 0;
        for( var k in target ) {
          var value = target[ k ];
          var process = false;
          if( value !== null ) {
            if( target instanceof thymol.ThSet ) {
              process = target.isContent( k );
            }
            else {
              process = target.hasOwnProperty( k ) && typeof value !== "function";
            }
          }
          else {
            aggregatesError( "Cannot aggregate on object containing nulls", this );
          }
          if( process ) {
            result += value;
            count++;
          }
        }
      }
      if( doAvg ) {
        if( count == 0 ) {
          aggregatesError( "Cannot get size of object", this );
        }
        result = result / count;
      }
      return result;
    }
    aggregatesError( "Cannot aggregate on null", this );
  }

  function aggregatesError( text, element ) {
    thymol.error( true, "#aggregates." + " " + text, element );
  }
  
  return {
    thExpressionObjectName : thExpressionObjectName,
    sum : sum,
    avg : avg
  };

}();