$( function() {
  thymol.jqSetup($);
  thymol.setup();
  thymol.execute( document );
} );

$( window ).on( 'unload', function() {
  if( thymol.sessionContext && thymol.sessionContext.persist ) {
    thymol.sessionContext.persist();
  }
} );