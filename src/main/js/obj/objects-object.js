/*

	nullSafe(T, T)
	arrayNullSafe(T[], T)
listNullSafe(List<T>, T)
	setNullSafe(Set<T>, T)

 */

thymol.objects.thObjectsObject = function() {

  var thExpressionObjectName = "#objects";

  function nullSafe( target, defaultValue ) {
    return ( target != null ? target : defaultValue );
  }

  function arrayNullSafe( target, defaultValue ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( nullSafe( target[ i ], defaultValue ) );
      }
      return result;
    }
    objectsError( "arrayNullSafe Target cannot be null", this );
  }

  function setNullSafe( target, defaultValue ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( nullSafe( target[ k ], defaultValue ) );
        }
      }
      return result;
    }
    objectsError( "setNullSafe Target cannot be null", this );
  }

  function objectsError( text, element ) {
    thymol.error( true, "#objects." + text, element );
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    nullSafe : nullSafe,
    arrayNullSafe : arrayNullSafe,
    listNullSafe : arrayNullSafe,
    setNullSafe : setNullSafe
  };

}();