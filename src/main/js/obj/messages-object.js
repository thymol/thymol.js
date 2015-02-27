/*

arguments : Arguments
	msg(String)
	msg(String, Object)
	msg(String, Object, Object)
	msg(String, Object, Object, Object)
	msgWithParams(String, Object[])
	msgOrNull(String)
	msgOrNull(String, Object)
	msgOrNull(String, Object, Object)
	msgOrNull(String, Object, Object, Object)
	msgOrNullWithParams(String, Object[])
	arrayMsg(Object[])
	arrayMsg(Object[], Object)
	arrayMsg(Object[], Object, Object)
	arrayMsg(Object[], Object, Object, Object)
	arrayMsgWithParams(Object[], Object[])
	arrayMsgOrNull(Object[])
	arrayMsgOrNull(Object[], Object)
	arrayMsgOrNull(Object[], Object, Object)
	arrayMsgOrNull(Object[], Object, Object, Object)
	arrayMsgOrNullWithParams(Object[], Object[])
	listMsg(List<String>)
	listMsg(List<String>, Object)
	listMsg(List<String>, Object, Object)
	listMsg(List<String>, Object, Object, Object)
	listMsgWithParams(List<String>, Object[])
	listMsgOrNull(List<String>)
	listMsgOrNull(List<String>, Object)
	listMsgOrNull(List<String>, Object, Object)
	listMsgOrNull(List<String>, Object, Object, Object)
	listMsgOrNullWithParams(List<String>, Object[])
	setMsg(Set<String>)
	setMsg(Set<String>, Object)
	setMsg(Set<String>, Object, Object)
	setMsg(Set<String>, Object, Object, Object)
	setMsgWithParams(Set<String>, Object[])
	setMsgOrNull(Set<String>)
	setMsgOrNull(Set<String>, Object)
	setMsgOrNull(Set<String>, Object, Object)
	setMsgOrNull(Set<String>, Object, Object, Object)
	setMsgOrNullWithParams(Set<String>, Object[])

 */

thymol.objects.thMessagesObject = function() {

  var thExpressionObjectName = "#messages";

  function msg() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return msgWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      throw new thymol.ThError( "#messages.msg Invoked with no arguments!" );
    }
    throw new thymol.ThError( "#messages.msg Target cannot be null" );
  }

  function msgWithParams( target, params ) {
    if( target !== null ) {
      return thymol.getMessage( target, params, true );
    }
    throw new thymol.ThError( "#messages.msgWithParams Target cannot be null" );
  }

  function msgOrNull() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return msgOrNullWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      throw new thymol.ThError( "#messages.msgOrNull Invoked with no arguments!" );
    }
    throw new thymol.ThError( "#messages.msgOrNull Target cannot be null" );
  }

  function msgOrNullWithParams( target, params ) {
    if( target !== null ) {
      return thymol.getMessage( target, params, false );
    }
    throw new thymol.ThError( "#messages.msgOrNullWithParams Target cannot be null" );
  }

  function arrayMsg() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return arrayMsgWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      throw new thymol.ThError( "#messages.arrayMsg Invoked with no arguments!" );
    }
    throw new thymol.ThError( "#messages.arrayMsg Target cannot be null" );
  }

  function arrayMsgWithParams( target, params ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( msgWithParams( target[ i ], params ) );
      }
      return result;
    }
    throw new thymol.ThError( "#messages.arrayMsgWithParams Target cannot be null" );
  }

  function setMsg() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return setMsgWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      throw new thymol.ThError( "#messages.setMsg Invoked with no arguments!" );
    }
    throw new thymol.ThError( "#messages.setMsg Target cannot be null" );
  }

  function setMsgWithParams( target, params ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( msgWithParams( target[ k ], params ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#messages.setMsgWithParams Target cannot be null" );
  }

  function arrayMsgOrNull() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return arrayMsgOrNullWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      throw new thymol.ThError( "#messages.arrayMsgOrNull Invoked with no arguments!" );
    }
    throw new thymol.ThError( "#messages.arrayMsgOrNull Target cannot be null" );
  }

  function arrayMsgOrNullWithParams( target, params ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( msgOrNullWithParams( target[ i ], params ) );
      }
      return result;
    }
    throw new thymol.ThError( "#messages.arrayMsgOrNullWithParams Target cannot be null" );
  }

  function setMsgOrNull() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return setMsgOrNullWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      throw new thymol.ThError( "#messages.setMsgOrNull Invoked with no arguments!" );
    }
    throw new thymol.ThError( "#messages.setMsgOrNull Target cannot be null" );
  }

  function setMsgOrNullWithParams( target, params ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( msgOrNullWithParams( target[ k ], params ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#messages.setMsgOrNullWithParams Target cannot be null" );
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    msg : msg,
    msgWithParams : msgWithParams,
    msgOrNull : msgOrNull,
    msgOrNullWithParams : msgOrNullWithParams,
    arrayMsg : arrayMsg,
    listMsg : arrayMsg,
    setMsg : setMsg,
    arrayMsgWithParams : arrayMsgWithParams,
    listMsgWithParams : arrayMsgWithParams,
    setMsgWithParams : setMsgWithParams,
    arrayMsgOrNull : arrayMsgOrNull,
    listMsgOrNull : arrayMsgOrNull,
    setMsgOrNull : setMsgOrNull,
    arrayMsgOrNullWithParams : arrayMsgOrNullWithParams,
    listMsgOrNullWithParams : arrayMsgOrNullWithParams,
    setMsgOrNullWithParams : setMsgOrNullWithParams
  };

}();