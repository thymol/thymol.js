/*
  This is a Thymol extension to implement Max Bruchmann's "data" dialect (see https://github.com/mxab/thymeleaf-extras-data-attribute).
*/

thymol.configurePreExecution( function() {
    thymol.addDialect({
	   	 prefix: 'dt',
	   	 attributeProcessors: [ {
	   	     name: 'appear',
	   	     processor: function(element, attr, thAttr) {
             var exprValue = thymol.getExpression(attr.nodeValue, element);
	   	   		 element.removeAttribute(attr.name);
	   	   		 return false;
	   	     },
	   	     precedence : 600
	   	  } ]
	}); 	
});