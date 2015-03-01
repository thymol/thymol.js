/*

	formatInteger(Number, Integer)
	arrayFormatInteger(Object[], Integer)
listFormatInteger(List<? extends Number>, Integer)
	setFormatInteger(Set<? extends Number>, Integer)
	formatInteger(Number, Integer, String)
	arrayFormatInteger(Object[], Integer, String)
listFormatInteger(List<? extends Number>, Integer, String)
	setFormatInteger(Set<? extends Number>, Integer, String)
	formatDecimal(Number, Integer, Integer)
	arrayFormatDecimal(Object[], Integer, Integer)
listFormatDecimal(List<? extends Number>, Integer, Integer)
	setFormatDecimal(Set<? extends Number>, Integer, Integer)
	formatDecimal(Number, Integer, Integer, String)
	arrayFormatDecimal(Object[], Integer, Integer, String)
listFormatDecimal(List<? extends Number>, Integer, Integer, String)
	setFormatDecimal(Set<? extends Number>, Integer, Integer, String)
	formatDecimal(Number, Integer, String, Integer, String)
	arrayFormatDecimal(Object[], Integer, String, Integer, String)
listFormatDecimal(List<? extends Number>, Integer, String, Integer, String)
	setFormatDecimal(Set<? extends Number>, Integer, String, Integer, String)
	sequence(Integer, Integer)
	sequence(Integer, Integer, Integer)

 */

thymol.objects.thNumbersObject = function() {

  var thExpressionObjectName = "#numbers";

  var DEFAULT_THOU_PT = ',';
  var DEFAULT_DECI_PT = '.';
  var DEFAULT_NONE_PT = '?';

  function formatDecimalProxy() {
    if( arguments !== null ) {
      if( arguments.length > 4 ) {
        return formatDecimal5( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ], arguments[ 3 ], arguments[ 4 ] );
      }
      else if( arguments.length > 3 ) {
        return formatDecimal4( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ], arguments[ 3 ] );
      }
      return formatDecimal3( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ] );
    }
  }

  function formatIntegerProxy() {
    if( arguments !== null ) {
      if( arguments.length > 4 ) {
        return formatDecimal5( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ], arguments[ 3 ], arguments[ 4 ] );
      }
      else if( arguments.length > 3 ) {
        return formatDecimal5( arguments[ 0 ], arguments[ 1 ], "NONE", arguments[ 2 ], arguments[ 3 ] );
      }
      else if( arguments.length > 2 ) {
        if( typeof arguments[ 2 ] === "string" ) {
          return formatDecimal5( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ], 0, "POINT" );
        }
        return formatDecimal5( arguments[ 0 ], arguments[ 1 ], "NONE", arguments[ 2 ], "POINT" );
      }
      else {
        return formatDecimal5( arguments[ 0 ], arguments[ 1 ], "NONE", 0, "POINT" );
      }
    }
  }

  function arrayFormatIntegerProxy() {
    if( arguments !== null ) {
      if( arguments.length > 2 ) {
        return arrayFormatDecimal( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ], 0, "POINT" );
      }
      return arrayFormatDecimal( arguments[ 0 ], arguments[ 1 ], "NONE", 0, "POINT" );
    }
  }

  function setFormatIntegerProxy() {
    if( arguments !== null ) {
      if( arguments.length > 2 ) {
        return setFormatDecimal( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ], 0, "POINT" );
      }
      return setFormatDecimal( arguments[ 0 ], arguments[ 1 ], "NONE", 0, "POINT" );
    }
  }

  function arrayFormatDecimalProxy() {
    if( arguments !== null ) {
      if( arguments.length > 4 ) {
        return arrayFormatDecimal( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ], arguments[ 3 ], arguments[ 4 ] );
      }
      else if( arguments.length > 3 ) {
        return arrayFormatDecimal( arguments[ 0 ], arguments[ 1 ], "NONE", arguments[ 2 ], arguments[ 3 ] );
      }
      return arrayFormatDecimal( arguments[ 0 ], arguments[ 1 ], "NONE", arguments[ 2 ], "POINT" );
    }
  }

  function setFormatDecimalProxy() {
    if( arguments !== null ) {
      if( arguments.length > 4 ) {
        return setFormatDecimal( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ], arguments[ 3 ], arguments[ 4 ] );
      }
      else if( arguments.length > 3 ) {
        return setFormatDecimal( arguments[ 0 ], arguments[ 1 ], "NONE", arguments[ 2 ], arguments[ 3 ] );
      }
      return setFormatDecimal( arguments[ 0 ], arguments[ 1 ], "NONE", arguments[ 2 ], "POINT" );
    }
  }

  function sequenceProxy() {
    if( arguments !== null ) {
      if( arguments.length > 2 ) {
        return sequence( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ] );
      }
      return sequence( arguments[ 0 ], arguments[ 1 ], 1 );
    }
  }

  function getIntegerDigits( val ) {
    var s = val.toString();
    var digits = s.length;
    var dp = s.indexOf( '.' );
    if( dp > 0 ) {
      digits = dp;
    }
    return digits;
  }

  function formatDecimal3( target, minIntegerDigits, decimalDigits ) {
    var result = target.toString();
    var value = new Number( target );
    value = value.toFixed( decimalDigits );
    if( minIntegerDigits > 0 ) {
      result = value;
      value = new Number( value );
      var a = Math.abs( value );
      if( a < Math.pow( 10, minIntegerDigits ) ) {
        if( target < 0 ) {
          result = result.substring( 1 );
        }
        var p = getIntegerDigits( a );
        var x = minIntegerDigits - p;
        if( x > 0 ) {
          for( var i = 0; i < x; i++ ) {
            result = "0" + result;
          }
        }
        if( target < 0 ) {
          result = '-' + result;
        }
      }
    }
    else {
      result = value.toString();
    }
    result = new String( result );
    result.precision = decimalDigits;
    return result;
  }

  function formatDecimal4( target, minIntegerDigits, decimalDigits, decimalPointType ) {
    var result = formatDecimal3( target, minIntegerDigits, decimalDigits );
    var decimalPoint;
    if( "DEFAULT" === decimalPointType ) {
      decimalPoint = DEFAULT_DECI_PT;
    }
    else if( "NONE" === decimalPointType ) {
      decimalPoint = DEFAULT_NONE_PT;
    }
    else {
      decimalPoint = getPointType( decimalPointType );
    }
    if( '.' !== decimalPoint ) {
      result = result.replace( '.', decimalPoint, "g" );
    }
    return result;
  }

  function formatDecimal5( target, minIntegerDigits, thousandsPointType, decimalDigits, decimalPointType ) {
    var result = target.toString();
    var decimalPoint;
    if( "DEFAULT" === decimalPointType ) {
      decimalPoint = DEFAULT_DECI_PT;
    }
    else if( "NONE" === decimalPointType ) {
      decimalPoint = DEFAULT_NONE_PT;
    }
    else {
      decimalPoint = getPointType( decimalPointType );
    }
    if( '' !== decimalPoint ) {
      result = formatDecimal4( target, minIntegerDigits, decimalDigits, decimalPointType );
    }
    else {
      result = formatDecimal3( target, minIntegerDigits, decimalDigits );
    }
    var thousandsPoint;
    if( "DEFAULT" === thousandsPointType ) {
      thousandsPoint = DEFAULT_THOU_PT;
    }
    else {
      thousandsPoint = getPointType( thousandsPointType );
    }
    if( '' !== thousandsPoint ) {
      result = addThousandsPointType( result.toString(), decimalPoint, thousandsPoint );
    }
    return result;
  }

  function getPointType( type ) {
    var result = '.';
    if( "COMMA" === type ) {
      result = ',';
    }
    else if( "WHITESPACE" === type ) {
      result = ' ';
    }
    else if( "NONE" === type ) {
      result = '';
    }
    return result;
  }

  function arrayFormatDecimal( target, minIntegerDigits, thousandsPointType, decimalDigits, decimalPointType ) {
    var result = [];
    for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
      result.push( formatDecimal5( target[ i ], minIntegerDigits, thousandsPointType, decimalDigits, decimalPointType ) );
    }
    return result;
  }

  function setFormatDecimal( target, minIntegerDigits, thousandsPointType, decimalDigits, decimalPointType ) {
    var result = new thymol.ThSet();
    for( var k in target ) {
      if( target.hasOwnProperty( k ) && typeof target[ k ] !== "function" ) {
        result.add( formatDecimal5( target[ k ], minIntegerDigits, thousandsPointType, decimalDigits, decimalPointType ) );
      }
    }
    return result;
  }

  function addThousandsPointType( nStr, dpt, tpt ) {
    var x = nStr.split( dpt );
    var x1 = x[ 0 ];
    var x2 = x.length > 1 ? dpt + x[ 1 ] : '';
    var rgx = /(\d+)(\d{3})/;
    while( rgx.test( x1 ) ) {
      x1 = x1.replace( rgx, '$1' + tpt + '$2' );
    }
    return x1 + x2;
  }

  function sequence( start, stop, step ) {
    var result = [];
    if( step > 0 ) {
      var value = start;
      if( start <= stop ) {
        do {
          result.push( value );
          value += step;
        }while( value <= stop );
      }
      else {
        do {
          result.push( value );
          value -= step;
        }while( value >= stop );
      }
    }
    return result;
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    formatDecimal : formatDecimalProxy,
    formatInteger : formatIntegerProxy,
    arrayFormatInteger : arrayFormatIntegerProxy,
    arrayFormatDecimal : arrayFormatDecimalProxy,
    listFormatInteger : arrayFormatIntegerProxy,
    listFormatDecimal : arrayFormatDecimalProxy,
    setFormatInteger : setFormatIntegerProxy,
    setFormatDecimal : setFormatDecimalProxy,
    sequence : sequenceProxy
  };

}();