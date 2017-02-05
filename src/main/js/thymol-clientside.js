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