/*

  This is a Thymol extension to emulate the behaviour of the Spring dialect th:field attribute.
  Implements only enough functionality to get the STSM examples to do something!

 */

function fieldAttrProcessor(element, attr, thAttr) {
	var varExpr = new RegExp("[\*]{1}\{([^}]*)\}$"), fieldName = null, expr = attr.nodeValue, domUpdated = false, args, type, exprValue;
	if (expr) {
		expr = expr.trim();
		args = expr.match(varExpr);
		if (args) {
			fieldName = args[1];
			thymol.objects.thIdsObject.seq(fieldName);
		}
	}
	var name = element.nodeName.toLowerCase();
	if (name === "input") {
		type = element.getAttributeNode("type");
		if (type) {
			var inputType = type.nodeValue;
			if (inputType === "checkbox") {
				element.setAttribute("name", fieldName);
				element.setAttribute("id", thymol.objects.thIdsObject.prev(fieldName));
				var child = element.ownerDocument.createElement("input");
				child.setAttribute("type", "hidden");
				child.setAttribute("value", "on");
				child.setAttribute("name", "_" + fieldName);
				element.appendChild(child);
				domUpdated = true;
			}
			else if (inputType === "text") {
				exprValue = thymol.getExpression(expr, element);
				element.setAttribute("value", exprValue);
				element.setAttribute("name", fieldName);
				element.setAttribute("id", fieldName);
			}
		}
	}
	else if (name === "select") {
		element.setAttribute("name", fieldName);
		element.setAttribute("id", fieldName);
	}
	element.removeAttribute(attr.name);
	return domUpdated;
}
