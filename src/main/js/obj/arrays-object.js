/*
	toArray(Object)
	toStringArray(Object)
	toIntegerArray(Object)
	toLongArray(Object)
	toDoubleArray(Object)
	toFloatArray(Object)
	toBooleanArray(Object)
	length(Object[])
	isEmpty(Object[])
	contains(Object[], Object)
	containsAll(Object[], Object[])
	containsAll(Object[], Collection<?>)
 */

thymol.objects.thArraysObject = function() {

  var thExpressionObjectName = "#arrays";

  function toArray( target ) {
    if( target !== null ) {
      return toTypedArray( null, target );
    }
    arraysError( "toArray Cannot convert null to array", this );
  }

  function toStringArray( target ) {
    if( target !== null ) {
      return toTypedArray( "string", target );
    }
    arraysError( "toStringArray Cannot convert null to array", this );
  }

  function toNumberArray( target ) {
    if( target !== null ) {
      return toTypedArray( "number", target );
    }
    arraysError( "toNumberArray Cannot convert null to array", this );
  }

  function toBooleanArray( target ) {
    if( target !== null ) {
      return toTypedArray( "boolean", target );
    }
    arraysError( "toBooleanArray Cannot convert null to array", this );
  }

  function toTypedArray( componentClass, target ) {
    if( target instanceof Array ) {
      if( componentClass === null || componentClass === "undefined" ) {
        return target;
      }
      var result = new Array();
      try {
        for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
          if( target[ i ] !== null ) {
            if( componentClass === "string" ) {
              result.push( ( new String( target[ i ] ) ).valueOf() );
            }
            else if( componentClass === "number" ) {
              result.push( ( new Number( target[ i ] ) ).valueOf() );
            }
            else if( componentClass === "boolean" ) {
              result.push( ( new Boolean( target[ i ] ) ).valueOf() );
            }
            else {
              result.push( target[ i ] );
            }
          }
        }
      }
      catch( err ) {
        arraysError( "toArray Cannot convert object of class \"" + targetComponentClass.getName() + "[]\" to an array" + " of " + componentClass.getClass().getSimpleName() );
      }
      return result;
    }
    else if( target instanceof Object ) {
      var result = new Array();
      try {
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
          if( process ) {
            if( componentClass === "string" ) {
              result.push( ( new String( value ) ).valueOf() );
            }
            else if( componentClass === "number" ) {
              result.push( ( new Number( value ) ).valueOf() );
            }
            else if( componentClass === "boolean" ) {
              result.push( ( new Boolean( value ) ).valueOf() );
            }
            else {
              result.push( value );
            }
          }
        }
      }
      catch( err ) {
        arraysError( "toArray Cannot convert object of class \"" + targetComponentClass.getName() + "[]\" to an array" + " of " + componentClass.getClass().getSimpleName() );
      }
      return result;

    }
    else {
      arraysError( "toArray Cannot convert object of type \"" + ( typeof target ) + "\" to an array" + ( componentClass == null ? "" : ( " of " + componentClass ) ) );

    }
  }

  function length( target ) {
    if( target !== null ) {
      return target.length;
    }
    arraysError( "length Cannot get array length of null", this );
  }

  function isEmpty( target ) {
    return target === null || target.length <= 0;
  }

  function contains( target, element ) {
    if( target !== null ) {
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] === null ) {
          if( element === null ) {
            return true;
          }
        }
        else if( element !== null && target[ i ] === element ) {
          return true;
        }
      }
      return false;
    }
    arraysError( "contains Cannot execute array contains: target is null", this );
  }

  function containsAll( target, elements ) {
    if( target !== null ) {
      if( elements !== null ) {
        var elementsArray;
        if( elements instanceof Array ) {
          elementsArray = [].concat( elements );
        }
        else {
          if( elements instanceof thymol.ThSet ) {
            elementsArray = elements.toArray();
          }
          else {
            elementsArray = [];
            for( var k in elements ) {
              if( elements.hasOwnProperty( k ) && typeof elements[ k ] !== "function" ) {
                elementsArray.push( elements[ k ] );
              }
            }
          }
        }
        for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
          for( var j = 0, jLimit = elementsArray.length; j < jLimit; j++ ) {
            if( target[ i ] === elementsArray[ j ] ) {
              elementsArray.splice( j, 1 );
            }
          }
        }
        return elementsArray.length === 0;
      }
      arraysError( "containsAll Cannot execute array containsAll: elements is null", this );
    }
    arraysError( "containsAll Cannot execute array containsAll: target is null", this );
  }

  function arraysError( text, element ) {
    thymol.error( true, "#arrays." + text, element );
  }
  
  return {
    thExpressionObjectName : thExpressionObjectName,
    toArray : toArray,
    toStringArray : toStringArray,
    toIntegerArray : toNumberArray,
    toLongArray : toNumberArray,
    toDoubleArray : toNumberArray,
    toFloatArray : toNumberArray,
    toBooleanArray : toBooleanArray,
    length : length,
    isEmpty : isEmpty,
    contains : contains,
    containsAll : containsAll
  };

}();