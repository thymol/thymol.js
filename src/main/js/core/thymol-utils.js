thymol.ThUtils = ( function() {

  function mergeVars( thiz, other ) {
    var current = thiz, prop = null;
    if( !current ) {
      current = {};
    }
    for( prop in other ) {
      if( other.hasOwnProperty( prop ) ) {
        if( prop ) {
          if( !current[ prop ] ) {
            current[ prop ] = other[ prop ];
          }
        }
      }
    }
    return current;
  }

  function processElement( func, element, arg, obj ) {
    var result = null, parent = element.parentElement;
    if( !thymol.isFragmentChild( element ) ) {
      if( !element.thObjectVar ) {
        parent = element.parentElement;
        while( parent ) {
          if( parent.thObjectVar ) {
            element.thObjectVar = parent.thObjectVar;
            break;
          }
          parent = parent.parentElement;
        }
      }
      parent = element.parentElement;
      while( parent ) {
        if( parent.thLocalVars ) {
          element.thLocalVars = mergeVars( element.thLocalVars, parent.thLocalVars );
          break;
        }
        parent = parent.parentElement;
      }
      result = func( element, arg, obj );
    }
    return result;
  }

  function unQuote( param ) {
    var par = param, pared;
    if( par ) {
      if( typeof par === "string" ) {
        par = par.trim();
        if( par.charAt( 0 ) == '"' ) {
          if( par.charAt( par.length - 1 ) == '"' ) {
            pared = par.substring( 1, par.length - 1 );
            if( pairParity( pared, '"', '"' ) == 0 ) {
              par = pared;
            }
          }
        }
        else if( par.charAt( 0 ) == '\'' ) {
          if( par.charAt( par.length - 1 ) == '\'' ) {
            pared = par.substring( 1, par.length - 1 );
            if( pairParity( pared, '\'', '\'' ) == 0 ) {
              par = pared;
            }
          }
        }
      }
    }
    return par;
  }

  function unParenthesise( param ) {
    var par = param, pared;
    if( par ) {
      if( typeof par === "string" ) {
        par = par.trim();
        if( par.charAt( 0 ) == '(' ) {
          if( par.charAt( par.length - 1 ) == ')' ) {
            pared = par.substring( 1, par.length - 1 ).trim();
            if( pairParity( pared, '(', ')' ) == 0 ) {
              par = pared;
            }
          }
        }
      }
    }
    return par;
  }

  function pairParity( str, left, right ) {
    var i, ch, strLength = str.length, parity = 0;
    for( i = 0; i < strLength; i++ ) {
      ch = str.charAt( i );
      if( ch == left ) {
        parity++;
      }
      else if( ch == right ) {
        parity--;
        if( parity < 0 ) {
          break;
        }
      }
    }
    return parity;
  }

  function unBracket( param ) {
    var par = param, pared;
    if( typeof par === "string" ) {
      par = par.trim();
    }
    if( par ) {
      if( par.charAt( 0 ) == '[' ) {
        if( par.charAt( par.length - 1 ) == ']' ) {
          pared = par.substring( 1, par.length - 1 );
          if( pairParity( pared, '[', ']' ) == 0 ) {
            par = pared;
          }
        }
      }
    }
    return par;
  }

  function getToPrecision( n, p ) {
    if( typeof p === "undefined" ) {
      return n;
    }
    var up = thymol.thDefaultPrecision, ndp = 0, s, sl, dp, v;
    if( p > up ) {
      up = p;
    }
    else {
      s = n.toString();
      sl = s.length;
      dp = s.indexOf( '.' );
      if( dp >= 0 ) {
        ndp = sl - 1 - dp;
      }
      if( ndp > up ) {
        v = n.toPrecision( ndp + 1 );
        v = truncateDecimals( v );
        s = v.toString();
        sl = s.length;
        if( dp >= 0 ) {
          ndp = sl - 1 - dp;
        }
      }
      if( p > ndp ) {
        up = p;
      }
      else if( ndp < up ) {
        up = ndp;
      }
    }
    v = parseFloat( n );
    v = v.toFixed( up );
    if( p === 0 ) {
      v = Number( v );
    }
    return v;
  }

  function truncateDecimals( valp ) {
    var val = valp, iLimit = valp.length - 1, i;
    for( i = iLimit; i >= 0; i-- ) {
      if( val.charAt( i ) === '0' ) {
        val = val.substr( 0, i );
      }
      else {
        break;
      }
    }
    return val;
  }

  function getDecimalDigits( val ) {
    var digits = 0, s, dp;
    s = val.toString();
    dp = s.indexOf( '.' ) + 1;
    if( dp > 0 ) {
      digits = s.length - dp;
    }
    return digits;
  }

  function testLiteralFalse( initial ) {
    var result = false, val;
    if( typeof initial === 'string' ) {
      val = initial.toLowerCase();
      result = ( val == "false" || val == "off" || val == "no" );
    }
    else if( typeof initial === 'boolean' ) {
      result = !initial;
    }
    return result;
  }

  function renderMessage( msg, values ) {
    var result = msg, i, iLimit;
    if( Object.prototype.toString.call( values ) == "[object Array]" ) {
      for( i = 0, iLimit = values.length; i < iLimit; i++ ) {
        result = renderMessageArg( result, i, values[ i ] );
      }
    }
    else {
      result = renderMessageArg( msg, 0, values );
    }
    return result;
  }

  function renderMessageArg( msg, index, value ) {
    var result = msg, splits, i, iLimit, iUpper;
    splits = msg.split( "{" + index + "}" );
    if( splits.length > 0 ) {
      result = "";
      for( i = 0, iLimit = splits.length, iUpper = iLimit - 1; i < iLimit; i++ ) {
        result += splits[ i ];
        if( i < iUpper ) {
          result += value;
        }
      }
    }
    return result;
  }

  function getParameter( name ) {
    var result, tor;
    if( !!thymol.requestContext ) {
      result = thymol.requestContext[ name ];
      if( Object.prototype.toString.call( result ) === '[object Array]' ) {
        if( result.length === 1 ) {
          result = result[ 0 ];
        }
      }
    }
    tor = typeof result;
    if( tor === "undefined" ) {
      if( !!thymol.sessionContext ) {        
        result = thymol.sessionContext[ name ];
      }
      if( typeof result === "undefined" ) {
        if( !!thymol.sessionContext ) {
          result = thymol.applicationContext[ name ];          
        }
      }
    }
    return result;
  }

  function charOcurrences( str, chr ) {
    var count = 0, i = 0, iLimit = str.length;
    for( ; i < iLimit; i++ ) {
      if( str.charAt( i ) === chr ) {
        count++;
      }
    }
    return count;
  }

  function isLiteral( val ) {
    var first, last;
    if( typeof val === "string" ) {
      first = val.charAt( 0 );
      last = val.charAt( val.length - 1 );
      if( first == '\'' && last == '\'' ) {
        return true;
      }
      if( first == '"' && last == '"' ) {
        return true;
      }
    }
    return false;
  }

  function isLiteralSubst( param ) {
    var result = false, par = param;
    if( typeof par === "string" ) {
      par = par.trim();
    }
    if( par ) {
      if( par.charAt( 0 ) == '|' ) {
        if( par.charAt( par.length - 1 ) == '|' ) {
          result = true;
        }
      }
    }
    return result;
  }
  
  function resolvePath(path) {
    if( path.indexOf(".") == 0 ) {
      return path;
    }
    var protoPos = path.indexOf("://");
    var proto = "";
    if (protoPos >= 0) {
        protoPos += 3;
        proto = path.substring(0, protoPos);
        path = path.substring(protoPos);
    }
    path = path.replace( /\/\//g, "/" );    
    var dotPos = path.indexOf("..");
    var base = path.substring(0, dotPos - 1); // Omit trailing "/"
    var relative = path.substring(dotPos);
    var stack = base.split("/"), parts = relative.split("/");
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] == "." || parts[i].length == 0 ) {
            continue;
        }
        if (parts[i] == "..") {
            stack.pop();
        }
        else {
            stack.push(parts[i]);
        }
    }
    return proto + stack.join("/");
  }

  function unescape( text ) {
    var result = text, i, iLimit, iUpper, c, cc;
    if( text !== null && typeof text !== "undefined" ) {
      result = "";
      iLimit = text.length;
      iUpper = iLimit - 3;
      for( i = 0; i < iLimit; i++ ) {
        c = text.charAt( i );
        if( i < iUpper ) {
          if( c === '&' ) {
            cc = text.charAt( i + 1 ).toLowerCase();
            if( ( cc === "g" || cc === "l" ) && text.charAt( i + 2 ).toLowerCase() === "t" && text.charAt( i + 3 ) === ";" ) {
              i += 3;
              if( cc === "g" ) {
                c = ">";
              }
              else {
                c = "<";
              }
            }
            else if( i < iUpper - 1 && cc === "a" && text.charAt( i + 2 ).toLowerCase() === "m" && text.charAt( i + 3 ).toLowerCase() === "p" && text.charAt( i + 4 ) === ";" ) {
              i += 4;
            }
            else if( i < iUpper - 2 ) {
              if( cc === "q" && text.charAt( i + 2 ).toLowerCase() === "u" && text.charAt( i + 3 ).toLowerCase() === "o" && text.charAt( i + 4 ).toLowerCase() === "t" && text.charAt( i + 5 ) === ";" ) {
                i += 5;
                c = "\"";
              }
              else if( cc === "a" && text.charAt( i + 2 ).toLowerCase() === "p" && text.charAt( i + 3 ).toLowerCase() === "o" && text.charAt( i + 4 ).toLowerCase() === "s" && text.charAt( i + 5 ) === ";" ) {
                i += 5;
                c = "'";
              }
            }
          }
        }
        result += c;
      }
    }
    return result;
  }

  function unicodeUnescape( initial ) {
    var result = initial.replace( /\\u([\da-f]{4})/gi, function( match, grp ) {
      return String.fromCharCode( parseInt( grp, 16 ) );
    } );
    result = unescape( result );
    return result;
  }

  function removeTag( element ) {
    var parent = element.parentNode, i, iLimit, savedObject = element.thObjectVar, savedLocals = element.thLocalVars;
    if( !!parent ) {
      for( i = 0, iLimit = element.childNodes.length; i < iLimit; i++ ) {
        var newNode = element.childNodes[ i ].cloneNode( true );
        if( newNode.nodeType === 1 ) {
          if( !!savedObject ) {
            newNode.thObjectVar = savedObject;
          }
          if( !!savedLocals ) {
            newNode.thLocalVars = savedLocals;
          }
        }
        parent.insertBefore( newNode, element );
      }
      parent.removeChild( element );
    }
  }

  function getRequestEncoded( initial ) {
    var result = initial;
    result = encodeURIComponent( result );
//    result = result.replace( /%20/g, "+" );
    result = result.replace( /%26/g, "&" );
    result = result.replace( /%3A/g, ":" );
    // encodeURIComponent() will not encode: ~!*()'
    result = result.replace( /!/g, "%21" );
    result = result.replace( /'/g, "%27" );
//    result = result.replace( /\(/g, "%28" );
//    result = result.replace( /\)/g, "%29" );
    result = result.replace( /\*/g, "%2A" );
    result = result.replace( /~/g, "%7E" );
    return result;
  }

  return {
    getParameter : getParameter,
    processElement : processElement,
    unQuote : unQuote,
    unParenthesise : unParenthesise,
    unBracket : unBracket,
    getToPrecision : getToPrecision,
    getDecimalDigits : getDecimalDigits,
    testLiteralFalse : testLiteralFalse,
    renderMessage : renderMessage,
    charOcurrences : charOcurrences,
    isLiteral : isLiteral,
    isLiteralSubst : isLiteralSubst,
    resolvePath : resolvePath,
    unescape : unescape,
    unicodeUnescape : unicodeUnescape,
    removeTag : removeTag,
    getRequestEncoded : getRequestEncoded
  };

} )();
