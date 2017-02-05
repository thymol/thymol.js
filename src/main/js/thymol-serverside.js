thymol.readFile = function( uri, report ) {
  try {
    return thymol.fileSystem.readFileSync( uri, 'UTF-8' )
  }
  catch( err ) {
    if( thymol.debug && !!report ) {
      thymol.thWindow.alert( "readFile failed for uri: " + uri + " error: " + err );
    }
  }
};

thymol.isServerSide = function () {
  return true;
};

exports.thymol = thymol;
