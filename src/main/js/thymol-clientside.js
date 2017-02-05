thymol.thDomParse = function( text, type ) {
  return new DOMParser().parseFromString( text, type );
};

thymol.readFile = function( uri, report ) {
  return thymol.getFileContent( uri, report );
};

thymol.getFileContent = function( url, report ) {
  var content = "";          
  try {
    var xhr = thymol.getXMLHttpRequest( xhr );
    if( thymol.thWindow.XDomainRequest ) {
      xhr.open( 'get', url );
    }
    else {
      xhr.open( 'GET', url, false );
    }
    xhr.send( null );
    if ( xhr.readyState === 4 || xhr.status === 200 ) {
      content = xhr.responseText;
    }      
  }
  catch( err ) {
    if( thymol.debug && !!report ) {
      thymol.thWindow.alert( "getFileContent failed for url: " + url + " error: " + err );
    }
  }
  return content;
};

thymol.getXMLHttpRequest = function( xhr ) {
  if( xhr === undefined ) {
      if( thymol.thWindow.XDomainRequest ) {
          xhr = new XDomainRequest();
      }
      else if( thymol.thWindow.XMLHttpRequest ) {// code for IE7+, Firefox, Chrome, Opera, Safari
          xhr = new XMLHttpRequest();
      }
      else {// code for IE6, IE5
          xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
      }
  }            
  xhr.timeout = 0;
  return xhr;
};  

( function() {
  var DOMParser_proto = thymol, real_thDomParse = DOMParser_proto.thDomParse;
  try {
    if( thymol.thDomParse( "", "text/html" ) ) {
      return;
    }
  }
  catch( ignore ) {
    // Do nothing
  }
  DOMParser_proto.thDomParse = function( markup, type ) {
    var res, doc;
    if( /^\s*text\/html\s*(?:;|$)/i.test( type ) ) {
      doc = thymol.thDocument.implementation.createHTMLDocument( "" );
      if( markup.toLowerCase().indexOf( '<!doctype' ) > -1 ) {
        doc.documentElement.innerHTML = markup;
      }
      else {
        doc.body.innerHTML = markup;
      }
      res = doc;
    }
    else {
      res = real_thDomParse.apply( this, arguments );
    }
    return res;
  };
}() );


if( !Array.indexOf ) {
  Array.prototype.indexOf = function( obj, start ) {
    for( var i = ( start || 0 ); i < this.length; i++ ) {
      if( this[ i ] === obj ) {
        return i;
      }
    }
    return -1;
  };
};

document.onreadystatechange = function() {
  if( document.readyState === "complete" ) {
    thymol.setup();
    thymol.execute( document );
  }
}

window.addEventListener( "unload", function( e ) {
  if( thymol.sessionContext && thymol.sessionContext.persist ) {
    thymol.sessionContext.persist();
  }
} );