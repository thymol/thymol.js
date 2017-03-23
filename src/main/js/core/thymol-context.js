thymol.makeContext = function( contextNameParam, varAccessorParam ) {

  const jsonDeclSpec = "(?:\\W*([\\'][A-Za-z]+(?:\\w|[$])*[\\'])\\s*[:])?\\s*([#][A-Za-z]+(?:\\w|[$])*)(?:\\W|[^$])*", jsonDeclExpr = new RegExp( jsonDeclSpec ), context = new Array();

  context.contextName = contextNameParam;
  context.varAccessor = varAccessorParam;
  context.varStore = [];
  context.varNamePrefix = "";

  if( typeof varAccessorParam === "undefined" ) {
    context.varAccessor = new thymol.ThVarsAccessor( context.varStore, "varStore" );
  }
  context.varNamePrefix = context.varAccessor.arrayName + "[";

  context.getJSONView = function( param, rootVal ) {
    var pType = typeof param, view = "", objType;
    if( pType === 'string' ) {
      view = view + "'" + param + "'";
    }
    else if( pType === 'number' || pType === 'boolean' ) {
      view = view + param;
    }
    else if( pType === 'object' ) {
      if( param instanceof Object ) {
        objType = Object.prototype.toString.call( param );
        if( "[object Array]" === objType ) {
          view = this.getJSONViewArray( param, false );
        }
        else if( "[object Object]" === objType ) {
          view = this.getJSONViewObject( param, false );
        }
        view = '#' + view;
      }
    }
    return view;
  };

  context.init = function() {
    var persisted = thymol.thTop.name, paramRow, paramName, params, i, iLimit, paramValue;
    if( persisted && persisted !== "" ) {
      params = this.javascriptify( persisted );
      if( params && params.length > 0 ) {
        for( i = 0, iLimit = params.length; i < iLimit; i++ ) {
          paramRow = params[ i ];
          if( paramRow ) {
            paramName = paramRow[ 0 ];
            if( paramName ) {
              paramValue = paramRow[ 1 ];
              this.createVariable( paramName, paramValue );
            }
          }
        }
      }
    }
  };

  context.getJSONViewObject = function( param, rootVal ) {
    var isRoot = true, key = null, view = "{", value, identifier, definition, suffix, instanceNamePrefix, isTaken, i, iLimit, instanceValue;
    if( typeof rootVal === "boolean" ) {
      isRoot = rootVal;
    }
    for( key in param ) {
      if( key ) {
        value = param[ key ];
        if( typeof value !== "function" ) {
          if( view != "{" ) {
            view = view + ",";
          }
          identifier = this.getJSONView( key, false );
          definition = this.getJSONView( value, false );
          view = view + identifier + ":";
          if( !isRoot && typeof value === "object" ) {
            suffix = 1;
            instanceNamePrefix = key + "$";
            instanceName = null;
            isTaken = false;
            do {
              instanceName = instanceNamePrefix + suffix++;
              instanceValue = context[ instanceName ];
              if( instanceValue === null || typeof instanceValue === "undefined" ) {
                isTaken = false;
                for( i = 0, iLimit = context.varStore.length; i < iLimit; i++ ) {
                  if( instanceName === context.varStore[ i ][ 0 ] ) {
                    isTaken = true;
                    break;
                  }
                }
                if( !isTaken ) {
                  this.addAttribute( instanceName, definition );
                }
              }
            }while( isTaken );
            if( instanceName !== null ) {
              view = view + "#" + instanceName;
            }
          }
          else {
            view = view + definition;
          }
        }
      }
    }
    view = view + "}";
    return view;
  };

  context.getJSONViewArray = function( param, rootVal ) {
    var view = "[", i;
    for( i = 0; i < param.length; i++ ) {
      view = view + this.getJSONView( param[ i ], false );
      if( i < param.length - 1 ) {
        view = view + ",";
      }
    }
    view = view + "]";
    return view;
  };

  context.getAttribute = function( name ) {
    return context[ name ];
  };

  context.addAttribute = function( name, value ) {
    var entry = [];
    entry[ 0 ] = name;
    entry[ 1 ] = value;
    context.varStore.push( entry );
  };

  context.serialise = function() {
    context.varStore = [];
    var serialised = "[", key = null, value, cn, view, name, i, iLimit;
    for( key in context ) {
      if( key ) {
        value = context[ key ];
        if( value != null && typeof value === "object" ) {
          cn = Object.prototype.toString.call( value );
          if( "[object Array]" !== cn && ! ( value instanceof thymol.ThClass ) && ! ( value instanceof thymol.ThVarsAccessor ) ) {
            if( serialised !== "[" ) {
              serialised = serialised + ",";
            }
            view = this.getJSONView( value, true );
            serialised = serialised + "[";
            serialised = serialised + "\"" + key + "\"";
            serialised = serialised + ",";
            serialised = serialised + "\"" + view + "\"";
            serialised = serialised + "]";
          }
        }
      }
    }
    for( i = 0, iLimit = context.varStore.length; i < iLimit; i++ ) {
      name = context.varStore[ i ][ 0 ];
      view = context.varStore[ i ][ 1 ];
      serialised = serialised + ",[";
      serialised = serialised + "\"" + name + "\"";
      serialised = serialised + ",";
      serialised = serialised + "\"" + view + "\"";
      serialised = serialised + "]";
    }
    serialised = serialised + "]";
    return serialised;
  };

  context.javascriptify = function( fn ) {
    try {
      return new Function( 'return ' + fn )();
    }
    catch( err ) {
      return undefined;
    }
  };

  context.createVariable = function( name, valParam, isReq ) {
    var value = valParam, param, tt, literalBoolean, strValue, initial, existing, newArray;
    param = value;
    if( ! ( value instanceof thymol.ThParam ) ) {
      tt = ( typeof valParam );
      if( tt !== "function" && tt !== "object" ) {
        if( tt === "string" ) {
          try {
            value = isReq ? decodeURIComponent( value ) : decodeURI( value );
          }
          catch( err ) {  // If decode fails, then it's best to leave value unchanged
 //           value = "";
          }
        }
        if( tt === "boolean" || tt === "number" ) {
          param = new thymol.ThParam( value );
        }
        else if( value || value === "" ) {
          literalBoolean = thymol.ThUtils.testLiteralFalse( value );
          if( literalBoolean ) {
            param = false;
          }
          else {
            strValue = new String( value );
            initial = strValue.trim();
            if( initial.charAt( 0 ) === '#' ) {
              initial = initial.substring( 1 );
              try {
                param = this.createJSONVariable( initial );
              }
              catch( err ) {
                if( err instanceof ReferenceError ) {
                  // Do nothing
                }
                if( err instanceof EvalError ) {
                  // Do nothing
                }
                if( param == null || isReq ) {
                  param = new thymol.ThParam( value ); // Just save it
                }
              }
            }
            else {
              param = new thymol.ThParam( strValue.toString() );
            }
          }
        }
      }
    }
    if( isReq ) { // Handle multi-valued request parameters
      existing = context[ name ];
      if( typeof existing !== "undefined" && existing !== null ) {
        if( Object.prototype.toString.call( existing ) === '[object Array]' ) {
          existing.push( param );
        }
        else {
          thymol.error( false, "request parameters should be of type string array \"" + name + "\"" );
        }
      }
      else {
        newArray = new Array();
        newArray[ "class" ] = {};
        newArray[ "class" ][ "name" ] = "[Thymol.ThParam]";
        newArray.push( param );
        context[ name ] = newArray;

      }
    }
    else {
      context[ name ] = param;
    }
    return param;
  };

  context.createJSONVariable = function( initial ) {
    var current = initial.trim(), parts = " ", substIndex, token, re, vName, obj, result;
    substIndex = context.varAccessor.length() + 1;
    while( parts ) {
      parts = current.match( jsonDeclExpr );
      if( parts && parts.length > 2 ) {
        token = parts[ 2 ];
        token = token.replace( /[\']/g, "[\']" ).replace( /[$]/g, "[$]" );
        re = new RegExp( token );
        vName = context.varNamePrefix + substIndex + "]";
        obj = new Object();
        obj.name = parts[ 2 ].substring( 1 );
        context.varAccessor.set( substIndex, obj );
        substIndex = substIndex + 1;
        current = current.replace( re, "'" + vName + "'", "g" );
      }
    }
    current = current.replace( /[\']/g, "\"" );
    result = JSON.parse( current );
    if( "[object Array]" !== Object.prototype.toString.call( result ) ) {
      result = new thymol.ThObject( result );
    }
    return result;
  };

  context.resolveJSONReferences = function() {
    var key = null, param, prop = null, val, ref, subst, isReq = ( "request" === context.contextName );
    for( key in context ) {
      if( key ) {
        param = context[ key ];
        if( param != null && typeof param === "object" ) {
          if( ! ( param instanceof thymol.ThVarsAccessor ) && ! ( param instanceof thymol.ThClass ) ) {
            if( ! ( param instanceof thymol.ThParam ) ) {
              if( isReq && Object.prototype.toString.call( param ) === '[object Array]' ) {
                for( var i = 0, iLimit = param.length; i < iLimit; i++ ) {
                  var pi = param[ i ];
                  if( !!pi && typeof pi.value === "string" && pi.value.charAt( 0 ) == '#' ) {
                    var pv = thymol.ThUtils.getParameter( pi.value.substring( 1 ) );
                    param[ i ] = pv;
                  }
                }
              }
              else {
                for( prop in param ) {
                  if( prop ) {
                    val = param[ prop ];
                    if( typeof val === "string" ) {
                      if( val.indexOf( context.varNamePrefix ) == 0 ) {
                        subst = null;
                        if( prop.match( /\d*/ ) ) { // Array index!
                          ref = val.substring( context.varNamePrefix.length, val.length - 1 );
                          ref = context.varAccessor.get( ref );
                          subst = context[ ref.name ];
                        }
                        else {
                          subst = context[ prop ];
                        }
                        param[ prop ] = subst;
                      }
                    }
                  }
                }

              }
            }
            else if( typeof param.value === "string" && param.value.charAt( 0 ) == '#' ) {
              subst = context[ param.value.substring( 1 ) ];
              context[ key ] = subst;
            }
          }
        }
      }
    }
  };

  return context;

};
