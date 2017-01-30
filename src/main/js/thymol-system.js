
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
