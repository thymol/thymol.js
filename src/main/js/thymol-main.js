$( function() {
  thymol.jqSetup($);
  thymol.execute( document );
} );

$( window ).unload( function() {
  if( thymol.sessionContext && thymol.sessionContext.persist ) {
    thymol.sessionContext.persist();
  }
} );