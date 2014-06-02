/*

	nullSafe(T, T)
	arrayNullSafe(T[], T)
listNullSafe(List<T>, T)
	setNullSafe(Set<T>, T)

*/

thymol.objects.thObjectsObject = function() {

	var thExpressionObjectName = "#objects";

	function nullSafe(target,defaultValue) {
		return (target != null? target : defaultValue);
	}

	function arrayNullSafe(target,defaultValue) {
		if (target !== null) {
			var result = [];
			for (var i = 0, iLimit = target.length; i < iLimit; i++) {
				result.push(nullSafe(target[i],defaultValue));
			}
			return result;
		}
		throw new ThError("#objects.arrayNullSafe Target cannot be null");		
	}

	function setNullSafe(target,defaultValue) {
		if (target !== null) {
			var result = new ThSet();
			for ( var k in target) {
				if (target.isContent(k)) {
					result.add(nullSafe(target[k],defaultValue));
				}
			}
			return result;
		}
		throw new ThError("#objects.setNullSafe Target cannot be null");		
	}
	
	return {
		thExpressionObjectName : thExpressionObjectName,
		nullSafe : nullSafe,
		arrayNullSafe : arrayNullSafe,
		listNullSafe : arrayNullSafe,
		setNullSafe : setNullSafe
	};

}();