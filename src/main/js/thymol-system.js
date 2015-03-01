
( function() {
  var DOMParser_proto = thymol.thDomParser.prototype, real_parseFromString = DOMParser_proto.parseFromString;
  try {
    if( ( new thymol.thDomParser() ).parseFromString( "", "text/html" ) ) {
      return;
    }
  }
  catch( ignore ) {
    // Do nothing
  }
  DOMParser_proto.parseFromString = function( markup, type ) {
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
      res = real_parseFromString.apply( this, arguments );
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
