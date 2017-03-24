/*

	size(Map<?, ?>)
	isEmpty(Map<?, ?>)
	containsKey(Map<? super X, ?>, X)
	containsValue(Map<?, ? super X>, X)
	containsAllKeys(Map<? super X, ?>, X[])
	containsAllKeys(Map<? super X, ?>, Collection<X>)
	containsAllValues(Map<?, ? super X>, X[])
	containsAllValues(Map<?, ? super X>, Collection<X>)

 */

thymol.objects.thMapsObject = function() {

  var thExpressionObjectName = "#maps";

  function size( target ) {
    if( target !== null ) {
      if( target instanceof thymol.ThMap ) {
        return target.size();
      }
      mapsError( "size Cannot get size of non-map type \"" + ( typeof target ) + "\"", this );

    }
    mapsError( "size Cannot get size of null", this );
  }

  function isEmpty( target ) {
    if( target !== null ) {
      if( target instanceof thymol.ThMap ) {
        return target.isEmpty();
      }
      mapsError( "size Cannot get isEmpty of non-map type \"" + ( typeof target ) + "\"", this );

    }
    mapsError( "size Cannot get isEmpty of null", this );
  }

  function containsKey( target, key ) {
    if( target !== null ) {
      if( target instanceof thymol.ThMap ) {
        return target.containsKey( key );
      }
      mapsError( "size Cannot get containsKey of non-map type \"" + ( typeof target ) + "\"", this );

    }
    mapsError( "containsKey Cannot execute map containsKey: target is null", this );
  }

  function containsValue( target, value ) {
    if( target !== null ) {
      if( target instanceof thymol.ThMap ) {
        return target.containsValue( value );
      }
      mapsError( "size Cannot get containsValue of non-map type \"" + ( typeof target ) + "\"", this );

    }
    mapsError( "containsKey Cannot execute map containsValue: target is null", this );
  }

  function containsAllKeys( target, keys ) {
    if( target !== null ) {
      if( target instanceof thymol.ThMap ) {
        var ptc = Object.prototype.toString.call( keys );
        if( keys instanceof thymol.ThSet || keys instanceof Array || ptc === '[object Array]' ) {
          return target.containsAll( keys );
        }
        mapsError( "size Cannot get containsAllKeys with non-collection type \"" + ptc + "\"", this );
      }
      mapsError( "size Cannot get containsAllKeys of non-map type \"" + ( typeof target ) + "\"", this );
    }
    mapsError( "containsKey Cannot execute map containsAllKeys: target is null", this );
  }

  function containsAllValues( target, values ) {
    if( target !== null ) {
      if( target instanceof thymol.ThMap ) {
        var ptc = Object.prototype.toString.call( values );
        if( values instanceof thymol.ThSet || values instanceof Array || ptc === '[object Array]' ) {
          var vArray = values;
          if( values instanceof thymol.ThSet ) {
            vArray = values.toArray();
          }
          for( var i = 0, iLimit = vArray.length; i < iLimit; i++ ) {
            var found = false;
            for( var k in target ) {
              if( target.hasOwnProperty( k ) ) {
                var value = target[ k ];
                if( value === vArray[ i ] ) {
                  found = true;
                  break;
                }
              }
            }
            if( !found ) {
              return false;
            }
          }
          return true;
        }
        mapsError( "size Cannot get containsAllValues with non-collection type \"" + ptc + "\"", this );
      }
      mapsError( "size Cannot get containsAllValues of non-map type \"" + ( typeof target ) + "\"", this );
    }
    mapsError( "containsKey Cannot execute map containsAllValues: target is null", this );
  }

  function mapsError( text, element ) {
    thymol.error( true, "#maps." + text, element );
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    size : size,
    isEmpty : isEmpty,
    containsKey : containsKey,
    containsValue : containsValue,
    containsAllKeys : containsAllKeys,
    containsAllValues : containsAllValues
  };

}();