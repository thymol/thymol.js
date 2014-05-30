(function() {

	var specAttrModList = [ "abbr", "accept", "accept-charset", "accesskey", "action", "align", "alt", "archive", "audio", "autocomplete", "axis", "background", "bgcolor", "border", "cellpadding", "cellspacing", "challenge", "charset", "cite", "class", "classid", "codebase", "codetype", "cols", "colspan", "compact", "content", "contenteditable", "contextmenu", "data", "datetime", "dir", "draggable", "dropzone", "enctype", "for", "form", "formaction", "formenctype", "formmethod", "formtarget", "frame", "frameborder", "headers", "height", "high", "href", "hreflang", "hspace", "http-equiv", "icon", "id", "keytype", "kind", "label", "lang", "list", "longdesc", "low", "manifest", "marginheight", "marginwidth", "max", "maxlength", "media", "method", "min", "name", "optimum", "pattern", "placeholder", "poster", "preload", "radiogroup", "rel", "rev", "rows", "rowspan", "rules", "sandbox", "scheme", "scope", "scrolling", "size", "sizes", "span", "spellcheck", "src", "srclang", "standby",
			"start", "step", "style", "summary", "tabindex", "target", "title", "type", "usemap", "value", "valuetype", "vspace", "width", "wrap", "xmlbase", "xmllang", "xmlspace" ];

	var fixedValBoolAttrList = [ "async", "autofocus", "autoplay", "checked", "controls", "declare", "default", "defer", "disabled", "formnovalidate", "hidden", "ismap", "loop", "multiple", "novalidate", "nowrap", "open", "pubdate", "readonly", "required", "reversed", "scoped", "seamless", "selected" ];

	var eventAttrList = [ "onabort", "onafterprint", "onbeforeprint", "onbeforeunload", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncontextmenu", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchanged", "onemptied", "onended", "onerror", "onfocus", "onformchange", "onforminput", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmessage", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onoffline", "ononline", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onreadystatechange", "onredo", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "onundo", "onunload", "onvolumechange", "onwaiting" ];

	var linkExpr = /^@{(.*?)([\(][^\)]*?[\)])?}$/;
	var literalTokenExpr = /^[a-zA-Z0-9\[\]\.\-_]*$/;

	var numericExpr = /^[+\-]?[0-9]*?[.]?[0-9]*?$/;  // Common
	var nonURLExpr = /[\$\*#]{1}\{(?:!?[^}]*)\}/;  // Common

	var varExpr = /[\$\*#@]{1}\{(!?[^}]*)\}/; // Retain the content
	
	var textInlineCommentExpr = /\[\[(.*)\]\]/;

	var javascriptInlineCommentExpr = /\/\*\[\[(.*)\]\]\*\//;
	var javascriptInlineRemainderExpr = /\s*(?:['][^']*['])*(?:["][^"]*["])*(?:[\(][^\(\)]*[\)])*(?:[\{][^\{\}]*[\}])*(?:[\[][^\[\]]*[\]])*((?:[;,\(\)\[\]:\{\}](?=(?:\s*\/\/.*?(?:\n|$)))(?:\s*\/\/.*?(?:\n|$)))|(?:\s*\/\/.*?(?:\n|$))|(?:[;,\(\)\[\]:\{\}](?=(?:\s*(?:\n|$)))(?:\s*(?:\n|$)))|(?:\s*(?:\n|$)))/;

	var thCase = new ThAttr("case", null, 275, thymol.thThymeleafPrefixList, thymol.thPrefix);
	
	getThAttribute = function(part, element) {
		var result = ThUtils.unParenthesise(part);
		result = doExpression(result, element);
		if (Object.prototype.toString.call(result) === '[object Array]') {
			if (result.length === 1) {
				result = result[0];
			}
		}
		if (result instanceof ThParam) {
			result = result.value;
		}
		return result;
	};

	doExpression = function(part, element) {
		var result = ThUtils.unParenthesise(part), isLink = false, argsList = null, args = part.match(linkExpr), expr, unq, token, mapped, commaSplit, eqSplit, i, iLimit, rhs;
		if (args) {
			if (args[1]) {
				isLink = true;
				result = args[1].trim();
				if (args[2]) {
					argsList = ThUtils.unParenthesise(args[2].trim());
				}
			}
		}
		expr = null;
		unq = ThUtils.unQuote(result);
		if (unq != result) {
			result = thymol.preProcess(unq, element);
		}
		else {
			if (literalTokenExpr.test(result)) {
				token = thymol.booleanAndNullTokens[result];
				if (!(typeof token === "undefined")) {
					result = token;
				}
				else {
					if (result.match(numericExpr)) {
						result = ThUtils.getToPrecision(result, ThUtils.getDecimalDigits(result));
					}
					else {
						expr = thymol.getExpression(result, element);
						if (expr !== undefined && expr !== null && !(expr != expr)) { // Actually not "is Nan"
							result = expr;
						}
					}
				}
			}
			else {
				if (!(result.charAt(0) == '/')) {
					expr = thymol.getExpression(result, element);
					if (expr !== null && !(expr != expr)) { // Actually not "is Nan"
						result = expr;
					}
					else {
						result = null;
					}
				}
			}
		}

		mapped = thymol.getMapped(result, true);
		if (mapped) {
			result = thymol.getWithProtocol(mapped);
		}
		if (isLink) {
			if (result == null) {
				result = "";
			}
			else {
				result = result.toString().trim();
			}
			if (!/.*:\/\/.*/.test(result)) { // Absolute URL?
				if (/^~?\/.*$/.test(result)) { // Server-relative or Context-relative?
					if (/^~.*$/.test(result)) { // Context-relative?
						result = result.substring(1);
					}
					if (/^\/\/.*$/.test(result)) {
						result = thymol.getWithProtocol(result);
					}
					else {
						result = thymol.getWithProtocol(thymol.root + result.substring(1));
					}
				}
			}
			if (argsList) {
				commaSplit = argsList.split(",");
				for (i = 0, iLimit = commaSplit.length; i < iLimit; i++) {
					eqSplit = commaSplit[i].split("=");
					if (i == 0) {
						result = result + "?" + encodeURIComponent(eqSplit[0]);
					}
					else {
						result = result + "&" + encodeURIComponent(eqSplit[0]);
					}
					if (eqSplit.length > 1 && eqSplit[1]) {
						rhs = thymol.getExpression(eqSplit[1], element);
						if (rhs != null) {
							result = result + "=" + encodeURIComponent(rhs);
						}
					}
				}
			}
		}
		return result;
	};

	processText = function(element, thUrlAttr, thAttr) {
		var url = getThAttribute(thUrlAttr.value, element), updated = false, text, newTextNode, i, iLimit, iUpper;
		if (url == null) {
			if (!thymol.allowNullText) {
				if (thymol.debug) {
					window.alert("thymol.processText cannot process: " + thUrlAttr.name + "=\"" + thUrlAttr.value + "\"\n" + element.innerHTML);
				}
				return updated;
			}
			url = "";
		}
		else {
			if ((url instanceof ThParam) || (url instanceof ThObject)) {
				if (url.value) {
					url = url.value;
				}
			}
		}
		try {
			while (element.firstChild != null) {
				element.removeChild(element.firstChild);
				updated = true;
				if (element.firstChild == null) {
					break;
				}
			}
			if ("text" == thAttr.suffix) {
				if (Object.prototype.toString.call(url) === '[object Array]') {
					text = "[";
					for (i = 0, iLimit = url.length, iUpper = url.length - 1; i < iLimit; i++) {
						text += url[i].toString();
						if (i < iUpper) {
							text += ", ";
						}
					}
					text += "]";
				}
				else {
					text = url.toString();
				}
				text = ThUtils.unescape(text);
				newTextNode = document.createTextNode(text);
				element.appendChild(newTextNode);
				updated = true;
			}
			if ("utext" == thAttr.suffix) {
				element.innerHTML = url;
			}
			element.removeAttribute(thUrlAttr.name);
		}
		catch (err) {
			if (thymol.debug) {
				window.alert("text replace error");
			}
		}
		return updated;
	};

	processSpecAttrMod = function(element, thUrlAttr, thAttrObj) {
		var url = getThAttribute(thUrlAttr.value, element);
		element.setAttribute(thAttrObj.suffix, url);
		element.removeAttribute(thUrlAttr.name);
	};

	processAttr = function(element, thUrlAttr, thAttrObj) {
		var parts = thUrlAttr.value.split(","), pos = 0, i, iLimit, pair, attrName, url, tt, existing;
		for (i = 0, iLimit = parts.length; i < iLimit; i++) {
			pair = parts[i].split("=");
			if (pair) {
				if (thAttrObj.suffix == "classappend") {
					pair[1] = pair[0];
					pair[0] = "class";
					pos = -1;
				}
				attrName = pair[0];
				if (attrName) {
					if (pair[1]) {
						if (pos >= 0) {
							pos = fixedValBoolAttrList.indexOf(attrName);
						}
						if (pos >= 0) {
							doFixedValBoolAttr(pair[1], element, attrName);
						}
						else {
							url = getThAttribute(pair[1], element);
							tt = typeof url;
							if (thAttrObj.suffix == "attrappend" || thAttrObj.suffix == "attrprepend" || thAttrObj.suffix == "classappend") {
								if (url !== null && (tt === "number" || (tt === "string" && url.length > 0))) {
									existing = element.getAttribute(attrName);
									if (existing) {
										if (thAttrObj.suffix == "attrappend") {
											url = existing + url;
										}
										else if (thAttrObj.suffix == "classappend") {
											url = existing + " " + url;
										}
										else if (thAttrObj.suffix == "attrprepend") {
											url = url + existing;
										}
									}
								}
							}
							if (url !== null && (tt === "number" || (tt === "string" && url.length > 0))) {
								element.setAttribute(attrName, url);
							}
						}
					}
				}
			}
		}
		element.removeAttribute(thUrlAttr.name);
	};

	processFixedValBoolAttr = function(element, thUrlAttr, thAttrObj) {
		var val = doFixedValBoolAttr(thUrlAttr.value, element, thAttrObj.suffix);
		if (val != null) {
			element.removeAttribute(thUrlAttr.name);
		}
		else {
			if (thymol.debug) {
				window.alert("thymol.processFixedValBoolAttr cannot process: " + thUrlAttr.name + "=\"" + thUrlAttr.value + "\"\n" + element.innerHTML);
			}
		}
	};

	doFixedValBoolAttr = function(valParam, element, attr) {
		var val = getBoolean(valParam, element);
		if (val) {
			element.setAttribute(attr, attr);
		}
		return val;
	};

	processPairedAttr = function(element, thUrlAttr, thAttrObj) {
		var url = getThAttribute(thUrlAttr.value, element);
		if (url != "") {
			if (thAttrObj.suffix === "alt-title") {
				element.setAttribute("alt", url);
				element.setAttribute("title", url);
			}
			if (thAttrObj.suffix === "lang-xmllang") {
				element.setAttribute("lang", url);
				element.setAttribute("xml:lang", url);
			}
			element.removeAttribute(thUrlAttr.name);
		}
		else {
			if (thymol.debug) {
				window.alert("thymol.processPairedAttr cannot process: " + thUrlAttr.name + "=\"" + thUrlAttr.value + "\"\n" + element.innerHTML);
			}
		}
	};

	processConditional = function(element, attr, thAttrObj) {
		var removed = false;
		if (attr.value) {
			removed = doIfOrUnless(element, attr.value, (thAttrObj.suffix === "if"));
		}
		element.removeAttribute(attr.name);
		return removed;
	};

	doIfOrUnless = function(element, value, isIf) {
		var processed = false, flag;
		if (value) {
			flag = getBoolean(value, element);
			processed = true;
			if (!flag) {
				if (isIf) { // true for "if", false for "unless"
					element.parentNode.removeChild(element);
					return true;
				}
			}
			else {
				if (!isIf) { // false for "if", true for "unless"
					element.parentNode.removeChild(element);
					return true;
				}
			}
		}
		if (!processed && thymol.debug) {
			window.alert("thymol.processConditional cannot process conditional: " + value + "\n" + element.innerHTML);
		}
		return false;
	};

	processEach = function(element, thUrlAttr, junk) {
		var elementsUpdated = false, initial = thUrlAttr.value.trim(), colonPos, varName, varNames, statVarName, expr, root, node, i, iLimit, tho, stat, count, newNode, next;
		colonPos = initial.indexOf(":");
		if (colonPos > 0) {
			varName = initial.substring(0, colonPos);
			if (varName) {
				varName = varName.trim();
				varNames = varName.split(",");
				varName = varNames[0].trim();
				if (varNames.length > 1) {
					statVarName = varNames[1].trim();
				}
				else {
					statVarName = varName + "Stat";
				}
				expr = initial.substr(colonPos + 1);
				if (expr) {
					expr = expr.trim();
					expr = thymol.getExpression(expr, element);
					if (expr instanceof ThSet) {
						expr = expr.toArray();
					}
					root = element.parentNode;
					if (expr && (expr instanceof Object) && expr.length > 0) {
						node = element;
						iLimit = expr.length;
						element.removeAttribute(thUrlAttr.name);
						for (i = 0; i < iLimit; i++) {
							tho = expr[i];
							stat = new Object();
							stat.current = tho;
							stat.size = expr.length;
							stat.index = i;
							count = i + 1;
							stat.count = count;
							if (i == 0) {
								stat.first = true;
							}
							else {
								stat.first = false;
							}
							if (i == expr.length - 1) {
								stat.last = true;
							}
							else {
								stat.last = false;
							}
							if (i % 2) {
								stat.odd = true;
								stat.even = false;
							}
							else {
								stat.odd = false;
								stat.even = true;
							}
							if (!node.thLocalVars) {
								node.thLocalVars = {};
							}
							node.thLocalVars[varName] = tho;
							node.thLocalVars[statVarName] = stat;
							if (count < expr.length) {
								newNode = element.cloneNode(true);
								if (node.nextElementSibling != null) {
									next = root.insertBefore(newNode, node.nextElementSibling);
								}
								else {
									next = root.appendChild(newNode);
								}
								node = next;
								elementsUpdated = true;
							}
						}
					}
					else {
						if (root !== null) {
							if (!element.thLocalVars) {
								element.thLocalVars = {};
							}
							if (!element.thLocalVars[varName]) {
								element.thLocalVars[varName] = new Object();
							}
							if (!element.thLocalVars[statVarName]) {
								element.thLocalVars[statVarName] = new Object();
							}
							root.removeChild(element);
							elementsUpdated = true;
						}
					}
				}
			}
		}
		return elementsUpdated;
	};

	processObject = function(element, thUrlAttr) {
		var argValue = thUrlAttr.value.trim(), val;
		if (argValue) {
			val = thymol.getExpression(argValue, element);
			if (val) {
				element.thObjectVar = val;
			}
		}
		element.removeAttribute(thUrlAttr.name);
	};

	processInline = function(element, thUrlAttr, thAttrObj) {
		var mode = getThAttribute(thUrlAttr.value, element);
		if (mode == "text") {
			doInlineText(element);
		}
		else if (mode == "javascript" || mode == "dart") {
			doInlineJavascript(element);
		}
		else {
			if (thymol.debug) {
				window.alert("thymol.processInline cannot process scripting mode: \"" + mode + "\" - it isn't supported by version \"" + thymol.thVersion + "\"\n");
			}
		}
		element.removeAttribute(thUrlAttr.name);
	};

	doInlineText = function(element) {
		var changed, value, i, iLimit, expr, term, result;
		for (i = 0, iLimit = element.childNodes.length; i < iLimit; i++) {
			do {
				changed = false;
				if (element.childNodes[i].nodeType == 1) {
					doInlineText(element.childNodes[i]);
				}
				else if (element.childNodes[i].nodeType == 3) {
					value = element.childNodes[i].nodeValue;
					if (value) {
						expr = textInlineCommentExpr.exec(value);
						if (expr) {
							term = "";
							if (expr.length > 1) {
								term = "[[" + expr[1] + "]]";
							}
							if (expr.length > 1) {
								result = getThAttribute(expr[1], element);
								result = value.replace(term, result);
								element.childNodes[i].nodeValue = result;
								changed = true;
							}
							expr = null;
						}
					}
				}
			} while (changed);
		}
	};

	doInlineJavascript = function(element) {
		var changed, value, second, i, iLimit, expr, scraps, remainder, termIndx, term, secondIndx, result;
		for (i = 0, iLimit = element.childNodes.length; i < iLimit; i++) {
			do {
				second = null;
				changed = false;
				value = element.childNodes[i].nodeValue;
				if (value) {
					expr = javascriptInlineCommentExpr.exec(value);
					if (expr) {
						termIndx = expr.index;
						term = "";
						if (expr.length > 1) {
							term = "/*[[" + expr[1] + "]]*/";
						}
						termIndx = termIndx + term.length;
						remainder = value.substring(termIndx);
						scraps = javascriptInlineRemainderExpr.exec(remainder);
						if (scraps) {
							if (scraps.length > 1) {
								secondIndx = remainder.indexOf(scraps[1]);
								second = remainder.substring(secondIndx);
								value = value.substring(0, termIndx);
								value = value + second;
							}
						}
						if (expr.length > 1) {
							result = thymol.getExpression(expr[1], element);
							if (result instanceof ThObject) {
								result = result.toNonThObject();
							}
							if (!ThUtils.isLiteral(result)) {
								result = getStringView(result);
							}
							result = value.replace(term, result);
							element.childNodes[i].nodeValue = result;
							changed = true;
						}
						expr = null;
						scraps = null;
					}
				}
			} while (changed);
		}
	};

	getStringView = function(param) {
		var view = "", objType;
		if (typeof param === 'string') {
			view = view + "'" + param + "'";
		}
		else if (typeof param === 'number' || typeof param === 'boolean') {
			view = view + param;
		}
		else if (typeof param === 'object') {
			if (param instanceof Object) {
				objType = Object.prototype.toString.call(param);
				if ("[object Array]" == objType) {
					view = getStringViewArray(param);
				}
				else if ("[object Object]" == objType) {
					view = getStringViewObject(param);
				}
			}
		}
		return view;
	};

	getStringViewArray = function(param) {
		var view = "[", i, iLimit;
		for (i = 0, iLimit = param.length; i < iLimit; i++) {
			view = view + getStringView(param[i]);
			if (i < param.length - 1) {
				view = view + ",";
			}
		}
		view = view + "]";
		return view;
	};

	getStringViewObject = function(param) {
		var view = "{", key = null;
		for (key in param) {
			if (key) {
				if (view != "{") {
					view = view + ",";
				}
				view = view + getStringView(key) + ":";
				view = view + getStringView(param[key]);
			}
		}
		view = view + "}";
		return view;
	};

	processRemove = function(element, thUrlAttr) {
		var haveRemoved = false;
		var locals = element.thLocalVars, savedLocals = element.thLocalVars, arg, nodes, first;
		if (!locals) {
			locals = {};
		}
		if (!locals["tag"]) {
			locals["tag"] = "tag";
		}
		if (!locals["body"]) {
			locals["body"] = "body";
		}
		if (!locals["none"]) {
			locals["none"] = "none";
		}
		if (!locals["all"]) {
			locals["all"] = "all";
		}
		if (!locals["all-but-first"]) {
			locals["all-but-first"] = "all-but-first";
		}
		element.thLocalVars = locals;
		arg = getThAttribute(thUrlAttr.value, element);
		element.thLocalVars = savedLocals;
		element.removeAttribute(thUrlAttr.name);
		if ("all" == arg) {
			if (element.parentNode != null) {
				element.parentNode.removeChild(element);
				haveRemoved = true;
			}
		}
		else if ("body" == arg) {
			element.innerHTML = "";
			haveRemoved = true;
		}
		else if ("tag" == arg) {
			ThUtils.removeTag(element);
			haveRemoved = true;
		}
		else if ("all-but-first" == arg) {
			nodes = element.childNodes;
			first = true;
			$(nodes).each(function() {
				if (this.nodeType == 1) {
					if (!first) {
						element.removeChild(this);
						haveRemoved = true;
					}
					first = false;
				}
			});
		}
		else if ("none" == arg || null == arg) { // V2.1 do nothing!
		}
		return haveRemoved;
	};

	processSwitch = function(element, attr) {
		var val = ThUtils.unParenthesise(attr.value), updated = false, args, matched = false, thCaseSpecs, caseClause, remove, ccAttr;
		val = getThAttribute(val, element);
		if (typeof val === 'string') {
			args = val.match(nonURLExpr);
			if (args) {
				val = args[1];
			}
		}
		val = ThUtils.unQuote(val);
		thCaseSpecs = $(thCase.escpName, element);
		thCaseSpecs.each(function() {
			caseClause = this;
			remove = true;
			$(caseClause.attributes).each(function() {
				ccAttr = this;
				if (thCase.name == ccAttr.name || thCase.synonym == ccAttr.name) {
					if (!matched) {
						matched = processCase(element, ccAttr, val);
						if (matched) {
							remove = false;
						}
					}
					caseClause.removeAttribute(ccAttr.name);
				}
			});
			if (remove) {
				element.removeChild(caseClause);
				updated = true;
			}
		});
		return updated;
	};

	processCase = function(element, attr, param) {
		var val = thymol.substitute(attr.value, element);
		val = ThUtils.unQuote(val);
		if (val == "*" || (param && (param == val))) {
			return true;
		}
		return false;
	};

	processWith = function(element, thUrlAttr) {
		thymol.getWith(element, thUrlAttr.value);
		element.removeAttribute(thUrlAttr.name);
	};

	processAssert = function(element, thUrlAttr) {
		var argValue = thUrlAttr.value.trim(), result = true, term = "", terms, i, iLimit, expr, val, flag;
		if (argValue) {
			terms = argValue.split(",");
			for (i = 0, iLimit = terms.length; i < iLimit; i++) {
				term = terms[i];
				expr = ThUtils.unParenthesise(term);
				if (expr != null) {
					val = thymol.getExpression(expr, element);
					if (val) {
						flag = this.getBoolean(val, element);
						if (!flag) {
							result = false;
							break;
						}
					}
					else {
						result = false;
						break;
					}
				}
				else {
					result = false;
					break;
				}
			}
		}
		if (!result) {
			if (argValue != term) {
				argValue = " list is: " + argValue;
			}
			else {
				argValue = "";
			}
			if (term != "") {
				term = " false term is: \"" + term + "\"";
			}
			if (thymol.debug) {
				window.alert("thymol.processAssert assertion failure -" + argValue + term + "\n");
			}
		}
		element.removeAttribute(thUrlAttr.name);
	};

	processFragment = function(element, thUrlAttr, thAttrObj) {
		element.removeAttribute(thUrlAttr.name);
	};

	getBoolean = function(param, element) {
		if (param == null) {
			return false;
		}
		if (typeof param === "boolean") {
			return param;
		}
		else if (typeof param === 'number') {
			return param != 0;
		}
		var initial = ThUtils.unParenthesise(param), negate = false, val, args, flag;
		if (initial.charAt(0) == '!') {
			negate = true;
			initial = initial.substring(1, initial.length);
			initial = ThUtils.unParenthesise(initial);
		}
		val = getThAttribute(initial, element);
		if (val == null) {
			args = initial.match(varExpr); // Check for negated null values
			if (args) {
				if (args[1].charAt(0) == '!') {
					negate = !negate;
				}
			}
		}
		flag = thymol.getBooleanValue(val);
		if (negate) {
			flag = !flag;
		}
		return flag;
	};

	appendToAttrList = function(func, prec, attrArray) {
		var j, jLimit = attrArray.length, tha = null;
		for (j = 0; j < jLimit; j++) {
			tha = new ThAttr(attrArray[j], func, prec, thymol.thThymeleafPrefixList, thymol.thPrefix);
		}
		j = tha;
	};

	thymol.configurePreExecution(function() {
		thymol.addDialect({
			prefix : thymol.thPrefix,
			attributeProcessors : [
				{ name : 'each', processor : processEach, precedence : 200 },		      
				{ name : 'switch', processor : processSwitch, precedence : 250 },		      
				{ name : 'if', processor : processConditional, precedence : 300 },
				{ name : 'unless', processor : processConditional, precedence : 400 },		        
				{ name : 'object', processor : processObject, precedence : 500 },		      
				{ name : 'with', processor : processWith, precedence : 600 },		      
				{ name : 'attr', processor : processAttr, precedence : 700 },
				{ name : 'attrprepend', processor : processAttr, precedence : 800 },
				{ name : 'attrappend', processor : processAttr, precedence : 900 },
				{ name : 'alt-title', processor : processPairedAttr, precedence : 990 },
				{ name : 'lang-xmllang', processor : processPairedAttr, precedence : 990 },		      
				{ name : 'inline', processor : processInline, precedence : 1000 },		      
				{ name : 'classappend', processor : processAttr, precedence : 1100 },		      
				{ name : 'text', processor : processText, precedence : 1300 },
				{ name : 'utext', processor : processText, precedence : 1400 },
				{ name : 'fragment', processor : processFragment, precedence : 1500 },
				{ name : 'assert', processor : processAssert, precedence : 1550 },		      
				{ name : 'remove', processor : processRemove, precedence : 1600 }		      		      		      
			]
		});
		appendToAttrList(processSpecAttrMod, 1000, specAttrModList);
		appendToAttrList(processSpecAttrMod, 1000, eventAttrList);
		appendToAttrList(processFixedValBoolAttr, 1000, fixedValBoolAttrList);
	});

})();