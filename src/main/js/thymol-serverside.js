thymol.handleError = function( err ) { 
  var result = null;
  if( !err.suppress ) {
    if( err.doThrow ) {
      result = err;
    }
    else {
      thymol.alert( err );
    }      
  }
  return result;
}

thymol.alert = function( err ) { 
  if( thymol.debug ) {
    thymol.thWindow.alert( err.message );
  }
}

thymol.readFile = function( uri, report ) {
  try {
    return thymol.fileSystem.readFileSync( uri, 'UTF-8' )
  }
  catch( err ) {
    if( !!report ) {
      thymol.error( true, "readFile failed for uri: " + uri, thymol.thDocument, err );
    }
  }
};

thymol.isServerSide = function () {
  return true;
};

exports.thymol = thymol;
