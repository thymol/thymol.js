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
