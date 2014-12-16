/*
  This is a Thymol extension to emulate the behaviour of the "with" dialect from https://github.com/Antibrumm/thymeleaf-extras-with-dialect.
 */

function withAttrProcessor(element, attr, thAttr) {
	var splits = attr.nodeName.toString().split("with:");
	if( splits && splits.length > 1 ) {
		var exprValue = thymol.getExpression(attr.nodeValue, element);
		if (!element.thLocalVars) {
			element.thLocalVars = {};
		}
		element.thLocalVars[splits[1]] = exprValue;
	}
	element.removeAttribute(attr.name);
	return true; // We modified the DOM, return "true"
}

thymol.configurePreExecution( function() {
    thymol.addDialect({
	   	 prefix: 'with',
	   	 attributeProcessors: [
	   	   {
	   	     name: '*',
	   	     processor: withAttrProcessor,
	   	     precedence : 600
	   	   }
	   	 ]
	   }); 	
});
