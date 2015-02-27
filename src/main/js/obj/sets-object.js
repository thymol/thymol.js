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
        throw new thymol.ThError( "#sets.toSet Cannot convert object of type \"" + tt + "\" to a set" );
      }
      return result;
    }
    throw new thymol.ThError( "#sets.toSet Cannot convert null to set" );
  }

  function size( target ) {
    if( target !== null ) {
      if( target instanceof thymol.ThSet ) {
        return target.size();
      }
      throw new thymol.ThError( "#sets.size Cannot get size of non-set type \"" + ( typeof target ) + "\"" );

    }
    throw new thymol.ThError( "#sets.size Cannot get size of null" );
  }

  function isEmpty( target ) {
    if( target !== null ) {
      if( target instanceof thymol.ThSet ) {
        return target.isEmpty();
      }
      throw new thymol.ThError( "#sets.size Cannot get isEmpty of non-set type \"" + ( typeof target ) + "\"" );

    }
    throw new thymol.ThError( "#sets.size Cannot get isEmpty of null" );
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
    throw new thymol.ThError( "#sets.contains Cannot execute sets contains: target is null" );
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
      throw new thymol.ThError( "#sets.containsAll Cannot execute sets containsAll: elements is null" );
    }
    throw new thymol.ThError( "#sets.containsAll Cannot execute sets containsAll: target is null" );
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