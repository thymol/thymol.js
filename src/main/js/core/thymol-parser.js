thymol.ThParser = ( function( scope ) {

  function object( o ) {
    function F() {
      // Do nothing
    }
    ;
    F.prototype = o;
    return new F();
  }

  function NullReturn( varName ) {
    this.varName = varName;
  }

  var TNUMBER = 0;
  var TOP1 = 1;
  var TOP2 = 2;
  var TVAR = 3;
  var TFUNCALL = 4;
  var MSGSUBST = 5;
  var ARGLIST = 6;

  function Token( type_p, index_p, prio_p, number_p, mode_p, meta_p ) {
    this.type_ = type_p;
    this.index_ = index_p || 0;
    this.prio_ = prio_p || 0;
    this.number_ = ( number_p !== undefined && number_p !== null ) ? number_p : 0;
    this.mode_ = ( mode_p !== undefined && mode_p !== null ) ? mode_p : 0;
    this.meta_ = meta_p;
    this.toString = function() {
      switch( this.type_ ) {
        case TNUMBER:
          return this.number_;
        case TOP1:
        case TOP2:
        case TVAR:
          return this.index_;
        case TFUNCALL:
        case MSGSUBST:
        case ARGLIST:
          return "CALL";
        default:
          return "Invalid Token";
      }
    };
  }

  function Expression( tokens, ops1, ops2, functions, precision, position ) {
    this.tokens = tokens;
    this.ops1 = ops1;
    this.ops2 = ops2;
    this.functions = functions;
    this.precision = precision;
    this.position = position;
  }

  Expression.prototype = {

    simplify : function( valuesParam ) {
      var values = valuesParam || {};
      var nstack = [];
      var newexpression = [];
      var n1;
      var n2;
      var f;
      var L = this.tokens.length;
      var item;
      var i = 0;
      for( i = 0; i < L; i++ ) {
        item = this.tokens[ i ];
        var type_ = item.type_;
        if( type_ === TNUMBER ) {
          nstack.push( item );
        }
        else if( type_ === TVAR && ! ( item.index_ in new Object() ) && ( item.index_ in values ) ) {
          item = new Token( TNUMBER, 0, 0, values[ item.index_ ] );
          nstack.push( item );
        }
        else if( type_ === TOP2 && nstack.length > 1 ) {
          f = this.ops2[ item.index_ ];
          if( !!f ) {
            n2 = nstack.pop();
            n1 = nstack.pop();
            item = new Token( TNUMBER, 0, 0, f( n1.number_, n2.number_ ) );
          }
          nstack.push( item );
        }
        else if( type_ === TOP1 && nstack.length > 0 ) {
          if( '{' == item.index_ ) {
            if( item.mode_ == 2 ) {
              nstack.push( item );
            }
          }
          else {
            n1 = nstack.pop();
            f = this.ops1[ item.index_ ];
            item = new Token( TNUMBER, 0, 0, f( n1.number_ ) );
            nstack.push( item );
          }
        }
        else {
          while( nstack.length > 0 ) {
            newexpression.push( nstack.shift() );
          }
          newexpression.push( item );
        }
      }
      while( nstack.length > 0 ) {
        newexpression.push( nstack.shift() );
      }
      var res = new Expression( newexpression, object( this.ops1 ), object( this.ops2 ), object( this.functions ), this.precision );
      return res;
    },

    evaluate : function( element ) {
      var nstack = [];
      var n1;
      var n2;
      var f;
      var res = null;
      var L = this.tokens.length;
      var item;
      var i = 0;
      var result;
      for( i = 0; i < L; i++ ) {
        item = this.tokens[ i ];
        if( i === 0 && thymol.disableMessages && item.mode_ === 4 ) {
          var nullReturn = new thymol.ThClass();
          nullReturn.abort = true;
          return nullReturn;
        }
        var type_ = item.type_;
        if( type_ === TNUMBER ) {
          nstack.push( item.number_ );
          if( i == L - 1 ) { // We only have a number left, this must be the result
            break;
          }
        }
        else if( type_ === TOP2 ) {
          n2 = nstack.pop();
          if( typeof n2 === "undefined" || n2 instanceof NullReturn ) {
            n2 = null;
          }
          n1 = nstack.pop();
          if( typeof n1 === "undefined" || n1 instanceof NullReturn ) {
            n1 = null;
          }
          f = this.ops2[ item.index_ ];
          var pathMatch = false;
          try {
            if( item.mode_ === 6 ) {
              if( f === dot ) {
                res = n1 + "[" + n2 + "]";
              }
              else if( f === append ) {
                if( !!item.meta_ ) {
                  if( !!item.meta_.paths ) {
                    var values = item.meta_.paths[ n1 ];
                    if( !!values ) {
                      values.push( n2 );
                      pathMatch = true;
                      res = null;
                    }
                  }
                }
                if( !pathMatch ) {
                  if( !item.meta_ ) {
                    item.meta_ = {};
                  }
                  if( !item.meta_.params ) {
                    item.meta_.params = [];
                  }
                  var values = item.meta_.params[ n1 ];
                  if( !values ) {
                    values = [];
                    item.meta_.params[ n1 ] = values;
                  }
                  values.push( n2 );
                  pathMatch = true; // set so that nothing is pushed
                }
              }
              else {
                res = n2;
                nstack.push( n1 );
              }
            }
            else {
              if( f === dot && "class" === n2 && !!n1 && !n1[ "class" ] ) {
                var tn2 = typeof n2;
                if( tn2 === 'object' && n2 instanceof thymol.ThParam ) {
                  res = f( n1, n2 );
                }
                else {
                  res = new thymol.ThClass( "JavaScript:" + tn2 );
                }
              }
              else {
                res = f( n1, n2 );
                if( typeof res === "function" ) { // TODO finish this
                  if( L - 1 > i ) {
                    next = this.tokens[ i + 1 ];
                    if( next.type_ === TNUMBER && Object.prototype.toString.call( next.number_ ) == "[object Array]" && next.number_.length == 0 ) { // Empty args list
                      i += 1;
                      nstack.push( res );
                      n1.isDirect = true;
                      res = n1;
                    }
                  }
                }
              }
              if( f !== append ) {
                if( Object.prototype.toString.call( res ) == "[object Array]" ) {
                  res.arrayResult = true;
                }
              }
            }
          }
          catch( err ) {
            if( !element.isBlockChild ) {
              var aValue = n1 == null ? "null" : n1;
              var bValue = n2 == null ? "null" : n2;
              var message = "while evaluating expression: " + this.tokens[ i - 2 ].index_ + ": " + aValue + ", " + this.tokens[ i - 1 ].index_ + ": " + bValue;
              throw new thymol.ThError( message, element, err );
            }
          }
          if( !pathMatch ) {
            nstack.push( res );
          }
        }
        else if( type_ === TVAR ) {
          var next = null, pushed = nstack.length;
          if( item.index_ != null ) {
            if( L - 1 > i ) {
              next = this.tokens[ i + 1 ];
              if( next.type_ === TOP2 && next.index_ === '.' ) {
                nstack.push( item.index_ );
              }
            }
            if( pushed === nstack.length ) {
              var val = thymol.substituteParam( item.index_, item.mode_, element );
              if( Object.prototype.toString.call( val ) == "[object Array]" ) {
                val.arrayResult = true;
              }
              this.updatePrecision( val );
              if( val === null ) {
                val = new NullReturn( item.index_ );
              }
              nstack.push( val );
            }
          }
          else if( pushed === nstack.length && item.index_ in this.functions ) {
            nstack.push( this.functions[ item.index_ ] );
          }
          else {
            if( !element.isBlockChild ) {
              throw new thymol.ThError( "Exception undefined variable: " + item.index_, element );
            }
          }
        }
        else if( type_ === TOP1 ) {
          n1 = nstack.pop();
          if( typeof n1 === "undefined" || n1 instanceof NullReturn ) {
            if( item.mode_ === 2 ) {
              n1 = "";
            }
            else {
              n1 = null;
            }
          }
          res = n1;
          if( '{' === item.index_ ) {// TODO
            var prev = this.tokens[ i - 1 ];
            if( prev.mode_ == 7 ) {
              if( thymol.conversionService ) {
                n1 = thymol.conversionService( n1 );
                res = n1;
              }
            }
            if( typeof n1 === "string" ) {
              if( item.mode_ === 2 ) {
                res = thymol.getStandardURL( n1 );
              }
              else { // Don't repeat URL processing
                var subst = thymol.substituteParam( n1, item.mode_, element );
                if( subst != null ) {
                  this.updatePrecision( subst );
                  res = subst;
                }
              }
            }
          }
          else {
            f = this.ops1[ item.index_ ];
            try {
              res = f( n1 );
            }
            catch( err ) {
              if( !element.isBlockChild ) {
                var aValue = n1 == null ? "null" : n1;
                var message = "while evaluating expression: " + this.tokens[ i - 2 ].index_ + ": " + aValue;
                throw new thymol.ThError( message, element, err );
              }
            }
          }
          if( Object.prototype.toString.call( res ) == "[object Array]" ) {
            res.arrayResult = true;
          }
          nstack.push( res );
        }
        else if( type_ === TFUNCALL || type_ === MSGSUBST || type_ === ARGLIST ) {
          n1 = nstack.pop();
          f = nstack.pop();
          if( type_ === MSGSUBST ) { // find first occurrence of {<int value>} in f and replace with n1 then push result
            if( f instanceof NullReturn ) {
              res = "??" + f.varName + "_" + thymol.locale.value + "??";
            }
            else {
              res = thymol.ThUtils.renderMessage( f, n1 );
            }
            nstack.push( res );
          }
          else if( type_ === ARGLIST ) {
            var pathMatch = false;
            n2 = nstack.pop();
            if( typeof n2 === "undefined" ) {
              n2 = f;
              f = n1;
              n1 = "";
            }
            if( !!item.meta_ ) {
              if( !!item.meta_.paths ) {
                var values = item.meta_.paths[ f ];
                if( !!values ) {
                  values.push( n1 );
                  pathMatch = true;
                }
                for( var j in item.meta_.paths ) {
                  if( item.meta_.paths.hasOwnProperty( j ) ) {
                    var values = item.meta_.paths[ j ];
                    var isReq = ( n2.indexOf( "?" ) >= 0 );
                    if( !!values && values.length > 0 ) {
                      var pathVar = "{" + j + "}";
                      var repReg = new RegExp( pathVar, "g" );
                      var rep = "";
                      values.reverse();
                      for( var k = 0, kLimit = values.length; k < kLimit; k++ ) {
                        if( rep.length > 0 ) {
                          rep = rep + ",";
                        }
                        if( isReq ) {
                          rep = rep + thymol.ThUtils.getRequestEncoded( values[ k ] );
                        }
                        else {
                          rep = rep + encodeURIComponent( values[ k ] );
                        }
                      }
                      n2 = n2.replace( repReg, rep );
                    }
                  }
                }
              }
            }
            if( pathMatch ) {
              res = n2;
            }
            else {
              if( typeof f === "undefined" || f instanceof NullReturn ) {
                f = "";
              }
              else {
                f = f.toString();
              }
              f = thymol.ThUtils.getRequestEncoded( f );
              f = "?" + f;
              n1 = n1.toString();
              if( f != "?" && n1 != "" ) {
                f = f + "=";
              }
              if( n1 != "" ) {
                n1 = thymol.ThUtils.getRequestEncoded( n1 );
                f = f + n1;
              }
              if( typeof n2 === "undefined" || n2 instanceof NullReturn ) {
                n2 = "";
              }
              else {
                n2 = n2.toString();
              }
              res = n2 + f;
            }
            if( !!item.meta_ ) {
              var separator = ( res.indexOf( "?" ) >= 0 ) ? "&" : "?";
              for( var j in item.meta_.params ) {
                if( item.meta_.params.hasOwnProperty( j ) ) {
                  var values = item.meta_.params[ j ];
                  if( !!values && values.length > 0 ) {
                    for( var k = 0, kLimit = values.length; k < kLimit; k++ ) {
                      res = res + separator + thymol.ThUtils.getRequestEncoded( j ) + "=" + thymol.ThUtils.getRequestEncoded( values[ k ] );
                      if( k == 0 ) {
                        separator = "&";
                      }
                    }
                  }
                }
              }
              if( !!item.meta_.urlFragment ) {
                res = res + item.meta_.urlFragment;
              }
            }
            nstack.push( res );
          }
          else if( f.apply && f.call ) {
            if( !!n1 && !!n1.isDirect ) {
              res = f.call( n1 );
            }
            else {
              if( n1 instanceof NullReturn ) {
                n1 = null;
              }
              if( n1 != null && ( n1.arrayResult || Object.prototype.toString.call( n1 ) !== "[object Array]" ) ) {
                res = f.call( element, n1 ); // Accepts an argument list
              }
              else {
                res = f.apply( element, n1 ); // Accepts a single array of arguments.
              }
            }
            if( res instanceof String ) {
              if( res.precision ) {
                if( typeof this.precision === "undefined" || res.precision > this.precision ) {
                  this.precision = res.precision;
                }
              }
              res = res.toString();
            }
            else if( Object.prototype.toString.call( res ) == "[object Array]" ) {
              res.arrayResult = true;
            }
            nstack.push( res );
          }
          else {
            if( !element.isBlockChild ) {
              throw new thymol.ThError( f + " is not a function", element );
            }
          }
        }
        else {
          if( !element.isBlockChild ) {
            throw new thymol.ThError( "invalid expression item type: " + type_, element );
          }
        }
      }
      if( nstack.length > 1 ) {
        if( !element.isBlockChild ) {
          throw new thymol.ThError( "invalid Expression (parity)", element );
        }
      }
      result = nstack[ 0 ];
      return result;
    },

    updatePrecision : function( val ) {
      if( typeof val === "number" ) {
        var p = thymol.ThUtils.getDecimalDigits( val );
        if( typeof this.precision === "undefined" || p > this.precision ) {
          this.precision = p;
        }
      }
    }

  };

  function add( a, b ) {
    return a + b;
  }
  function assign( a ) {
    return a;
  }
  function sub( a, b ) {
    return a - b;
  }
  function mul( a, b ) {
    return a * b;
  }
  function div( a, b ) {
    return a / b;
  }
  function mod( a, b ) {
    return a % b;
  }
  function concat( a, b ) {
    return "" + a + b;
  }
  function neg( a ) {
    return -a;
  }
  function not( a ) {
    var v = thymol.getBooleanValue( a );
    return !v;
  }
  function random( a ) {
    return Math.random() * ( a || 1 );
  }
  function fac( a ) { // a!
    var aa = Math.floor( a );
    var b = aa;
    while( aa > 1 ) {
      b = b * ( --aa );
    }
    return b;
  }
  function append( a, b ) {
    if( a != null ) {
      if( a.arrayResult === true || Object.prototype.toString.call( a ) != "[object Array]" ) {
        return [ a, b ];
      }
    }
    else {
      if( b != null ) {
        if( b.arrayResult === true || Object.prototype.toString.call( b ) != "[object Array]" ) {
          return [ a, b ];
        }
        return b;
      }
      return null;
    }
    var aa = a.slice();
    aa.push( b );
    return aa;
  }
  function equal( a, b ) {
    return a == b;
  }
  function notEqual( a, b ) {
    return a != b;
  }
  function gt( a, b ) {
    return a > b;
  }
  function ge( a, b ) {
    return a >= b;
  }
  function lt( a, b ) {
    return a < b;
  }
  function le( a, b ) {
    return a <= b;
  }
  function and( a, b ) {
    return a && b;
  }
  function or( a, b ) {
    return a || b;
  }
  function dot( a, b ) {
    return a[ b ];
  }
  function binary( a, b ) {
    return a ? b : null;
  }
  function elvis( a, b ) {
    return a != null ? a : b;
  }

  function getStr( pos, expression, mode, partial, preprocessed ) {
    var localMode = mode;
    var s = "";
    var c = expression.charAt( pos );
    var start = pos + 1;
    var end = expression.length;
    var stopChar = c;
    if( localMode === 4 || c === '#' ) {
      stopChar = '}';
      localMode = 4;
    }
    var i = start;
    var inCurly = false;
    var curlyPos = null;
    var urlFragPos = -1;
    var meta = null;
    if( localMode !== 4 && c !== '\'' && c !== '"' ) {
      for( ; i <= end; i++ ) {
        if( c.toUpperCase() === c.toLowerCase() ) {
          if( c === '{' ) {
            inCurly = true;
            curlyPos = i;
            if( meta === null ) {
              meta = {};
              meta.paths = [];
            }
          }
          else if( mode === 2 && c === '#' ) {
            urlFragPos = i;
          }
          if( i === pos || ( !inCurly && c === '}' ) || ( c !== '_' && c !== '?' && c !== ':' && ( c < '0' || c > '9' ) ) ) {
            if( ! ( partial && c == '-' ) && ! ( ( mode === 2 || mode === 6 ) && ( c === '/' || c === '.' || c === '~' || c === '?' || c === '=' || c === ':' || c === '-' || c === '_' || c === '[' || c === ']' || c === '#' || ( inCurly && c === '{' ) || ( inCurly && c === '}' ) ) ) || ( mode === 6 && ( c === '=' ) ) ) {
              i = i - 1;
              break;
            }
          }
          if( inCurly && c === '}' ) {
            inCurly = false;
            if( meta === null ) {
              var message = "bad path variable definition in expression: \"" + expression + "\" near column " + pos;
              throw new thymol.ThError( message, element );
            }
            var curlyVar = expression.substring( curlyPos, i - 1 );
            var values = [];
            meta.paths[ curlyVar ] = values;
          }
        }
        s += c;
        c = expression.charAt( i );
      }
      if( urlFragPos >= 0 ) {
        var urlFrag = expression.substring( urlFragPos - 1, i );
        s = s.substring( 0, s.length - urlFrag.length );
        if( meta === null ) {
          meta = {};
          meta.urlFragment = urlFrag;
        }
      }
    }
    else {
      var quoted = false;
      var preprocessing = false;
      if( c === '\'' || c === '"' ) {
        quoted = true;
        stopChar = c;
      }
      while( i <= end ) {
        if( c === stopChar && i > start && !preprocessing ) {
          if( localMode !== 4 || quoted ) {
            s += c;
          }
          else {
            i = i - 1;
          }
          break;
        }
        var nc = expression.charAt( i );
        if( c === "_" && nc === "_" && !preprocessed ) {
          preprocessing = !preprocessing;
        }
        if( c === '\\' ) {
          if( nc === '\'' && s.charAt( s.length - 1 ) !== '\\' ) { // previously appended '\' escapes this one!
            c = "&#39;";
            if( i + 1 > end ) {
              break;
            }
            i = i + 1;
            nc = expression.charAt( i );
          }
        }
        if( !quoted ) {
          if( c === '.' ) {
            var exp = thymol.thExpressionObjects[ s ];
            if( typeof exp !== "undefined" && exp !== null ) {
              i -= 1;
              break;
            }

          }
          if( c === '(' ) { // Parameterised message?
            i -= 1;
            break;
          }
        }
        s += c;
        if( i + 1 > end ) {
          break;
        }
        i = i + 1;
        c = nc;
      }
    }
    var str = new Object();
    str.str = s;
    str.pos = i;
    if( meta !== null ) {
      str.meta = meta;
    }
    return str;
  }

  function ThParser() {
    this.precision;
    this.success = false;
    this.errormsg = "";
    this.expression = "";

    this.pos = 0;

    this.tokennumber = 0;
    this.tokenprio = 0;
    this.tokenindex = 0;
    this.tmpprio = 0;

    this.ops1 = {
      "sin" : Math.sin,
      "cos" : Math.cos,
      "tan" : Math.tan,
      "asin" : Math.asin,
      "acos" : Math.acos,
      "atan" : Math.atan,
      "sqrt" : Math.sqrt,
      "log" : Math.log,
      "abs" : Math.abs,
      "ceil" : Math.ceil,
      "floor" : Math.floor,
      "round" : Math.round,
      "-" : neg,
      "!" : not,
      "not" : not,
      "exp" : Math.exp,
      "=" : assign
    };

    this.ops2 = {
      "?" : binary,
      ":" : elvis, // Good isn't it?
      "?:" : elvis,
      "+" : add,
      "-" : sub,
      "*" : mul,
      "/" : div,
      "%" : mod,
      "^" : Math.pow,
      "," : append,
      "||" : concat,
      "==" : equal,
      "eq" : equal,
      "!=" : notEqual,
      "ne" : notEqual,
      "neq" : notEqual,
      "div" : div,
      "mod" : mod,
      "and" : and,
      "or" : or,
      ">" : gt,
      "gt" : gt,
      ">=" : ge,
      "=>" : ge,
      "ge" : ge,
      "<" : lt,
      "lt" : lt,
      "<=" : le,
      "=<" : le,
      "le" : le,
      "." : dot,
      "[" : dot
    };

    this.functions = {
      "random" : random,
      "fac" : fac,
      "min" : Math.min,
      "max" : Math.max,
      "pow" : Math.pow
    };

    this.consts = {
      "E" : Math.E,
      "PI" : Math.PI
    };
  }

  ThParser.parse = function( expr, partial, preprocessed ) {
    return new thymol.ThParser().parse( expr, partial, preprocessed );
  };

  ThParser.evaluate = function( expr, partial, element ) {
    return thymol.ThParser.parse( expr, partial, false ).evaluate( element );
  };

  ThParser.Expression = Expression;

  ThParser.values = {
    sin : Math.sin,
    cos : Math.cos,
    tan : Math.tan,
    asin : Math.asin,
    acos : Math.acos,
    atan : Math.atan,
    sqrt : Math.sqrt,
    log : Math.log,
    abs : Math.abs,
    ceil : Math.ceil,
    floor : Math.floor,
    round : Math.round,
    random : random,
    fac : fac,
    exp : Math.exp,
    min : Math.min,
    max : Math.max,
    pow : Math.pow,
    E : Math.E,
    PI : Math.PI
  };

  var PRIMARY = 1 << 0;
  var OPERATOR = 1 << 1;
  var FUNCTION = 1 << 2;
  var LPAREN = 1 << 3;
  var RPAREN = 1 << 4;
  var COMMA = 1 << 5;
  var SIGN = 1 << 6;
  var CALL = 1 << 7;
  var NULLARY_CALL = 1 << 8;
  var LBRACK = 1 << 9;
  var RBRACK = 1 << 10;
  var LVARBRK = 1 << 11;
  var RVARBRK = 1 << 11;
  var OPTION = 1 << 12;
  var ASSIGN = 1 << 13;

  ThParser.prototype = {

    parse : function( expr, partial, preprocessed ) {
      this.errormsg = "";
      this.success = true;
      var operstack = [];
      var tokenstack = [];
      var modestack = [];
      this.tmpprio = 0;
      var expected = ( PRIMARY | LPAREN | LVARBRK | FUNCTION | OPERATOR | SIGN | OPTION );
      var noperators = 0;
      this.expression = expr;
      this.pos = 0;
      this.mode = 0;

      // mode has the following meanings
      // mode 2 => standard URL
      // mode 3 => local object
      // mode 4 => message body
      // mode 5 => message substitution
      // mode 6 => argument list
      // mode 7 => conversion service

      while( this.pos < this.expression.length ) {
        if( this.isWhite() ) {
          // Do nothing
        }
        else if( this.isOperator() ) {
          if( this.isSign() && ( expected & SIGN ) ) {
            if( this.isNegativeSign() ) {
              this.tokenprio = 6;
              this.tokenindex = "-";
              noperators++;
              this.addfunc( tokenstack, operstack, TOP1 );
            }
            expected = ( PRIMARY | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION );
          }
          else if( this.isAssign() && ( expected & ASSIGN ) ) {
            noperators++;
            expected = ( PRIMARY | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION );
          }
          else if( this.isComment() ) {
            // Do nothing
          }
          else {
            if( this.tokenindex == "!" ) {
              if( ( expected & SIGN ) === 0 ) {
                this.error_parsing( this.pos, "unexpected sign" );
              }
              noperators += 1;
              this.addfunc( tokenstack, operstack, TOP1 );
            }
            else {
              if( ( expected & OPERATOR ) === 0 ) {
                this.error_parsing( this.pos, "unexpected operator" );
              }
              noperators += 2;
              this.addfunc( tokenstack, operstack, TOP2 );
            }
            if( this.expression.charAt( this.pos - 1 ) === "[" ) {
              this.tmpprio += 20;
            }
            expected = ( PRIMARY | OPERATOR | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION );
          }
        }
        else if( this.isNumber() ) {
          if( ( expected & PRIMARY ) === 0 ) {
            this.error_parsing( this.pos, "unexpected number" );
          }
          var token = new Token( TNUMBER, 0, 0, this.tokennumber );
          tokenstack.push( token );

          expected = ( OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA );
        }
        else if( this.isLeftParenth() ) {
          if( ( expected & LPAREN ) === 0 ) {
            this.error_parsing( this.pos, "unexpected \"(\"" );
          }
          modestack.push( this.mode );
          if( expected & CALL ) {
            noperators += 2;
            this.tokenprio = -2;
            this.tokenindex = -1;
            this.tmpprio += 2;
            var ft = TFUNCALL;
            if( this.mode === 4 ) {
              ft = MSGSUBST;
              this.mode = 5;
            }
            else if( this.mode === 2 ) {
              ft = ARGLIST;
              this.mode = 6;
              var url = tokenstack[ tokenstack.length - 1 ];
              if( !url.meta_ ) {
                url.meta_ = {};
              }
              this.meta = url.meta_;
            }
            else {
              this.mode = 5;
            }
            this.addfunc( tokenstack, operstack, ft );
            this.tmpprio -= 2;
          }
          if( this.mode === 5 || this.mode === 6 ) {
            this.tmpprio += 10;
          }
          expected = ( PRIMARY | OPERATOR | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION | NULLARY_CALL );
        }
        else if( this.isRightParenth() ) {
          if( expected & NULLARY_CALL ) {
            var token = new Token( TNUMBER, 0, 0, [] );
            tokenstack.push( token );
          }
          else if( ( expected & RPAREN ) === 0 ) {
            this.error_parsing( this.pos, "unexpected \")\"" );
          }

          if( this.mode === 5 || this.mode === 6 ) {
            this.tmpprio -= 10;
          }
          this.mode = modestack.pop();
          expected = ( OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | LVARBRK | CALL | OPTION );
        }
        else if( this.isRightBracket() ) {
          if( ( expected & RBRACK ) === 0 ) {
            this.error_parsing( this.pos, "unexpected \"]\"" );
          }
          expected = ( OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | LVARBRK | CALL | OPTION );
        }
        else if( this.isLeftVarBrk( modestack ) ) {
          if( ( expected & LVARBRK ) === 0 ) {
            this.error_parsing( this.pos, "unexpected \"{\"" );
          }
          noperators += 1;
          this.addfunc( tokenstack, operstack, TOP1 );
          expected = ( PRIMARY | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION );
        }
        else if( this.isRightVarBrk() ) {
          if( ( expected & RVARBRK ) === 0 ) {
            this.error_parsing( this.pos, "unexpected \"}\"" );
          }
          this.mode = modestack.pop();
          expected = ( FUNCTION | OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | LVARBRK | CALL | OPTION );
        }
        else if( this.isLeftCurly() ) {
          if( this.mode == 1 || this.mode == 2 || this.mode == 3 || this.mode == 4 ) {
            modestack.push( this.mode );
            this.mode = 7;
          }
          else {
            this.error_parsing( this.pos, "unexpected \"{\"" );
          }
        }
        else if( this.isRightCurly() ) {
          if( this.mode == 7 ) {
            this.mode = modestack.pop();
          }
          else {
            this.error_parsing( this.pos, "unexpected \"}\"" );
          }
        }
        else if( this.isComma() ) {
          if( ( expected & COMMA ) === 0 ) {
            this.error_parsing( this.pos, "unexpected \",\"" );
          }
          if( !!partial ) {
            break;
          }
          if( this.mode === 5 || this.mode === 6 ) {
            this.tmpprio -= 10;
          }
          this.tmpprio += 2;
          this.addfunc( tokenstack, operstack, TOP2 );
          this.tmpprio -= 2;

          if( this.mode === 5 || this.mode === 6 ) {
            this.tmpprio += 10;
          }

          noperators += 2;
          expected = ( PRIMARY | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION );
        }
        else if( this.isConst() ) {
          if( ( expected & PRIMARY ) === 0 ) {
            this.error_parsing( this.pos, "unexpected constant" );
          }
          var consttoken = new Token( TNUMBER, 0, 0, this.tokennumber );
          tokenstack.push( consttoken );
          expected = ( OPERATOR | RPAREN | RVARBRK | RBRACK | COMMA );
        }
        else {
          var str = getStr( this.pos, this.expression, this.mode, partial, preprocessed );
          if( this.isOpX( str, this.ops2 ) && ( this.mode !== 2 && "/" !== str ) ) {
            if( ( "and" === str.str ) || ( "or" === str.str ) ) {
              this.tokenprio = 3;
            }
            if( ( expected & OPERATOR ) === 0 ) {
              this.error_parsing( this.pos, "unexpected binary operator" );
            }
            this.addfunc( tokenstack, operstack, TOP2 );
            noperators += 2;
            expected = ( PRIMARY | LPAREN | LVARBRK | FUNCTION | OPERATOR | SIGN | OPTION );
          }
          else if( this.isOpX( str, this.ops1 ) ) {
            if( ( expected & OPERATOR ) === 0 ) {
              this.error_parsing( this.pos, "unexpected unary operator" );
            }
            this.addfunc( tokenstack, operstack, TOP1 );
            noperators++;
            expected = ( PRIMARY | LPAREN | LVARBRK | FUNCTION );
          }
          else if( this.isLiteralValue( str ) ) {
            if( ( expected & PRIMARY ) === 0 ) {
              this.error_parsing( this.pos, "unexpected literal value" );
            }
            var token = new Token( TNUMBER, 0, 0, this.tokennumber );
            tokenstack.push( token );
            expected = ( FUNCTION | OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | RVARBRK | LBRACK | CALL | OPTION );
            if( this.mode === 6 ) {
              expected = expected | ASSIGN;
            }
          }
          else if( this.isVar( str ) ) {
            if( ( expected & PRIMARY ) === 0 ) {
              this.error_parsing( this.pos, "unexpected variable" );
            }
            var vartoken = new Token( TVAR, this.tokenindex, 0, 0, this.mode, str.meta );
            tokenstack.push( vartoken );
            expected = ( FUNCTION | OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | RVARBRK | LBRACK | CALL | OPTION | ASSIGN );
          }
          else {
            if( this.errormsg === "" ) {
              this.error_parsing( this.pos, "unknown character" );
            }
            else {
              this.error_parsing( this.pos, this.errormsg );
            }
          }
        }
      }
      if( this.tmpprio < 0 || this.tmpprio >= 10 ) {
        this.error_parsing( this.pos, "unmatched \"() or []\"" );
      }
      while( operstack.length > 0 ) {
        var tmp = operstack.pop();
        tokenstack.push( tmp );
      }
      if( noperators + 1 !== tokenstack.length ) {
        this.error_parsing( this.pos, "parity" );
      }
      var res = new Expression( tokenstack, object( this.ops1 ), object( this.ops2 ), object( this.functions ), this.precision, this.pos );
      return res;
    },

    evaluate : function( expr, element ) {
      return this.parse( expr ).evaluate( element );
    },

    error_parsing : function( column, msg ) {
      this.success = false;
      this.errormsg = "parse error [column " + ( column ) + "]: " + msg;
      throw new Error( this.errormsg );
    },

    // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    addfunc : function( tokenstack, operstack, type_ ) {
      var operator = new Token( type_, this.tokenindex, this.tokenprio + this.tmpprio, 0, this.mode, this.meta );
      while( operstack.length > 0 ) {
        if( operator.prio_ <= operstack[ operstack.length - 1 ].prio_ ) {
          tokenstack.push( operstack.pop() );
        }
        else {
          break;
        }
      }
      operstack.push( operator );
    },

    isNumber : function() {
      var r = false;
      var str = "";
      var prec = -1;
      while( this.pos < this.expression.length ) {
        var code = this.expression.charCodeAt( this.pos );
        if( ( code >= 48 && code <= 57 ) || code === 46 ) { // 48 = '0', 57 = '9', 46 = '.'
          str += this.expression.charAt( this.pos );
          if( prec >= 0 || code === 46 ) {
            prec++;
          }
          this.pos++;
          r = true;
        }
        else {
          break;
        }
      }
      if( r ) {
        if( prec >= 0 && ( typeof this.precision === "undefined" || prec > this.precision ) ) {
          this.precision = prec;
        }
        this.tokennumber = parseFloat( str );
      }
      return r;
    },

    isConst : function() {
      var str;
      for( var i in this.consts ) {
        if( true ) {
          var L = i.length;
          str = this.expression.substr( this.pos, L );
          if( i === str ) {
            this.tokennumber = this.consts[ i ];
            this.pos += L;
            return true;
          }
        }
      }
      return false;
    },

    isOperator : function() {
      var ch = this.expression.charAt( this.pos );
      if( ch === "+" ) {
        this.tokenprio = 0;
        this.tokenindex = "+";
      }
      else if( ch === "-" ) {
        this.tokenprio = 0;
        this.tokenindex = "-";
      }
      else if( ch === "|" ) {
        if( this.expression.charAt( this.pos + 1 ) === "|" ) {
          this.pos++;
          this.tokenprio = 0;
          this.tokenindex = "||";
        }
        else {
          return false;
        }
      }
      else if( ch === "*" ) {
        if( this.expression.charAt( this.pos + 1 ) === "{" ) {
          return false;
        }
        this.tokenprio = 1;
        this.tokenindex = "*";
      }
      else if( ch === "/" && this.mode != 2 && this.pos > 0 ) {
        this.tokenprio = 2;
        this.tokenindex = "/";
      }
      else if( ch === "%" ) {
        this.tokenprio = 2;
        this.tokenindex = "%";
      }
      else if( ch === "^" ) {
        this.tokenprio = 3;
        this.tokenindex = "^";
      }
      else if( ch === "=" || ch === "!" ) {
        if( this.expression.charAt( this.pos + 1 ) === "=" ) {
          if( ch === "=" ) {
            this.tokenindex = "==";
          }
          else if( ch === "!" ) {
            this.tokenindex = "!=";
          }
          else {
            return false;
          }
          this.pos++;
          this.tokenprio = 6;
        }
        else if( ch === "!" ) {
          this.tokenprio = 7;
          this.tokenindex = "!";
        }
        else if( ch === "=" ) {
          this.tokenindex = "=";
        }
        else {
          return false;
        }
      }
      else if( ch === "<" ) {
        if( this.expression.charAt( this.pos + 1 ) === "=" ) {
          this.tokenindex = "<=";
          this.pos++;
        }
        else {
          this.tokenindex = "<";
        }
        this.tokenprio = 4;
      }
      else if( ch === ">" ) {
        if( this.expression.charAt( this.pos + 1 ) === "=" ) {
          this.tokenindex = ">=";
          this.pos++;
        }
        else {
          this.tokenindex = ">";
        }
        this.tokenprio = 4;
      }
      else if( ch === "." || ch === "[" ) {
        this.tokenprio = 10;
        this.tokenindex = ".";
      }
      else {
        return false;
      }
      this.pos++;
      return true;
    },

    isRightBracket : function() {
      var code = this.expression.charCodeAt( this.pos );
      if( code === 93 ) { // )
        this.pos++;
        this.tmpprio -= 20;
        return true;
      }
      return false;
    },

    isSign : function() {
      var code = this.expression.charCodeAt( this.pos - 1 );
      if( code === 45 || code === 43 ) { // - or +
        return true;
      }
      return false;
    },

    isAssign : function() {
      var code = this.expression.charCodeAt( this.pos - 1 );
      if( code === 61 ) { // =
        var cha = this.expression.charAt( this.pos - 2 );
        if( cha === '!' || cha === '>' || cha === '<' || cha === '=' ) {
          return false;
        }
        cha = this.expression.charAt( this.pos );
        if( cha === '>' || cha === '<' || cha === '=' ) {
          return false;
        }
        return true;
      }
      return false;
    },

    isPositiveSign : function() {
      var code = this.expression.charCodeAt( this.pos - 1 );
      if( code === 43 ) { // +
        return true;
      }
      return false;
    },

    isNegativeSign : function() {
      var code = this.expression.charCodeAt( this.pos - 1 );
      if( code === 45 ) { // -
        return true;
      }
      return false;
    },

    isLeftParenth : function() {
      var code = this.expression.charCodeAt( this.pos );
      if( code === 40 ) { // (
        this.pos++;
        this.tmpprio += 10;
        // this.tmpprio += 12;
        // this.tokenprio = 0;
        return true;
      }
      return false;
    },

    isRightParenth : function() {
      var code = this.expression.charCodeAt( this.pos );
      if( code === 41 ) { // )
        this.pos++;
        this.tmpprio -= 10;
        return true;
      }
      return false;
    },

    isLeftCurly : function() {
      var code = this.expression.charCodeAt( this.pos );
      if( code === 123 ) { // {
        this.pos++;
        this.tmpprio += 10;
        return true;
      }
      return false;
    },

    isRightCurly : function() {
      var code = this.expression.charCodeAt( this.pos );
      if( code === 125 ) { // }
        this.pos++;
        this.tmpprio -= 10;
        return true;
      }
      return false;
    },

    isComma : function() {
      var code = this.expression.charCodeAt( this.pos );
      if( code === 44 ) { // ,
        this.pos++;
        this.tokenprio = -1;
        // this.tokenprio = -4;
        this.tokenindex = ",";
        return true;
      }
      return false;
    },

    isWhite : function() {
      var code = this.expression.charCodeAt( this.pos );
      if( code === 32 || code === 9 || code === 10 || code === 13 ) { // space, tab, cr or lf
        this.pos++;
        return true;
      }
      return false;
    },

    // Variable Expressions: ${...}
    // Selection Variable Expressions: *{...}
    // Message Expressions: #{...}
    // Link URL Expressions: @{...}

    isLeftVarBrk : function( modestack ) {
      var pp = this.pos, ch = this.expression.charAt( pp );
      if( ch === "$" || ch === "@" || ch === "*" || ch === "#" ) {
        pp++;
        var ch2 = this.expression.charAt( pp );
        if( ch2 === "{" ) {
          pp++;
          this.tmpprio += 10;
          this.tokenprio = -4;
          var oldMode = this.mode;
          modestack.push( oldMode );
          if( ch === "$" ) {
            this.mode = 1;
          }
          else if( ch === "@" ) {
            this.mode = 2;
          }
          else if( ch === "*" ) {
            this.mode = 3;
          }
          else if( ch === "#" ) {
            this.mode = 4;
          }
          this.tokenindex = '{';
          this.pos = pp;
          return true;
        }
      }
      return false;
    },

    isRightVarBrk : function() { // }
      var code = this.expression.charCodeAt( this.pos );
      if( code === 125 ) { // )
        this.pos++;
        this.tmpprio -= 10;
        return true;
      }
      return false;
    },

    isOpX : function( str, group ) {
      if( str.str.length > 0 ) {
        if( str.str in new Object() ) { // Don't match native Object function names like "toString" - there aren't any in ops2 (yet!)
          return false;
        }
        if( str.str in group ) {
          this.tokenindex = str.str;
          this.tokenprio = 5;
          this.pos = str.pos;
          return true;
        }
      }
      return false;
    },

    isLiteralValue : function( str ) {
      if( typeof str.str === "string" ) {
        var first = str.str.charAt( 0 );
        var last = str.str.charAt( str.str.length - 1 );
        if( ( first == '\'' && last == '\'' ) || ( first == '"' && last == '"' ) ) {
          this.tokennumber = str.str.substring( 1, str.str.length - 1 );
          this.pos = str.pos;
          return true;
        }
      }
      return false;
    },

    isVar : function( str ) {
      if( str.str.length > 0 ) {
        this.tokenindex = str.str;
        this.tokenprio = 4;
        this.pos = str.pos;
        return true;
      }
      return false;
    },

    isComment : function() {
      var code = this.expression.charCodeAt( this.pos - 1 );
      if( code === 47 && this.expression.charCodeAt( this.pos ) === 42 ) {
        this.pos = this.expression.indexOf( "*/", this.pos ) + 2;
        if( this.pos === 1 ) {
          this.pos = this.expression.length;
        }
        return true;
      }
      return false;
    }
  };

  return ThParser;

} )();