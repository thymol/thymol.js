/*

	isTrue(Object)
	arrayIsTrue(Object[])
listIsTrue(List<?>)
	setIsTrue(Set<?>)
	isFalse(Object)
	arrayIsFalse(Object[])
listIsFalse(List<?>)
	setIsFalse(Set<?>)
	arrayAnd(Object[])
listAnd(List<?>)
	setAnd(Set<?>)
	arrayOr(Object[])
listOr(List<?>)
	setOr(Set<?>)

 */

thymol.objects.thBoolsObject = function() {

  var thExpressionObjectName = "#bools";

  /*  
  Note that the th:if attribute will not only evaluate boolean target. It's capabilities go a little beyond that, and it will
  evaluate the specified expression as true following these rules:
  If value is not null:
  If value is a boolean and is true .
  If value is a number and is non-zero
  If value is a character and is non-zero
  If value is a String and is not "false", "off" or "no"
  If value is not a boolean, a number, a character or a String.
  (If value is null, th:if will evaluate to false).
  */  

  function isTrue( target ) {
    var result = true;
    var tc;
    if( target == null || ( tc = typeof target ) === "undefined" ) {
      result = false;
    }
    else {
      if( tc === "boolean" ) {
        result = target;
      }
      else if( tc === "number" ) {
        result = target != 0;
      }
      else if( tc === "string" ) {
        if( target.length === 1 ) {
          result = target.charCodeAt( 0 ) != 0;
        }
        else if( thymol.ThUtils.testLiteralFalse( target ) ) {
          result = false;
        }
      }
    }
    return result;
  }

  function arrayIsTrue( target ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( isTrue( target[ i ] ) );
      }
      return result;
    }
    throw new thymol.ThError( "#bools.arrayIsTrue Target cannot be null" );
  }

  function setIsTrue( target ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( isTrue( target[ k ] ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#bools.setIsTrue Target cannot be null" );
  }

  function isFalse( target ) {
    return !isTrue( target );
  }

  function arrayIsFalse( target ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( !isTrue( target[ i ] ) );
      }
      return result;
    }
    throw new thymol.ThError( "#bools.arrayIsFalse Target cannot be null" );
  }

  function setIsFalse( target ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( !isTrue( target[ k ] ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#bools.setIsFalse Target cannot be null" );
  }

  function arrayAnd( target ) {
    if( target !== null ) {
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( !isTrue( target[ i ] ) ) {
          return false;
        }
      }
      return true;
    }
    throw new thymol.ThError( "#bools.arrayAnd Target cannot be null" );
  }

  function setAnd( target ) {
    if( target !== null ) {
      for( var k in target ) {
        if( target.isContent( k ) ) {
          if( !isTrue( target[ k ] ) ) {
            return false;
          }
        }
      }
      return true;
    }
    throw new thymol.ThError( "#bools.setAnd Target cannot be null" );
  }

  function arrayOr( target ) {
    if( target !== null ) {
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( isTrue( target[ i ] ) ) {
          return true;
        }
      }
      return false;
    }
    throw new thymol.ThError( "#bools.arrayOr Target cannot be null" );
  }

  function setOr( target ) {
    if( target !== null ) {
      for( var k in target ) {
        if( target.isContent( k ) ) {
          if( isTrue( target[ k ] ) ) {
            return true;
          }
        }
      }
      return false;
    }
    throw new thymol.ThError( "#bools.setOr Target cannot be null" );
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    isTrue : isTrue,
    arrayIsTrue : arrayIsTrue,
    listIsTrue : arrayIsTrue,
    setIsTrue : setIsTrue,
    isFalse : isFalse,
    arrayIsFalse : arrayIsFalse,
    listIsFalse : arrayIsFalse,
    setIsFalse : setIsFalse,
    arrayAnd : arrayAnd,
    listAnd : arrayAnd,
    setAnd : setAnd,
    arrayOr : arrayOr,
    listOr : arrayOr,
    setOr : setOr
  };

}();