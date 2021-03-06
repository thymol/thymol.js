/*-------------------- Thymol - the flavour of Thymeleaf --------------------*

   Thymol version ${thymolVersion} Copyright (C) 2012-2017 James J. Benson.
   jjbenson .AT. users.sf.net (http://www.thymoljs.org/)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" basis,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either expressed or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

 *---------------------------------------------------------------------------*/

thymol = function() {

/*

https://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core.html#ID-1950641247
  
  // NodeType
  const unsigned short      ELEMENT_NODE       = 1;
  const unsigned short      ATTRIBUTE_NODE     = 2;
  const unsigned short      TEXT_NODE          = 3;
  const unsigned short      CDATA_SECTION_NODE = 4;
  const unsigned short      ENTITY_REFERENCE_NODE = 5;
  const unsigned short      ENTITY_NODE        = 6;
  const unsigned short      PROCESSING_INSTRUCTION_NODE = 7;
  const unsigned short      COMMENT_NODE       = 8;
  const unsigned short      DOCUMENT_NODE      = 9;
  const unsigned short      DOCUMENT_TYPE_NODE = 10;
  const unsigned short      DOCUMENT_FRAGMENT_NODE = 11;
  const unsigned short      NOTATION_NODE      = 12;
    
    
 
    From https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html#Traversal-NodeFilter

  // Constants returned by acceptNode
  const short               FILTER_ACCEPT                  = 1;
  const short               FILTER_REJECT                  = 2;
  const short               FILTER_SKIP                    = 3;


  // Constants for whatToShow
  const unsigned long       SHOW_ALL                       = 0xFFFFFFFF;
  const unsigned long       SHOW_ELEMENT                   = 0x00000001;
  const unsigned long       SHOW_ATTRIBUTE                 = 0x00000002;
  const unsigned long       SHOW_TEXT                      = 0x00000004;
  const unsigned long       SHOW_CDATA_SECTION             = 0x00000008;
  const unsigned long       SHOW_ENTITY_REFERENCE          = 0x00000010;
  const unsigned long       SHOW_ENTITY                    = 0x00000020;
  const unsigned long       SHOW_PROCESSING_INSTRUCTION    = 0x00000040;
  const unsigned long       SHOW_COMMENT                   = 0x00000080;
  const unsigned long       SHOW_DOCUMENT                  = 0x00000100;
  const unsigned long       SHOW_DOCUMENT_TYPE             = 0x00000200;
  const unsigned long       SHOW_DOCUMENT_FRAGMENT         = 0x00000400;
  const unsigned long       SHOW_NOTATION                  = 0x00000800;  
*/  

  const ELEMENT_NODE = 1;
  const TEXT_NODE = 3;
  const COMMENT_NODE = 8;
  const DOCUMENT_NODE = 9;
  const DOCUMENT_TYPE_NODE = 10;
  const DOCUMENT_FRAGMENT_NODE = 11;
  
  const FILTER_ACCEPT = 1;
  const FILTER_REJECT = 2;

  const SHOW_ALL = -1;
  const SHOW_TEXT = 4;  
  const SHOW_COMMENT = 128;
    
  // Version data
  thymol.thVersion = "${thymolVersion}";
  thymol.thReleaseDate = "${thymolReleaseDate}";
  thymol.thURL = "http://www.thymoljs.org";
  thymol.thAltURL = "http://www.thymeleaf.org";

  // For internal use
  thymol.thUsingNullPrefix = false;
  thymol.thThymeleafPrefixList = [];
  thymol.thDisabledList = [];
  thymol.thThymeleafElementsList = [];

  thymol.objects = {};
  thymol.varParExpr = /([^(]*)\s*[(]([^)]*?)[)]/;
  
  const 
  	varRefExpr = /([$#]{.*?})/,
  	literalTokenExpr = /^[a-zA-Z0-9\[\]\.\-_]*$/,
  	startParserLevelCommentExpr = /^\s*\/\*\s*$/,
  	endParserLevelCommentExpr = /^\s*\*\/\s*$/,
  	startParserLevelCommentExpr2 = /^\/\*[^\/].*/,
  	endParserLevelCommentExpr2 = /.*[^\/]\*\/$/,
  	prototypeOnlyCommentEscpExpr = /\/\*\/(.*)\/\*\//, 
  	varExpr3 = /[^\$\*#@]{1}\{(.*)\}$/, // Retain the content
  	nonURLExpr = /[\$\*#]{1}\{(?:!?[^}]*)\}/,
  	numericExpr = /^[+\-]?[0-9]*?[.]?[0-9]*?$/,
  	domSelectExpr = /([\/]{1,2})?([A-Za-z0-9_\-]*(?:[\(][\)])?)?([^\[]\S[A-Za-z0-9_\-]*(?:[\(][\)])?[\/]*(?:[\.\/#]?[^\[]\S[A-Za-z0-9_\-]*(?:[\(][\)])?[\/]*)*)?([\[][^\]]*?[\]])?/,
  	litSubstExpr = /\.*?([\|][^\|]*?[\|])\.*?/;

  function Thymol() {
    // Empty apart from this!
  }
  
  function isClientSide() {
    if( (typeof thymol.isServerSide !== "undefined" ) && !!thymol.isServerSide() ) {
      thymol.isClientSide = function() {
        return false;
      };
      return false;
    }
    thymol.isClientSide = function() {
      return true;
    };
    return true;
  }
  
  function execute( doc ) {
    if( typeof thymol.protocol === "undefined" ) {
      thymol.protocol = "";
    }
    if( typeof thymol.root === "undefined" ) {
      thymol.root = "";
    }
    if( typeof thymol.path === "undefined" ) {
      thymol.path = "";
    }
    thymol.thDocument = doc;
    var theWindow = thymol.thWindow;
    if( typeof thymol.thWindow === "undefined" ) {
      if( typeof doc.defaultView !== "undefined" ) {
        theWindow = doc.defaultView;
      }
      else if( typeof doc.parentWindow !== "undefined" ) {
        theWindow = doc.parentWindow;
      }
    }
    thymol.thWindow = theWindow;
    var theTop = thymol.thTop;
    if( typeof thymol.thTop === "undefined" ) {
      if( typeof top !== "undefined" ) {
        theTop = top;
      }
    }
    thymol.thTop = theTop;

    thymol.init();
    Thymol.prototype.process( thymol.thDocument );
    postExecute();
    return thymol.thDocument;
  }

  function reset() {
    
    thymol.thFileCache = {};
    thymol.thFragmentCache = {};

    var accessor = undefined, i, iLimit, j, jLimit;

    if( typeof thVars !== "undefined" ) {
      delete thVars;
    }    
    thVars = [];
    accessor = new thymol.ThVarsAccessor( thVars, "thVars" );

    if( typeof thDisable !== "undefined" ) {
      delete thDisable;
    }    
    
    if( !!thymol.applicationContext ) {
      delete thymol.applicationContext;
    }
    thymol.applicationContext = thymol.makeContext("application", accessor);

    if( !!thymol.booleanAndNullTokens ) {
      delete thymol.booleanAndNullTokens;
    }
    thymol.booleanAndNullTokens = new Array();
    thymol.booleanAndNullTokens[ "null" ] = thymol.applicationContext.createVariable( "null", null );
    thymol.booleanAndNullTokens[ "true" ] = thymol.applicationContext.createVariable( "true", true );
    thymol.booleanAndNullTokens[ "false" ] = thymol.applicationContext.createVariable( "false", false );
   
    
    var theTop = thymol.thTop;
    if( typeof thymol.thTop === "undefined" ) {
      if( typeof top !== "undefined" ) {
        theTop = top;
      }
    }
    thymol.thTop = theTop;    

    if( !!thymol.sessionContext ) {
      delete thymol.sessionContext;
    }    
    thymol.sessionContext = thymol.makeContext( "session", undefined );
    thymol.sessionContext.persist = function() { // Only decorate the session context with persist
      var save = thymol.sessionContext.serialise();
      thymol.thTop.name = save;
    };
    
    if( !!thymol.requestContext ) {
      delete thymol.requestContext;
    }
    thymol.requestContext = thymol.makeContext( "request", undefined );
    
    thymol.thExpressionObjects = {};
    
    thymol.thExpressionObjects[ "#object" ] = {};
    thymol.thExpressionObjects[ "#locale" ] = {};

    thymol.thExpressionObjects[ "#ctx" ] = [];

    thymol.thExpressionObjects[ "#ctx" ][ "variables" ] = thymol.applicationContext;
    thymol.thExpressionObjects[ "#ctx" ][ "servletContext" ] = thymol.applicationContext;
    
    thymol.thExpressionObjects[ "#vars" ] = thymol.applicationContext;
    thymol.thExpressionObjects[ "#root" ] = thymol.applicationContext;

    thymol.configureModule( thymol.objects.thHttpServletRequestObject );
    thymol.configureModule( thymol.objects.thHttpSessionObject );
    if( typeof thymol.thObjectsConfigureModules !== "undefined" ) {
      thymol.thObjectsConfigureModules();
    }

    thymol.thExpressionObjects[ "#ctx" ][ "httpServletRequest" ] = thymol.thExpressionObjects[ "#httpServletRequest" ];
    thymol.thExpressionObjects[ "#ctx" ][ "httpSession" ] = thymol.thExpressionObjects[ "#httpSession" ];
    
    var dLength = thymol.thDisabledList.length;
    if( dLength > 0 ) {
      for( i = 0; i < dLength; i++ ) {
        thymol.thDisabledList[ i ].reEnable();
      }      
      thymol.thDisabledList = [];
    }
    
  }

  function setup() {
    
    reset();
    
    thymol.prefix = Thymol.prototype.getThParam( "thPrefix", false, false, thymol.thDefaultPrefix );
    thymol.dataPrefix = Thymol.prototype.getThParam( "thDataPrefix", false, false, thymol.thDefaultDataPrefix );
    
    thymol.thInclude = new thymol.ThAttr( "include", Thymol.prototype.processImport, 100, thymol.thThymeleafPrefixList, thymol.prefix );
    thymol.thReplace = new thymol.ThAttr( "replace",  Thymol.prototype.processImport, 100, thymol.thThymeleafPrefixList, thymol.prefix );
    thymol.thSubstituteby = new thymol.ThAttr( "substituteby",  Thymol.prototype.processImport, 100, thymol.thThymeleafPrefixList, thymol.prefix );
    thymol.thFragment = new thymol.ThAttr( "fragment", function() {}, 1500, thymol.thThymeleafPrefixList, thymol.prefix );
            
    thymol.thRemove = null;

    thymol.thBlock = new thymol.ThElement( "block", function( element ) {
      var i, limit = element.childNodes.length;
      for( i = 0; i < limit; i++ ) {
        if( element.childNodes[ i ].nodeType === ELEMENT_NODE ) {
          element.childNodes[ i ].isBlockChild = true;
        }
      }
    }, thymol.prefix );

    thymol.setupAttrList();

//    thymol.thFragmentCache = {};
    thymol.thDeferredFunctions = [];
    thymol.thPreExecutionFunctions = [];
    thymol.thPostExecutionFunctions = [];
    
  }

  function ready( func ) {
    if( typeof thymolDeferredFunctions === "undefined" || thymolDeferredFunctions === null ) {
      thymolDeferredFunctions = [];
    }
    thymolDeferredFunctions.push( func );
  }

  function setupEnv() {

    thymol.messagePath = Thymol.prototype.getThParam( "thMessagePath", false, true, thymol.thDefaultMessagePath );
    thymol.resourcePath = Thymol.prototype.getThParam( "thResourcePath", false, true, thymol.thDefaultResourcePath );
    thymol.messagesBaseName = Thymol.prototype.getThParam( "thMessagesBaseName", false, false, thymol.thDefaultMessagesBaseName );
    thymol.relativeRootPath = Thymol.prototype.getThParam( "thRelativeRootPath", false, true, thymol.thDefaultRelativeRootPath );
    thymol.extendedMapping = Thymol.prototype.getThParam( "thExtendedMapping", true, false, thymol.thDefaultExtendedMapping );
    thymol.localMessages = Thymol.prototype.getThParam( "thLocalMessages", true, false, thymol.thDefaultLocalMessages );
    thymol.disableMessages = Thymol.prototype.getThParam( "thDisableMessages", true, false, thymol.thDefaultDisableMessages );
    thymol.templateSuffix = Thymol.prototype.getThParam( "thTemplateSuffix", false, false, thymol.thDefaultTemplateSuffix );
    thymol.inlineQuote = Thymol.prototype.getThParam( "thDefaultInlineQuote", false, false, thymol.thDefaultInlineQuote );

    thymol.scriptPath = "";      
    if( typeof thymol.thScriptPath !== "undefined" ) {
      thymol.scriptPath = Thymol.prototype.getThParam( "thScriptPath", false, true, thymol.thScriptPath );
    }
    thymol.absolutePath = "";      
    if( typeof thymol.thAbsolutePath !== "undefined" ) {
      thymol.absolutePath = Thymol.prototype.getThParam( "thAbsolutePath", false, true, thymol.thAbsolutePath );
    }
    thymol.useAbsolutePath = false;      
    if( typeof thymol.thUseAbsolutePath !== "undefined" ) {
      thymol.useAbsolutePath = Thymol.prototype.getThParam( "thUseAbsolutePath", true, false, thymol.thUseAbsolutePath );
    }
    thymol.useFullURLPath = true;      
    if( typeof thymol.thUseFullURLPath !== "undefined" ) {
      thymol.useFullURLPath = Thymol.prototype.getThParam( "thUseFullURLPath", true, false, thymol.thUseFullURLPath );
    }

    thymol.indexFile = Thymol.prototype.getThParam( "thIndexFile", false, false, null );
    thymol.debug = Thymol.prototype.getThParam( "thDebug", true, false, false );
    thymol.allowNullText = Thymol.prototype.getThParam( "thAllowNullText", true, false, true );

    thymol.location = thymol.thLocation;
    if( "" !== thymol.relativeRootPath ) {
      thymol.root = thymol.location + thymol.relativeRootPath;
      thymol.messagePath = thymol.root + thymol.messagePath;
    }
    else {
      if( typeof thymol.thMessagePath !== "undefined" ) {
        thymol.messagePath = Thymol.prototype.getThParam( "thMessagePath", false, true, thymol.thMessagePath );
      }
      if( typeof thymol.thRoot !== "undefined" ) {
        thymol.root = Thymol.prototype.getThParam( "thRoot", false, true, thymol.thRoot );
      }
    }
    thymol.root = Thymol.prototype.getThParam( "thRoot", false, true, thymol.root );
    if( typeof thymol.thPath !== "undefined" ) {
      thymol.path = Thymol.prototype.getThParam( "thPath", false, true, thymol.thPath );
    }
    thymol.path = Thymol.prototype.getThParam( "thPath", false, true, thymol.path );

    thymol.protocol = thymol.thDocument.location.protocol;
    if( "" == thymol.protocol ) {
      thymol.protocol = thymol.thDefaultProtocol;
    }
    else {
      thymol.protocol += "//";
      if( "" == thymol.thDocument.location.host ) {
        thymol.protocol += '/';
      }
    }
    thymol.protocol = Thymol.prototype.getThParam( "thProtocol", false, false, thymol.protocol );
    thymol.resourcePath = Thymol.prototype.getThParam( "thResourcePath", false, true, thymol.resourcePath );

  }

  function updatePrefix( pref ) {
    if( thymol.prefix !== pref ) {
      var newPref = pref + ":";
      var newEscpPref = pref + "\\:";
      var newSynonymPref = "data-" + pref + "-";     
      var current = thymol.thThymeleafPrefixList[ thymol.prefix ];
      for( j = 0, jLimit = current.length; j < jLimit; j++ ) {        
        var suffix1 = current[j].suffix;        
        current[j].name = newPref + suffix1;
        current[j].escpName = "[" + newEscpPref + suffix1 + "]";
        current[j].synonym = newSynonymPref + suffix1;
        current[j].escpSynonym = "[" + current[j].synonym + "]";        
      }
      var current = thymol.thThymeleafElementsList;
      for( j = 0, jLimit = current.length; j < jLimit; j++ ) {        
        var splits = current[j].name.split(":");        
        var suffix2 = splits[1];        
        current[j].name = newPref + suffix2;
        current[j].endName = "/" + current[j].name;
        current[j].synonym = newSynonymPref + suffix2;
        current[j].endSynonym = "/" + current[j].synonym;        
      }      
      thymol.thThymeleafPrefixList[ pref ] = thymol.thThymeleafPrefixList[ thymol.prefix ];
      thymol.thThymeleafPrefixList[ newSynonymPref ] = thymol.thThymeleafPrefixList[ thymol.prefix ];      
      var oldPref = thymol.prefix  + ":";     
      var oldSynonymPref = "data-" + thymol.prefix  + "-";     
      delete thymol.thThymeleafPrefixList[thymol.prefix];
      delete thymol.thThymeleafPrefixList[oldSynonymPref];
      for( j = 0, jLimit = thymol.thThymeleafPrefixList.length; j < jLimit; j++ ) {
        if( thymol.thThymeleafPrefixList[j] === oldPref ) {
          thymol.thThymeleafPrefixList[j] = newPref;
        }
        else if( thymol.thThymeleafPrefixList[j] === oldSynonymPref ) {
          thymol.thThymeleafPrefixList[j] = newSynonymPref;
        }
      }      
      thymol.prefix = pref;
      thymol.applicationContext.createVariable( "thPrefix", pref );
    }
  }

  function init() {

    thymol.messages = null;
    thymol.mappings = null;

    thymol.debug = null;

    getLocations( this );

    thymol.locale = new thymol.ThObject();
    getLanguage();
    
    thymol.allowNullText = null;

    setupEnv();
    
    if( typeof thymol.thDataThymolLoading === "undefined" || thymol.thDataThymolLoading === null || !!thymol.thDataThymolLoading ) {
      var scripts = thymol.thDocument.getElementsByTagName( "script" );
      for( var i = 0, iLimit = scripts.length; i < iLimit; i++ ) {
        var parameters = scripts[ i ].getAttribute( "data-thymol-load" );
        if( !!parameters ) {
          var splits = parameters.split( "," );
          for( var j = 0, jLimit = splits.length; j < jLimit; j++ ) {
            loadScript( splits[ j ] );
          }
        }
      }      
      var newPrefix = Thymol.prototype.getThParam( "thPrefix", false, false, thymol.prefix );
      thymol.updatePrefix( newPrefix );
    }
    
    setupEnv(); // Environment set-up is repeated just in case the loaded scripts wanted to change anything

    executeDeferred();

    if( ! ( typeof thVars === "undefined" ) ) {
      for( i = 0, iLimit = thVars.length; i < iLimit; i++ ) {
        thymol.applicationContext.createVariable( thVars[ i ][ 0 ], thVars[ i ][ 1 ] );
      }
    }
    
    ( function() {
      var htmlTag = thymol.thDocument.getElementsByTagName( "html" )[0];
      var htmlTagAttrs = htmlTag.attributes, tp = null, tu, nsspec;
      var urls = [ thymol.thURL, thymol.thAltURL ];
      for( var i = 0, iLimit = urls.length; i < iLimit; i++ ) {
          for( var j = 0, jLimit = htmlTagAttrs.length; j < jLimit; j++ ) {
        	  var ta = htmlTagAttrs.item(j);
        	  if( urls[i] == ta.value ) {
                  nsspec = ta.localName.split( ":" );
                  if( nsspec.length > 0 ) {
                      tp = nsspec[ nsspec.length - 1 ];
                      break;
                  }        		  
        	  } 
          }
          if( tp ) {
              thymol.updatePrefix( tp );  // Only accept the first update!
              break;
          }
      }
    } )(); 
    
    var defaultScriptUrl = "";
    if( !!thymol.thRequest ) {
      thymol.thWindow.location.search = thymol.thRequest;
    }
    ( function( app, req ) {
      var surl, scriptUrl = defaultScriptUrl;      
      var scripts = thymol.thDocument.getElementsByTagName( "script" );
      for( var i = 0, iLimit = scripts.length; i < iLimit; i++ ) {        
        var surl = scripts[i].src;
        if( surl.indexOf( thymol.thScriptName ) >= 0 ) {
          scriptUrl = doDecode( surl );
          break;
        }        
      }                  
      setFromURL( app, scriptUrl );      
      setFromURL( req, thymol.thWindow.location.href, true );      
    } )( thymol.applicationContext, thymol.requestContext );

    thymol.applicationContext.resolveJSONReferences();

    preExecute( thymol.applicationContext );

    thymol.sessionContext.init();
    thymol.sessionContext.resolveJSONReferences();
    thymol.requestContext.resolveJSONReferences();

    thymol.thExpressionObjects[ "#ctx" ][ "requestParameters" ] = thymol.requestContext;


    thymol.protocol = Thymol.prototype.override( "thProtocol", thymol.protocol );
    thymol.debug = Thymol.prototype.override( "thDebug", thymol.debug );
    thymol.root = Thymol.prototype.override( "thRoot", thymol.root );

    if( "" !== thymol.relativeRootPath ) { // If we have a relativeRootPath, generate an absolute root path and set thRoot to this value
      var rootURI = thymol.thDocument.location.href;
      var quePos = rootURI.indexOf( "?" );
      if( quePos >= 0 ) {
        rootURI = rootURI.substring( 0, quePos );
      }
      var sepPos = rootURI.lastIndexOf( "/" );
      if( sepPos >= 0 ) {
        rootURI = rootURI.substring( 0, sepPos + 1 );
      }
      var newThRoot = rootURI + thymol.thLocation + thymol.relativeRootPath;
      thymol.thRoot = Thymol.prototype.getThParam( "thRoot", false, true, newThRoot );
    }

    thymol.path = Thymol.prototype.override( "thPath", thymol.path );
    thymol.allowNullText = Thymol.prototype.override( "thAllowNullText", thymol.allowNullText );
    thymol.locale.value = Thymol.prototype.override( "thLocale", thymol.locale.value );

    if( ! ( typeof thMappings === "undefined" ) ) {
      thymol.mappings = [];
      for( j = 0, jLimit = thMappings.length; j < jLimit; j++ ) {
        thymol.mappings.push( [ thMappings[ j ][ 0 ], thMappings[ j ][ 1 ] ] );
      }
      thymol.mappings.sort( function( a, b ) {
        return a[ 0 ].length > b[ 0 ].length ? -1 : 1;
      } );
    }
    thymol.messages = {};
    setLocaleValue();

    if( ! ( typeof thMessages === "undefined" ) ) {
      thymol.messages[ "" ] = [];
      for( j = 0, jLimit = thMessages.length; j < jLimit; j++ ) {
        thymol.messages[ "" ][ thMessages[ j ][ 0 ] ] = thMessages[ j ][ 1 ];
      }
      for( var k in thMessages ) {
        if( thMessages.hasOwnProperty( k ) ) {
          if( !k.match( numericExpr ) ) {
            thymol.messages[ k ] = [];
            for( j = 0, jLimit = thMessages[ k ].length; j < jLimit; j++ ) {
              thymol.messages[ k ][ thMessages[ k ][ j ][ 0 ] ] = thMessages[ k ][ j ][ 1 ];
            }
          }
        }
      }
    }

    if( ! ( typeof thDisable === "undefined" ) ) {
      for( j = 0, jLimit = thDisable.length; j < jLimit; j++ ) {
        Thymol.prototype.doDisable( thDisable[ j ] );
      }
    }

    thymol.thRemove = Thymol.prototype.getThAttrByName( "remove" );

  }
  
  function doDecode( s ) {
      return decodeURIComponent( s.replace( /\+/g, " " ) );    
  }

  function setFromURL( ctx, url, isReq ) {
    var pq = url.indexOf( "?" );
    if( pq > 0 ) {
      var rem = url.substring( pq + 1 );
      if( !!rem ) {
        var parts = rem.split( "&" );
        for( j = 0, jLimit = parts.length; j < jLimit; j++ ) {
          var pair = parts[j].split( "=" );
          if( pair.length > 1 ) {
            setControl( ctx, doDecode( pair[0] ), doDecode( pair[1] ), isReq );
          }
        }        
      }
    }
  }

  function setControl( ctx, name, value, isReq ) {
    switch( name ) {
      case "thPrefix":
        updatePrefix( value );
        break;
      case "thDataPrefix":
        thymol.dataPrefix = setThParam( name, value );
        break;
      case "thMessagePath":
        thymol.messagePath = setThParam( name, value );
        break;
      case "thResourcePath":
        thymol.resourcePath = setThParam( name, value );
        break;
      case "thMessagesBaseName":
        thymol.messagesBaseName = setThParam( name, value );
        break;
      case "thRelativeRootPath":
        thymol.relativeRootPath = setThParam( name, value );
        break;
      case "thExtendedMapping":
        thymol.extendedMapping = setThParam( name, getBooleanValue( value ) );
        break;
      case "thTemplateSuffix":
        thymol.templateSuffix = setThParam( name, value );
        break;
      case "thInlineQuote":
        thymol.inlineQuote = setThParam( name, value );
        break;
      case "thLocalMessages":
        thymol.localMessages = setThParam( name, getBooleanValue( value ) );
        break;
      case "thDisableMessages":
        thymol.disableMessages = setThParam( name, getBooleanValue( value ) );
        break;
      case "thIndexFile":
        thymol.indexFile = setThParam( name, value );
        break;
      case "thProtocol":
        thymol.protocol = setThParam( name, value );
        break;
      case "thDebug":
        thymol.debug = setThParam( name, getBooleanValue( value ) );
        break;
      case "thRoot":
        thymol.root = setThParam( name, value );
        break;
      case "thPath":
        thymol.path = setThParam( name, value );
        break;
      case "thAllowNullText":
        thymol.allowNullText = setThParam( name, getBooleanValue( value ) );
        break;
      case "thLocale":
        thymol.locale.value = setThParam( name, value );
        break;
      case "thDefaultPrecision":
        thymol.thDefaultPrecision = setThParam( name, value );
        break;
      case "thDefaultPrecedence":
        thymol.thDefaultPrecedence = setThParam( name, value );
        break;
      default: {
        if( name.startsWith( "thymol.") ) {  // Special treatment for thymol variables
          var endw = name.substring( 7 );
          if( thymol.hasOwnProperty(endw) ) {
            thymol[endw] = value;
          }
        }
        else {
          ctx.createVariable( name, value, isReq );
        }
      }
    }    
  }
  
  function setThParam( name, value ) {
    var thp = thymol.applicationContext[ name ];
    thp.value = value;
    return value;
  }

  function getLocations( thiz ) {
    thiz.templateName = "";
    thiz.templatePath = "";
    if( !!thymol.thDocument.location.href ) {
      var templateName = templatePath = thymol.thDocument.location.href;
      thiz.templateName = templateName.substring( 0, ( templateName.indexOf( "." ) == -1 ) ? templateName.length : templateName.lastIndexOf( "." ) );
      thiz.templatePath = templatePath.substring( 0, ( templatePath.indexOf( "/" ) == -1 ) ? 0 : templatePath.lastIndexOf( "/" ) + 1 );
    }
  }

  function getCtx() {
    return thymol.thExpressionObjects[ "#ctx" ];
  }

  function configureModule( module ) {
    if( typeof thymol.thExpressionObjects === "undefined" || thymol.thExpressionObjects === null ) {
      thymol.thExpressionObjects = {};
    }
    thymol.thExpressionObjects[ module.thExpressionObjectName ] = module;
  }

  function configureAttributeProcessor( prefix, suffix, func, prec, override, dataAttr ) {
    var p = prefix + ":";
    if( p !== null ) {
      if( thymol.thThymeleafPrefixList.indexOf( p ) < 0 ) {
        thymol.thThymeleafPrefixList.push( p );
      }
    }
    else {
      thymol.thUsingNullPrefix = true;
    }
    if( !!override ) {
      var attrList = thymol.thThymeleafPrefixList[prefix];      
      var i, iLimit = attrList.length;
      for( i = 0; i < iLimit; i++ ) {
        if( suffix === attrList[ i ].suffix ) {
          attrList.splice(i, 1);
          break;
        }
      }            
    }
    p = new thymol.ThAttr( suffix, func, prec, thymol.thThymeleafPrefixList, prefix, dataAttr );
  }

  function configureElementProcessor( prefix, suffix, func ) {
    var p = new thymol.ThElement( suffix, func, prefix );
  }

  function configurePreExecution( func ) {
    thymol.thPreExecutionFunctions.push( func );
  }

  function configurePostExecution( func ) {
    thymol.thPostExecutionFunctions.push( func );
  }

  function executeDeferred() {
    if( typeof thymolDeferredFunctions !== "undefined" && thymolDeferredFunctions !== null ) {
      while( thymolDeferredFunctions.length > 0 ) {
        var func = thymolDeferredFunctions.pop();
        func();
      }
    }
  }

  function preExecute( context ) {
    while( thymol.thPreExecutionFunctions.length > 0 ) {
      var func = thymol.thPreExecutionFunctions.pop();
      func();
      context.resolveJSONReferences();
    }
  }

  function postExecute() {
    while( thymol.thPostExecutionFunctions.length > 0 ) {
      var func = thymol.thPostExecutionFunctions.pop();
      func();
    }
  }

  function preProcess( expr, element ) {
    var result = expr, fp, lp;
    do {
      fp = result.indexOf( "__" );
      if( fp >= 0 ) {
        lp = -1;
        if( result.length > 4 ) {
          lp = result.lastIndexOf( "__" );
        }
        if( lp <= 0 ) {
          thymol.error( true, "Mismatched pre-processing indicators", element );
        }
        var head = result.substring( 0, fp );
        var centre = result.substring( fp + 2, lp );
        centre = thymol.getParsedExpr( centre, element );
        var tail = result.substring( lp + 2 );
        result = head + centre + tail;
        fp = result.indexOf( "__" );
      }
    }while( fp >= 0 );
    result = result.replace( /\\_\\_/g, "__" );
    return result;
  }

  function substituteParam( argValue, mode, element ) {
    var result = argValue, varName = argValue, subs = null, msg, expo;
    if( result ) {
      if( mode === 4 ) {
        msg = thymol.getMessage( varName );
        if( msg ) {
          subs = msg;
        }
      }
      else if( mode === 6 ) {
        subs = argValue;
      }
      else {
        var token = thymol.booleanAndNullTokens[ result ];
        if( ! ( typeof token === "undefined" ) ) {
          if( token === null ) {
            subs = null;
          }
          else {
            subs = token.value;
          }
        }
        else {
          if( varName.charAt( 0 ) === "#" ) {
            if( "#object" === varName ) {
              if( element.thObjectVar ) {
                subs = element.thObjectVar;
              }
            }
            else {
              expo = thymol.thExpressionObjects[ varName ];
              if( typeof expo !== "undefined" && expo !== null ) {
                subs = expo;
              }
            }
          }
          if( ( typeof subs === "undefined" || subs == null ) && element.thObjectVar ) {
            subs = element.thObjectVar[ varName ];
          }
          if( ( typeof subs === "undefined" || subs == null ) && element.thLocalVars ) {
            subs = element.thLocalVars[ varName ];
          }
          if( typeof subs === "undefined" || subs == null ) {
            subs = thymol.ThUtils.getParameter( varName );
          }
          if( typeof subs === "undefined" || subs == null ) {
            if( "param" === varName ) {
              subs = thymol.requestContext;
            }
            if( "session" === varName ) {
              subs = thymol.sessionContext;
            }
            if( "application" === varName ) {
              subs = thymol.applicationContext;
            }
          }
          if( mode === 2 && ( typeof subs === "undefined" || subs == null ) ) {
            subs = argValue;
          }
        }
      }
      result = subs;
      if( subs instanceof thymol.ThParam ) {
        result = subs.value;
      }
    }
    return result;
  }

  function getStandardURL( initial ) {
    var result = initial.trim(), mapped, head;
    mapped = thymol.getMapped( result, thymol.extendedMapping ); // Historically extendedMapping has always been true in getStandardURL
    if( mapped ) {
      result = mapped;
    }
    if( "/" === result && !!thymol.indexFile ) {
      result += thymol.indexFile;
    }
    if( !/.*:\/\/.*/.test( result ) ) { // Absolute URL?
      if( /^~?\/.*$/.test( result ) ) { // Server-relative or Context-relative?
        if( /^~.*$/.test( result ) ) { // Context-relative?
          result = result.substring( 1 );
        }
        if( !/^\/\/.*$/.test( result ) ) { // Protocol relative?
          if( thymol.useFullURLPath ) {
            head = thymol.root + thymol.resourcePath;
            if( head != "" ) {
              if (head.charAt(head.length - 1) !== "/") {
                head = head + "/";
              }
              if (result.charAt(0) === "/") {
                result = head + result.substring( 1 );
              }
              else {
                result = head + result;
              }
            }
          }
          else {
            result = thymol.resourcePath + result;
          }
        }
      }
    }
    return result;
  }

  function getExpression( argValue, element ) {
    var result = argValue, subst = false, initial, shortCut, args, negate, token, lsp;
    if (typeof argValue === "string") {
      initial = argValue.trim();
      result = initial;
      if( result ) {        
        // mode 2 => standard URL  @
        // mode 3 => local object  $
        // mode 4 => message body  #                
//        var mode = result.charAt(0) === '@' ? 2 : result.charAt(0) === '$' ? 3 : result.charAt(0) === '#' ? 4 : 0;
//        if( mode != 0 ) {
//          shortCut =  thymol.substituteParam( result, mode, element );          
//        }
//        else {
          shortCut = thymol.ThUtils.getParameter( result );
//        }
        if( !shortCut ) {
          args = result.match( varExpr3 );
          if( args ) {
            if( args[ 1 ] && args[ 1 ].length > 0 ) {
              shortCut = thymol.ThUtils.getParameter( args[ 1 ] );
            }
          }
        }
        if( shortCut ) {
          if( shortCut instanceof thymol.ThParam ) {
            result = shortCut.value;
          }
          else {
            result = shortCut;
          }
          if( typeof result === 'string' && result.match( numericExpr ) ) { // Numeric?
            result = parseInt( result );
          }
        }
        else {
          initial = thymol.ThUtils.unParenthesise( result );
          negate = false;
          if (initial.charAt(0) == "!") {
            negate = true;
            initial = initial.substring( 1, initial.length );
            initial = thymol.ThUtils.unParenthesise( initial );
          }
          if( literalTokenExpr.test( initial ) ) {
            token = thymol.booleanAndNullTokens[ initial ];
            if( ! ( typeof token === "undefined" ) ) {
              result = token.value;
              subst = true;
            }
          }
          lsp = null;
          if( !subst ) {
            lsp = initial.match( litSubstExpr );
            if( lsp && lsp.length > 0 ) {
              if( thymol.ThUtils.charOcurrences( lsp[ 1 ], "'" ) < 2 ) { // No contained literals
                initial = Thymol.prototype.doLiteralSubstExpr( initial, lsp[ 1 ] );
              }
            }
            result = "";
            if( initial != "" ) {
              initial = thymol.ThUtils.unParenthesise( initial );
              initial = thymol.preProcess( initial, element );
              result = thymol.getParsedExpr( initial, element, true );
            }
          }
          if( result == initial && ( typeof result == typeof initial ) ) { // Unsubstituted
            result = null;
          }
          else if( typeof result === "string" ) {
            if( !lsp ) {
              result = result.replace( /[\\][\\]/g, "\\" );
            }
            result = result.replace( /&#39;/g, "'" ).replace( /&apos;/gi, "'" );
          }
          if( negate ) {
            if( typeof result === "boolean" ) {
              result = !result;
            }
            else if( typeof result === "number" ) {
              result = ( result == 0 );
            }
            else if( typeof result === "string" ) {
              result = !thymol.ThUtils.testLiteralFalse( result );
            }
          }
        }
      }
    }
    return result;
  }

  function getMapped( uri, extended ) {
    var mapped = null, i, iLimit, key;
    if( uri && typeof uri === "string" ) {
      if( thymol.mappings ) {
        for( i = 0, iLimit = thymol.mappings.length; i < iLimit; i++ ) {
          key = thymol.mappings[ i ][ 0 ];
          if( uri == key ) {
            mapped = thymol.mappings[ i ][ 1 ];
            break;
          }
          else if( extended ) {
            if( uri.indexOf( key ) == 0 ) {
              mapped = uri.substring( key.length );
              mapped = thymol.mappings[ i ][ 1 ] + mapped;
              break;
            }
          }
        }
      }
    }
    return mapped;
  }

  function substitute( initial, element, lenient ) { // It looks pretty good but it's just (nearly) deprecated !!!
    var argValue = initial, result, args, token, re, subs, saved;
    if( typeof argValue === "string" ) {
      argValue = argValue.trim();
    }
    result = argValue;
    args = "";
    while( args != null ) {
      args = argValue.match( /.*([$\*#@]{(!?[^}]*)}).*/ );
      if( args != null && args.length > 0 ) {
        if( args.length == 3 ) { // Found an embedded expression
          token = args[ 1 ];
          token = token.replace( /[$]/g, "[$]" ).replace( /[*]/g, "[*]" ).replace( /[\']/g, "[']" ).replace( /[+]/g, "[+]" ).replace( /[\(]/g, "[(]" ).replace( /[\)]/g, "[)]" );
          re = new RegExp( token );
          subs = thymol.getExpression( args[ 2 ], element );
          if( subs != args[ 2 ] ) {
            result = result.replace( re, subs, "g" );
            if( result == "null" ) {
              result = null;
            }
          }
          else {
            subs = ""; // Substitution failed
            if( !lenient ) {
              thymol.error( false, 'variable substitution failed: "' + initial + '"', element );
            }
          }
          saved = argValue;
          argValue = argValue.replace( re, subs, "g" );
          if( saved == argValue ) {
            argValue = "";
          }
        }
      }
    }
    var splits = result.split("+");    
    if( splits.length > 1 ) {
      var line = "";
      for( var i = 0, iLimit = splits.length; i < iLimit; i++ ) {
        argValue = thymol.ThUtils.unQuote(splits[ i ]);
        line += argValue;
      }
      result = line;
    }
    return result;
  }

  function getWith( element, content ) {
    var argValue = content.trim(), argCount = 0;
    if( argValue ) {
      do {
        var argsExpr = thymol.ThParser.parse( argValue, true, false );
        var identifier = argsExpr.tokens.shift();
        if( identifier.type_ === 3 ) {
          var result = argsExpr.evaluate( element );
          var varName = identifier.index_;
          if( !!varName ) {
            argCount++;
            if( !element.thLocalVars ) {
              element.thLocalVars = {};

            }
            element.thLocalVars[ varName ] = result;
          }
          argValue = argValue.substring( argsExpr.position );
        }
        else {
          break;
        }
      }while( argValue.length > 0 );
    }
    return argCount;
  }

  function getParsedExpr( initial, element, preprocessed ) {
    var expr, result = initial;
    expr = thymol.ThParser.parse( result, false, preprocessed );
    expr = expr.simplify();
    // TODO Cache expressions here!!
    result = expr.evaluate( element );
    if( typeof result === "number" ) {
      result = thymol.ThUtils.getToPrecision( result, expr.precision );
    }
    return result;
  }

  function getBooleanValue( param ) {
    var flag = false, val, args;
    if( param != null ) {
      if( typeof param === "boolean" ) {
        flag = param;
      }
      else if( typeof param === "number" ) {
        flag = param != 0;
      }
      else {
        val = param;
        if( Object.prototype.toString.call( val ) === "[object Array]" ) {
          if( val.length === 1 ) {
            val = val[ 0 ];
          }
          else {
            val = true;
          }
        }
        if( typeof val === "boolean" ) {
          flag = val;
        }
        else if( typeof val === "number" ) {
          flag = ( val != 0 );
        }
        else if( typeof val === "string" ) {
          args = val.match( nonURLExpr );
          if( args ) {
            val = args[ 1 ];
            flag = this.testParam( val );
          }
          else {
            flag = !thymol.ThUtils.testLiteralFalse( val );
          }
        }
        else if( val instanceof thymol.ThParam ) {
          flag = val.getBooleanValue();
        }
        else {
          flag = typeof val !== "undefined" && val !== null;
        }
      }
    }
    return flag;
  }

  function isFragmentChild( element ) {
    var result = false, parent = element.parentElement;
    while( parent ) {
      if( parent.getAttribute( thymol.thFragment.name ) || parent.getAttribute( thymol.thFragment.synonym ) ) {
        result = true;
        break;
      }
      parent = parent.parentElement;
    }
    return result;
  }

  function setLocale( locValue ) {
    thymol.locale.value = locValue;
    setLocaleValue();
  }

  function getLocale() {
    return thymol.locale.value;
  }

  function getLanguage() {
    if( !thymol.locale.value ) {
      if( typeof navigator !== "undefined" && !!navigator ) {
        var userLang = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;
        if( !!userLang ) {
          thymol.locale.value = userLang.replace( /\-/g, "_" );
        }
      }
    }
  }

  function setLocaleValue() {
    if( !thymol.locale.value ) {
      thymol.locale.value = thymol.thDefaultLocale;
    }
    var sepPos;
    var locale = thymol.locale.value.replace( /\-/g, "_" );
    var level = thymol.locale.value;
    var levels = [];
    var part, parts = [];
    do {
      levels.push( level );
      sepPos = locale.lastIndexOf( "_" );
      if( sepPos >= 0 ) {
        part = locale.substring( sepPos + 1 );
        parts.push( part );
        locale = locale.substring( 0, sepPos );
        level = level.substring( 0, sepPos );
      }
    }while( sepPos >= 0 );
    thymol.locale.language = level;
    if( !!parts ) {
      parts.reverse();
      for( var i = 0, iLimit = parts.length; i < iLimit; i++ ) {
        if( i === 0 ) {
          thymol.locale.country = parts[ i ];
        }
        else if( i === 1 ) {
          thymol.locale.variant = parts[ i ];
        }
      }
    }
    thymol.locale.levels = levels;
    thymol.thExpressionObjects[ "#ctx" ][ "locale" ] = thymol.locale;
    thymol.thExpressionObjects[ "#locale" ] = thymol.locale;
  }

  function getMessage( varName, parameters, returnStringAlways ) {
    if( thymol.disableMessages ) {
      return undefined;
    }
    var msgKey = null;
    var locale;
    if( !!thymol.locale.levels ) {
      var prefix = "$"; // Use prefix to disambiguate the local and default messages
      var ident, section, jLower = thymol.localMessages ? 0 : 1;
      for( var j = jLower; j < 2; j++ ) {
        for( var i = 0, iLimit = thymol.locale.levels.length; i < iLimit + 1; i++ ) {
          ident = prefix;
          if( i < iLimit ) {
            locale = thymol.locale.levels[ i ];
          }
          else {
            locale = "";
          }
          ident = ident + locale;
          section = thymol.messages[ ident ];
          if( !section ) {
            if( j < 1 ) {
              section = getLocalMessages( locale );
            }
            else {
              section = getDefaultMessages( locale );
            }
          }
          if( !!section ) {
            thymol.messages[ ident ] = section;
            msgKey = section[ varName ];
            if( !!msgKey ) {
              break;
            }
          }
        }
        if( !!msgKey ) {
          break;
        }
        prefix += "$";
      }
    }
    if( !msgKey ) {
      for( var i = 0, iLimit = thymol.locale.levels.length; i <= iLimit; i++ ) {
        if( i < iLimit ) {
          locale = thymol.locale.levels[ i ];
        }
        else {
          locale = "";
        }
        if( !!thymol.messages[ locale ] ) {
          msgKey = thymol.messages[ locale ][ varName ];
          if( !!msgKey ) {
            break;
          }
        }
      }
    }
    if( !!msgKey ) {
      if( typeof parameters === "undefined" ) {
        return msgKey;
      }
      else {
        return thymol.ThUtils.renderMessage( msgKey, parameters );
      }
    }
    else if( returnStringAlways !== undefined && returnStringAlways ) {
      return "??" + varName + "_" + thymol.locale.value + "??";
    }
    return null;
  }

  function getProperties( propFile ) {
//    propFile = thymol.ThUtils.resolvePath( propFile );  // If we use the jsdom built-in XMLHttpRequest, then we need to canonicalise the absolute file path
    var props = null;
    var messages = [];
    props = getFile( propFile );
    if( !!props ) {
      var splits = props.split( "\n" );
      if( splits.length > 0 ) {
        for( var i = 0, iLimit = splits.length; i < iLimit; i++ ) {
          var line = splits[ i ].trim();
          if( line.charAt( 0 ) !== "#" ) {
            var p = line.split( "=" );
            if( p.length > 1 ) {
              messages[ p[ 0 ].trim() ] = thymol.ThUtils.unicodeUnescape( p[ 1 ].trim() );
            }
          }
        }
      }
    }
    return messages;
  }

  function getLocalMessages( locale ) {
    var messages = [];
    if( !!thymol.thDocument.location.href ) {
      var propsFile = thymol.templateName;
      if( !!locale && locale !== "" ) {
        propsFile += "_" + locale;
      }
      propsFile += ".properties";
      messages = getProperties( propsFile );
    }
    return messages;
  }

  function getDefaultMessages( locale ) {
    var messages = null;
    var propsPath = "";
    if( thymol.useAbsolutePath ) {
      propsPath += thymol.protocol + thymol.root + thymol.path;
    }
    propsPath += thymol.messagePath;
    if( propsPath !== "" ) {
      propsPath += "/";
    }
    var propsFile = propsPath + thymol.messagesBaseName;
    if( !!locale && locale !== "" ) {
      propsFile += "_" + locale;
    }
    propsFile += ".properties";
    messages = getProperties( propsFile );
    return messages;
  }
    
  Thymol.prototype = {

    process : function( rootNode ) {
      var changed = true;
      try {
        while(changed ) {          
          changed = this.processComments( rootNode );
          changed = changed || this.processChildren( rootNode );
        }
        var elements = rootNode.getElementsByTagName( "*" );
        var kc = 0;
        for( var k = 0, kLimit = elements.length; k < kLimit; k++ ) {
          var elem2 = elements[ kc ];
          if( elem2.hasAttribute( "thScript" ) ) {                
              if( !!elem2.textContent ) {
                  globalEval( elem2.textContent );
              }
              else if( !!elem2.src ) {
                  loadScript( elem2.src );
              }
              else {
                  var dtl = elem2.getAttribute( "data-thymol-load" );
                  if ( !!dtl ) {
                      var splits = dtl.split( "," );
                      for( var j = 0, jLimit = splits.length; j < jLimit; j++ ) {
                          loadScript( splits[ j ] );
                      }
                  }
              }
              elem2.parentNode.removeChild( elem2 );
              elements = rootNode.getElementsByTagName( "*" );                        
          }
          else {
              kc++;
          }
      }
      kc = 0;
      for (var k = 0, kLimit = elements.length; k < kLimit; k++) {
          var elem2 = elements[kc];
          var elName = elem2.nodeName.toLowerCase();
          if( elName == thymol.thBlock.name || elName == thymol.thBlock.synonym ) {
            thymol.ThUtils.removeTag( elem2 );
            elements = rootNode.getElementsByTagName( "*" );
          }
          else {
            kc++;
          }
        }
        var removeArray = rootNode.querySelectorAll( thymol.thRemove.escpName + "," + thymol.thRemove.escpSynonym );
        for( var i = 0, iLimit = removeArray.length; i < iLimit; i++ ) {
          var rmElement = removeArray[ i ];
          for( var j = 0, jLimit = rmElement.attributes.length; j < jLimit; j++ ) {
            var attr = rmElement.attributes.item(j);
            if( thymol.thRemove.name == attr.localName || thymol.thRemove.synonym == attr.localName ) {
              thymol.processRemove( rmElement, attr );
              break;
            }
          }
        }
      
      }
      catch( err ) {
        thymol.alert( err );
      }
    },

    processChildren : function( rootNode ) {
      var i, iLimit, j, jLimit, k, kLimit, changed = false;
      var elements = rootNode.getElementsByTagName( "*" );
      for( k = 0, kLimit = elements.length; k < kLimit; k++ ) {
        var elem1 = elements[ k ];
        for( j = 0, jLimit = thymol.thThymeleafElementsList.length; j < jLimit; j++ ) {
          if( elem1.localName == thymol.thThymeleafElementsList[ j ].name || elem1.localName == thymol.thThymeleafElementsList[ j ].synonym ) {
            var updated = thymol.thThymeleafElementsList[ j ].process( elem1 );
            if( updated ) {
              elements = rootNode.getElementsByTagName( "*" );
              k--;
              kLimit = elements.length;
              changed = true;
            }
            break; // Element names should be distinct and we don't want to repeat any processing!
          }
        }
        var allAttributes = elem1.attributes;
        if( allAttributes && allAttributes.length > 0 ) {
          var attributes = [], aii = 0;
          if( !thymol.thUsingNullPrefix ) {
            for( i = 0, iLimit = allAttributes.length; i < iLimit; i++ ) {
              var ai = allAttributes.item( i );
              if( ai ) {
                for( j = 0, jLimit = thymol.thThymeleafPrefixList.length; j < jLimit; j++ ) {
                  var attrName = ai.name.toString();
                  if( attrName.length > thymol.thThymeleafPrefixList[ j ].length ) {
                    attrName = attrName.substring( 0, thymol.thThymeleafPrefixList[ j ].length );
                    if( attrName === thymol.thThymeleafPrefixList[ j ] ) {
                      ai.order = i;
                      attributes[aii++] = ai;
                    }
                  }
                }
              }
            }
          }
          else {
            for( i = 0, iLimit = allAttributes.length; i < iLimit; i++ ) {
            	attributes[i] = allAttributes.item(i);
            }
          }
          if( attributes.length > 0 ) { // Try to assert some kind of order - this doesn't work!
            attributes.sort( function( a, b ) {
              return b.order - a.order;
            } );
            var matchedAttributes = [];
            for( i = 0, iLimit = attributes.length; i < iLimit; i++ ) {
              var splits = attributes[ i ].name.toString().split( ":" );
              if( splits && splits.length > 0 ) {
                var prefix = "", name;
                if( splits.length > 1 ) {
                  prefix = splits[ 0 ];
                  name = splits[ 1 ];
                }
                else {
                  name = splits[ 0 ];
                  var hpos = name.lastIndexOf( "-" );
                  if( hpos >= 0 ) {
                    prefix = name.substring( 0, hpos + 1 );
                  }
                }
                var attrList = thymol.thThymeleafPrefixList[ prefix ];
                if( splits.length > 1 ) {
                  prefix += ":";
                }
                if( attrList ) {
                  for( j = 0, jLimit = attrList.length; j < jLimit; j++ ) {
                    var matched = false;
                    if( name === attrList[ j ].suffix || name === attrList[ j ].synonym ) {
                      matched = true;
                    }
                    else if( attrList[ j ].regex !== null ) {
                      var fqn = prefix + name;
                      matched = attrList[ j ].regex.test( fqn );
                    }
                    if( matched ) {
                      var matchedAttribute = {};
                      matchedAttribute.attr = attrList[ j ];
                      matchedAttribute.elementAttr = attributes[ i ];
                      matchedAttributes.push( matchedAttribute );
                      break;
                    }
                  }
                }
              }
            }
            if( matchedAttributes.length > 0 ) {
              matchedAttributes.sort( function( a, b ) {
                return a.attr.precedence - b.attr.precedence;
              } );
              var updated = false;
              for( i = 0, iLimit = matchedAttributes.length; i < iLimit; i++ ) {
                updated = thymol.ThUtils.processElement( matchedAttributes[ i ].attr.process, elem1, matchedAttributes[ i ].elementAttr, matchedAttributes[ i ].attr, 1 );
                if( updated ) {
                  break;
                }
              }
              if( updated ) {
                elements = rootNode.getElementsByTagName( "*" );
                k--;
                kLimit = elements.length;
                changed = true;
              }
            }
          }
        }
      }
    },

    override : function( paramName, paramValue ) {
      var param = paramValue, thv;      
      if( !!thymol.requestContext ) {       
        thv = thymol.requestContext[ paramName ];
      }
      if( typeof thv === "undefined" && !!thymol.applicationContext ) {
        thv = thymol.applicationContext[ paramName ];
        if( typeof thv === "undefined" ) {
          thv = thymol.applicationContext.javascriptify( paramName );
        }
      }
      if( typeof thv === "undefined" && !!thymol.thWindow ) {
        thv = thymol.thWindow[ paramName ];
      }
      if( typeof thv !== "undefined" ) {
        if( thv instanceof thymol.ThParam ) {
          param = thv.value;
        }
        else {
          param = thv;
        }
      }
      return param;
    },

    doDisable : function( attrName ) {
      var tha = this.getThAttrByName( attrName );
      if( tha !== null ) {
        tha.disable();
      }
      else {
        thymol.error( false, 'cannot disable unknown attribute "' + attrName + '"' );
      }
    },

    getThAttrByName : function( name ) {
      var attrList = thymol.thThymeleafPrefixList[ thymol.prefix ];
      var i, iLimit = attrList.length;
      for( i = 0; i < iLimit; i++ ) {
        if( name === attrList[ i ].suffix ) {
          return attrList[ i ];
        }
      }
      return null;
    },

    getContents : function( rootNode ) {
      var rnd = rootNode.thDoc;
      var fstar = rnd.querySelectorAll("*");
      return fstar;
    },

    processComments : function( rootNode ) {
      var comments = null, fstar, changed = false, changing = false, i, iLimit, startComment, parent, startValue, pointer, nextPointer;
      do {
        comments = [];
        var iterator = thymol.thDocument.createNodeIterator( rootNode, SHOW_COMMENT, function() { return FILTER_ACCEPT; }, false);
        var curNode;
        while (curNode = iterator.nextNode()) {
            comments.push(curNode);
        }
        changing = false;
        for( i = 0, iLimit = comments.length; i < iLimit; i++ ) {

          startComment = comments[ i ];
          parent = startComment.parentNode;
          startValue = startComment.nodeValue.trim();

          if( startParserLevelCommentExpr.test( startValue ) ) {
            pointer = startComment;
            while( pointer != null ) {
              if( endParserLevelCommentExpr.test( pointer.nodeValue ) ) {
                changing = ( parent.removeChild( pointer ) != null );
                break;
              }
              nextPointer = pointer.nextSibling;
              changing = ( parent.removeChild( pointer ) != null );
              pointer = nextPointer;
            }
          }
          else if( startParserLevelCommentExpr2.test( startValue ) && endParserLevelCommentExpr2.test( startValue ) ) { // Last option so it doesn't conflict with previous case
            parent.removeChild( startComment );
            changing = true;
          }
        }
        changed = changed || changing;
      }while( changing );
      return changed || this.processPrototypeOnlyComments( rootNode );
    },

    processPrototypeOnlyComments : function( rootNode ) {
      var comments = null, fstar, changed = false, changing = false, indexOfLast, i, iLimit, j, jLimit, k, kLimit, startComment, parent, startValue, deletions, res, fullText, innerNodes, done, next, commentText, res2, blockElement, blockDoc, blockDocBody, blockBase, newNode, newDoc;
      do {
        comments = [];
        var iterator = thymol.thDocument.createNodeIterator(rootNode, SHOW_COMMENT, function() { return FILTER_ACCEPT; }, false);
        var curNode;
        while (curNode = iterator.nextNode()) {
            comments.push(curNode);
        }              
        changing = false;
        indexOfLast = comments.length - 1;
        for( i = 0, iLimit = comments.length; i < iLimit; i++ ) {
          startComment = comments[ i ];
          parent = startComment.parentNode;
          if( parent != null ) {
            startValue = startComment.nodeValue.trim();
            deletions = [];
            deletions.push( startComment );
            startValue = startValue.replace( /\n/g, "" );
            res = startValue.match( prototypeOnlyCommentEscpExpr );
            if( res ) {
              fullText = startValue;
              if( parent.localName == "table" || parent.localName == "tbody" ) {
                if( startValue.indexOf( thymol.thBlock.name ) >= 0 || startValue.indexOf( thymol.thBlock.synonym ) >= 0 ) {
                  if( startValue.indexOf( thymol.thBlock.endName ) < 0 || startValue.indexOf( thymol.thBlock.endSynonym ) < 0 ) { // whole th:block is NOT embedded
                    fullText = fullText.replace( res[ 0 ], res[ 1 ] );
                    innerNodes = [];
                    done = false;
                    next = startComment;
                    do {
                      next = next.nextSibling;
                      if( next != null ) {
                        deletions.push( next );
                        if( i < indexOfLast ) {
                          if( next == comments[ i + 1 ] ) {
                            commentText = next.nodeValue;
                            if( commentText.indexOf( thymol.thBlock.endName ) >= 0 || commentText.indexOf( thymol.thBlock.endSynonym ) >= 0 ) {
                              res2 = commentText.match( prototypeOnlyCommentEscpExpr );
                              if( res2 ) {
                                commentText = commentText.replace( res2[ 0 ], res2[ 1 ] );
                                fullText = fullText + commentText;
                              }
                              done = true;
                            }
                          }
                          else {
                            innerNodes.push( next );
                          }
                        }
                      }
                      else {
                        done = true;
                      }
                    } while( !done );
                    blockElement = null;
                    blockDoc = thymol.thDomParse( fullText, "text/html" );
                    blockDocBody = blockDoc.getElementsByTagName( "body" )[0]; 
                    for( j = 0, jLimit = blockDocBody.childNodes.length; j < jLimit; j++ ) {
                      if( blockDocBody.childNodes[ j ].localName == thymol.thBlock.name || blockDocBody.childNodes[ j ].localName == thymol.thBlock.synonym ) {
                        blockElement = blockDocBody.childNodes[ j ];
                        for( k = 0, kLimit = innerNodes.length; k < kLimit; k++ ) {
                          newNode = blockDoc.importNode( innerNodes[ k ], true );
                          // newNode = innerNodes[ k ].cloneNode( true );
                          blockElement.appendChild( newNode );
                          // TODO jjb
                        }
                      }
                    }
                    if( blockElement != null ) {
                      this.processChildren( blockDoc );
                      changing = this.insertUncommented( blockDoc, deletions, parent );
                    }
                    else {
                      parent.removeChild( startComment ); // Delete it!
                      changing = true;
                    }
                  }
                  else { // Embedded?
                    parent.removeChild( startComment ); // Delete it!
                    changing = true;
                  }
                }
              }
              else {
                newDoc = thymol.thDomParse( res[ 1 ], "text/html" );
                changing = this.insertUncommented( newDoc, deletions, parent );
              }
            }
          }
        }
        changed = changed || changing;
      }while( changing );
      return changed;
    },

    insertUncommented : function( doc, deletions, parent ) {
      var docBody = doc.getElementsByTagName( "body" )[ 0 ], i, iLimit, newNode;
      for( i = 0, iLimit = docBody.childNodes.length; i < iLimit; i++ ) {
        if( parent.ownerDocument === doc ) {
          newNode = docBody.childNodes[ i ].cloneNode( true );
        }
        else {
          newNode = parent.ownerDocument.importNode( docBody.childNodes[ i ], true );
        }
        parent.insertBefore( newNode, deletions[ 0 ] );
      }
      for( i = 0, iLimit = deletions.length; i < iLimit; i++ ) {
        parent.removeChild( deletions[ i ] );
      }
      return true;
    },

    getList : function( element, content ) {
      var argValue = content.trim(), argsCount = 0, argsList = [], assigs, i, iLimit, val;
      if( argValue ) {
        assigs = argValue.split( "," );
        for( i = 0, iLimit = assigs.length; i < iLimit; i++ ) {
          val = thymol.getExpression( assigs[ i ], element );
          argsList[ i ] = val;
        }
        if( !element.thLocalVars ) {
          element.thLocalVars = {};
        }
        element.thLocalVars[ "..." ] = argsList;
        argsCount = argsList.length;
      }
      return argsCount;
    },

    testParam : function( param ) {
      var initial = param, result = false, theParam = null, negate = false;
      if( typeof initial === 'boolean' ) {
        result = initial;
      }
      else {
        theParam = null;
        negate = false;
        if( typeof initial === 'object' && initial instanceof thymol.ThParam ) {
          theParam = initial;
        }
        else {
          initial = initial.valueOf();
          if( initial.charAt( 0 ) == '!' ) {
            negate = true;
            initial = initial.substring( 1 );
          }
        }
        theParam = thymol.applicationContext[ initial ];
        if( theParam != null ) {
          result = theParam.getBooleanValue();
        }
        if( negate ) {
          result = !result;
        }
      }
      return result ? true : false;
    },

    processImport : function( element, attr, thAttr ) {
      var changed = false, importNode = null, filePart, fragmentPart, names, parts, fragmentArgsList, fragment, fileName, content, importError;
      filePart = null;
      if( attr.value.indexOf( "::" ) < 0 ) {
        filePart = attr.value;
        fragmentPart = "::";
      }
      else {
        names = attr.value.split( "::" );
        filePart = names[ 0 ].trim();        
        fragmentPart = names[ 1 ].trim();
      }
      if( "this" === filePart ) {
        filePart = "";
      }
      else {
        filePart = Thymol.prototype.getFilePath( filePart, element );        
      }
      if( filePart != null ) {
        parts = filePart.match( thymol.varParExpr );
        fragmentArgsList = null;
        if( parts ) {
          if( parts.length > 1 ) {
            filePart = parts[ 1 ].trim();
          }
          if( parts.length > 2 ) { // Param list from "whole-file" fragment
            fragmentArgsList = parts[ 2 ].trim();
          }
        }
//        var fragmentName = fragmentPart.replace( /text\(\)/g, textFuncSynonym );
        var fragmentName = fragmentPart;
        if( filePart != "" || !isFragmentChild( element ) ) {          
          parts = fragmentName.match( thymol.varParExpr );
          if( parts == null && fragmentArgsList != null ) {
            parts = [];
            parts[ 1 ] = fragmentName;
            parts[ 2 ] = fragmentArgsList;
          }
          argsCount = 0;
          if( parts ) {
            if( parts.length > 1 ) {
              fragmentName = parts[ 1 ].trim();
              if( parts.length > 2 ) {
                if( parts[ 2 ].indexOf( "=" ) > 0 ) {
                  argsCount = thymol.getWith( element, parts[ 2 ] );
                }
                else {
                  argsCount = Thymol.prototype.getList( element, parts[ 2 ] );
                }
              }
            }
          }
          var tfn = thymol.substitute( fragmentName, element ); 
            //thymol.getExpression( fragmentName, element );
          if( !!tfn ) {
            fragmentName = tfn;
          }
          tfn = thymol.substitute( filePart, element ); 
            //thymol.getExpression( filePart, element );
          if( !!tfn ) {
            filePart = tfn;
          }
          content = Thymol.prototype.getFromCache( element, filePart, fragmentName );
          if( !!content ) {
            importNode = Thymol.prototype.getImportNode( element, filePart, fragmentName, fragmentPart, argsCount, content, true ); 
          }
          else {
            fragment = null;
            importError = null;
            if( filePart != "" ) { // Signifies v2.1 local fragment
              fileName = filePart + thymol.templateSuffix;
              var textContent = getFile( fileName );
              content = thymol.thDomParse( textContent, "text/html" );
              fragment = Thymol.prototype.getImportNode( element, filePart, fragmentName, fragmentPart, argsCount, content, false );
            }
            else {
              fragment = Thymol.prototype.getImportNode( element, filePart, fragmentName, fragmentPart, argsCount, thymol.thDocument, false );
            }
            if( fragment == null ) {
              thymol.error( false, "processImport fragment import failed: " + filePart + " fragment: " + fragmentPart, element );
            }
            else {
              importNode = fragment;
            }
          }
          var isNode = thymol.thReplace.name == attr.localName || thymol.thReplace.synonym == attr.localName || thymol.thSubstituteby.name == attr.localName || thymol.thSubstituteby.synonym == attr.localName;
          Thymol.prototype.doReplace( isNode, element, importNode );
          changed = true;
        }
      }      
      element.removeAttribute( attr.name );
      return changed;
    },
    
    getFromCache : function( element, filePart, fragmentName ) {
      var content = null;
      if( thymol.thFragmentCache[ filePart ] != null ) {
        var signature = Thymol.prototype.getFragmentSignature( fragmentName, element.thLocalVars ); 
        content = thymol.thFragmentCache[ filePart ][ signature ];
      }
      return content;
    },

    getImportNode : function( element, filePart, fragmentName, fragmentPart, argsCount, content, isCached ) {
      var result = null, parts, matched, fragment, htmlContent, fragArray, i, iLimit, j, jLimit, k, clean, bare, vlParts, vlArgs, argsList, varName, newElement;
      matched = false;
      fragment = null;
      if( isCached ) {
        result = content;
        matched = true;        
      }
      else if( fragmentName == "::" ) {
        htmlContent = content.getElementsByTagName( "html" )[0];
        result = htmlContent;
        matched = true;
      }
      else {       
        fragArray = content.querySelectorAll( thymol.thFragment.escpName + "," + thymol.thFragment.escpSynonym );
        for( i = 0, iLimit = fragArray.length; i < iLimit; i++ ) {
          fragment = fragArray[ i ];
          for( j = 0, jLimit = fragment.attributes.length; j < jLimit; j++ ) {
            matched = Thymol.prototype.matchAndSetArgsList( element, fragment.attributes.item(j), argsCount, fragmentName, fragmentPart );
            if( matched ) {
              break;
            }
          }
          if( matched ) {
            result = fragment;
            break;
          }
        }
      }
      if( !matched ) {
        fragment = Thymol.prototype.getDOMSelection( fragmentName, content );
        if( fragment ) {
          matched = true;
          result = fragment;
        }
        else {
          if( !element.isBlockChild ) {
            thymol.error( true, "getImportNode cannot match fragment: \"" + fragmentName + "\"", element );
          }
        }
      }
      if( matched ) {
        var signature = Thymol.prototype.getFragmentSignature( fragmentName, element.thLocalVars );        
        if( thymol.thFragmentCache[ filePart ] == null ) {
          thymol.thFragmentCache[ filePart ] = new Object();
        }        
        thymol.thFragmentCache[ filePart ][ signature ] = result;
        newElement = result.cloneNode( true );
        if( newElement.nodeType === ELEMENT_NODE ) {
          newElement.removeAttribute( thymol.thFragment.name );
          newElement.removeAttribute( thymol.thFragment.synonym );
          if( fragment !== null ) {
            fragment.removeAttribute( thymol.thFragment.name );
            fragment.removeAttribute( thymol.thFragment.synonym );            
          }
          var fragState = null;  // Set the state objects for the elements of the matched fragment
          if( filePart == "" && !!element.state ) {
            fragState = element.state;
          }
          else {
            fragState = new ThState( filePart, content );   
          }    
          var elements = newElement.getElementsByTagName( "*" );
          for( var k = 0, kLimit = elements.length; k < kLimit; k++ ) {
            elements[k].state = fragState;
          }
        
        }
        result = newElement;
        result.thLocalVars = element.thLocalVars;
      }
      return result;
    },

    getFragmentSignature : function( fragmentName, localVars ) {
      var signature = fragmentName;
/*      var argsList = localVars[ "..." ];
      if( !argsList ) {
        signature += "(";
        var baseLength = signature.length;
        for( var lvar in localVars ) {
          if( localVars.hasOwnProperty( lvar ) ) {
            if( signature.length >  baseLength ) {
              signature += ","
            } 
            signature += lvar;
          }
        }
        signature += ")";                    
      }*/
      return signature;
    },
    
    matchAndSetArgsList : function( element, attribute, argsCount, fragmentName, fragmentPart ) {
      var matched = false, k, kLimit;
      var clean = attribute.value.replace( /\s/g, "" );
      var bare = null;
      var vlParts = clean.match( thymol.varParExpr );
      if( vlParts ) {
        if( vlParts.length > 1 ) {
          bare = vlParts[ 1 ].trim();          
          if( fragmentName == bare && argsCount > 0 ) {
            var vlArgs = vlParts[ 2 ].trim().split( "," );
            if( vlArgs ) {            
              var argsList = element.thLocalVars[ "..." ]; // This is set if arg list uses positional parameters
              if( !!argsList ) {
                if( vlArgs.length == argsCount ) {
                  matched = true;
                  for( k = 0; k < argsCount; k++ ) {
                    var varName = vlArgs[ k ].trim();
                    element.thLocalVars[ varName ] = argsList[ k ];
                  }
  // Don't delete the ellipsis - it is used to signify the use of a named args list
//                    element.thLocalVars[ "..." ] = null;
                }
              }
              else { // Non-positional: match all specified names
                var vlOk = true;
                for( k = 0, kLimit = vlArgs.length; k < kLimit; k++ ) {
                  var lv = element.thLocalVars[ vlArgs[k] ];
                  if( typeof lv === "undefined" ) {
                    vlOk = false;
                    break;
                  }                
                }
                matched = vlOk;
              }
            }
          }
        }
      }
      if( fragmentName == clean || fragmentPart == clean ) {
        matched = true;
      }
      return matched;
    },
    
    getDOMSelection : function( initial, content ) {
      var junk = false, spec = initial, result = null, scope = "", query = new Array(), parts = "", innr = thymol.ThUtils.unBracket( spec ), i, iLimit, j, jLimit, k, kLimit, m, mLimit, token, indx, saved, indxed, start, selection, descend, subQuery, exprFrags, classSpecs, qTerms, subSelect, partial, html, newNode;
      if( spec != innr && innr.charAt( innr.length - 1 ) == ']' ) { // Wrapped in [] and ends with ]]
        spec = innr;
      }
      while( spec != "" && !junk ) {
        junk = true;
        parts = spec.match( domSelectExpr );
        if( parts != null && parts.length > 1 ) {
          for( i = 1, iLimit = parts.length; i < iLimit; i++ ) {
            if( !!parts[ i ] ) {
              junk = false;
              token = parts[ i ];
              indx = null;
              innr = thymol.ThUtils.unBracket( token );
              if( token != innr ) {
                if( innr.match( numericExpr ) ) {
                  indx = innr;
                }
              }
              saved = spec;
              spec = spec.replace( token, "" ); // Only replace 1st occurrence
              if( saved == spec ) {
                spec = "";
              }
              if( indx ) {
                token = query[ query.length - 1 ];
                indxed = new String( token );
                indxed.indx = indx;
                query[ query.length - 1 ] = indxed;
              }
              else {
                query.push( token.trim() );
              }
              break;
            }
          }
        }
        else {
          break;
        }
      }
      start = 0;
      if( query.length > 0 && query[ 0 ] != "" && query[ 0 ].charAt( 0 ) == '/' ) {
        scope = query[ 0 ];
        start = 1;
      }
      selection = [];
      selection.push( content );
      descend = false;

      for( i = start, iLimit = query.length; i < iLimit; i++ ) {
        subQuery = query[ i ];

        innr = thymol.ThUtils.unBracket( subQuery );
        if( subQuery != innr ) {
          innr = innr.replace( /[']/g, "\"" );
          subQuery = "";
          exprFrags = innr.split( /\s{1}\s*((?:and)|(?:or))\s{1}\s*/ );
          for( j = 0, jLimit = exprFrags.length; j < jLimit; j++ ) {
            if( exprFrags[ j ] != "and" && exprFrags[ j ] != "or" ) {
              classSpecs = exprFrags[ j ].match( /[@]?\s*(?:class)\s*(\W?[=])\s*[\"]((?:\w*[\-_]*)*)[\"]/ );
              if( classSpecs && classSpecs.length > 0 ) {
                if( classSpecs[ 1 ] == "=" ) {
                  subQuery = subQuery + "[class~='" + classSpecs[ 2 ] + "']";
                }
                if( classSpecs[ 1 ] == "^=" ) {
                  subQuery = subQuery + "[class^='" + classSpecs[ 2 ] + "'],[class*=' " + classSpecs[ 2 ] + "']";
                }
              }
              else {
                subQuery = subQuery + Thymol.prototype.cssSelectorize( "[" +  exprFrags[ j ] + "]" ) ;  // CSS selectorise here!
              }
            }
            else if( exprFrags[ j ] == "or" ) {
              subQuery = subQuery + ",";
            }
          }
        }

        qTerms = subQuery.split( "/" );
        for( j = 0, jLimit = qTerms.length; j < jLimit; j++ ) {
          var qTerm = qTerms[ j ];
          if( qTerm != "" ) {
            qTerm = qTerm.replace( /[@]/g, "" );
            subSelect = [];
            for( k = 0, kLimit = selection.length; k < kLimit; k++ ) {
              partial = [];
              if( qTerm == "text" ) {
                var iterator = thymol.thDocument.createNodeIterator( selection[ k ], SHOW_TEXT, function() { return FILTER_ACCEPT; }, true );
                var curNode;
                while (curNode = iterator.nextNode()) {
                  partial.push(curNode);
                }                                                
              }
              else if( descend ) {
                Thymol.prototype.pushMatching( partial, selection[ k ].children, qTerm, subQuery.indx );
              }
              else if( j == 0 ) {
                if( scope == "/" ) {
                  var rtn = selection[ k ];
                  html = selection[ k ].getElementsByTagName("HTML");
                  if( html.length > 0 ) {
                    rtn = html[0];
                  }
                  var bdys = rtn.getElementsByTagName("BODY");
                  for( l = 0, lLimit = bdys.length; l < lLimit; l++ ) {
                    Thymol.prototype.pushMatching( partial, bdys[l].children, qTerm, subQuery.indx );
                  }
                  scope = "";
                }
                else {
                  if( i == 0 || scope == "//" ) {
                    Thymol.prototype.pushMatchingNodes( partial, selection[ k ], qTerm, subQuery.indx );
                    scope = "";
                  }
                  else {
                    Thymol.prototype.pushMatching( partial, [ selection[ k ] ], qTerm, subQuery.indx );                    
                  }
                }
              }
              else {
                Thymol.prototype.pushMatching( partial, selection[ k ].children, qTerm, subQuery.indx );
              }
              if( partial != null ) {
                for( m = 0, mLimit = partial.length; m < mLimit; m++ ) {
                  subSelect.push( partial[ m ] );
                }
              }
            }
            selection = subSelect;
          }
        }
        descend = ( qTerms[ qTerms.length - 1 ] == "" ); // If qTerms ended with a '/' apply next query to children
      }
      result = selection;
      if( result != null && ! ( result.length === undefined ) ) {
        if( result.length > 1 ) {
          newNode = thymol.thDocument.createDocumentFragment();
          for( i = 0, iLimit = result.length; i < iLimit; i++ ) {
            var newChild = thymol.thDocument.importNode( result[ i ], true );
            newNode.appendChild( newChild );
          }
          result = newNode;
        }
        else {
          result = result[ 0 ];
        }
      }
      return result;
    },

    cssSelectorize : function( expr ) {
      var result = expr;
      var cmp = expr.indexOf( "!=" );
      if( cmp > -1 ) {
        result = ":not(" + expr.substring( 0, cmp ) + "=" + expr.substring( cmp + 2 ) + ")";        
      }
      // Handle != (not equal), ^= (starts with) and $= (ends with) by translating to CSS selection
//      var parts = expr.split( /([!\^\$]=)/ );
//      if( parts.length == 3 ) {
//        if( parts[1] == "!=" ) {
//          result = ":not(" + parts[0] + "=" + parts[2] + ")";
//        }
//      }
      return result;
    },


    pushMatching : function( result, root, selector, indx ) {
      var kLimit = root.length;
      if( !indx ) {
        for( var i = 0; i < kLimit; i++ ) {
          try {
            if( root[ i ].matches( selector ) ) {
              result.push( root[ i ] );
            }                    
          }
          catch(err) {            
          }
        }        
      }
      else {
        var si = Number.parseInt( indx );
        var ki = 0;
        for( var i = 0; i < kLimit; i++ ) {
          try {
            if( root[ i ].matches( selector ) ) {
              if( ki === si ) {
                result.push( root[ i ] );
                break;
              }
              ki++;
            }        
          }
          catch(err) {            
          }
        }               
      }
    },

    pushMatchingNodes : function( result, rootNode, selector, indx ) {
      var iterator = thymol.thDocument.createNodeIterator( rootNode, SHOW_ALL, 
          function( node ) {
            if( node.nodeType === ELEMENT_NODE ) {
              try {
                return node.matches( selector ) ? FILTER_ACCEPT : FILTER_REJECT;
              }
              catch(err) {
                return FILTER_REJECT;
              }
            }
            else {
              return node.nodeName.toLowerCase() === selector.toLowerCase() ? FILTER_ACCEPT : FILTER_REJECT;
            }            
          }, false );
        var curNode;
        if( !indx ) {
          while (curNode = iterator.nextNode()) {
            result.push(curNode);
          }          
        }
        else {
          var cnt = 0;
          indx = Number.parseInt( indx );
          while (curNode = iterator.nextNode()) {
            if( cnt === indx ) {
              result.push(curNode);
              break;
            }
            cnt++;
          }          
        }
    },
        
    getFilePath : function( part, element ) {
      var result = thymol.substitute( part, element ), mapped = null, slashpos;
      if( result ) {
        if( thymol.mappings ) {
          mapped = thymol.getMapped( result, false ); // Historically extendedMapping has always been false in getFilePath
        }
      }
      if( mapped ) {
        result = mapped;
      }
      else {
        var dotFirst = result.charAt( 0 ) === ".";
        if( result && ( thymol.useAbsolutePath || !dotFirst ) ) { // Initial period character indicates a relative path
          slashpos = result.indexOf( "/" );
          if( thymol.useAbsolutePath || slashpos >= 0 ) { // If it doesn't start with a '.', and there are no path separators, it's also treated as relative
            if( slashpos == 0 && !thymol.useAbsolutePath ) {
              result = result.substring( 1 );
            }
            var proto = "";
            if( thymol.useAbsolutePath ) {
              proto = thymol.protocol;
            }
            if( thymol.useAbsolutePath && !!thymol.absolutePath ) {
              result = proto + thymol.absolutePath + result;
            }
            else {
              if( dotFirst ) {
                result = thymol.templatePath + result;
              }
              else {
                result = proto + thymol.root + thymol.path + result;
              }
            }
          }
        }
      }
      return result;
    },

    doLiteralSubstExpr : function( param, primary ) {
      var result = param.trim(), term, subst, lsp;
      if( thymol.ThUtils.isLiteralSubst( result ) ) {
        result = this.decodeLiteralSubst( result );
      }
      else {
        term = primary;
        while( term != null ) {
          if( thymol.ThUtils.isLiteralSubst( term ) ) {
            subst = this.decodeLiteralSubst( term );
            result = result.replace( term, subst );
            lsp = result.match( litSubstExpr );
            if( lsp && lsp.length > 0 ) {
              term = lsp[ 1 ];
            }
            else {
              break;
            }
          }
          else {
            break;
          }
        }
      }
      return result;
    },

    decodeLiteralSubst : function( param ) {
      var result = param, parts, rep, i, iLimit;
      result = result.trim();
      result = result.substring( 1, result.length - 1 );
      result = result.replace( /[\']/g, "&#39;" );
      parts = result.split( varRefExpr );
      if( parts && parts.length > 0 ) {
        rep = "";
        for( i = 0, iLimit = parts.length; i < iLimit; i++ ) {
          if( parts[ i ] != "" ) {
            if( !parts[ i ].match( varRefExpr ) ) {
              parts[ i ] = "'" + parts[ i ] + "'";
            }
            if( rep == "" ) {
              rep = parts[ i ];
            }
            else {
              rep = rep + "+" + parts[ i ];
            }
          }
        }
        result = rep;
      }
      return result;
    },

    doReplace : function( isNode, element, content ) {
      if( isNode ) {
        var parent = element.parentNode;
        if( content.nodeName.toLowerCase() == "html" ) {
          this.doInsertion( element, content, function( e, n ) {
            if( n.nodeType === ELEMENT_NODE ) {
              n.removeAttribute( thymol.thFragment.name );
              n.removeAttribute( thymol.thFragment.synonym );
            }
            e.parentNode.insertBefore( n, e );
          } );
          parent.removeChild( element );
        }
        else {
          var node = this.doClone( content, parent.ownerDocument );
          parent.replaceChild( node, element );
          if( node.nodeType === ELEMENT_NODE ) {
            node.removeAttribute( thymol.thFragment.name );
            node.removeAttribute( thymol.thFragment.synonym );
          }
        }
      }
      else {
        try {
          while( element.firstChild != null ) {
            element.removeChild( element.firstChild );
            if( element.firstChild == null ) {
              break;
            }
          }
          if( element.nodeType === DOCUMENT_NODE ) { // document node
            if( content.nodeType !== DOCUMENT_NODE ) {
              element.appendChild( content );
            }
            else {
              if( content.childNodes !== null ) {
                var cNodes = content.childNodes.length;
                if( cNodes > 0 ) {
                  for( i = 0; i < cNodes; i++ ) {
                    var iNode = content.childNodes[ i ];
                    if( !!iNode && iNode.nodeType !== DOCUMENT_NODE && iNode.nodeType !== DOCUMENT_TYPE_NODE && iNode.nodeType !== DOCUMENT_FRAGMENT_NODE ) {
                      element.appendChild( iNode );
                    }
                  }
                }
              }
            }
          }
          else {
            this.doInsertion( element, content, function( e, n ) {
              if( n.nodeType === ELEMENT_NODE ) {
                n.removeAttribute( thymol.thFragment.name );
                n.removeAttribute( thymol.thFragment.synonym );
              }
              e.appendChild( n );
            } );
          }
        }
        catch( err ) { // Work-around for IE
          element.innerHTML = content.innerHTML;
        }
      }
    },

    doClone : function( old, targetDoc ) {
      var node, cNodes, i, iNode, aNode;
      if( !!old.parentNode && old.parentNode.ownerDocument === targetDoc ) {
        node = old.cloneNode( false );
      }
      else {
        node = targetDoc.importNode( old, false );
      }
      if( node !== null ) {
        if( node.nodeType === ELEMENT_NODE ) {
          if( old.thLocalVars !== null ) {
            node.thLocalVars = old.thLocalVars;
            node.state = old.state;
          }
          if ( node.nodeName.toLowerCase() == "script" ) {
            node.setAttribute( "thScript", "true" );
          }
        }
        if( old.childNodes !== null ) {
          cNodes = old.childNodes.length;
          if( cNodes > 0 ) {
            for( i = 0; i < cNodes; i++ ) {
              iNode = old.childNodes[ i ];
              if( iNode !== null ) {
                aNode = this.doClone( iNode, targetDoc );
                if( aNode !== null ) {
                  if (aNode.nodeName.toLowerCase() == "script") {
                      aNode.setAttribute( "thScript", "true" );
                  }                                                                        
                  node.appendChild( aNode );
                }
              }
            }
          }
        }
      }
      return node;
    },

    doInsertion : function( element, content, func ) {
      var topLevel = true, parent = element.parentElement, i, iLimit, iNode, elementName, j, jLimit, jNode, cJNode, cINode;
      if( parent != null ) {
        topLevel = ( element.parentElement.nodeName.toLowerCase() == "html" );
      }
      for( i = 0, iLimit = content.childNodes.length; i < iLimit; i++ ) {
        iNode = content.childNodes[ i ];
        if( iNode ) {
          if( !topLevel ) {
            elementName = iNode.nodeName.toLowerCase();
            if( elementName != "head" ) { // Don't insert head if not at top level
              if( elementName == "body" ) { // Skip body element if not at top level and just insert it's children
                for( j = 0, jLimit = iNode.childNodes.length; j < jLimit; j++ ) {
                  jNode = iNode.childNodes[ j ];
                  if( jNode ) {
                    cJNode = this.doClone( jNode, parent.ownerDocument );
                    func( element, cJNode );
                  }
                }
              }
              else {
                cINode = this.doClone( iNode, parent.ownerDocument );
                func( element, cINode );
              }
            }
          }
          else { // Insert anything at top level
            cINode = this.doClone( iNode, parent.ownerDocument );
            func( element, cINode );
          }
        }
      }
    },

    getThParam : function( paramName, isBoolean, isPath, defaultValue ) {
      var localValue = defaultValue, globalValue, theParam = thymol.ThUtils.getParameter( paramName );
      if( !!thymol.thWindow ) {
        globalValue = thymol.thWindow[ paramName ];
      }
      if( typeof globalValue === "undefined" ) {
        globalValue = thymol.applicationContext.javascriptify( paramName );
      }
      if( !!theParam ) {
        if( theParam instanceof ThParam ) {
          if( theParam.globalValue !== globalValue ) {
            theParam.globalValue = globalValue;
            theParam.value = globalValue;
            localValue = globalValue;
          }
        }
        if( isBoolean ) {
          localValue = theParam.getBooleanValue();
        }
      }
      else {
        if( ! ( typeof globalValue === "undefined" ) ) {
          if( globalValue != null ) {
            if( isBoolean ) {
              localValue = ( globalValue == true );
            }
            else {
              localValue = globalValue;
            }
          }
        }
      }
      if( !isBoolean && isPath && localValue.length > 0 && localValue.charAt( localValue.length - 1 ) != '/' ) {
        localValue = localValue + '/';
      }
      thymol.applicationContext.createVariable( paramName, localValue );
      return localValue;
    }

  };
  function addDialect( spec ) {
    var i, iLimit, prec = thymol.thDefaultPrecedence;
    if( spec !== null && typeof spec !== "undefined" ) {
      if( spec.attributeProcessors !== null && typeof spec.attributeProcessors !== "undefined" ) {
        for( i = 0, iLimit = spec.attributeProcessors.length; i < iLimit; i++ ) {
          if( spec.attributeProcessors[ i ].precedence !== null && typeof spec.attributeProcessors[ i ].precedence !== "undefined" ) {
            prec = spec.attributeProcessors[ i ].precedence;
          }
          else {
            prec = thymol.thDefaultPrecedence;
          }
          configureAttributeProcessor( spec.prefix, spec.attributeProcessors[ i ].name, spec.attributeProcessors[ i ].processor, prec, spec.attributeProcessors[ i ].override, null );
        }
      }
      if( spec.elementProcessors !== null && typeof spec.elementProcessors !== "undefined" ) {
        for( i = 0, iLimit = spec.elementProcessors.length; i < iLimit; i++ ) {
          configureElementProcessor( spec.prefix, spec.elementProcessors[ i ].name, spec.elementProcessors[ i ].processor );
        }
      }
      if( spec.objects !== null && typeof spec.objects !== "undefined" ) {
        for( i = 0, iLimit = spec.objects.length; i < iLimit; i++ ) {
          if( spec.objects[ i ].name !== null && typeof spec.objects[ i ].name !== "undefined" ) {
            spec.objects[ i ].object.thExpressionObjectName = spec.objects[ i ].name;
            configureModule( spec.objects[ i ].object );
          }
          else {
            configureModule( spec.objects[ i ] );
          }
        }
      }
    }
  }
  
  function getFile( file, report ) {
    var content = thymol.thFragmentCache[ file ];
    if( content == null ) {
      content = thymol.readFile( file, report );
      thymol.thFragmentCache[ file ] = content;
    }
    return content;
  }
  
  var globalEval = (function() {  // Ace Kangax - http://perfectionkills.com/global-eval-what-are-the-options/
    var isIndirectEvalGlobal = (function(original, Object) {
      try {
        // Does `Object` resolve to a local variable, or to a global, built-in `Object`,
        // reference to which we passed as a first argument?
        return (1,eval)('Object') === original;
      }
      catch(err) {
        // if indirect eval errors out (as allowed per ES3), then just bail out with `false`
        return false;
      }
    })(Object, 123);

    if (isIndirectEvalGlobal) {

      // if indirect eval executes code globally, use it
      return function(expression) {
        return (1,eval)(expression);
      };
    }
    else if (typeof thymol.thWindow.execScript !== 'undefined') {

      // if `window.execScript exists`, use it
      return function(expression) {
        return thymol.thWindow.execScript(expression);
      };
    }
    // otherwise, globalEval is `undefined` since nothing is returned
  })();  

  function loadScript( file ) {
    var script = Thymol.prototype.getFilePath( file );
    var content = getFile( script );
    globalEval( content );
  }
  
  function diffTail( region, path ) {
    var result = path;
    if( !!region ) {
      var regParts = region.split("/");      
      if( !!path ) {
        var pathParts = path.split("/");
        for( var k = 0, kLimit = pathParts.length; k < kLimit; k++ ) {
          if( pathParts[k] !== regParts[k] ) {
            break;
          }
        }
        if( k < kLimit ) {
          result = pathParts.slice(k).join("/");
        }      
      }
    }
    return result;
  } 

  function pointInCode( element ) {
    var elements = element.state.dom.getElementsByTagName( "*" );
    var count = 0;
    for( var k = 0, kLimit = elements.length; k < kLimit; k++ ) {
      if( element.tagName === elements[k].tagName ) {
        count++;
        if( element.isSameNode( elements[k] ) ) {
          break;
        }
      }
    }
    var lineInFile = undefined;
    var columnInFile = undefined;
    var tabsBeforeColumnInFile = undefined;
    if( count >= 0 ) {
      var html = element.state.content.toLowerCase();
      var result;
      var tag = "<" + element.tagName.toLowerCase();      
      result = findNthOccurence( html, tag, count, 0, html.length );
      var elementPosition = result.nextPosition;
      var startPosition = 0;
      if( count > 0 ) {        
        result = findNthOccurence( html, "\n", -1, 0, elementPosition );
        startPosition = result.position;
        lineInFile = result.matchCount + 1;        
        result = findNthOccurence( html, "\t", -1, startPosition, elementPosition );
        tabsBeforeColumnInFile = result.matchCount;
      }
      columnInFile = elementPosition - startPosition;
    }
    return {
        line : lineInFile,
        column : columnInFile,
        tabs : tabsBeforeColumnInFile
    };
  }  
  
  function findNthOccurence( range, item, n, start, stop ) {
    var position = start;
    var nextPosition = -1;
    var matchCount = 0;
    while( true ) {
      nextPosition = range.indexOf( item, position );
      if( nextPosition >= 0 ) {
        if( nextPosition >= stop ) {
          break;
        }                    
        matchCount++;
        if( matchCount === n ) {
          break;
        }        
        position = nextPosition + 1;
      }
      else {
        break;
      }
    }
    return {
      position: position,
      nextPosition: nextPosition,
      matchCount: matchCount
    };    
  }
  
  function error( doThrow, text, element, source ) {
    var exception = thymol.handleError( new thymol.ThError( doThrow, text, element, source ) );
    if( !!exception ) {
      throw exception;
    }
  }
  
  /* Thymol internal classes */

  function ThError( doThrow, text, element, source ) {
    this.name = "ThError";
    this.doThrow = doThrow;
    if( element !== null && typeof element !== "undefined" && element.isBlockChild ) {
      this.suppress = true;
    }
    else {
      this.suppress = false;
    }
    this.element = element || {};
    var message = text || "Default Message";
    if( !this.element.state ) {
      this.element.state = new thymol.ThState( "", thymol.thDocument );
    }
    this.point = {};
    if( !!this.element.state ) {
      this.point = pointInCode( this.element );
      message+= "\n\nError in: " + diffTail( thymol.location, this.element.state.file ) + " at line: " + this.point.line + " column: " + this.point.column + ( this.point.tabs > 0 ? " (" + this.point.tabs + "tabs)" : "" );
    }
    this.message = message;
    if( !!source ) {
      if( !!source.stack ) {
        this.stack = source.stack;
      }
    }
  }
  ThError.prototype = new Error();
  ThError.prototype.constructor = ThError;
  
  function ThState( filePart, domArg ) {
    var fileName = filePart;
    if( filePart != "" ) {      
      if( !filePart.endsWith( thymol.templateSuffix )  ) {
        fileName = fileName + thymol.templateSuffix;
      }
    }
    else {
      fileName = thymol.templateName + thymol.templateSuffix;
    }
    this.file = fileName;
    this.content = getFile( fileName );
    this.dom = domArg;    
  }
  
  function ThParam( valueArg ) {
    this.value = valueArg;
    this.globalValue;
    this[ "class" ] = new thymol.ThClass( "Thymol.ThParam" );
    this.getBooleanValue = function() {
      return !thymol.ThUtils.testLiteralFalse( this.value );
    };
    this.toString = function() {
      return this.value;
    };
    this.getNumericValue = function() {
      return Number( this.value );
    };
  }

  function ThAttr( suffix, func, prec, list, pref, dataAttr ) {
    var prefix = "", dataPrefix = null, escpPrefix = "";
    if( typeof pref !== "undefined" && pref !== null ) {
      prefix = pref + ":";
      if( thymol.thThymeleafPrefixList.indexOf( prefix ) < 0 ) {
        thymol.thThymeleafPrefixList.push( prefix );
      }
      escpPrefix = pref + "\\:";
      if( typeof dataAttr === "undefined" || dataAttr === null ) {
        dataPrefix = thymol.dataPrefix + "-" + pref + "-";
        if( thymol.thThymeleafPrefixList.indexOf( dataPrefix ) < 0 ) {
          thymol.thThymeleafPrefixList.push( dataPrefix );
        }
      }
      else {
        dataPrefix = dataAttr;
      }
    }

    // Need name, synonym, escpName and escpSynonym
    this.suffix = suffix;
    this.name = prefix + suffix;
    this.regex = null;
    if( suffix.indexOf( '*' ) >= 0 || suffix.indexOf( '?' ) >= 0 || suffix.indexOf( '+' ) >= 0 || suffix.indexOf( '\\' ) >= 0 || suffix.indexOf( '|' ) >= 0 || suffix.indexOf( '[' ) >= 0 || suffix.indexOf( ']' ) >= 0 || suffix.indexOf( '{' ) >= 0 || suffix.indexOf( '}' ) >= 0 ) {
      if( "*" === suffix ) {
        suffix = ".*";
      }
      suffix = prefix + suffix;
      this.regex = new RegExp( suffix );
    }
    this.escpName = "[" + escpPrefix + suffix + "]";
    if( dataPrefix !== null ) {
      this.synonym = dataPrefix + suffix;
      this.escpSynonym = "[" + this.synonym + "]";
    }
    else {
      this.synonym = null;
      this.escpSynonym = null;
    }
    if( typeof prec !== "undefined" && prec !== null ) {
      this.precedence = prec;
    }
    else {
      this.precedence = thymol.thDefaultPrecedence;
    }
    if( !!list ) {
      var attrList = list[ pref ];
      if( !attrList ) {
        attrList = [];
        list[ pref ] = attrList;
        if( dataPrefix !== null ) {
          list[ dataPrefix ] = attrList;
        }
      }
      attrList.push( this );
    }
    this.process = function() {
      thymol.error( false, "unsupported processing function for attribute \"" + this.name + "\"" );
    };
    if( ! ( typeof func === "undefined" ) ) {
      this.process = func;
    }
    this.disable = function() {
      thymol.thDisabledList.push( this );      
      this.saveName = this.name;
      this.saveEscpName = this.escpName;
      this.saveEscpSynonym = this.escpSynonym;
      this.saveProcess = this.process;            
      this.name = null;
      this.escpName = null;
      this.escpSynonym = null;
      this.process = function() {
      };
    };
    this.reEnable = function() {      
      this.name = this.saveName;
      this.escpName = this.saveEscpName;
      this.escpSynonym = this.saveEscpSynonym;
      this.process = this.saveProcess;
    };
  }

  function ThElement( suffix, func, pref ) {
    var tha = new thymol.ThAttr( suffix, null, 0, null, pref );
    this.name = tha.name;
    this.synonym = tha.synonym;
    this.endName = "/" + tha.name;
    this.endSynonym = "/" + tha.synonym;
    this.process = function() {
      thymol.error( false, "unsupported processing function for element \"" + this.name + "\"" );
    };
    if( ! ( typeof func === "undefined" ) ) {
      this.process = func;
    }
    this.disable = function() {
      this.name = null;
      this.synonym = null;
      this.endName = null;
      this.endSynonym = null;
      this.process = null;
    };
    thymol.thThymeleafElementsList.push( this );
  }

  function ThSet() {
    this.that = this;
    this.setSize = 0;
    this.isContent = function( k ) {
      return ( this.hasOwnProperty( k ) && typeof this[ k ] !== "function" && k !== "that" && k !== "setSize" );
    };
    this.add = function( k ) {
      var contained = typeof this[ k ] !== "undefined";
      this[ k ] = k;
      if( contained !== ( typeof this[ k ] !== "undefined" ) ) {
        this.setSize++;
      }
    };
    this.addAll = function( other ) {
      var k = null, value;
      for( k in other ) {
        if( other.hasOwnProperty( k ) ) {
          value = other[ k ];
          if( typeof value !== "function" ) {
            add( value );
          }
        }
      }
    };
    this.clear = function() {
      for( var k in this ) {
        if( this.hasOwnProperty( k ) ) {
          delete this[ k ];
        }
      }
      setSize = 0;
    };
    this.contains = function( k ) {
      return typeof this[ k ] !== "undefined";
    };
    this.containsAll = function( keys ) {
      var keySet = keys, k = null;
      if( typeof keys === "Array" || Object.prototype.toString.call( keys ) === '[object Array]' ) {
        keySet = ThSet.prototype.fromArray( keys );
      }
      for( k in keySet ) {
        if( keySet.hasOwnProperty( k ) ) {
          if( typeof this[ k ] === "undefined" ) {
            return false;
          }
        }
      }
      return true;
    };
    this.isEmpty = function() {
      return this.setSize === 0;
    };
    this.size = function() {
      return this.setSize;
    };
    this.remove = function( k ) {
      var contained = typeof this[ k ] !== "undefined";
      delete this[ k ];
      if( contained !== ( typeof this[ k ] !== "undefined" ) ) {
        this.setSize--;
      }
    };
    this.toArray = function() {
      return getArray( this );
    };
    this.toString = function() {
      var array = getArray();
      return array.toString();
    };
    function getArray( obj ) {
      var array = [], k = null, value;
      for( k in obj ) {
        if( obj.hasOwnProperty( k ) && k !== "that" && k !== "setSize" ) {
          value = obj[ k ];
          if( typeof value !== "function" ) {
            array.push( value );
          }
        }
      }
      return array;
    }
  }
  ThSet.prototype.fromArray = function( array ) {
    var set = new thymol.ThSet(), i, iLimit;
    for( i = 0, iLimit = array.length; i < iLimit; i++ ) {
      set.add( array[ i ] );
    }
    return set;
  };

  function ThMap() {
    ThSet.apply( this );
    this.containsKey = function( k ) {
      return this.contains( k );
    };
    this.containsValue = function( target ) {
      var k = null, value;
      for( k in this.that ) {
        if( this.that.hasOwnProperty( k ) && k !== "that" ) {
          value = this.that[ k ];
          if( value === target ) {
            return true;
          }
        }
      }
      return false;
    };
    this.entrySet = function() {
      return this.that;
    };
    this.get = function( k ) {
      return this.that[ k ];
    };
    this.keySet = function() {
      return this.that;
    };
    this.put = function( k, v ) {
      var contained = typeof this[ k ] !== "undefined";
      this.that[ k ] = v;
      if( contained !== ( typeof this[ k ] !== "undefined" ) ) {
        this.setSize++;
      }
    };
    this.putAll = function( t ) {
      for( var k in t ) {
        put( k, t[ k ] );
      }
    };
    this.values = function() {
      return this.that;
    };
  }
  ThMap.prototype = new ThSet();
  ThMap.prototype.constructor = ThMap;

  function ThObject( dolly ) {
    for( prop in dolly ) {
      if( dolly.hasOwnProperty( prop ) ) {
        if( prop ) {
          if( !this[ prop ] ) {
            this[ prop ] = dolly[ prop ];
          }
        }
      }
    }
    this[ "class" ] = new thymol.ThClass( "Thymol.ThObject" );
    this.toNonThObject = function() {
      var plain = {};
      for( prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
          if( prop ) {
            if( !plain[ prop ] ) {
              if( prop !== "toNonThObject" ) {
                if( prop !== "class" || ( prop === "class" && this[ prop ] !== null && this[ prop ].name !== "Thymol.ThObject" ) ) {
                  plain[ prop ] = this[ prop ];
                }
              }
            }
          }
        }
      }
      return plain;
    };
  }

  function ThVarsAccessor( storeArg, storeNameArg ) {
    this.store = storeArg;
    this.arrayName = storeNameArg;
    this.length = function() {
      return this.store.length;
    };
    this.get = function( name ) {
      return this.store[ name ];
    };
    this.set = function( name, value ) {
      this.store[ name ] = value;
    };
  }

  function ThClass( nValue ) {
    this.name = nValue;
  }

  return {

    Thymol : Thymol,
    ThError : ThError,
    ThState : ThState,
    ThParam : ThParam,

    ThAttr : ThAttr,
    ThElement : ThElement,
    ThSet : ThSet,
    ThMap : ThMap,
    ThObject : ThObject,
    ThVarsAccessor : ThVarsAccessor,
    ThClass : ThClass,

    fileSystem: thymol.fileSystem,
    getFileContent : thymol.getFileContent,
    getXMLHttpRequest : thymol.getXMLHttpRequest,
    thDomParse : thymol.thDomParse,
    thDocument : thymol.thDocument,
    thWindow : thymol.thWindow,
    thTop : thymol.thTop,
    thRequest : thymol.thRequest,

    thVersion : thymol.thVersion,
    thReleaseDate : thymol.thReleaseDate,
    thURL : thymol.thURL,
    thAltURL : thymol.thAltURL,

    thFragment : thymol.thFragment,
    thRemove : thymol.thRemove,
    thBlock : thymol.thBlock,

    thScriptName : thymol.thScriptName,

    thDefaultPrefix : thymol.thDefaultPrefix,
    thDefaultDataPrefix : thymol.thDefaultDataPrefix,
    thDefaultPrecision : thymol.thDefaultPrecision,
    thDefaultProtocol : thymol.thDefaultProtocol,
    thDefaultLocale : thymol.thDefaultLocale,
    thDefaultPrecedence : thymol.thDefaultPrecedence,

    thDefaultMessagePath : thymol.thDefaultMessagePath,
    thDefaultResourcePath : thymol.thDefaultResourcePath,
    thDefaultMessagesBaseName : thymol.thDefaultMessagesBaseName,
    thDefaultRelativeRootPath : thymol.thDefaultRelativeRootPath,
    thDefaultExtendedMapping : thymol.thDefaultExtendedMapping,
    thDefaultLocalMessages : thymol.thDefaultLocalMessages,
    thDefaultDisableMessages : thymol.thDefaultDisableMessages,
    thDefaultTemplateSuffix : thymol.thDefaultTemplateSuffix,
    thDefaultInlineQuote : thymol.thDefaultInlineQuote,

    thThymeleafPrefixList : thymol.thThymeleafPrefixList,
    thDisabledList : thymol.thDisabledList,
    thThymeleafElementsList : thymol.thThymeleafElementsList,
    thImportAttrList : thymol.thImportAttrList,

    thLocation : thymol.thLocation,
    
    varParExpr : thymol.varParExpr,

    messagePath : thymol.messagePath,
    resourcePath : thymol.resourcePath,
    relativeRootPath : thymol.relativeRootPath,
    messagesBaseName : thymol.messagesBaseName,
    extendedMapping : thymol.extendedMapping,
    scriptPath : thymol.scriptPath,
    absolutePath : thymol.absolutePath,
    useAbsolutePath : thymol.useAbsolutePath,
    useFullURLPath : thymol.useFullURLPath,
    localMessages : thymol.localMessages,
    indexFile : thymol.indexFile,
    disableMessages : thymol.disableMessages,
    templateSuffix : thymol.templateSuffix,

    prefix : thymol.prefix,
    dataPrefix : thymol.dataPrefix,
    templateName : thymol.templateName,
    templatePath : thymol.templatePath,
    objects : thymol.objects,

    reset: reset,
    setup: setup,
    execute : execute,
    error: error,

    isClientSide : isClientSide,
    updatePrefix : updatePrefix,
    init : init,
    ready : ready,
    addDialect : addDialect,
    getFile : getFile,
    loadScript : loadScript,
    isFragmentChild : isFragmentChild,
    preProcess : preProcess,
    substitute : substitute,
    substituteParam : substituteParam,

    configureModule : configureModule,
    configureAttributeProcessor : configureAttributeProcessor,
    configureElementProcessor : configureElementProcessor,
    configurePreExecution : configurePreExecution,
    configurePostExecution : configurePostExecution,

    getStandardURL : getStandardURL,
    getMessage : getMessage,
    getExpression : getExpression,
    getWith : getWith,
    getParsedExpr : getParsedExpr,
    getLocale : getLocale,
    getMapped : getMapped,
    getBooleanValue : getBooleanValue,

    setLocale : setLocale

  };

}();
