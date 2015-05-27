$( function() {
  thymol.jqSetup($);
  thymol.setup();
  thymol.execute( document );
} );

$( window ).unload( function() {
  if( thymol.sessionContext && thymol.sessionContext.persist ) {
    thymol.sessionContext.persist();
  }
} );