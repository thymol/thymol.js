/*

	toString(Object)
	arrayToString(Object[])
listToString(List<?>)
	setToString(Set<?>)
	abbreviate(Object, int)
	arrayAbbreviate(Object[], int)
listAbbreviate(List<?>, int)
	setAbbreviate(Set<?>, int)
	equals(Object, Object)
	equalsIgnoreCase(Object, Object)
	contains(Object, String)
	arrayContains(Object[], String)
listContains(List<?>, String)
	setContains(Set<?>, String)
	containsIgnoreCase(Object, String)
	arrayContainsIgnoreCase(Object[], String)
listContainsIgnoreCase(List<?>, String)
	setContainsIgnoreCase(Set<?>, String)
	startsWith(Object, String)
	arrayStartsWith(Object[], String)
listStartsWith(List<?>, String)
	setStartsWith(Set<?>, String)
	endsWith(Object, String)
	arrayEndsWith(Object[], String)
listEndsWith(List<?>, String)
	setEndsWith(Set<?>, String)
	substring(Object, int, int)
	arraySubstring(Object[], int, int)
listSubstring(List<?>, int, int)
	setSubstring(Set<?>, int, int)
	substring(Object, int)
	arraySubstring(Object[], int)
listSubstring(List<?>, int)
	setSubstring(Set<?>, int)
	substringAfter(Object, String)
	arraySubstringAfter(Object[], String)
listSubstringAfter(List<?>, String)
	setSubstringAfter(Set<?>, String)
	substringBefore(Object, String)
	arraySubstringBefore(Object[], String)
listSubstringBefore(List<?>, String)
	setSubstringBefore(Set<?>, String)
	prepend(Object, String)
	arrayPrepend(Object[], String)
listPrepend(List<?>, String)
	setPrepend(Set<?>, String)
	repeat(Object, int)
	append(Object, String)
	concat(Object...)
	concatReplaceNulls(String, Object...)
	arrayAppend(Object[], String)
listAppend(List<?>, String)
	setAppend(Set<?>, String)
	indexOf(Object, String)
	arrayIndexOf(Object[], String)
listIndexOf(List<?>, String)
	setIndexOf(Set<?>, String)
	isEmpty(Object)
	arrayIsEmpty(Object[])
listIsEmpty(List<?>)
	setIsEmpty(Set<?>)
	arrayJoin(Object[], String)
listJoin(List<?>, String)
	setJoin(Set<?>, String)
	arraySplit(Object, String)
listSplit(Object, String)
	setSplit(Object, String)
	length(Object)
	arrayLength(Object[])
listLength(List<?>)
	setLength(Set<?>)
	replace(Object, String, String)
	arrayReplace(Object[], String, String)
listReplace(List<?>, String, String)
	setReplace(Set<?>, String, String)
	multipleReplace(Object, String[], String[])
	arrayMultipleReplace(Object[], String[], String[])
listMultipleReplace(List<?>, String[], String[])
	setMultipleReplace(Set<?>, String[], String[])
	toUpperCase(Object)
	arrayToUpperCase(Object[])
listToUpperCase(List<?>)
	setToUpperCase(Set<?>)
	toLowerCase(Object)
	arrayToLowerCase(Object[])
listToLowerCase(List<?>)
	setToLowerCase(Set<?>)
	trim(Object)
	arrayTrim(Object[])
listTrim(List<?>)
	setTrim(Set<?>)
	capitalize(Object)
	arrayCapitalize(Object[])
listCapitalize(List<?>)
	setCapitalize(Set<?>)
	unCapitalize(Object)
arrayUnCapitalize(Object[])
	listUnCapitalize(List<?>)
	setUnCapitalize(Set<?>)
	capitalizeWords(Object)
	arrayCapitalizeWords(Object[])
listCapitalizeWords(List<?>)
	setCapitalizeWords(Set<?>)
	capitalizeWords(Object, Object)
	arrayCapitalizeWords(Object[], Object)
listCapitalizeWords(List<?>, Object)
	setCapitalizeWords(Set<?>, Object)
	escapeXml(Object)
	arrayEscapeXml(Object[])
listEscapeXml(List<?>)
	setEscapeXml(Set<?>)
	escapeJavaScript(Object)
	arrayEscapeJavaScript(Object[])
listEscapeJavaScript(List<?>)
	setEscapeJavaScript(Set<?>)
	unescapeJavaScript(Object)
	arrayUnescapeJavaScript(Object[])
listUnescapeJavaScript(List<?>)
	setUnescapeJavaScript(Set<?>)
	escapeJava(Object)
	arrayEscapeJava(Object[])
listEscapeJava(List<?>)
	setEscapeJava(Set<?>)
	unescapeJava(Object)
	arrayUnescapeJava(Object[])
listUnescapeJava(List<?>)
	setUnescapeJava(Set<?>)
	randomAlphanumeric(int)
	defaultString(Object, Object)
	arrayDefaultString(Object[], Object)
	listDefaultString(List<?>, Object)
	setDefaultString(Set<?>, Object)
 */

thymol.objects.thStringsObject = function() {

  var thExpressionObjectName = "#strings";

  function toString( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = target.toString();
    }
    return result;
  }

  function arrayToString( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( target[ i ].toString() );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setToString( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( toString( target[ k ] ) );
        }
      }
    }
    return result;
  }

  function abbreviate( target, maxSize, source ) {
    if( maxSize >= 3 ) {
      var result = null;
      if( target !== null && typeof target !== "undefined" ) {
        result = target.toString();
        if( result.length > maxSize ) {
          result = result.substring( 0, maxSize - 3 ) + "...";
        }
      }
      return result;
    }
    throwAbbreviateException( "abbreviate", maxSize );
  }

  function arrayAbbreviate( target, maxSize ) {
    if( maxSize >= 3 ) {
      var result = null;
      if( target !== null && typeof target !== "undefined" ) {
        result = [];
        for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
          result.push( abbreviate( target[ i ], maxSize ) );
        }
      }
      return result;
    }
    throwAbbreviateException( "arrayAbbreviate", maxSize );
  }

  function setAbbreviate( target, maxSize ) {
    if( maxSize >= 3 ) {
      var result = null;
      if( target !== null && typeof target !== "undefined" ) {
        result = new thymol.ThSet();
        for( var k in target ) {
          if( target.isContent( k ) ) {
            result.add( abbreviate( target[ k ], maxSize ) );
          }
        }
      }
      return result;
    }
    throwAbbreviateException( "setAbbreviate", maxSize );
  }

  function throwAbbreviateException( source, maxSize ) {
    throw new thymol.ThError( "#strings." + source + " Maximum size must be greater than or equal to 3 but was: \"" + maxSize + "\"" );
  }

  function equals( o1, o2 ) {
    if( o1 === null ) {
      return o2 === null;
    }
    else if( o2 !== null ) {
      return o1.toString() === o2.toString();
    }
    return false;
  }

  function equalsIgnoreCase( o1, o2 ) {
    if( o1 === null ) {
      return o2 === null;
    }
    else if( o2 !== null ) {
      return o1.toString().toLowerCase() === o2.toString().toLowerCase();
    }
    return false;
  }

  function contains( target, fragment ) {
    if( target !== null ) {
      if( fragment !== null ) {
        return target.toString().indexOf( fragment ) >= 0;
      }
      throw new thymol.ThError( "#strings.contains Fragment cannot be null" );
    }
    throw new thymol.ThError( "#strings.contains Cannot apply contains on null" );
  }

  function arrayContains( target, fragment ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( contains( target[ i ], fragment ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayContains Cannot apply arrayContains on null" );
  }

  function setContains( target, fragment ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( contains( target[ k ], fragment ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setContains Cannot apply setContains on null" );
  }

  function containsIgnoreCase( target, fragment ) {
    if( target !== null ) {
      if( fragment !== null ) {
        return target.toString().toLowerCase().indexOf( fragment.toLowerCase() ) >= 0;
      }
      throw new thymol.ThError( "#strings.containsIgnoreCase Fragment cannot be null" );
    }
    throw new thymol.ThError( "#strings.containsIgnoreCase Cannot apply containsIgnoreCase on null" );
  }

  function arrayContainsIgnoreCase( target, fragment ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( containsIgnoreCase( target[ i ], fragment ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayContainsIgnoreCase Cannot apply arrayContainsIgnoreCase on null" );
  }

  function setContainsIgnoreCase( target, fragment ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( containsIgnoreCase( target[ k ], fragment ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setContainsIgnoreCase Cannot apply setContainsIgnoreCase on null" );
  }

  function startsWith( target, prefix ) {
    if( target !== null ) {
      if( prefix !== null ) {
        return target.toString().indexOf( prefix ) === 0;
      }
      throw new thymol.ThError( "#strings.startsWith Prefix cannot be null" );
    }
    throw new thymol.ThError( "#strings.startsWith Cannot apply startsWith on null" );
  }

  function arrayStartsWith( target, prefix ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( startsWith( target[ i ], prefix ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayStartsWith Target cannot be null" );
  }

  function setStartsWith( target, prefix ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( startsWith( target[ k ], prefix ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setStartsWith Target cannot be null" );
  }

  function endsWith( target, suffix ) {
    if( target !== null ) {
      if( suffix !== null ) {
        var str = target.toString();
        return str.indexOf( suffix ) === ( str.length - suffix.length );
      }
      throw new thymol.ThError( "#strings.startsWith Suffix cannot be null" );
    }
    throw new thymol.ThError( "#strings.endsWith Cannot apply endsWith on null" );
  }

  function arrayEndsWith( target, suffix ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( endsWith( target[ i ], suffix ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayEndsWith Target cannot be null" );
  }

  function setEndsWith( target, suffix ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( endsWith( target[ k ], suffix ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setEndsWith Target cannot be null" );
  }

  function substring( target, start, end ) {
    if( target !== null ) {
      return target.toString().substring( start, end );
    }
    throw new thymol.ThError( "#strings.substring Target cannot be null" );
  }

  function arraySubstring( target, start, end ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( substring( target[ i ], start, end ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arraySubstring Target cannot be null" );
  }

  function setSubstring( target, start, end ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( substring( target[ k ], start, end ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setSubstring Target cannot be null" );
  }

  function substringAfter( target, substr ) {
    if( target !== null ) {
      if( substr !== null ) {
        var str = target.toString();
        var indx = str.indexOf( substr );
        if( indx < 0 ) {
          return null;
        }
        return str.substring( indx + substr.length );
      }
      throw new thymol.ThError( "#strings.substringAfter Parameter substring cannot be null" );
    }
    throw new thymol.ThError( "#strings.substringAfter Cannot apply substringAfter on null" );
  }

  function arraySubstringAfter( target, substr ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( substringAfter( target[ i ], substr ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arraySubstringAfter Cannot apply arraySubstringAfter on null" );
  }

  function setSubstringAfter( target, substr ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( substringAfter( target[ k ], substr ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setSubstringAfter Cannot apply setSubstringAfter on null" );
  }

  function substringBefore( target, substr ) {
    if( target !== null ) {
      if( substr !== null ) {
        var str = target.toString();
        var indx = str.indexOf( substr );
        if( indx < 0 ) {
          return null;
        }
        return str.substring( 0, indx );
      }
      throw new thymol.ThError( "#strings.substringBefore Parameter substring cannot be null" );
    }
    throw new thymol.ThError( "#strings.substringBefore Cannot apply substringBefore on null" );
  }

  function arraySubstringBefore( target, substr ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( substringBefore( target[ i ], substr ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arraySubstringBefore Cannot apply arraySubstringBefore on null" );
  }

  function setSubstringBefore( target, substr ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( substringBefore( target[ k ], substr ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setSubstringBefore Cannot apply setSubstringBefore on null" );
  }

  function prepend( target, prefix ) {
    if( target !== null ) {
      if( prefix !== null ) {
        return prefix.toString() + target.toString();
      }
      throw new thymol.ThError( "#strings.prepend Prefix cannot be null" );
    }
    throw new thymol.ThError( "#strings.prepend Cannot apply prepend on null" );
  }

  function arrayPrepend( target, prefix ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( prepend( target[ i ], prefix ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayPrepend Cannot apply arrayPrepend on null" );
  }

  function setPrepend( target, prefix ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( prepend( target[ k ], prefix ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setPrepend Cannot apply setPrepend on null" );
  }

  function repeat( target, times ) {
    var result = "";
    for( var i = 0; i < times; i++ ) {
      result += target.toString();
    }
    return result;
  }

  function append( target, suffix ) {
    if( target !== null ) {
      if( suffix !== null ) {
        return target.toString() + suffix.toString();
      }
      throw new thymol.ThError( "#strings.append Suffix cannot be null" );
    }
    throw new thymol.ThError( "#strings.append Cannot apply append on null" );
  }

  function concat() {
    var result = "";
    for( var i = 0, iLimit = arguments.length; i < iLimit; i++ ) {
      if( arguments[ i ] !== null ) {
        result += arguments[ i ];
      }
    }
    return result;
  }

  function concatReplaceNulls() {
    var result = "";
    for( var i = 1, iLimit = arguments.length; i < iLimit; i++ ) {
      if( arguments[ i ] === null ) {
        result += arguments[ 0 ];
      }
      else {
        result += arguments[ i ];
      }
    }
    return result;
  }

  function arrayAppend( target, suffix ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( append( target[ i ], suffix ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayAppend Target cannot be null" );
  }

  function setAppend( target, suffix ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( append( target[ k ], suffix ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setAppend Target cannot be null" );
  }

  function indexOf( target, fragment ) {
    if( target !== null ) {
      if( fragment !== null ) {
        var str = target.toString();
        var indx = str.indexOf( fragment );
        return indx;
      }
      throw new thymol.ThError( "#strings.indexOf Fragment cannot be null" );
    }
    throw new thymol.ThError( "#strings.indexOf Cannot apply indexOf on null" );
  }

  function arrayIndexOf( target, fragment ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( indexOf( target[ i ], fragment ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayIndexOf Cannot apply arrayIndexOf on null" );
  }

  function setIndexOf( target, fragment ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( indexOf( target[ k ], fragment ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setIndexOf Cannot apply setIndexOf on null" );
  }

  function isEmpty( target ) {
    if( target !== null ) {
      var str = target.toString();
      if( str !== null ) {
        // http://msdn.microsoft.com/en-us/library/2yfce773%28v=vs.94%29.aspx
        str = str.replace( /(?:[\\]t)/g, "\u0009" ).replace( /(?:[\\]n)/g, "\u000A" ).replace( /(?:[\\]v)/g, "\u000B" ).replace( /(?:[\\]f)/g, "\u000C" ).replace( /(?:[\\]r)/g, "\u000D" );
        str = str.trim();
        if( str.length !== 0 ) {
          return false;
        }
      }
    }
    return true;
  }

  function arrayIsEmpty( target ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( isEmpty( target[ i ] ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayIsEmpty Target cannot be null" );
  }

  function setIsEmpty( target ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( isEmpty( target[ k ] ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setIsEmpty Target cannot be null" );
  }

  function arrayJoin( stringArray, separator ) {
    if( stringArray !== null ) {
      if( separator !== null ) {
        var sepStr = separator.toString();
        var result = "";
        for( var i = 0, iLimit = stringArray.length; i < iLimit; i++ ) {
          if( "" !== result ) {
            result += sepStr;
          }
          result += stringArray[ i ];
        }
        return result;
      }
      throw new thymol.ThError( "#strings.arrayJoin Separator cannot be null" );
    }
    throw new thymol.ThError( "#strings.arrayJoin Cannot apply join on null" );
  }

  function setJoin( stringSet, separator ) {
    if( stringSet !== null ) {
      if( separator !== null ) {
        var sepStr = separator.toString();
        var result = "";
        for( var k in stringSet ) {
          if( stringSet.isContent( k ) ) {
            if( "" !== result ) {
              result += sepStr;
            }
            result += stringSet[ k ];
          }
        }
        return result;
      }
      throw new thymol.ThError( "#strings.setJoin Separator cannot be null" );
    }
    throw new thymol.ThError( "#strings.setJoin Cannot apply join on null" );
  }

  function doRegExpify( target, flags ) {
    var result = target.toString();
    result = result.replace( /[\\]/g, "\\" ).replace( /[\^]/g, "\^" ).replace( /[\[]/g, "\[" ).replace( /[\]]/g, "\]" ).replace( /[\(]/g, "\(" ).replace( /[\)]/g, "\)" );
    result = "[" + result + "]";
    return new RegExp( result, flags );
  }

  function doSplit( target, separator ) {
    var re = doRegExpify( separator );
    var splits = target.split( re );
    var result = [];
    for( var i = 0, iLimit = splits.length; i < iLimit; i++ ) {
      if( splits[ i ] ) {
        result.push( splits[ i ] );
      }
    }
    return result;
  }

  function arraySplit( target, separator ) {
    if( target !== null ) {
      if( separator !== null ) {
        return doSplit( target, separator );
      }
      throw new thymol.ThError( "#strings.arraySplit Separator cannot be null" );
    }
    throw new thymol.ThError( "#strings.arraySplit Cannot apply split on null" );
  }

  function setSplit( target, separator ) {
    if( target !== null ) {
      if( separator !== null ) {
        var result = new thymol.ThSet();
        var splits = doSplit( target, separator );
        for( var i = 0, iLimit = splits.length; i < iLimit; i++ ) {
          result.add( splits[ i ] );
        }
        return result;
      }
      throw new thymol.ThError( "#strings.setSplit Separator cannot be null" );
    }
    throw new thymol.ThError( "#strings.setSplit Cannot apply split on null" );
  }

  function length( target ) {
    if( target !== null ) {
      return target.toString().length;
    }
    throw new thymol.ThError( "#strings.length Cannot apply length on null" );
  }

  function arrayLength( target ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( length( target[ i ] ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayLength Target cannot be null" );
  }

  function setLength( target ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( length( target[ k ] ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setLength Target cannot be null" );
  }

  function getReplacer( target ) {
    var bfr = target.replace( /[$]/g, "[$]" ).replace( /[*]/g, "[*]" ).replace( /[\']/g, "[\']" ).replace( /[+]/g, "[\+]" ).replace( /[\(]/g, "[\(]" ).replace( /[\)]/g, "[\)]" );
    return new RegExp( bfr, "g" );
  }

  function replace( target, before, after ) {
    if( target !== null ) {
      if( before !== null ) {
        var bfr = unescapeXml( before );
        if( after !== null ) {
          var re = getReplacer( bfr );
          var aft = unescapeXml( after );
          return target.replace( re, aft );
        }
        throw new thymol.ThError( "#strings.replace After cannot be null" );
      }
      throw new thymol.ThError( "#strings.replace Before cannot be null" );
    }
    throw new thymol.ThError( "#strings.replace Cannot apply replace on null" );
  }

  function arrayReplace( target, before, after ) {
    if( target !== null ) {
      if( before !== null ) {
        var bfr = unescapeXml( before );
        if( after !== null ) {
          var re = getReplacer( bfr );
          var aft = unescapeXml( after );
          var result = [];
          for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
            result.push( target[ i ].toString().replace( re, aft ) );
          }
          return result;
        }
        throw new thymol.ThError( "#strings.arrayReplace After cannot be null" );
      }
      throw new thymol.ThError( "#strings.arrayReplace Before cannot be null" );
    }
    throw new thymol.ThError( "#strings.arrayReplace Cannot apply replace on null" );
  }

  function setReplace( target, before, after ) {
    if( target !== null ) {
      if( before !== null ) {
        var bfr = unescapeXml( before );
        if( after !== null ) {
          var re = getReplacer( bfr );
          var aft = unescapeXml( after );
          var result = new thymol.ThSet();
          for( var k in target ) {
            if( target.isContent( k ) ) {
              result.add( target[ k ].toString().replace( re, aft ) );
            }
          }
          return result;
        }
        throw new thymol.ThError( "#strings.setReplace Array of 'after' values cannot be null" );
      }
      throw new thymol.ThError( "#strings.setReplace Array of 'before' values cannot be null" );
    }
    throw new thymol.ThError( "#strings.setReplace Cannot apply replace on null" );
  }

  function multipleReplace( target, before, after ) {
    if( target !== null ) {
      if( before !== null ) {
        if( Object.prototype.toString.call( before ) == "[object Array]" ) {
          if( after !== null ) {
            if( Object.prototype.toString.call( after ) == "[object Array]" ) {
              if( before.length === after.length ) {
                var result = target;
                var bfr, aft;
                for( var i = 0, iLimit = before.length; i < iLimit; i++ ) {
                  bfr = unescapeXml( before[ i ] );
                  var re = getReplacer( bfr );
                  aft = unescapeXml( after[ i ] );
                  result = result.replace( re, aft );
                }
                return result;
              }
              throw new thymol.ThError( "#strings.multipleReplace Arrays of 'before' and 'after' values must have the same length" );
            }
            throw new thymol.ThError( "#strings.multipleReplace After must be an array type" );
          }
          throw new thymol.ThError( "#strings.multipleReplace After cannot be null" );
        }
        throw new thymol.ThError( "#strings.multipleReplace Before must be an array type" );
      }
      throw new thymol.ThError( "#strings.multipleReplace Before cannot be null" );
    }
    throw new thymol.ThError( "#strings.multipleReplace Target cannot be null" );
  }

  function arrayMultipleReplace( target, before, after ) {
    if( target !== null ) {
      var result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        result.push( multipleReplace( target[ i ].toString(), before, after ) );
      }
      return result;
    }
    throw new thymol.ThError( "#strings.arrayMultipleReplace Target cannot be null" );
  }

  function setMultipleReplace( target, before, after ) {
    if( target !== null ) {
      var result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( multipleReplace( target[ k ].toString(), before, after ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setMultipleReplace Target cannot be null" );
  }

  function toUpperCase( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = target.toString().toUpperCase();
    }
    return result;
  }

  function arrayToUpperCase( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( target[ i ].toString().toUpperCase() );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setToUpperCase( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( target[ k ].toString().toUpperCase() );
        }
      }
    }
    return result;
  }

  function toLowerCase( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = target.toString().toLowerCase();
    }
    return result;
  }

  function arrayToLowerCase( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( target[ i ].toString().toLowerCase() );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setToLowerCase( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( target[ k ].toString().toLowerCase() );
        }
      }
    }
    return result;
  }

  function trim( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = target.toString().trim();
    }
    return result;
  }

  function arrayTrim( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( target[ i ].toString().trim() );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setTrim( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( target[ k ].toString().trim() );
        }
      }
    }
    return result;
  }

  function capitalize( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = target.toString();
      if( result.length > 0 ) {
        result = result.charAt( 0 ).toUpperCase() + result.substr( 1 );
      }
    }
    return result;
  }

  function arrayCapitalize( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( capitalize( target[ i ] ) );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setCapitalize( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( capitalize( target[ k ] ) );
        }
      }
    }
    return result;
  }

  function unCapitalize( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = target.toString();
      if( result.length > 0 ) {
        result = result.charAt( 0 ).toLowerCase() + result.substr( 1 );
      }
    }
    return result;
  }

  function arrayUnCapitalize( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( unCapitalize( target[ i ] ) );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setUnCapitalize( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( unCapitalize( target[ k ] ) );
        }
      }
    }
    return result;
  }

  function capitalizeWords( target, delimiters ) {
    var splitter;
    if( typeof delimiters === "undefined" ) {
      // var r = new RegExp("\\S\\w*", "g" ); // [^ \t\r\n]
      splitter = new RegExp( "[^ \t\r\n\f\v]\\w*", "g" );
    }
    else {
      var spec = "[^ " + delimiters + "]\\w*";
      splitter = new RegExp( spec, "g" );
    }
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      var str = target.toString();
      if( str.length > 0 ) {
        result = "";
        var matched;
        var indx = 0;
        while( ( matched = splitter.exec( str ) ) !== null ) {
          result += str.substring( indx, matched.index );
          result += matched[ 0 ].charAt( 0 ).toUpperCase() + matched[ 0 ].substr( 1 );
          indx = splitter.lastIndex;
        }
        result += str.substring( indx );
      }
    }
    return result;
  }

  function arrayCapitalizeWords( target, delimiters ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( capitalizeWords( target[ i ], delimiters ) );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setCapitalizeWords( target, delimiters ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( capitalizeWords( target[ k ], delimiters ) );
        }
      }
    }
    return result;
  }

  function escapeXml( target, escapeQuotesParam ) {
    var result = target;
    if( target !== null && typeof target !== "undefined" ) {
      var escapeQuotes = ( escapeQuotesParam !== null && typeof escapeQuotesParam !== "undefined" && escapeQuotesParam );
      if( escapeQuotes ) {
        result = escapeXmlTrue( target );
      }
      else {
        result = "";
        for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
          var c = target.charAt( i );
          if( c === '&' ) {
            if( !isEntityStart( target, i ) ) {
              // This avoids escaping &'s that are in fact starting
              // already escaped entities.
              c = "&amp;";
            }
          }
          else if( c === '<' ) {
            c = "&amp;lt;";
          }
          else if( c === '>' ) {
            c = "&amp;gt;";
          }
          else if( c === '"' ) {
            c = "&amp;quot;";
          }
          else if( c === '\'' ) {
            c = "&amp;#39;";
          }
          result += c;
        }
      }
    }
    return result;
  }

  function escapeXmlTrue( target ) {
    var result = "";
    for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
      var c = target.charAt( i );
      if( c === '&' ) {
        if( !isEntityStart( target, i ) ) {
          // This avoids escaping &'s that are in fact starting
          // already escaped entities.
          c = "&amp;";
        }
      }
      else if( c === '<' ) {
        c = "&lt;";
      }
      else if( c === '>' ) {
        c = "&gt;";
      }
      else if( c === '"' ) {
        c = "&quot;";
      }
      else if( c === '\'' ) {
        c = "&#39;";
      }
      result += c;
    }
    return result;
  }

  function unescapeXml( target ) {
    var result = "";
    for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
      var c = target.charAt( i );
      if( c === '&' ) {
        c = isEntity( target, i );
        if( c !== '&' ) {
          i += c.length;
          if( c === "&lt;" ) {
            c = "<";
          }
          else if( c === "&gt;" ) {
            c = ">";
          }
          else if( c === "&amp;" ) {
            c = "&";
          }
          else if( c === "&quot;" ) {
            c = "\"";
          }
          else if( c === "&#39;" ) {
            c = "\'";
          }
        }
        else {
          c = "&amp;"; // This looks like a ridiculous contradiction, but a
                        // value "&amp;" has already have been escaped as "&",
                        // so we need to undo it!
        }
      }
      result += c;
    }
    return result;
  }

  function isEntity( buffer, position ) {
    var entity = "&";
    var i = position + 1;
    while( i < buffer.length ) {
      var c = buffer[ i ];
      if( ! ( ( c >= 'A' && c <= 'Z' ) || ( c >= 'a' && c <= 'z' ) || ( c >= '0' && c <= '9' ) || ( c == ';' ) || ( c == '#' ) ) ) {
        return "&";
      }
      entity += c;
      if( c == ';' ) {
        return entity;
      }
      i++;
    }
    return "&";
  }

  function isEntityStart( buffer, position ) {
    var i = position + 1;
    while( i < buffer.length ) {
      var c = buffer[ i ];
      if( ! ( ( c >= 'A' && c <= 'Z' ) || ( c >= 'a' && c <= 'z' ) || ( c >= '0' && c <= '9' ) || ( c == ';' ) || ( c == '#' ) ) ) {
        return false;
      }
      if( c == ';' ) {
        return true;
      }
      i++;
    }
    return false;
  }

  function arrayEscapeXml( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( escapeXml( target[ i ], false ) );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setEscapeXml( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( escapeXml( target[ k ], false ) );
        }
      }
    }
    return result;
  }

  function escapeJavaScript( target ) {
    var result = target;
    if( target !== null && typeof target !== "undefined" ) {
      result = escapeJavaAny( target, true );
    }
    return result;
  }

  function escapeJavaAny( target, javaScript ) {
    var result = "";
    for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
      var c = target.charAt( i );
      var cc = target.charCodeAt( i );
      if( cc >= 32 && cc <= 0x7f ) {

        switch( c ) {
          case '\\':
            c = "\\";
            break;
          case '"':
            c = "\\\"";
            break;
          case '\'':
            if( javaScript ) {
              c = "\\'";
            }
            break;
          case '/':
            if( javaScript ) {
              if( i > 0 && target.charAt( i - 1 ) == '<' ) {
                c = "\\/";
              }
            }
            break;
          case '>':
            if( javaScript && i > 1 ) {
              // Make sure we escape "]]>" just in case we are inside a
              // CDATA Section.
              if( target.charAt( i - 1 ) == ']' && target.charAt( i - 2 ) == ']' ) {
                c = "\\>";
              }
            }
            break;
          default:
            break;
        }
      }
      else {
        switch( c ) {
          case '\t':
            c = "\\t";
            break;
          case '\n':
            c = "\\n";
            break;
          case '\b':
            c = "\\b";
            break;
          case '\f':
            c = "\\f";
            break;
          case '\r':
            c = "\\r";
            break;
          default:
            if( javaScript ) {
              c = hexEscape( cc );
            }
            else {
              c = unicodeEscape( cc );
            }
            break;
        }
      }
      result += c;
    }
    return result;
  }

  function unicodeEscape( c ) {
    var x = c + 0x10000;
    x = x.toString( 16 );
    x = x.slice( 1 );
    var output = '\\u' + x.toUpperCase();
    return output;
  }

  function hexEscape( c ) {
    var x = c + 0x100;
    x = x.toString( 16 );
    x = x.slice( 1 );
    var output = '\\x' + x.toUpperCase();
    return output;
  }

  function arrayEscapeJavaScript( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( escapeJavaScript( target[ i ] ) );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setEscapeJavaScript( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( escapeJavaScript( target[ k ] ) );
        }
      }
    }
    return result;
  }

  function unescapeJavaScript( target ) {
    var result = target;
    if( target !== null && typeof target !== "undefined" ) {
      result = unescapeJavaAny( target );
    }
    return result;
  }

  function unescapeJavaAny( target ) {
    var result = "";
    var unicodeSpec = "";
    var unicodeLen = -1;
    var hexSpec = "";
    var hexLen = -1;
    var lastWasEscape = false;
    for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
      var c = target.charAt( i );
      if( unicodeLen >= 0 ) {
        unicodeSpec += c;
        if( ( c >= '0' && c <= '9' ) || ( c >= 'A' && c <= 'F' ) || ( c >= 'a' && c <= 'f' ) ) { // Only
                                                                                                  // accept
                                                                                                  // valid
                                                                                                  // Hex
                                                                                                  // chars
          unicodeLen++;
          if( unicodeLen > 3 ) {
            // Unicode spec is complete
            var cc = parseInt( unicodeSpec, 16 );
            c = String.fromCharCode( cc );
            unicodeSpec = "";
            unicodeLen = -1;
            result += c;
            lastWasEscape = false;
          }
        }
        else {
          // throw new thymol.ThError( "#strings unescape cannot process Unicode
          // constant: \"\\u" + unicodeSpec + "\"");
return target;
        }
      }
      else if( hexLen >= 0 ) {
        hexSpec += c;
        if( ( c >= '0' && c <= '9' ) || ( c >= 'A' && c <= 'F' ) || ( c >= 'a' && c <= 'f' ) ) { // Only
                                                                                                  // accept
                                                                                                  // valid
                                                                                                  // Hex
                                                                                                  // chars
          hexLen++;
          if( hexLen > 1 ) {
            // Unicode spec is complete
            var cc = parseInt( hexSpec, 16 );
            c = String.fromCharCode( cc );
            hexSpec = "";
            hexLen = -1;
            result += c;
            lastWasEscape = false;
          }
        }
        else {
          // throw new thymol.ThError( "#strings unescape cannot process Hex
          // constant: \"\\x" + hexSpec + "\"");
          return target;
        }
      }
      else if( lastWasEscape ) {
        // We read a \ character, so this is an escaped char
        if( c === 'u' ) {
          // we are in fact reading a unicode char
          unicodeLen = 0;
        }
        else if( c === 'x' ) {
          // we are in fact reading a hex char
          hexLen = 0;
        }
        else {
          switch( c ) {
            case 't':
              c = '\t';
              break;
            case 'n':
              c = '\n';
              break;
            case 'b':
              c = '\b';
              break;
            case 'f':
              c = '\f';
              break;
            case 'r':
              c = '\r';
              break;
            default:
              break;
          }
          result += c;
          lastWasEscape = false;
        }
      }
      else if( c == '\\' ) {
        lastWasEscape = true;
      }
      else {
        result += c;
        lastWasEscape = false;
      }
    }
    // Just in case..
    if( unicodeLen >= 0 ) {
      result += "\\u" + unicodeSpec;
    }
    else if( hexLen >= 0 ) {
      result += "\\x" + hexSpec;
    }
    else if( lastWasEscape ) {
      result += '\\';
    }
    return result;
  }

  function arrayUnescapeJavaScript( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( unescapeJavaScript( target[ i ] ) );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setUnescapeJavaScript( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( unescapeJavaScript( target[ k ] ) );
        }
      }
    }
    return result;
  }

  function escapeJava( target ) {
    var result = target;
    if( target !== null && typeof target !== "undefined" ) {
      result = escapeJavaAny( target, false );
    }
    return result;
  }

  function arrayEscapeJava( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = [];
      for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
        if( target[ i ] !== null ) {
          result.push( escapeJava( target[ i ] ) );
        }
        else {
          result.push( null );
        }
      }
    }
    return result;
  }

  function setEscapeJava( target ) {
    var result = null;
    if( target !== null && typeof target !== "undefined" ) {
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( escapeJava( target[ k ] ) );
        }
      }
    }
    return result;
  }

  var ALPHA_NUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function randomAlphanumeric( count ) {
    var result = "";
    for( var i = 0; i < count; i++ ) {
      result += ALPHA_NUMERIC.charAt( Math.floor( Math.random() * ALPHA_NUMERIC.length ) );
    }
    return result;
  }

  function defaultString( target, defaultValue ) {
    if( defaultValue !== null && typeof defaultValue !== "undefined" ) {
      if( target == null ) {
        return defaultValue.toString();
      }
      var targetString = target.toString();
      if( isEmpty( targetString ) ) {
        return defaultValue.toString();
      }
      return targetString;
    }
    throw new thymol.ThError( "#strings.defaultString defaultValue cannot be null" );
  }

  function doArrayDefaultString( target, defaultValue ) {
    if( target == null || typeof target === "undefined" ) {
      return target;
    }
    var result = [];
    for( var i = 0, iLimit = target.length; i < iLimit; i++ ) {
      result.push( defaultString( target[ i ], defaultValue ) );
    }
    return result;
  }

  function arrayDefaultString( target, defaultValue ) {
    if( defaultValue !== null && typeof defaultValue !== "undefined" ) {
      return doArrayDefaultString( target, defaultValue );
    }
    throw new thymol.ThError( "#strings.arrayDefaultString defaultValue cannot be null" );
  }

  function listDefaultString( target, defaultValue ) {
    if( defaultValue !== null && typeof defaultValue !== "undefined" ) {
      return doArrayDefaultString( target, defaultValue );
    }
    throw new thymol.ThError( "#strings.listDefaultString defaultValue cannot be null" );
  }

  function setDefaultString( target, defaultValue ) {
    if( defaultValue !== null && typeof defaultValue !== "undefined" ) {
      if( target == null || typeof target === "undefined" ) {
        return target;
      }
      result = new thymol.ThSet();
      for( var k in target ) {
        if( target.isContent( k ) ) {
          result.add( defaultString( target[ k ], defaultValue ) );
        }
      }
      return result;
    }
    throw new thymol.ThError( "#strings.setDefaultString defaultValue cannot be null" );
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    toString : toString,
    arrayToString : arrayToString,
    listToString : arrayToString,
    setToString : setToString,
    abbreviate : abbreviate,
    arrayAbbreviate : arrayAbbreviate,
    listAbbreviate : arrayAbbreviate,
    setAbbreviate : setAbbreviate,
    equals : equals,
    equalsIgnoreCase : equalsIgnoreCase,
    contains : contains,
    arrayContains : arrayContains,
    listContains : arrayContains,
    setContains : setContains,
    containsIgnoreCase : containsIgnoreCase,
    arrayContainsIgnoreCase : arrayContainsIgnoreCase,
    listContainsIgnoreCase : arrayContainsIgnoreCase,
    setContainsIgnoreCase : setContainsIgnoreCase,
    startsWith : startsWith,
    arrayStartsWith : arrayStartsWith,
    listStartsWith : arrayStartsWith,
    setStartsWith : setStartsWith,
    endsWith : endsWith,
    arrayEndsWith : arrayEndsWith,
    listEndsWith : arrayEndsWith,
    setEndsWith : setEndsWith,
    substring : substring,
    arraySubstring : arraySubstring,
    listSubstring : arraySubstring,
    setSubstring : setSubstring,
    substringAfter : substringAfter,
    arraySubstringAfter : arraySubstringAfter,
    listSubstringAfter : arraySubstringAfter,
    setSubstringAfter : setSubstringAfter,
    substringBefore : substringBefore,
    arraySubstringBefore : arraySubstringBefore,
    listSubstringBefore : arraySubstringBefore,
    setSubstringBefore : setSubstringBefore,
    prepend : prepend,
    arrayPrepend : arrayPrepend,
    listPrepend : arrayPrepend,
    setPrepend : setPrepend,
    repeat : repeat,
    append : append,
    concat : concat,
    concatReplaceNulls : concatReplaceNulls,
    arrayAppend : arrayAppend,
    listAppend : arrayAppend,
    setAppend : setAppend,
    indexOf : indexOf,
    arrayIndexOf : arrayIndexOf,
    listIndexOf : arrayIndexOf,
    setIndexOf : setIndexOf,
    isEmpty : isEmpty,
    arrayIsEmpty : arrayIsEmpty,
    listIsEmpty : arrayIsEmpty,
    setIsEmpty : setIsEmpty,
    arrayJoin : arrayJoin,
    listJoin : arrayJoin,
    setJoin : setJoin,
    arraySplit : arraySplit,
    listSplit : arraySplit,
    setSplit : setSplit,
    length : length,
    arrayLength : arrayLength,
    listLength : arrayLength,
    setLength : setLength,
    replace : replace,
    arrayReplace : arrayReplace,
    listReplace : arrayReplace,
    setReplace : setReplace,
    multipleReplace : multipleReplace,
    arrayMultipleReplace : arrayMultipleReplace,
    listMultipleReplace : arrayMultipleReplace,
    setMultipleReplace : setMultipleReplace,
    toUpperCase : toUpperCase,
    arrayToUpperCase : arrayToUpperCase,
    listToUpperCase : arrayToUpperCase,
    setToUpperCase : setToUpperCase,
    toLowerCase : toLowerCase,
    arrayToLowerCase : arrayToLowerCase,
    listToLowerCase : arrayToLowerCase,
    setToLowerCase : setToLowerCase,
    trim : trim,
    arrayTrim : arrayTrim,
    listTrim : arrayTrim,
    setTrim : setTrim,
    capitalize : capitalize,
    arrayCapitalize : arrayCapitalize,
    listCapitalize : arrayCapitalize,
    setCapitalize : setCapitalize,
    unCapitalize : unCapitalize,
    arrayUnCapitalize : arrayUnCapitalize,
    listUnCapitalize : arrayUnCapitalize,
    setUnCapitalize : setUnCapitalize,
    capitalizeWords : capitalizeWords,
    arrayCapitalizeWords : arrayCapitalizeWords,
    listCapitalizeWords : arrayCapitalizeWords,
    setCapitalizeWords : setCapitalizeWords,
    escapeXml : escapeXml,
    arrayEscapeXml : arrayEscapeXml,
    listEscapeXml : arrayEscapeXml,
    setEscapeXml : setEscapeXml,
    escapeJavaScript : escapeJavaScript,
    arrayEscapeJavaScript : arrayEscapeJavaScript,
    listEscapeJavaScript : arrayEscapeJavaScript,
    setEscapeJavaScript : setEscapeJavaScript,
    unescapeJavaScript : unescapeJavaScript,
    arrayUnescapeJavaScript : arrayUnescapeJavaScript,
    listUnescapeJavaScript : arrayUnescapeJavaScript,
    setUnescapeJavaScript : setUnescapeJavaScript,
    escapeJava : escapeJava,
    arrayEscapeJava : arrayEscapeJava,
    listEscapeJava : arrayEscapeJava,
    setEscapeJava : setEscapeJava,
    unescapeJava : unescapeJavaScript,
    arrayUnescapeJava : arrayUnescapeJavaScript,
    listUnescapeJava : arrayUnescapeJavaScript,
    setUnescapeJava : setUnescapeJavaScript,
    randomAlphanumeric : randomAlphanumeric,
    defaultString : defaultString,
    arrayDefaultString : arrayDefaultString,
    listDefaultString : listDefaultString,
    setDefaultString : setDefaultString
  };

}();