/*

  This is a Thymol extension to emulate the behaviour of the "Say Hello!" example dialect from http://www.thymeleaf.org/sayhelloextendingthymeleaf5minutes.html.
  (Sorry if it takes longer than 5 minutes!)
 */

var SAYTO_PLANET_MESSAGE = "msg.helloplanet";

function sayToAttrProcessor(element, attr, thAttr) {
	doMessage(element,"Hello, "  + attr.nodeValue);
	element.removeAttribute(attr.name);
	return true; // We modified the DOM, return "true"
}

function sayToPlanetAttrProcessor(element, attr, thAttr) {	
	var exprValue = thymol.getExpression(attr.nodeValue, element);
	var message = thymol.objects.thMessagesObject.msgWithParams(SAYTO_PLANET_MESSAGE,[exprValue]);
	doMessage(element,message);
	element.removeAttribute(attr.name);
	return true; // We modified the DOM, return "true"
}

function doMessage(element,text) {
	while (element.firstChild != null) {
		element.removeChild(element.firstChild);
		updated = true;
		if (element.firstChild == null) {
			break;
		}
	}
	var newTextNode = element.ownerDocument.createTextNode(text);
	element.appendChild(newTextNode);	
}

thymol.configurePreExecution( function() {
    thymol.addDialect({
	   	 prefix: 'hello',
	   	 attributeProcessors: [
	   	   {
	   	     name: 'sayto',
	   	     processor: sayToAttrProcessor,
	   	     precedence : 10000
	   	   },
	   	   {
	   	     name: 'saytoplanet',
	   	     processor: sayToPlanetAttrProcessor,
	   	     precedence : 11000
	   	   }
	   	 ]
	   }); 	
});
