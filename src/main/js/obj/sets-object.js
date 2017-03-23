/*

	toSet(Object)
	size(Set<?>)
	isEmpty(Set<?>)
	contains(Set<?>, Object)
	containsAll(Set<?>, Object[])
	containsAll(Set<?>, Collection<?>)

 */

thymol.objects.thSetsObject = function() {

  var thExpressionObjectName = "#sets";

  function toSet( target ) {
    if( target !== null ) {
      var tt = typeof target;
      var ptc = Object.prototype.toString.call( target );
      var result;
      if( tt === "thymol.ThSet" ) {
        result = target; // Nothing to do!
      }
      if( tt === "Array" || ptc === '[object Array]' ) {
        result = thymol.ThSet.prototype.fromArray( target );
      }
      else if( tt === "object" ) {
        result = new thymol.ThSet();
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
            result.add( value );
          }
        }
      }
      else {
        setsError( "toSet Cannot convert object of type \"" + tt + "\" to a set", this );
      }
      return result;
    }
    setsError( "toSet Cannot convert null to set", this );
  }

  function size( target ) {
    if( target !== null ) {
      if( target instanceof thymol.ThSet ) {
        return target.size();
      }
      setsError( "size Cannot get size of non-set type \"" + ( typeof target ) + "\"", this );

    }
    setsError( "size Cannot get size of null", this );
  }

  function isEmpty( target ) {
    if( target !== null ) {
      if( target instanceof thymol.ThSet ) {
        return target.isEmpty();
      }
      setsError( "size Cannot get isEmpty of non-set type \"" + ( typeof target ) + "\"", this );

    }
    setsError( "size Cannot get isEmpty of null", this );
  }

  function contains( target, element ) {
    if( target !== null ) {
      for( var k in target ) {
        if( target.isContent( k ) ) {
          if( target[ k ] === null ) {
            if( element === null ) {
              return true;
            }
          }
          else if( element !== null && target[ k ] === element ) {
            return true;
          }
        }
      }
      return false;
    }
    setsError( "contains Cannot execute sets contains: target is null", this );
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
        for( var k in target ) {
          if( target.isContent( k ) ) {
            for( var j = 0, jLimit = elementsArray.length; j < jLimit; j++ ) {
              if( target[ k ] === elementsArray[ j ] ) {
                elementsArray.splice( j, 1 );
              }
            }
          }
        }
        return elementsArray.length === 0;
      }
      setsError( "containsAll Cannot execute sets containsAll: elements is null", this );
    }
    setsError( "containsAll Cannot execute sets containsAll: target is null", this );
  }

  function setsError( text, element ) {
    thymol.error( true, "#sets." + text, element );
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    toSet : toSet,
    size : size,
    isEmpty : isEmpty,
    contains : contains,
    containsAll : containsAll
  };

}();