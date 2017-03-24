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
      messagesError( "msg Invoked with no arguments!", this );
    }
    messagesError( "msg Target cannot be null", this );
  }

  function msgWithParams( target, params ) {
    if( target !== null ) {
      return thymol.getMessage( target, params, true );
    }
    messagesError( "msgWithParams Target cannot be null", this );
  }

  function msgOrNull() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return msgOrNullWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      messagesError( "msgOrNull Invoked with no arguments!", this );
    }
    messagesError( "msgOrNull Target cannot be null", this );
  }

  function msgOrNullWithParams( target, params ) {
    if( target !== null ) {
      return thymol.getMessage( target, params, false );
    }
    messagesError( "msgOrNullWithParams Target cannot be null", this );
  }

  function arrayMsg() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return arrayMsgWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      messagesError( "arrayMsg Invoked with no arguments!", this );
    }
    messagesError( "arrayMsg Target cannot be null", this );
  }

  function arrayMsgWithParams( target, params ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( msgWithParams( target[ i ], params ) );
      }
      return result;
    }
    messagesError( "arrayMsgWithParams Target cannot be null", this );
  }

  function setMsg() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return setMsgWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      messagesError( "setMsg Invoked with no arguments!", this );
    }
    messagesError( "setMsg Target cannot be null", this );
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
    messagesError( "setMsgWithParams Target cannot be null", this );
  }

  function arrayMsgOrNull() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return arrayMsgOrNullWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      messagesError( "arrayMsgOrNull Invoked with no arguments!", this );
    }
    messagesError( "arrayMsgOrNull Target cannot be null", this );
  }

  function arrayMsgOrNullWithParams( target, params ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( msgOrNullWithParams( target[ i ], params ) );
      }
      return result;
    }
    messagesError( "arrayMsgOrNullWithParams Target cannot be null", this );
  }

  function setMsgOrNull() {
    if( arguments !== null ) {
      if( arguments.length > 0 ) {
        return setMsgOrNullWithParams( arguments[ 0 ], Array.prototype.slice.call( arguments, 1 ) );
      }
      messagesError( "setMsgOrNull Invoked with no arguments!", this );
    }
    messagesError( "setMsgOrNull Target cannot be null", this );
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
    messagesError( "setMsgOrNullWithParams Target cannot be null", this );
  }

  function messagesError( text, element ) {
    thymol.error( true, "#messages." + text, element );
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