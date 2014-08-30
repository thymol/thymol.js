/*
  This is a Thymol extension to implement Max Bruchmann's "data" dialect (see https://github.com/mxab/thymeleaf-extras-data-attribute).
*/

thymol.configurePreExecution( function() {
    thymol.addDialect({
	   	 prefix: 'data',
	   	 attributeProcessors: [ {
	   	     name: '*',
	   	     processor: function(element, attr, thAttr) {
	   		  	var splits = attr.nodeName.toString().split("data:");
	   	   		if( splits && splits.length > 1 ) {
	   	   			var exprValue = thymol.getExpression(attr.nodeValue, element);
	   	   			element.setAttribute( "data-" + splits[1], exprValue);
	   	   		}
	   	   		element.removeAttribute(attr.name);
	   	   		return true;
	   	     },
	   	     precedence : 600
	   	  } ]
	}); 	
});