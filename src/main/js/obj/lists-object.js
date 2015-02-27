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
          throw new thymol.ThError( "#lists.sort Cannot execute list sort: comparator is not a function" );
        }
        throw new thymol.ThError( "#lists.sort Cannot execute list sort: comparator is null" );
      }
      return list.sort();
    }
    throw new thymol.ThError( "#lists.sort Cannot execute list sort: list is null" );
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