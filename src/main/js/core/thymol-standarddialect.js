( function() {

  ELEMENT_NODE = 1;
  TEXT_NODE = 3;
  
  var specAttrModList = [ "abbr", "accept", "accept-charset", "accesskey", "action", "align", "alt", "archive", "audio", "autocomplete", "axis", "background", "bgcolor", "border", "cellpadding", "cellspacing", "challenge", "charset", "cite", "class", "classid", "codebase", "codetype", "cols", "colspan", "compact", "content", "contenteditable", "contextmenu", "data", "datetime", "dir", "draggable", "dropzone", "enctype", "for", "form", "formaction", "formenctype", "formmethod", "formtarget", "frame", "frameborder", "headers", "height", "high", "href", "hreflang", "hspace", "http-equiv", "icon", "id", "keytype", "kind", "label", "lang", "list", "longdesc", "low", "manifest", "marginheight", "marginwidth", "max", "maxlength", "media", "method", "min", "name", "optimum", "pattern", "placeholder", "poster", "preload", "radiogroup", "rel", "rev", "rows", "rowspan", "rules", "sandbox", "scheme", "scope", "scrolling", "size", "sizes", "span", "spellcheck", "src", "srclang", "standby", "start", "step", "style", "summary", "tabindex", "target", "title", "type", "usemap", "value", "valuetype", "vspace", "width", "wrap", "xmlbase", "xmllang", "xmlspace" ];

  var fixedValBoolAttrList = [ "async", "autofocus", "autoplay", "checked", "controls", "declare", "default", "defer", "disabled", "formnovalidate", "hidden", "ismap", "loop", "multiple", "novalidate", "nowrap", "open", "pubdate", "readonly", "required", "reversed", "scoped", "seamless", "selected" ];

  var eventAttrList = [ "onabort", "onafterprint", "onbeforeprint", "onbeforeunload", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncontextmenu", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchanged", "onemptied", "onended", "onerror", "onfocus", "onformchange", "onforminput", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmessage", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onoffline", "ononline", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onreadystatechange", "onredo", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "onundo", "onunload", "onvolumechange", "onwaiting" ];

  var literalTokenExpr = /^[a-zA-Z0-9\[\]\.\-_]*$/;

  var numericExpr = /^[+\-]?[0-9]*?[.]?[0-9]*?$/; // Common
  var nonURLExpr = /[\$\*#]{1}\{(?:!?[^}]*)\}/; // Common

  var varExpr = /[\$\*#@]{1}\{(!?[^}]*)\}/; // Retain the content

  var textInlineCommentExpr = /\[\[(.*)\]\]/;

  var javascriptInlineCommentExpr = /\/\*\[\[(.*)\]\]\*\//;
  var javascriptInlineRemainderExpr = /\s*(?:['][^']*['])*(?:["][^"]*["])*(?:[\(][^\(\)]*[\)])*(?:[\{][^\{\}]*[\}])*(?:[\[][^\[\]]*[\]])*((?:[;,\(\)\[\]:\{\}](?=(?:\s*\/\/.*?(?:\n|$)))(?:\s*\/\/.*?(?:\n|$)))|(?:\s*\/\/.*?(?:\n|$))|(?:[;,\(\)\[\]:\{\}](?=(?:\s*(?:\n|$)))(?:\s*(?:\n|$)))|(?:\s*(?:\n|$)))/;

  var thCase;

  thymol.getThAttribute = function( part, element ) {
    var result = thymol.ThUtils.unParenthesise( part );
    result = thymol.doExpression( result, element );
    if( Object.prototype.toString.call( result ) === '[object Array]' ) {
      if( result.length === 1 ) {
        result = result[ 0 ];
      }
    }
    if( result instanceof thymol.ThParam ) {
      result = result.value;
    }
    return result;
  };

  thymol.doExpression = function( part, element ) {
    var result = thymol.ThUtils.unParenthesise( part ), expr, unq, token, mapped;
    expr = null;
    unq = thymol.ThUtils.unQuote( result );
    if( unq != result ) {
      result = thymol.preProcess( unq, element );
    }
    else {
      if( literalTokenExpr.test( result ) ) {
        token = thymol.booleanAndNullTokens[ result ];
        if( ! ( typeof token === "undefined" ) ) {
          result = token;
        }
        else {
          if( result.match( numericExpr ) ) {
            result = thymol.ThUtils.getToPrecision( result, thymol.ThUtils.getDecimalDigits( result ) );
          }
          else {
            expr = thymol.getExpression( result, element );
            if( expr !== undefined && expr !== null && ! ( expr != expr ) ) { // Actually not "is Nan"
              result = expr;
            }
          }
        }
      }
      else {
        expr = thymol.getExpression( result, element );
        if( expr !== null && ! ( expr != expr ) ) { // Actually not "is Nan"
          result = expr;
        }
        else {
          result = null;
        }
      }
    }
    return result;
  };

  thymol.processText = function( element, thUrlAttr, thAttr ) {
    var url = thymol.getThAttribute( thUrlAttr.value, element ), updated = false, text, newTextNode, i, iLimit, iUpper;
    if( url == null ) {
      if( !thymol.allowNullText ) {
        if( thymol.debug ) {
          thymol.thWindow.alert( "thymol.processText cannot process: " + thUrlAttr.name + "=\"" + thUrlAttr.value + "\"\n" + element.innerHTML );
        }
        return updated;
      }
      url = "";
    }
    else {
      if( ( url instanceof thymol.ThParam ) || ( url instanceof thymol.ThObject ) ) {
        if( url.value ) {
          url = url.value;
        }
      }
      else if( url instanceof thymol.ThClass && url.abort ) {
        element.removeAttribute( thUrlAttr.name );
        return true;
      }
    }
    try {
      while( element.firstChild != null ) {
        element.removeChild( element.firstChild );
        updated = true;
        if( element.firstChild == null ) {
          break;
        }
      }
      if( "text" == thAttr.suffix ) {
        if( Object.prototype.toString.call( url ) === '[object Array]' ) {
          text = "[";
          for( i = 0, iLimit = url.length, iUpper = url.length - 1; i < iLimit; i++ ) {
            text += url[ i ].toString();
            if( i < iUpper ) {
              text += ", ";
            }
          }
          text += "]";
        }
        else {
          text = url.toString();
        }
        text = thymol.ThUtils.unescape( text );
        newTextNode = element.ownerDocument.createTextNode( text );
        element.appendChild( newTextNode );
        updated = true;
      }
      if( "utext" == thAttr.suffix ) {
        element.innerHTML = url;
      }
      element.removeAttribute( thUrlAttr.name );
    }
    catch( err ) {
      if( thymol.debug ) {
        thymol.thWindow.alert( "text replace error" );
      }
    }
    return updated;
  };

  thymol.processSpecAttrMod = function( element, thUrlAttr, thAttrObj ) {
    var url = thymol.getThAttribute( thUrlAttr.value, element );
    if( !url || ! ( url instanceof thymol.ThClass ) || !url.abort ) {
      element.setAttribute( thAttrObj.suffix, url );
    }
    element.removeAttribute( thUrlAttr.name );
  };

  thymol.processAttr = function( element, thUrlAttr, thAttrObj ) {
    var argValue = thUrlAttr.value.trim(), argsExpr, expr, identifier, attrName = null, ep, lp, url, tt;
    if( argValue ) {
      do {
        argsExpr = thymol.ThParser.parse( argValue, true, false );
        identifier = argsExpr.tokens.shift();
        if( identifier.type_ === 3 ) {
          attrName = identifier.index_;
          if( !!attrName ) {
            ep = argValue.indexOf( '=' );
            if( ep >= 0 ) {
              lp = argsExpr.position - 1;
              if( argsExpr.position === argValue.length ) {
                lp = argValue.position;
              }
              expr = argValue.substring( ep + 1, lp ).trim();
              if( fixedValBoolAttrList.indexOf( attrName ) >= 0 ) {
                thymol.doFixedValBoolAttr( expr, element, attrName );
              }
              else {
                url = thymol.getThAttribute( expr, element );
                tt = typeof url;
                if( thAttrObj.suffix == "attrappend" || thAttrObj.suffix == "attrprepend" ) {
                  if( url !== null && ( tt === "number" || ( tt === "string" && url.length > 0 ) ) ) {
                    existing = element.getAttribute( attrName );
                    if( existing ) {
                      if( thAttrObj.suffix == "attrappend" ) {
                        url = existing + url;
                      }
                      else if( thAttrObj.suffix == "attrprepend" ) {
                        url = url + existing;
                      }
                    }
                  }
                }
                if( url !== null && ( tt === "number" || ( tt === "string" && url.length > 0 ) ) ) {
                  element.setAttribute( attrName, url );
                }
              }
            }
          }
          argValue = argValue.substring( argsExpr.position );
        }
        else {
          break;
        }
      }while( argValue.length > 0 );
    }
    element.removeAttribute( thUrlAttr.name );
  };

  thymol.processCSSAttr = function( element, thUrlAttr, thAttrObj ) {
    var parts = thUrlAttr.value.split( "," ), i, iLimit, expr, attrName, url, tt, existing;
    for( i = 0, iLimit = parts.length; i < iLimit; i++ ) {
      expr = parts[ i ];
      attrName = thAttrObj.suffix == "classappend" ? "class" : "style";
      if( !!attrName ) {
        if( !!expr ) {
          url = thymol.getThAttribute( expr, element );
          tt = typeof url;
          if( url !== null && ( tt === "number" || ( tt === "string" && url.length > 0 ) ) ) {
            existing = element.getAttribute( attrName );
            if( existing ) {
              url = existing + " " + url;
            }
          }
          if( url !== null && ( tt === "number" || ( tt === "string" && url.length > 0 ) ) ) {
            element.setAttribute( attrName, url );
          }
        }
      }

    }
    element.removeAttribute( thUrlAttr.name );
  };

  thymol.processFixedValBoolAttr = function( element, thUrlAttr, thAttrObj ) {
    var val = thymol.doFixedValBoolAttr( thUrlAttr.value, element, thAttrObj.suffix );
    if( val != null ) {
      element.removeAttribute( thUrlAttr.name );
    }
    else {
      if( thymol.debug ) {
        thymol.thWindow.alert( "thymol.processFixedValBoolAttr cannot process: " + thUrlAttr.name + "=\"" + thUrlAttr.value + "\"\n" + element.innerHTML );
      }
    }
  };

  thymol.doFixedValBoolAttr = function( valParam, element, attr ) {
    var val = thymol.getBoolean( valParam, element );
    if( val ) {
      element.setAttribute( attr, attr );
    }
    return val;
  };

  thymol.processPairedAttr = function( element, thUrlAttr, thAttrObj ) {
    var url = thymol.getThAttribute( thUrlAttr.value, element );
    if( url != "" ) {
      if( thAttrObj.suffix === "alt-title" ) {
        element.setAttribute( "alt", url );
        element.setAttribute( "title", url );
      }
      if( thAttrObj.suffix === "lang-xmllang" ) {
        element.setAttribute( "lang", url );
        element.setAttribute( "xml:lang", url );
      }
      element.removeAttribute( thUrlAttr.name );
    }
    else {
      if( thymol.debug ) {
        thymol.thWindow.alert( "thymol.processPairedAttr cannot process: " + thUrlAttr.name + "=\"" + thUrlAttr.value + "\"\n" + element.innerHTML );
      }
    }
  };

  thymol.processConditional = function( element, attr, thAttrObj ) {
    var removed = false;
    if( attr.value ) {
      removed = thymol.doIfOrUnless( element, attr.value, ( thAttrObj.suffix === "if" ) );
    }
    element.removeAttribute( attr.name );
    return removed;
  };

  thymol.doIfOrUnless = function( element, value, isIf ) {
    var processed = false, flag;
    if( value ) {
      flag = thymol.getBoolean( value, element );
      processed = true;
      if( !flag ) {
        if( isIf ) { // true for "if", false for "unless"
          element.parentNode.removeChild( element );
          return true;
        }
      }
      else {
        if( !isIf ) { // false for "if", true for "unless"
          element.parentNode.removeChild( element );
          return true;
        }
      }
    }
    if( !processed && thymol.debug ) {
      thymol.thWindow.alert( "thymol.processConditional cannot process conditional: " + value + "\n" + element.innerHTML );
    }
    return false;
  };

  thymol.processEach = function( element, thUrlAttr, junk ) {
    var elementsUpdated = false, initial = thUrlAttr.value.trim(), colonPos, varName, varNames, statVarName, expr, root, node, i, iLimit, tho, stat, count, newNode, next;
    colonPos = initial.indexOf( ":" );
    if( colonPos > 0 ) {
      varName = initial.substring( 0, colonPos );
      if( varName ) {
        varName = varName.trim();
        varNames = varName.split( "," );
        varName = varNames[ 0 ].trim();
        if( varNames.length > 1 ) {
          statVarName = varNames[ 1 ].trim();
        }
        else {
          statVarName = varName + "Stat";
        }
        expr = initial.substr( colonPos + 1 );
        if( expr ) {
          expr = expr.trim();
          expr = thymol.getExpression( expr, element );
          if( expr instanceof thymol.ThSet ) {
            expr = expr.toArray();
          }
          root = element.parentNode;
          if( expr && ( expr instanceof Object ) && expr.length > 0 ) {
            node = element;
            iLimit = expr.length;
            element.removeAttribute( thUrlAttr.name );
            for( i = 0; i < iLimit; i++ ) {
              tho = expr[ i ];
              stat = new Object();
              stat.current = tho;
              stat.size = expr.length;
              stat.index = i;
              count = i + 1;
              stat.count = count;
              if( i == 0 ) {
                stat.first = true;
              }
              else {
                stat.first = false;
              }
              if( i == expr.length - 1 ) {
                stat.last = true;
              }
              else {
                stat.last = false;
              }
              if( i % 2 ) {
                stat.odd = true;
                stat.even = false;
              }
              else {
                stat.odd = false;
                stat.even = true;
              }
              if( !node.thLocalVars ) {
                node.thLocalVars = {};
              }
              node.thLocalVars[ varName ] = tho;
              node.thLocalVars[ statVarName ] = stat;
              if( count < expr.length ) {
                newNode = element.cloneNode( true );
                if( node.nextSibling != null ) {
                  next = root.insertBefore( newNode, node.nextSibling );
                }
                else {
                  next = root.appendChild( newNode );
                }
                node = next;
                elementsUpdated = true;
              }
            }
          }
          else {
            if( root !== null ) {
              if( !element.thLocalVars ) {
                element.thLocalVars = {};
              }
              if( !element.thLocalVars[ varName ] ) {
                element.thLocalVars[ varName ] = new Object();
              }
              if( !element.thLocalVars[ statVarName ] ) {
                element.thLocalVars[ statVarName ] = new Object();
              }
              root.removeChild( element );
              elementsUpdated = true;
            }
          }
        }
      }
    }
    return elementsUpdated;
  };

  thymol.processObject = function( element, thUrlAttr ) {
    var argValue = thUrlAttr.value.trim(), val;
    if( argValue ) {
      val = thymol.getExpression( argValue, element );
      if( val ) {
        element.thObjectVar = val;
      }
    }
    element.removeAttribute( thUrlAttr.name );
  };

  thymol.processInline = function( element, thUrlAttr, thAttrObj ) {
    var mode = thymol.getThAttribute( thUrlAttr.value, element );
    if( mode == "text" ) {
      thymol.doInlineText( element );
    }
    else if( mode == "javascript" || mode == "dart" ) {
      thymol.doInlineJavascript( element );
    }
    else {
      if( thymol.debug ) {
        thymol.thWindow.alert( "thymol.processInline cannot process scripting mode: \"" + mode + "\" - it isn't supported by version \"" + thymol.thVersion + "\"\n" );
      }
    }
    element.removeAttribute( thUrlAttr.name );
  };

  thymol.doInlineText = function( element ) {
    var changed, value, i, iLimit, expr, term, result;
    for( i = 0, iLimit = element.childNodes.length; i < iLimit; i++ ) {
      do {
        changed = false;
        if( element.childNodes[ i ].nodeType === ELEMENT_NODE ) {
          thymol.doInlineText( element.childNodes[ i ] );
        }
        else if( element.childNodes[ i ].nodeType === TEXT_NODE ) {
          value = element.childNodes[ i ].nodeValue;
          if( value ) {
            expr = textInlineCommentExpr.exec( value );
            if( expr ) {
              term = "";
              if( expr.length > 1 ) {
                term = "[[" + expr[ 1 ] + "]]";
              }
              if( expr.length > 1 ) {
                result = thymol.getThAttribute( expr[ 1 ], element );
                result = value.replace( term, result );
                element.childNodes[ i ].nodeValue = result;
                changed = true;
              }
              expr = null;
            }
          }
        }
      }while( changed );
    }
  };

  thymol.doInlineJavascript = function( element ) {
    var changed, value, second, i, iLimit, expr, scraps, remainder, termIndx, term, secondIndx, result;
    for( i = 0, iLimit = element.childNodes.length; i < iLimit; i++ ) {
      do {
        second = null;
        changed = false;
        value = element.childNodes[ i ].nodeValue;
        if( value ) {
          expr = javascriptInlineCommentExpr.exec( value );
          if( expr ) {
            termIndx = expr.index;
            term = "";
            if( expr.length > 1 ) {
              term = "/*[[" + expr[ 1 ] + "]]*/";
            }
            termIndx = termIndx + term.length;
            remainder = value.substring( termIndx );
            scraps = javascriptInlineRemainderExpr.exec( remainder );
            if( scraps ) {
              if( scraps.length > 1 ) {
                secondIndx = remainder.indexOf( scraps[ 1 ] );
                second = remainder.substring( secondIndx );
                value = value.substring( 0, termIndx );
                value = value + second;
              }
            }
            if( expr.length > 1 ) {
              result = thymol.getExpression( expr[ 1 ], element );
              if( result instanceof thymol.ThObject ) {
                result = result.toNonThObject();
              }
              if( !thymol.ThUtils.isLiteral( result ) ) {
                result = thymol.getStringView( result );
              }
              result = value.replace( term, result );
              element.childNodes[ i ].nodeValue = result;
              changed = true;
            }
            expr = null;
            scraps = null;
          }
        }
      }while( changed );
    }
  };

  thymol.getStringView = function( param ) {
    var view = "", objType;
    if( typeof param === 'string' ) {
      view = view + "'" + param + "'";
    }
    else if( typeof param === 'number' || typeof param === 'boolean' ) {
      view = view + param;
    }
    else if( typeof param === 'object' ) {
      if( param instanceof Object ) {
        objType = Object.prototype.toString.call( param );
        if( "[object Array]" == objType ) {
          view = thymol.getStringViewArray( param );
        }
        else if( "[object Object]" == objType ) {
          view = thymol.getStringViewObject( param );
        }
      }
    }
    return view;
  };

  thymol.getStringViewArray = function( param ) {
    var view = "[", i, iLimit;
    for( i = 0, iLimit = param.length; i < iLimit; i++ ) {
      view = view + thymol.getStringView( param[ i ] );
      if( i < param.length - 1 ) {
        view = view + ",";
      }
    }
    view = view + "]";
    return view;
  };

  thymol.getStringViewObject = function( param ) {
    var view = "{", key = null;
    for( key in param ) {
      if( key ) {
        if( view != "{" ) {
          view = view + ",";
        }
        view = view + thymol.getStringView( key ) + ":";
        view = view + thymol.getStringView( param[ key ] );
      }
    }
    view = view + "}";
    return view;
  };

  thymol.processRemove = function( element, thUrlAttr ) {
    var locals = element.thLocalVars, savedLocals = element.thLocalVars, arg, children, first, haveRemoved = false;
    if( !locals ) {
      locals = {};
    }
    if( !locals[ "tag" ] ) {
      locals[ "tag" ] = "tag";
    }
    if( !locals[ "body" ] ) {
      locals[ "body" ] = "body";
    }
    if( !locals[ "none" ] ) {
      locals[ "none" ] = "none";
    }
    if( !locals[ "all" ] ) {
      locals[ "all" ] = "all";
    }
    if( !locals[ "all-but-first" ] ) {
      locals[ "all-but-first" ] = "all-but-first";
    }
    element.thLocalVars = locals;
    arg = thymol.getThAttribute( thUrlAttr.value, element );
    element.thLocalVars = savedLocals;
    element.removeAttribute( thUrlAttr.name );
    if( "all" == arg ) {
      if( element.parentNode != null ) {
        element.parentNode.removeChild( element );
        haveRemoved = true;
      }
    }
    else if( "body" == arg ) {
      element.innerHTML = "";
      haveRemoved = true;
    }
    else if( "tag" == arg ) {
      thymol.ThUtils.removeTag( element );
      haveRemoved = true;
    }
    else if( "all-but-first" == arg ) {      
      if( element.hasChildNodes() ) {
        nodes = element.childNodes;
        var kids = new Array();
        first = true;
        for( var i = 0, iLimit = nodes.length; i < iLimit; i++  ) {
          if( nodes[i].nodeType === ELEMENT_NODE ) {
            if( !first ) {
              kids.push( nodes[i] );
            }
            first = false; 
          }
        }
        for( var i = 0, iLimit = kids.length; i < iLimit; i++  ) {
          element.removeChild( kids[i] );
          haveRemoved = true;
        }        
      }   
//      if( element.firstElementChild ) {
//        while( element.firstElementChild != element.lastElementChild ) {
//          element.removeChild( element.lastElementChild );
//          haveRemoved = true;
//        }
//      }         
    }
    return haveRemoved;
  };

  thymol.processSwitch = function( element, attr ) {
    var val = thymol.ThUtils.unParenthesise( attr.value ), updated = false, args, matched = false, thCaseSpecs, caseClause, remove, ccAttr;
    val = thymol.getThAttribute( val, element );
    if( typeof val === 'string' ) {
      args = val.match( nonURLExpr );
      if( args ) {
        val = args[ 1 ];
      }
    }
    val = thymol.ThUtils.unQuote( val );
    thCaseSpecs = element.querySelectorAll( thCase.escpName + "," + thCase.escpSynonym );
    for( i = 0, iLimit = thCaseSpecs.length; i < iLimit; i++ ) {
      remove = true;
      for( j = 0, jLimit = thCaseSpecs[ i ].attributes.length; j < jLimit; j++ ) {
        ccAttr = thCaseSpecs[ i ].attributes.item( j );
        if( !!ccAttr ) {
          if( thCase.name == ccAttr.name || thCase.synonym == ccAttr.name ) {
            if( !matched ) {
              matched = thymol.processCase( element, ccAttr, val );
              if( matched ) {
                remove = false;
              }
            }
            thCaseSpecs[ i ].removeAttribute( ccAttr.name );
          }
        }
      }
      if( remove ) {
        element.removeChild( thCaseSpecs[ i ] );
        updated = true;
      }
    }
    element.removeAttribute( attr.name );
    return updated;
  };

  thymol.processCase = function( element, attr, param ) {
    if( attr.value != "*" ) {
      var val = thymol.getExpression( attr.value, element);
      //thymol.substitute( attr.value, element );
      val = thymol.ThUtils.unQuote( val );
      if( param && ( param == val ) ) {
        return true;
      }
      return false; 
    }
    return true;
  };

  thymol.processWith = function( element, thUrlAttr ) {
    thymol.getWith( element, thUrlAttr.value );
    element.removeAttribute( thUrlAttr.name );
  };

  thymol.processAssert = function( element, thUrlAttr ) {
    var argValue = thUrlAttr.value.trim(), result = true, term = "", terms, i, iLimit, expr, val, flag;
    if( argValue ) {
      terms = argValue.split( "," );
      for( i = 0, iLimit = terms.length; i < iLimit; i++ ) {
        term = terms[ i ];
        expr = thymol.ThUtils.unParenthesise( term );
        if( expr != null ) {
          val = thymol.getExpression( expr, element );
          if( val ) {
            flag = thymol.getBoolean( val, element );
            if( !flag ) {
              result = false;
              break;
            }
          }
          else {
            result = false;
            break;
          }
        }
        else {
          result = false;
          break;
        }
      }
    }
    if( !result ) {
      if( argValue != term ) {
        argValue = " list is: " + argValue;
      }
      else {
        argValue = "";
      }
      if( term != "" ) {
        term = " false term is: \"" + term + "\"";
      }
      if( thymol.debug ) {
        thymol.thWindow.alert( "thymol.processAssert assertion failure -" + argValue + term + "\n" );
      }
    }
    element.removeAttribute( thUrlAttr.name );
  };

  thymol.getBoolean = function( param, element ) {
    if( param == null ) {
      return false;
    }
    if( typeof param === "boolean" ) {
      return param;
    }
    else if( typeof param === 'number' ) {
      return param != 0;
    }
    var initial = thymol.ThUtils.unParenthesise( param ), negate = false, val, args, flag;
    if( initial.charAt( 0 ) == '!' ) {
      negate = true;
      initial = initial.substring( 1, initial.length );
      initial = thymol.ThUtils.unParenthesise( initial );
    }
    val = thymol.getThAttribute( initial, element );
    if( val == null ) {
      args = initial.match( varExpr ); // Check for negated null values
      if( args ) {
        if( args[ 1 ].charAt( 0 ) == '!' ) {
          negate = !negate;
        }
      }
    }
    flag = thymol.getBooleanValue( val );
    if( negate ) {
      flag = !flag;
    }
    return flag;
  };

  thymol.appendToAttrList = function( func, prec, attrArray ) {
    var j, jLimit = attrArray.length, tha = null;
    for( j = 0; j < jLimit; j++ ) {
      tha = new thymol.ThAttr( attrArray[ j ], func, prec, thymol.thThymeleafPrefixList, thymol.prefix );
    }
    j = tha;
  };

  thymol.setupAttrList = function() {
    thCase = new thymol.ThAttr( "case", null, 275, thymol.thThymeleafPrefixList, thymol.prefix );
    thymol.addDialect( {
      prefix : thymol.prefix,
      attributeProcessors : [                                                          
        { name : 'each', processor : thymol.processEach, precedence : 200 },          
        { name : 'switch', processor : thymol.processSwitch, precedence : 250 },
        { name : 'if', processor : thymol.processConditional, precedence : 300 },
        { name : 'unless', processor : thymol.processConditional, precedence : 400 },           
        { name : 'object', processor : thymol.processObject, precedence : 500 },          
        { name : 'with', processor : thymol.processWith, precedence : 600 },          
        { name : 'attr', processor : thymol.processAttr, precedence : 700 },
        { name : 'attrprepend', processor : thymol.processAttr, precedence : 800 },
        { name : 'attrappend', processor : thymol.processAttr, precedence : 900 },
        { name : 'alt-title', processor : thymol.processPairedAttr, precedence : 990 },
        { name : 'lang-xmllang', processor : thymol.processPairedAttr, precedence : 990 },          
        { name : 'inline', processor : thymol.processInline, precedence : 1000 },         
        { name : 'classappend', processor : thymol.processCSSAttr, precedence : 1100 },         
        { name : 'styleappend', processor : thymol.processCSSAttr, precedence : 1100 },         
        { name : 'text', processor : thymol.processText, precedence : 1300 },
        { name : 'utext', processor : thymol.processText, precedence : 1400 },
        { name : 'assert', processor : thymol.processAssert, precedence : 1550 },         
        { name : 'remove', processor : thymol.processRemove, precedence : 1600 }                              
      ]
    } );
    thymol.appendToAttrList( thymol.processSpecAttrMod, 1000, specAttrModList );
    thymol.appendToAttrList( thymol.processSpecAttrMod, 1000, eventAttrList );
    thymol.appendToAttrList( thymol.processFixedValBoolAttr, 1000, fixedValBoolAttrList );
  };

} )();
