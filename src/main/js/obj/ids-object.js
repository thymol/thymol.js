/*

arguments : Arguments
seq(Object)
next(Object)
prev(Object)

 */

thymol.objects.thIdsObject = function() {

  var thExpressionObjectName = "#ids";

  function seq( id ) {
    if( id !== null ) {
      var str = id.toString();
      var idCount = getLocal( str );
      var result = str + idCount;
      idCount++;
      setLocal( str, idCount );
      return result;
    }
    idsError( "seq ID Cannot be null", this );
  }

  function next( id ) {
    if( id !== null ) {
      var str = id.toString();
      var idCount = getLocal( str );
      return str + idCount;
    }
    idsError( "next ID Cannot be null", this );
  }

  function prev( id ) {
    if( id !== null ) {
      var str = id.toString();
      var idCount = getLocal( str );
      return str + ( idCount - 1 );
    }
    idsError( "prev ID Cannot be null", this );
  }

  function setLocal( str, idCount ) {
    if( !thymol.objects.thIdsObject.thLocalVars ) {
      thymol.objects.thIdsObject.thLocalVars = [];
    }
    if( !thymol.objects.thIdsObject.thLocalVars[ "thIdCounts" ] ) {
      thymol.objects.thIdsObject.thLocalVars[ "thIdCounts" ] = [];
    }
    thymol.objects.thIdsObject.thLocalVars[ "thIdCounts" ][ str ] = idCount;
  }

  function getLocal( str ) {
    if( !thymol.objects.thIdsObject.thLocalVars ) {
      thymol.objects.thIdsObject.thLocalVars = [];
    }
    if( !thymol.objects.thIdsObject.thLocalVars[ "thIdCounts" ] ) {
      thymol.objects.thIdsObject.thLocalVars[ "thIdCounts" ] = [];
    }
    if( !thymol.objects.thIdsObject.thLocalVars[ "thIdCounts" ][ str ] ) {
      thymol.objects.thIdsObject.thLocalVars[ "thIdCounts" ][ str ] = 1;
    }
    return thymol.objects.thIdsObject.thLocalVars[ "thIdCounts" ][ str ];
  }

  function idsError( text, element ) {
    thymol.error( true, "#ids." + text, element );
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    seq : seq,
    next : next,
    prev : prev
  };

}();