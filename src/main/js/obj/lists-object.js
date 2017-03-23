/*

	toList(Object)
	size(List<?>)
	isEmpty(List<?>)
	contains(List<?>, Object)
	containsAll(List<?>, Object[])
	containsAll(List<?>, Collection<?>)
	sort(List<T>)
	sort(List<T>, Comparator<? super T>)

 */

thymol.objects.thListsObject = function() {

  var thExpressionObjectName = "#lists";

  function sort( list, comparator ) {
    if( list !== null ) {
      if( arguments.length > 1 ) {
        if( comparator !== null ) {
          if( typeof comparator === "function" ) {
            return list.sort( comparator );
          }
          listsError( "sort Cannot execute list sort: comparator is not a function", this );
        }
        listsError( "sort Cannot execute list sort: comparator is null", this );
      }
      return list.sort();
    }
    listsError( "sort Cannot execute list sort: list is null", this );
  }

  function listsError( text, element ) {
    thymol.error( true, "#lists." + text, element );
  }

  return {
    thExpressionObjectName : thExpressionObjectName,
    toList : thymol.objects.thArraysObject.toArray,
    size : thymol.objects.thArraysObject.length,
    isEmpty : thymol.objects.thArraysObject.isEmpty,
    contains : thymol.objects.thArraysObject.contains,
    containsAll : thymol.objects.thArraysObject.containsAll,
    sort : sort
  };

}();