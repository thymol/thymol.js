/*
  This is a Thymol extension to implement the multiple data attribute helper dialect as discussed
  here: http://forum.thymeleaf.org/Attribute-Processor-for-multiple-attributes-td4028422.html
*/

thymol.configurePreExecution( function() {
  thymol.addDialect({
    prefix: 'th',
    attributeProcessors: [ {
      name: 'data*',
      processor: function(element, attr, thAttr) {
        var attrName = attr.nodeName.toString();
        var exprValue = thymol.getExpression(attr.nodeValue, element);
        var dataAttr = attrName.substring(3, attrName.length);
        element.setAttribute(dataAttr, exprValue);
        element.removeAttribute(attr.name);
        return true;
      },
      precedence : 60
    } ]
  });  
});