/*

  This is a Thymol extension to emulate the behaviour of the #fields object when no errors are present.
  Implements only enough functionality to get the STSM examples to do something!

*/

var fieldsObject = function() {

	var thExpressionObjectName = "#fields";

	function hasErrors(target) {
		return false;
	}

	function errors(target) {
		return [];
	}

	
	return {
		thExpressionObjectName : thExpressionObjectName,
		hasErrors : hasErrors,
		errors : errors
	};

}();