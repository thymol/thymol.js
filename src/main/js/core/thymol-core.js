thymol = function() {
	
	// Version data
	thymol.thVersion = "2.0.0-SNAPSHOT";
	thymol.thReleaseDate = "not yet!";
	thymol.thURL = "http://www.thymeleaf.org";
	
	// For internal use
	thymol.thUsingNullPrefix = false;
	thymol.thThymeleafPrefixList = [];
	thymol.thThymeleafElementsList = [];
	thymol.objects = {};
	
	(function() {
		var htmlTag = $("html")[0], nsspec;
		$(htmlTag.attributes).each(function() {
			if (thymol.thURL == this.value) {
				nsspec = this.localName.split(":");
				if (nsspec.length > 0) {
					thymol.thPrefix = nsspec[nsspec.length - 1];
					return;
				}
			}
		});
	})();

	thymol.thInclude = new ThAttr("include", null, 100, null, thymol.thPrefix);
	thymol.thReplace = new ThAttr("replace", null, 100, null, thymol.thPrefix);
	thymol.thSubstituteby = new ThAttr("substituteby", null, 100, null, thymol.thPrefix);
	
	thymol.thFragment = new ThAttr("fragment", null, 20000, null, thymol.thPrefix);
	thymol.thRemove = null;
	
	thymol.thBlock = new ThElement("block",
		function(element) {
		  var i, limit = element.childNodes.length;
  		  for (i = 0; i < limit; i++) {
			if (element.childNodes[i].nodeType === 1) {
				element.childNodes[i].isBlockChild = true;
			}
		  }
	    },
	    thymol.thPrefix);
	
	var
		textFuncSynonym = "~~~~",
		varRefExpr = /([$#]{.*?})/,
		literalTokenExpr = /^[a-zA-Z0-9\[\]\.\-_]*$/,
		startParserLevelCommentExpr = /^\s*\/\*\s*$/,
		endParserLevelCommentExpr = /^\s*\*\/\s*$/,
		startParserLevelCommentExpr2 = /^\/\*[^\/].*/,
		endParserLevelCommentExpr2 = /.*[^\/]\*\/$/,
		prototypeOnlyCommentEscpExpr = /\/\*\/(.*)\/\*\//,
		varExpr3 = /[\$\*#@]{1}\{(.*)\}$/, // Retain the content
		nonURLExpr = /[\$\*#]{1}\{(?:!?[^}]*)\}/,
		numericExpr = /^[+\-]?[0-9]*?[.]?[0-9]*?$/,
		varParExpr = /([^(]*)\s*[(]([^)]*?)[)]/,
		domSelectExpr = /([\/]{1,2})?([A-Za-z0-9_\-]*(?:[\(][\)])?)?([^\[]\S[A-Za-z0-9_\-]*(?:[\(][\)])?[\/]*(?:[\.\/#]?[^\[]\S[A-Za-z0-9_\-]*(?:[\(][\)])?[\/]*)*)?([\[][^\]]*?[\]])?/,
		litSubstExpr = /\.*?([\|][^\|]*?[\|])\.*?/;

	function Thymol() {
		// Empty apart from this!
	}

	function ThNode(thDocParam, visitedParam, parentDocParam, firstChildParam, nextSiblingParam, fileNameParam, fragNameParam, isNodeParam, elementParam) {
		this.thDoc = thDocParam;
		this.visited = visitedParam;
		this.parentDoc = parentDocParam;
		this.firstChild = firstChildParam;
		this.nextSibling = nextSiblingParam;
		this.fileName = fileNameParam;
		this.fragName = fragNameParam;
		this.isNode = isNodeParam;
		this.element = elementParam;
	}

	function init() {

		this.messages = null;
		this.mappings = null;

		this.debug = null;
		this.root = null;
		this.path = null;
		this.allowNullText = null;
		// var showNullOperands = null;

		this.protocol = null;
		this.locale = null;

		this.thCache = {};
		this.thExpressionObjects;
		this.thDeferredFunctions;
		this.thPreExecutionFunctions;
		this.thPostExecutionFunctions;

		if (typeof this.thExpressionObjects === "undefined" || this.thExpressionObjects === null) {
			this.thExpressionObjects = {};
		}
		this.thExpressionObjects["#object"] = {};
		this.thExpressionObjects["#locale"] = {};

		this.thExpressionObjects["#ctx"] = [];

		this.thExpressionObjects["#ctx"]["variables"] = {};

		var accessor = undefined, i, iLimit, j, jLimit, base;
		if (typeof thVars !== "undefined") {
			accessor = new ThVarsAccessor(thVars, "thVars");
		}
		this.applicationContext = thymol.makeContext("application", accessor);
		this.sessionContext = thymol.makeContext("session", undefined);
		this.sessionContext.persist = function() { // Only decorate the session context with persist
			var save = this.serialise();
			top.name = save;
		};
		this.requestContext = thymol.makeContext("request", undefined);

		this.booleanAndNullTokens = new Array();
		this.booleanAndNullTokens["null"] = this.applicationContext.createVariable("null", null);
		this.booleanAndNullTokens["true"] = this.applicationContext.createVariable("true", true);
		this.booleanAndNullTokens["false"] = this.applicationContext.createVariable("false", false);

		this.protocol = Thymol.prototype.getThParam("thProtocol", false, false, thymol.thDefaultProtocol);
		this.debug = Thymol.prototype.getThParam("thDebug", true, false, false);
		this.root = Thymol.prototype.getThParam("thRoot", false, true, "");
		this.path = Thymol.prototype.getThParam("thPath", false, true, "");
		this.allowNullText = Thymol.prototype.getThParam("thAllowNullText", true, false, true);
		this.locale = Thymol.prototype.getThParam("thLocale", false, false, thymol.thDefaultLocale);
		// showNullOperands = Thymol.prototype.getThParam("thShowNullOperands", true, false, false);

		if (typeof thymol.thPreExecutionFunctions === "undefined" || thymol.thPreExecutionFunctions === null) {
			thymol.thPreExecutionFunctions = [];
		}
		if (typeof thymol.thPostExecutionFunctions === "undefined" || thymol.thPostExecutionFunctions === null) {
			thymol.thPostExecutionFunctions = [];
		}

		$.ajaxSetup({
			async : false,
			isLocal : true,
			dataType : "text"
		});

		if (!(typeof thVars === "undefined")) {
			for (i = 0, iLimit = thVars.length; i < iLimit; i++) {
				this.applicationContext.createVariable(thVars[i][0], thVars[i][1]);
			}
		}

		executeDeferred();

		(function(app, req) {
			var e, f, a = /\+/g, r = /([^&=]+)=?([^&]*)/g, d = function(s) {
				return decodeURIComponent(s.replace(a, " "));
			}, q = window.location.search.substring(1), surl, scriptUrl = "";

			$("script").each(function() {
				surl = this.src;
				if (surl.indexOf(thymol.thScriptName) >= 0) {
					scriptUrl = d(surl);
					return false;
				}
			});

			while (e = r.exec(scriptUrl)) {
				f = e[1].split("?");
				switch (f[1]) {
				case "thProtocol":
					this.protocol = e[2];
					break;
				case "thDebug":
					this.debug = e[2];
					break;
				case "thRoot":
					this.root = e[2];
					break;
				case "thPath":
					this.path = e[2];
					break;
				case "thAllowNullText":
					this.allowNullText = e[2];
					break;
				case "thLocale":
					this.locale = e[2];
					break;
				// case "thShowNullOperands":
				// showNullOperands = e[2];
				// break;
				default:
					app.createVariable(e[1], e[2]);
				}
			}
			while (e = r.exec(q)) {
				req.createVariable(d(e[1]), e[2], true);
			}
		})(this.applicationContext, this.requestContext);

		this.applicationContext.resolveJSONReferences();
		preExecute(this.applicationContext);

		this.thExpressionObjects["#vars"] = this.applicationContext;
		this.thExpressionObjects["#root"] = this.applicationContext;

		this.sessionContext.init();
		this.sessionContext.resolveJSONReferences();

		this.thExpressionObjects["#ctx"]["variables"] = this.applicationContext;
		this.thExpressionObjects["#ctx"]["requestParameters"] = this.requestContext;
		this.thExpressionObjects["#ctx"]["servletContext"] = this.applicationContext;
		this.thExpressionObjects["#ctx"]["httpServletRequest"] = this.thExpressionObjects["#httpServletRequest"];
		this.thExpressionObjects["#ctx"]["httpSession"] = this.thExpressionObjects["#httpSession"];
		
		this.protocol = Thymol.prototype.override("thProtocol", this.protocol);
		this.debug = Thymol.prototype.override("thDebug", this.debug);
		this.root = Thymol.prototype.override("thRoot", this.root);
		this.path = Thymol.prototype.override("thPath", this.path);
		this.allowNullText = Thymol.prototype.override("thAllowNullText", this.allowNullText);
		this.locale = Thymol.prototype.override("thLocale", this.locale);
		// showNullOperands = Thymol.prototype.override("thShowNullOperands", this.showNullOperands);

		if (!(typeof thMappings === "undefined")) {
			this.mappings = [];
			for (j = 0, jLimit = thMappings.length; j < jLimit; j++) {
				this.mappings.push([ thMappings[j][0], thMappings[j][1] ]);
			}
			this.mappings.sort(function(a, b) {
				return a[0].length > b[0].length ? -1 : 1;
			});
		}

		if (!(typeof thMessages === "undefined")) {
			this.messages = new Object();
			for (j = 0, jLimit = thMessages.length; j < jLimit; j++) {
				this.messages[thMessages[j][0]] = thMessages[j][1];
			}
		}

		if (!(typeof thDisable === "undefined")) {
			for (j = 0, jLimit = thDisable.length; j < jLimit; j++) {
				Thymol.prototype.doDisable(thDisable[j]);
			}
		}
		
		thymol.thRemove = Thymol.prototype.getThAttrByName("remove");

		base = new ThNode(document, false, null, null, null, document.nodeName, "::", false, document);
		Thymol.prototype.process(base);
		postExecute();
		return;

	}

	function getCtx() {
		return thymol.thExpressionObjects["#ctx"];
	}

	function configureModule(module) {
		if (typeof thymol.thExpressionObjects === "undefined" || thymol.thExpressionObjects === null) {
			thymol.thExpressionObjects = {};
		}
		thymol.thExpressionObjects[module.thExpressionObjectName] = module;
	}

	function configureAttributeProcessor(prefix, suffix, func, prec, dataAttr) {
		var p = prefix + ":";
		if (p !== null) {
			if (thymol.thThymeleafPrefixList.indexOf(p) < 0) {
				thymol.thThymeleafPrefixList.push(p);
			}
		}
		else {
			thymol.thUsingNullPrefix = true;
		}
		p = new ThAttr(suffix, func, prec, thymol.thThymeleafPrefixList, prefix, dataAttr);
	}

	function configureElementProcessor(prefix, suffix, func) {
		var p = new ThElement(suffix, func, prefix);
	}

	function configurePreExecution(func) {
		if (typeof thymol.thPreExecutionFunctions === "undefined" || thymol.thPreExecutionFunctions === null) {
			thymol.thPreExecutionFunctions = [];
		}
		thymol.thPreExecutionFunctions.push(func);
	}

	function configurePostExecution(func) {
		if (typeof thymol.thPostExecutionFunctions === "undefined" || thymol.thPostExecutionFunctions === null) {
			thymol.thPostExecutionFunctions = [];
		}
		thymol.thPostExecutionFunctions.push(func);
	}

	function executeDeferred() {
		if (typeof thymolDeferredFunctions !== "undefined" && thymolDeferredFunctions !== null) {
			while (thymolDeferredFunctions.length > 0) {
				var func = thymolDeferredFunctions.pop();
				func();
			}
		}
	}

	function preExecute(context) {
		while (thymol.thPreExecutionFunctions.length > 0) {
			var func = thymol.thPreExecutionFunctions.pop();
			func();
			context.resolveJSONReferences();
		}
	}

	function postExecute() {
		while (thymol.thPostExecutionFunctions.length > 0) {
			var func = thymol.thPostExecutionFunctions.pop();
			func();
		}
	}

	function preProcess(expr, element) {
		var result = expr, fp, lp;
		do {
			fp = result.indexOf("__");
			if (fp >= 0) {
				lp = -1;
				if (result.length > 4) {
					lp = result.lastIndexOf("__");
				}
				if (lp <= 0) {
					throw new ThError("Mismatched pre-processing indicators", element);
				}
				var head = result.substring(0, fp);
				var centre = result.substring(fp + 2, lp);
				centre = this.getParsedExpr(centre, element);
				var tail = result.substring(lp + 2);
				result = head + centre + tail;
				fp = result.indexOf("__");
			}
		} while (fp >= 0);
		result = result.replace("\\_\\_", "__", "g");
		return result;
	};	
	
	function substituteParam(argValue, mode, element) {
		var result = argValue, varName = argValue, subs = null, msg, expo;
		if (result) {
			if (mode == 3) {
				if (element.thObjectVar) {
					subs = element.thObjectVar[varName];
				}
			}
			else if (mode == 4) {
				if (thymol.messages) {
					msg = thymol.messages[varName];
					if (msg) {
						subs = msg;
					}
				}
			}
			else {
				if (varName.charAt(0) === '#') {
					if ("#object" === varName) {
						if (element.thObjectVar) {
							subs = element.thObjectVar;
						}
					}
					else {
						expo = thymol.thExpressionObjects[varName];
						if (typeof expo !== "undefined" && expo !== null) {
							subs = expo;
						}
					}
				}
				if ((typeof subs === "undefined" || subs == null) && element.thLocalVars) {
					subs = element.thLocalVars[varName];
				}
				if ((typeof subs === "undefined" || subs == null) && element.thObjectVar) {
					subs = element.thObjectVar[varName];
				}
				if (typeof subs === "undefined" || subs == null) {
					subs = ThUtils.getParameter(varName);
				}
				if (typeof subs === "undefined" || subs == null) {
					if ("param" === varName) {
						subs = thymol.requestContext;
					}
					if ("session" === varName) {
						subs = thymol.sessionContext;
					}
					if ("application" === varName) {
						subs = thymol.applicationContext;
					}
				}
			}
			result = subs;
			if (subs instanceof ThParam) {
				result = subs.value;
			}
		}
		return result;
	};

	function getExpression(argValue, element) {
		var result = argValue, subst = false, initial, shortCut, args, negate, token, lsp;
		if (typeof argValue === 'string') {
			initial = argValue.trim();
			result = initial;
			if (result) {
				shortCut = ThUtils.getParameter(result);
				if (!shortCut) {
					args = result.match(varExpr3);
					if (args) {
						if (args[1] && args[1].length > 0) {
							shortCut = ThUtils.getParameter(args[1]);
						}
					}
				}
				if (shortCut) {
					if (shortCut instanceof ThParam) {
						result = shortCut.value;
					}
					else {
						result = shortCut;
					}
					if (typeof result === 'string' && result.match(numericExpr)) { // Numeric?
						result = parseInt(result);
					}
				}
				else {
					initial = ThUtils.unParenthesise(result);
					negate = false;
					if (initial.charAt(0) == '!') {
						negate = true;
						initial = initial.substring(1, initial.length);
						initial = ThUtils.unParenthesise(initial);
					}
					if (literalTokenExpr.test(initial)) {
						token = thymol.booleanAndNullTokens[initial];
						if (!(typeof token === "undefined")) {
							result = token.value;
							subst = true;
						}
					}
					lsp = null;
					if (!subst) {
						lsp = initial.match(litSubstExpr);
						if (lsp && lsp.length > 0) {
							if (ThUtils.charOcurrences(lsp[1], '\'') < 2) { // No contained literals
								initial = Thymol.prototype.doLiteralSubstExpr(initial, lsp[1]);
							}
						}
						result = "";
						if (initial != "") {
							initial = ThUtils.unParenthesise(initial);
							initial = thymol.preProcess(initial, element);
							result = thymol.getParsedExpr(initial, element);
						}
					}
					if (result == initial && (typeof result == typeof initial)) { // Unsubstituted
						result = null;
					}
					else if (typeof result === 'string') {
						if (!lsp) {
							result = result.replace(/[\\][\\]/g, "\\");
						}
						result = result.replace(/&#39;/g, "\'").replace(/&apos;/gi, "\'");
					}
					if (negate) {
						if (typeof result === 'boolean') {
							result = !result;
						}
						else if (typeof result === 'number') {
							result = (result == 0);
						}
						else if (typeof result === 'string') {
							result = !ThUtils.testLiteralFalse(result);
						}
					}
				}
			}
		}
		return result;
	};

	function getWithProtocol(initial) {
		var result = initial;
		if (typeof result === "string") {
			result = result.trim();
		}
		if (!/^http:.*$/i.test(result)) { // Is it not an URL?
			result = thymol.protocol + result;
		}
		return result;
	};
	
	function getMapped(uri, extended) {
		var mapped = null, i, iLimit, key;
		if (uri && typeof uri === "string") {
			if (thymol.mappings) {
				for (i = 0, iLimit = thymol.mappings.length; i < iLimit; i++) {
					key = thymol.mappings[i][0];
					if (uri == key) {
						mapped = thymol.mappings[i][1];
						break;
					}
					else if (extended) {
						if (uri.indexOf(key) == 0) {
							mapped = uri.substring(key.length);
							mapped = thymol.mappings[i][1] + mapped;
							break;
						}
					}
				}
			}
		}
		return mapped;
	};

	function substitute(initial, element, lenient) { // It looks pretty good but it's just (nearly) deprecated !!!
		var argValue = initial, result, args, token, re, subs, saved;
		if (typeof argValue === "string") {
			argValue = argValue.trim();
		}
		result = argValue;
		args = "";
		while (args != null) {
			args = argValue.match(/.*([$\*#@]{(!?[^}]*)}).*/);
			if (args != null && args.length > 0) {
				if (args.length == 3) { // Found an embedded expression
					token = args[1];
					token = token.replace(/[$]/g, "[$]").replace(/[*]/g, "[*]").replace(/[\']/g, "[\']").replace(/[+]/g, "[\+]").replace(/[\(]/g, "[\(]").replace(/[\)]/g, "[\)]");
					re = new RegExp(token);
					subs = this.getExpression(args[2], element);
					if (subs != args[2]) {
						result = result.replace(re, subs, "g");
						if (result == "null") {
							result = null;
						}
					}
					else {
						subs = ""; // Substitution failed
						if (thymol.debug && !lenient) {
							window.alert("thymol variable substitution failed: \"" + initial + "\"");
						}
					}
					saved = argValue;
					argValue = argValue.replace(re, subs, "g");
					if (saved == argValue) {
						argValue = "";
					}
				}
			}
		}
		return result;
	};
	
	function getWith(element, content) {
		var argValue = content.trim(), argCount = 0;
		if (argValue) {		
			do {
				var argsExpr = ThParser.parse(argValue,true);
				var identifier = argsExpr.tokens.shift();
				if( identifier.type_ === 3 ) {
					var result = argsExpr.evaluate(element, thymol.substituteParam);				
					var varName = identifier.index_;
					if (!!varName) {
						argCount++;
						if (!element.thLocalVars) {
							element.thLocalVars = {};
		
						}
						element.thLocalVars[varName] = result;
					}
					argValue = argValue.substring(argsExpr.position);					
				}
				else {
					break;
				}				
			} while(argValue.length > 0);
		}
		return argCount;
	};

	function getParsedExpr(initial, element) {
		var expr, result = initial;
		expr = ThParser.parse(result);
		expr = expr.simplify();
		// TODO Cache expressions here!!
		result = expr.evaluate(element, thymol.substituteParam);
		if (typeof result === "number") {
			result = ThUtils.getToPrecision(result, expr.precision);
		}
		return result;
	};

	function getBooleanValue(param) {
		var flag = false, val, args;
		if (param != null) {
			if (typeof param === "boolean") {
				flag = param;
			}
			else if (typeof param === 'number') {
				flag = param != 0;
			}
			else {
				val = param;
				if (Object.prototype.toString.call(val) === '[object Array]') {
					if (val.length === 1) {
						val = val[0];
					}
					else {
						val = true;
					}
				}
				if (typeof val === 'boolean') {
					flag = val;
				}
				else if (typeof val === 'number') {
					flag = (val != 0);
				}
				else if (typeof val === 'string') {
					args = val.match(nonURLExpr);
					if (args) {
						val = args[1];
						flag = this.testParam(val);
					}
					else {
						flag = !ThUtils.testLiteralFalse(val);
					}
				}
				else if (val instanceof ThParam) {
					flag = val.getBooleanValue();
				}
				else {
					flag = typeof val !== "undefined" && val !== null;
				}
			}
		}
		return flag;
	}

	function isFragmentChild(element) {
		var result = false, parent = element.parentElement;
		while (parent) {
			if (parent.getAttribute(thymol.thFragment.name) || parent.getAttribute(thymol.thFragment.synonym)) {
				result = true;
				break;
			}
			parent = parent.parentElement;
		}
		return result;
	}

	function getMessage(varName, parameters, returnStringAlways) {
		var msgKey = this.messages[varName];
		if (msgKey) {
			return ThUtils.renderMessage(msgKey, parameters);
		}
		else if (returnStringAlways !== undefined && returnStringAlways) {
			return "??" + varName + "_" + thymol.locale + "??";
		}
		return null;
	}

	function getLocale() {
		return thymol.locale;
	}

	Thymol.prototype = {

		process : function(rootNode) {
			var n = rootNode;
			try {
				while (n.thDoc) {
					this.getChildren(n);
					if (n.firstChild && n.firstChild.thDoc && !n.visited) {
						n.visited = true;
						n = n.firstChild;
					}
					else {
						if (n.element != n.thDoc) {
							this.doReplace(n.isNode, n.element, n.thDoc);
							if (!n.isNode) {
								n.thDoc = n.element;
							}
						}
						if (n.nextSibling && n.nextSibling.thDoc) {
							n = n.nextSibling;
						}
						else {
							if (n == rootNode) {
								break;
							}
							n = n.parentDoc;
						}
					}
				}
				this.processChildren(rootNode);
			}
			catch (err) {
				if (thymol.debug) {
					if (err instanceof ThError) {
						if (!err.suppress) {
							window.alert(err);
						}
					}
					else {
						window.alert(err);
					}
				}
			}
		},

		getChildren : function(rootNode) {
			var count = 0, last = null, changed = false, child, froot, fstar, fchildren, i, iLimit, j, jLimit, element, matches, theAttr;
			if (!rootNode.visited) {
				this.processComments(rootNode);
				froot = $(rootNode.thDoc);
				fstar = $(froot).add(froot.find("*"));
				fchildren = fstar.filter(thymol.thInclude.escpName).add(fstar.filter(thymol.thInclude.escpSynonym)).add(fstar.filter(thymol.thReplace.escpName)).add(fstar.filter(thymol.thReplace.escpSynonym)).add(fstar.filter(thymol.thSubstituteby.escpName)).add(fstar.filter(thymol.thSubstituteby.escpSynonym));
				for (i = 0, iLimit = fchildren.length; i < iLimit; i++) {
					element = fchildren[i], matches = [];
					for (j = 0, jLimit = element.attributes.length; j < jLimit; j++) {
						theAttr = element.attributes[j];
						if (thymol.thInclude.name == theAttr.name || thymol.thInclude.synonym == theAttr.name || thymol.thReplace.name == theAttr.name || thymol.thReplace.synonym == theAttr.name || thymol.thSubstituteby.name == theAttr.name || thymol.thSubstituteby.synonym == theAttr.name) {
							matches.push(theAttr);
						}
					}
					for (j = 0, jLimit = matches.length; j < jLimit; j++) {
						child = this.processImport(element, rootNode, matches[j]);
						if (child != null) {
							changed = true;
							if (count == 0) {
								rootNode.firstChild = child;
							}
							else {
								last.nextSibling = child;
							}
							last = child;
							count++;
						}
					}
				}
			}
			return changed;
		},

		processChildren : function(rootNode) {
			var i, iLimit, j, jLimit, k, kLimit;
			var elements = rootNode.thDoc.getElementsByTagName("*");
			for (k = 0, kLimit = elements.length; k < kLimit; k++) {
				var element = elements[k];				
				for (j = 0, jLimit = thymol.thThymeleafElementsList.length; j < jLimit; j++) {
					if (element.localName == thymol.thThymeleafElementsList[j].name || element.localName == thymol.thThymeleafElementsList[j].synonym) {
						var updated = thymol.thThymeleafElementsList[j].process(element);
						if (updated) {
							elements = rootNode.thDoc.getElementsByTagName("*");
							if (elements.length < kLimit) {
								k--;
							}
							kLimit = elements.length;
						}
						
					}
				}
				var allAttributes = element.attributes;
				if (allAttributes && allAttributes.length > 0) {
					var attributes = [];
					if (!thymol.thUsingNullPrefix) {
						for (i = 0, iLimit = allAttributes.length; i < iLimit; i++) {
							if (allAttributes[i]) {
								for (j = 0, jLimit = thymol.thThymeleafPrefixList.length; j < jLimit; j++) {
									var attrName = allAttributes[i].name.toString();
									if (attrName.length > thymol.thThymeleafPrefixList[j].length) {
										attrName = attrName.substring(0, thymol.thThymeleafPrefixList[j].length);
										if (attrName === thymol.thThymeleafPrefixList[j]) {
											attributes.push(allAttributes[i]);
										}
									}
								}
							}
						}
					}
					else {
						attributes = allAttributes;
					}
					if (attributes.length > 0) {
						attributes.reverse();
						var matchedAttributes = [];						
						for (i = 0, iLimit = attributes.length; i < iLimit; i++) {
							var splits = attributes[i].name.toString().split(":");
							if( splits && splits.length > 0 ) {
								var prefix = "", name;
								if( splits.length > 1 ) {
									prefix = splits[0];
									name = splits[1];
								}
								else {
									name = splits[0];
									var hpos = name.lastIndexOf("-");
									if( hpos >= 0 ) {
										prefix = name.substring( 0, hpos + 1 );
									}
								}
								var attrList = thymol.thThymeleafPrefixList[prefix];
								if( attrList ) {
									for (j = 0, jLimit = attrList.length; j < jLimit; j++) {
										if (name === attrList[j].suffix || name === attrList[j].synonym || attrList[j].suffix === "*") {
											var matchedAttribute = {};
											matchedAttribute.attr =	attrList[j];
											matchedAttribute.elementAttr = attributes[i];
											matchedAttributes.push(matchedAttribute);
											break;
										}
									}																
								}
							}
						}						
						if (matchedAttributes.length > 0) {
							matchedAttributes.sort(function (a, b) {
								return a.attr.precedence - b.attr.precedence;
							});
							var updated = false;
							for (i = 0, iLimit = matchedAttributes.length; i < iLimit; i++) {
								var exp = ThUtils.processElement(matchedAttributes[i].attr.process, element, matchedAttributes[i].elementAttr, matchedAttributes[i].attr, 1);
								updated = exp || updated; // No short-circuiting!
							}
							if (updated) {
								elements = rootNode.thDoc.getElementsByTagName("*");
								if (elements.length < kLimit) {
									k--;
								}
								kLimit = elements.length;
							}
						}						
					}
				}
			}
			elements = rootNode.thDoc.getElementsByTagName("*");
			for (k = 0, kLimit = elements.length; k < kLimit; k++) {
				var element = elements[k];
				if (element.localName == thymol.thBlock.name || element.localName == thymol.thBlock.synonym) {
					ThUtils.removeTag(element);
					k--;
					kLimit = elements.length;
				}
			}			
		},

		override : function(paramName, paramValue) {
			var param = paramValue, thv;
			thv = thymol.applicationContext[paramName];
			if (thv instanceof ThParam) {
				param = thv.value;
			}
			else {
				param = thv;
			}
			thv = thymol.requestContext[paramName];
			if (thv) {
				if (thv instanceof ThParam) {
					param = thv.value;
				}
				else {
					param = thv;
				}
			}
			return param;
		},

		doDisable : function(attrName) {
			var tha = this.getThAttrByName(attrName);
			if (tha !== null) {
				tha.disable();
			}
			else {
				if (thymol.debug) {
					window.alert("cannot disable unknown attribute \"" + attrName + "\"");
				}
			}
		},

		getThAttrByName : function(name) {
			var attrList = thymol.thThymeleafPrefixList[thymol.thPrefix];
			var i, iLimit = attrList.length;
			for (i = 0; i < iLimit; i++) {
				if (name === attrList[i].suffix) {
					return attrList[i];
				}
			}
			return null;
		},

		processComments : function(rootNode) {
			var comments = null, froot, fstar, changed, i, iLimit, startComment, parent, startValue, pointer, nextPointer;
			do {
				froot = $(rootNode.thDoc);
				fstar = froot.find("*");
				comments = fstar.contents().getComments();
				changed = false;
				for (i = 0, iLimit = comments.length; i < iLimit; i++) {

					startComment = comments[i];
					parent = startComment.parentNode;
					startValue = startComment.nodeValue.trim();

					if (startParserLevelCommentExpr.test(startValue)) {
						pointer = startComment;
						while (pointer != null) {
							if (endParserLevelCommentExpr.test(pointer.nodeValue)) {
								changed = (parent.removeChild(pointer) != null);
								break;
							}
							nextPointer = pointer.nextSibling;
							changed = (parent.removeChild(pointer) != null);
							pointer = nextPointer;
						}
					}
					else if (startParserLevelCommentExpr2.test(startValue) && endParserLevelCommentExpr2.test(startValue)) { // Last option so it doesn't conflict with previous case
						parent.removeChild(startComment);
						changed = true;
					}
				}
			} while (changed);
			this.processPrototypeOnlyComments(rootNode);
		},

		processPrototypeOnlyComments : function(rootNode) {
			var comments = null, froot, fstar, changed, indexOfLast, i, iLimit, j, jLimit, k, kLimit, startComment, parent, deletions, res, fullText, innerNodes, done, next, commentText, res2, blockElement, blockDoc, blockDocBody, blockBase, newNode, newDoc;
			do {
				froot = $(rootNode.thDoc);
				fstar = froot.find("*");
				comments = fstar.contents().getComments();
				changed = false;
				indexOfLast = comments.length - 1;
				for (i = 0, iLimit = comments.length; i < iLimit; i++) {
					startComment = comments[i];
					parent = startComment.parentNode;
					if (parent != null) {
						startValue = startComment.nodeValue.trim();
						deletions = [];
						deletions.push(startComment);
						startValue = startValue.replace(/\n/g, "");
						res = startValue.match(prototypeOnlyCommentEscpExpr);
						if (res) {
							fullText = startValue;
							if (parent.localName == "table" || parent.localName == "tbody") {
								if (startValue.indexOf(thymol.thBlock.name) >= 0 || startValue.indexOf(thymol.thBlock.synonym) >= 0) {
									if (startValue.indexOf(thymol.thBlock.endName) < 0 || startValue.indexOf(thymol.thBlock.endSynonym) < 0) { // whole th:block is NOT embedded
										fullText = fullText.replace(res[0], res[1]);
										innerNodes = [];
										done = false;
										next = startComment;
										do {
											next = next.nextSibling;
											if (next != null) {
												deletions.push(next);
												if (i < indexOfLast) {
													if (next == comments[i + 1]) {
														commentText = next.nodeValue;
														if (commentText.indexOf(thymol.thBlock.endName) >= 0 || commentText.indexOf(thymol.thBlock.endSynonym) >= 0) {
															res2 = commentText.match(prototypeOnlyCommentEscpExpr);
															if (res2) {
																commentText = commentText.replace(res2[0], res2[1]);
																fullText = fullText + commentText;
															}
															done = true;
														}
													}
													else {
														innerNodes.push(next);
													}
												}
											}
											else {
												done = true;
											}
										} while (!done);
										blockElement = null;
										blockDoc = new DOMParser().parseFromString(fullText, "text/html"); // Block is non-HTML5 so we can't use jQuery to find it!
										blockDocBody = $(blockDoc).find("body")[0];
										for (j = 0, jLimit = blockDocBody.childNodes.length; j < jLimit; j++) {
											if (blockDocBody.childNodes[j].localName == thymol.thBlock.name || blockDocBody.childNodes[j].localName == thymol.thBlock.synonym) {
												blockElement = blockDocBody.childNodes[j];
												for (k = 0, kLimit = innerNodes.length; k < kLimit; k++) {
													newNode = innerNodes[k].cloneNode(true);
													blockElement.appendChild(newNode);
												}
											}
										}
										if (blockElement != null) {
											blockBase = new ThNode(blockDoc, false, null, null, null, blockDoc.nodeName, "::", false, blockDoc);
											this.processChildren(blockBase);
											changed = this.insertUncommented(blockBase.thDoc, deletions, parent);
										}
										else {
											parent.removeChild(startComment); // Delete it!
											changed = true;
										}
									}
									else { // Embedded?
										parent.removeChild(startComment); // Delete it!
										changed = true;
									}
								}
							}
							else {
								startValue = startValue.substring(3, startValue.length - 3);
								newDoc = new DOMParser().parseFromString(startValue, "text/html");
								changed = this.insertUncommented(newDoc, deletions, parent);
							}
						}
					}
				}
			} while (changed);
		},

		insertUncommented : function(doc, deletions, parent) {
			var docBody = $(doc).find("body")[0], i, iLimit, newNode;
			for (i = 0, iLimit = docBody.childNodes.length; i < iLimit; i++) {
				newNode = docBody.childNodes[i].cloneNode(true);
				parent.insertBefore(newNode, deletions[0]);
			}
			for (i = 0, iLimit = deletions.length; i < iLimit; i++) {
				parent.removeChild(deletions[i]);
			}
			return true;
		},

		getList : function(element, content) {
			var argValue = content.trim(), argsCount = 0, argsList = [], assigs, i, iLimit, val;
			if (argValue) {
				assigs = argValue.split(",");
				for (i = 0, iLimit = assigs.length; i < iLimit; i++) {
					val = thymol.getExpression(assigs[i], element);
					argsList[i] = val;
				}
				if (!element.thLocalVars) {
					element.thLocalVars = {};
				}
				element.thLocalVars["..."] = argsList;
				argsCount = argsList.length;
			}
			return argsCount;
		},

		testParam : function(param) {
			var initial = param, result = false, theParam = null, negate = false;
			if (typeof initial === 'boolean') {
				result = initial;
			}
			else {
				theParam = null;
				negate = false;
				if (typeof initial === 'object' && initial instanceof ThParam) {
					theParam = initial;
				}
				else {
					initial = initial.valueOf();
					if (initial.charAt(0) == '!') {
						negate = true;
						initial = initial.substring(1);
					}
				}
				theParam = thymol.applicationContext[initial];
				if (theParam != null) {
					result = theParam.getBooleanValue();
				}
				if (negate) {
					result = !result;
				}
			}
			return result ? true : false;
		},

		processImport : function(element, rootNode, attr) {
			var importNode = null, filePart, fragmentPart, names, parts, fragmentArgsList, isNode, fragment, fileName, content, importError;
			if (!isFragmentChild(element)) {
				filePart = null;
				fragmentPart = "::";
				if (attr.value.indexOf("::") < 0) {
					filePart = this.getFilePart(attr.value, element);
				}
				else {
					names = attr.value.split("::");
					filePart = this.getFilePart(names[0].trim(), element);
					fragmentPart = names[1].trim();
				}
				if ("this" == filePart) {
					filePart = "";
				}
				if (filePart != null) {
					parts = filePart.match(varParExpr);
					fragmentArgsList = null;
					if (parts) {
						if (parts.length > 1) {
							filePart = parts[1].trim();
						}
						if (parts.length > 2) {
							fragmentArgsList = parts[2].trim();
						}
					}
					isNode = thymol.thReplace.name == attr.localName || thymol.thReplace.synonym == attr.localName || thymol.thSubstituteby.name == attr.localName || thymol.thSubstituteby.synonym == attr.localName;
					if (thymol.thCache[filePart] != null && thymol.thCache[filePart][fragmentPart] != null) {
						isNode = isNode || fragmentPart == "::";
						importNode = new ThNode(thymol.thCache[filePart][fragmentPart], false, rootNode, null, null, filePart, fragmentPart, isNode, element);
					}
					else {
						fragment = null;
						importError = null;
						if (filePart != "") { // Signifies v2.1 local fragment
							fileName = filePart + ".html";
							$.get(fileName, function(textContent, status) {
								try {
									if ("success" == status) {
										content = new DOMParser().parseFromString(textContent, "text/html");
										fragment = Thymol.prototype.getImportNode(element, filePart, fragmentPart, fragmentArgsList, content);
									}
									else if (thymol.debug) {
										window.alert("thymol.processImport file read failed: " + filePart + " fragment: " + fragmentPart);
									}									
								}
								catch (err) {
									importError = err;
								}
							}, "text");
						}
						else {
							fragment = this.getImportNode(element, filePart, fragmentPart, fragmentArgsList, document);
						}
						if (fragment == null) {
							if( importError !== null ) {
								throw importError;
							}
							if (thymol.debug) {
								window.alert("thymol.processImport fragment import failed: " + filePart + " fragment: " + fragmentPart);
							}
						}
						else {
							importNode = new ThNode(fragment, false, rootNode, null, null, filePart, fragmentPart, isNode, element);
						}
					}
				}
				element.removeAttribute(attr.name);
			}
			return importNode;
		},

		getImportNode : function(element, filePart, fragmentArg, fragmentArgsList, content) {
			var result = null, fragmentName = fragmentArg.trim(), fragmentPart = fragmentName, parts, argsCount, matched, fragment, htmlContent, fragArray, i, iLimit, j, jLimit, k, clean, bare, vlParts, vlArgs, argsList, varName, newElement;
			fragmentName = fragmentName.replace(/text\(\)/g, textFuncSynonym);
			parts = fragmentName.match(varParExpr);
			if (parts == null && fragmentArgsList != null) {
				parts = [];
				parts[1] = fragmentName;
				parts[2] = fragmentArgsList;
			}
			argsCount = 0;
			if (parts) {
				if (parts.length > 1) {
					fragmentName = parts[1].trim();
					if (parts.length > 2) {
						if (parts[2].indexOf("=") > 0) {
							argsCount = thymol.getWith(element, parts[2]);
						}
						else {
							argsCount = this.getList(element, parts[2]);
						}
					}
				}
			}
			if (thymol.thCache[filePart] == null) {
				thymol.thCache[filePart] = new Object();
			}
			matched = false;
			fragment = null;
			if (fragmentName == "::") {
				htmlContent = $("html", content)[0];
				result = htmlContent;
				matched = true;
			}
			else {
				fragArray = $(thymol.thFragment.escpName, content);
				for (i = 0, iLimit = fragArray.length; i < iLimit; i++) {
					fragment = fragArray[i];
					for (j = 0, jLimit = fragment.attributes.length; j < jLimit; j++) {
						clean = fragment.attributes[j];
						clean = clean.value.replace(/\s/g, "");
						bare = null;
						vlParts = clean.match(varParExpr);
						if (vlParts) {
							if (vlParts.length > 1) {
								bare = vlParts[1].trim();
							}
						}
						if (fragmentName == bare && argsCount > 0) {
							if (vlParts.length > 2) {
								vlArgs = vlParts[2].trim().split(",");
								if (vlArgs) {
									if (vlArgs.length == argsCount) {
										argsList = element.thLocalVars["..."];
										if (argsList != null) {
											for (k = 0; k < argsCount; k++) {
												varName = vlArgs[k].trim();
												element.thLocalVars[varName] = argsList[k];
											}
											element.thLocalVars["..."] = null;
										}
										matched = true;
										break;
									}
									else if (vlArgs.length > argsCount) {
										break;
									}
								}
							}
						}
						if (fragmentName == clean || fragmentPart == clean || fragmentName == bare) {
							matched = true;
							break;
						}
					}
					if (matched) {
						result = fragment;
						break;
					}
				}
			}
			if (!matched) {
				fragment = this.getDOMSelection(fragmentName, content);
				if (fragment) {
					matched = true;
					result = fragment;
				}
				else {
					if (!element.isBlockChild) {
						throw new ThError("getImportNode cannot match fragment: \"" + fragmentName + "\"", element);
					}
				}
			}
			thymol.thCache[filePart][fragmentPart] = result;
			if (matched) {
				newElement = result.cloneNode(true);
				if (newElement.nodeType == 1) {
					newElement.removeAttribute(thymol.thFragment.name);
					newElement.removeAttribute(thymol.thFragment.synonym);
				}
				result = newElement;
				result.thLocalVars = element.thLocalVars;
			}
			return result;
		},

		getDOMSelection : function(initial, content) {
			var spec = initial, result = null, scope = "", query = new Array(), parts = "", innr = ThUtils.unBracket(spec), i, iLimit, j, jLimit, k, kLimit, m, mLimit, token, indx, saved, indxed, start, selection, descend, subQuery, exprFrags, classSpecs, qTerms, subSelect, partial, html, newNode;
			if (spec != innr && innr.charAt(innr.length - 1) == ']') { // Wrapped in [] and ends with ]]
				spec = innr;
			}
			while (spec != "") {
				parts = spec.match(domSelectExpr);
				if (parts != null && parts.length > 1) {
					for (i = 1, iLimit = parts.length; i < iLimit; i++) {
						if (parts[i] != null) {
							token = parts[i];
							indx = null;
							innr = ThUtils.unBracket(token);
							if (token != innr) {
								if (innr.match(numericExpr)) {
									indx = innr;
								}
							}
							saved = spec;
							spec = spec.replace(token, ""); // Only replace 1st occurrence
							if (saved == spec) {
								spec = "";
							}
							if (indx) {
								token = query[query.length - 1];
								indxed = new String(token);
								indxed.indx = indx;
								query[query.length - 1] = indxed;
							}
							else {
								query.push(token.trim());
							}
							break;
						}
					}
				}
				else {
					break;
				}
			}
			start = 0;
			if (query.length > 0 && query[0] != "" && query[0].charAt(0) == '/') {
				scope = query[0];
				start = 1;
			}
			selection = [];
			selection.push(content);
			descend = false;

			for (i = start, iLimit = query.length; i < iLimit; i++) {
				subQuery = query[i];

				innr = ThUtils.unBracket(subQuery);
				if (subQuery != innr) {
					innr = innr.replace(/[']/g, "\"");
					subQuery = "";
					exprFrags = innr.split(/\s{1}\s*((?:and)|(?:or))\s{1}\s*/);
					for (j = 0, jLimit = exprFrags.length; j < jLimit; j++) {
						if (exprFrags[j] != "and" && exprFrags[j] != "or") {
							classSpecs = exprFrags[j].match(/[@]?\s*(?:class)\s*(\W?[=])\s*[\"]((?:\w*[\-_]*)*)[\"]/);
							if (classSpecs && classSpecs.length > 0) {
								if (classSpecs[1] == "=") {
									subQuery = subQuery + "[class~='" + classSpecs[2] + "']";
								}
								if (classSpecs[1] == "^=") {
									subQuery = subQuery + "[class^='" + classSpecs[2] + "'],[class*=' " + classSpecs[2] + "']";
								}
							}
							else {
								subQuery = subQuery + "[" + exprFrags[j] + "]";
							}
						}
						else if (exprFrags[j] == "or") {
							subQuery = subQuery + ",";
						}
					}
				}

				qTerms = subQuery.split("/");
				for (j = 0, jLimit = qTerms.length; j < jLimit; j++) {
					if (qTerms[j] != "") {
						qTerms[j] = qTerms[j].replace(/[@]/g, "");
						if (subQuery.indx != null) {
							qTerms[j] = qTerms[j] + ":eq(" + subQuery.indx + ")";
						}
						subSelect = [];
						for (k = 0, kLimit = selection.length; k < kLimit; k++) {
							partial = null;
							if (qTerms[j] == textFuncSynonym) {
								partial = $(selection[k]).contents().filter(function() {
									return this.nodeType === 3; // Node.TEXT_NODE
								});
							}
							else if (descend) {
								partial = $(selection[k]).children(qTerms[j]);
							}
							else if (j == 0) {
								if (scope == "/") {
									html = $("html", selection[k]);
									if (html.length > 0) {
										selection[k] = html;
									}
									partial = $(selection[k]).children("body").children(qTerms[j]);
									scope = "";
								}
								else {
									if (i == 0 || scope == "//") {
										partial = $(selection[k]).find(qTerms[j]);
										scope = "";
									}
									else {
										partial = $(selection[k]).filter(qTerms[j]);
									}
								}
							}
							else {
								partial = $(selection[k]).children(qTerms[j]);
							}
							if (partial != null) {
								for (m = 0, mLimit = partial.length; m < mLimit; m++) {
									subSelect.push(partial[m]);
								}
							}
						}
						selection = subSelect;
					}
				}
				descend = (qTerms[qTerms.length - 1] == ""); // If qTerms ended with a '/' apply next query to children
			}
			result = selection;
			if (result != null && !(result.length === undefined)) {
				if (result.length > 1) {
					newNode = document.createDocumentFragment();
					for (i = 0, iLimit = result.length; i < iLimit; i++) {
						newNode.appendChild(result[i]);
					}
					result = newNode;
				}
				else {
					result = result[0];
				}
			}
			return result;
		},

		getFilePart : function(part, element) {
			var result = thymol.substitute(part, element), mapped = null, slashpos;
			if (result) {
				if (thymol.mappings) {
					mapped = thymol.getMapped(result, false);
				}
			}
			if (mapped) {
				result = thymol.protocol + mapped;
			}
			else {
				if (result && result.charAt(0) != '.') { // Initial period character indicates a relative path
					slashpos = result.indexOf('/');
					if (slashpos >= 0) { // If it doesn't start with a '.', and there are no path separators, it's also treated as relative
						if (slashpos == 0) {
							result = result.substring(1);
						}
						result = thymol.protocol + thymol.root + thymol.path + result;
					}
				}
			}
			return result;
		},

		doLiteralSubstExpr : function(param, primary) {
			var result = param.trim(), term, subst, lsp;
			if (ThUtils.isLiteralSubst(result)) {
				result = this.decodeLiteralSubst(result);
			}
			else {
				term = primary;
				while (term != null) {
					if (ThUtils.isLiteralSubst(term)) {
						subst = this.decodeLiteralSubst(term);
						result = result.replace(term, subst);
						lsp = result.match(litSubstExpr);
						if (lsp && lsp.length > 0) {
							term = lsp[1];
						}
						else {
							break;
						}
					}
					else {
						break;
					}
				}
			}
			return result;
		},

		decodeLiteralSubst : function(param) {
			var result = param, parts, rep, i, iLimit;
			result = result.trim();
			result = result.substring(1, result.length - 1);
			result = result.replace(/[\']/g, "&#39;");
			parts = result.split(varRefExpr);
			if (parts && parts.length > 0) {
				rep = "";
				for (i = 0, iLimit = parts.length; i < iLimit; i++) {
					if (parts[i] != "") {
						if (!parts[i].match(varRefExpr)) {
							parts[i] = "'" + parts[i] + "'";
						}
						if (rep == "") {
							rep = parts[i];
						}
						else {
							rep = rep + "+" + parts[i];
						}
					}
				}
				result = rep;
			}
			return result;
		},

		doReplace : function(isNode, element, content) {
			if (isNode) {
				if (content.nodeName.toLowerCase() == "html") {
					this.doInsertion(element, content, function(e, n) {
						if (n.nodeType == 1) {
							n.removeAttribute(thymol.thFragment.name);
							n.removeAttribute(thymol.thFragment.synonym);
						}
						e.parentNode.insertBefore(n, e);
					});
					element.parentNode.removeChild(element);
				}
				else {
					var node = this.doClone(content);
					if (node.nodeType == 1) {
						node.removeAttribute(thymol.thFragment.name);
						node.removeAttribute(thymol.thFragment.synonym);
					}
					element.parentNode.replaceChild(node, element);
				}
			}
			else {
				try {
					while (element.firstChild != null) {
						element.removeChild(element.firstChild);
						if (element.firstChild == null) {
							break;
						}
					}
					this.doInsertion(element, content, function(e, n) {
						if (n.nodeType == 1) {
							n.removeAttribute(thymol.thFragment.name);
							n.removeAttribute(thymol.thFragment.synonym);
						}
						e.appendChild(n);
					});
				}
				catch (err) { // Work-around for IE
					element.innerHTML = content.innerHTML;
				}
			}
		},

		doClone : function(old) {
			var node = old.cloneNode(false), cNodes, i, iNode, aNode;
			if (node !== null) {
				if (node.nodeType == 1) {
					if (old.thLocalVars !== null) {
						node.thLocalVars = old.thLocalVars;
					}
				}
				if (old.childNodes !== null) {
					cNodes = old.childNodes.length;
					if (cNodes > 0) {
						for (i = 0; i < cNodes; i++) {
							iNode = old.childNodes[i];
							if (iNode !== null) {
								aNode = this.doClone(iNode);
								if (aNode !== null) {
									node.appendChild(aNode);
								}
							}
						}
					}
				}
			}
			return node;
		},

		doInsertion : function(element, content, func) {
			var topLevel = true, parent = element.parentElement, i, iLimit, iNode, elementName, j, jLimit, jNode, cJNode, cINode;
			if (parent != null) {
				topLevel = (element.parentElement.nodeName.toLowerCase() == "html");
			}
			for (i = 0, iLimit = content.childNodes.length; i < iLimit; i++) {
				iNode = content.childNodes[i];
				if (iNode) {
					if (!topLevel) {
						elementName = iNode.nodeName.toLowerCase();
						if (elementName != "head") { // Don't insert head if not at top level
							if (elementName == "body") { // Skip body element if not at top level and just insert it's children
								for (j = 0, jLimit = iNode.childNodes.length; j < jLimit; j++) {
									jNode = iNode.childNodes[j];
									if (jNode) {
										cJNode = this.doClone(jNode);
										func(element, cJNode);
									}
								}
							}
							else {
								cINode = this.doClone(iNode);
								func(element, cINode);
							}
						}
					}
					else { // Insert anything at top level
						cINode = this.doClone(iNode);
						func(element, cINode);
					}
				}
			}
		},

		getThParam : function(paramName, isBoolean, isPath, defaultValue) {
			var localValue = defaultValue, theParam = ThUtils.getParameter(paramName), paramValue;
			if (isBoolean && theParam) {
				localValue = theParam.getBooleanValue();
			}
			else {
				try {
					paramValue = window[paramName];
					if (!(typeof paramValue === "undefined")) {
						if (paramValue != null) {
							if (isBoolean) {
								localValue = (paramValue == true);
							}
							else {
								localValue = paramValue;
							}
						}
					}
				}
				catch (err) {
					if (err instanceof ReferenceError) {
						// Do nothing
					}
					if (err instanceof EvalError) {
						// Do nothing
					}
				}
			}
			if (!isBoolean && isPath && localValue.length > 0 && localValue.charAt(localValue.length - 1) != '/') {
				localValue = localValue + '/';
			}
			thymol.applicationContext.createVariable(paramName, localValue);
			return localValue;
		}

	};

	function addDialect(spec) {
		var i, iLimit, prec = thymol.thDefaultPrecedence;
		if (spec !== null && typeof spec !== "undefined") {
			if (spec.attributeProcessors !== null && typeof spec.attributeProcessors !== "undefined") {
				for (i = 0, iLimit = spec.attributeProcessors.length; i < iLimit; i++) {
					if (spec.attributeProcessors[i].precedence !== null && typeof spec.attributeProcessors[i].precedence !== "undefined") {
						prec = spec.attributeProcessors[i].precedence;
					}
					else {
						prec = thymol.thDefaultPrecedence;
					}
					configureAttributeProcessor(spec.prefix, spec.attributeProcessors[i].name, spec.attributeProcessors[i].processor, prec, null );
				}
			}
			if (spec.elementProcessors !== null && typeof spec.elementProcessors !== "undefined") {
				for (i = 0, iLimit = spec.elementProcessors.length; i < iLimit; i++) {
					configureElementProcessor(spec.prefix, spec.elementProcessors[i].name, spec.elementProcessors[i].processor);
				}
			}
			if (spec.objects !== null && typeof spec.objects !== "undefined") {
				for (i = 0, iLimit = spec.objects.length; i < iLimit; i++) {
					if (spec.objects[i].name !== null && typeof spec.objects[i].name !== "undefined") {
						spec.objects[i].object.thExpressionObjectName = spec.objects[i].name;
						configureModule(spec.objects[i].object);
					}
					else {
						configureModule(spec.objects[i]);						
					}
				}
			}
		}
	}

	function ready(func) {
		if (typeof thymolDeferredFunctions === "undefined" || thymolDeferredFunctions === null) {
			thymolDeferredFunctions = [];
		}
		thymolDeferredFunctions.push(func);
	}

	return {

		Thymol : Thymol,

		thInclude : thymol.thInclude,
		thReplace : thymol.thReplace,
		thSubstituteby : thymol.thSubstituteby,
		
		thFragment : thymol.thFragment,
		thRemove : thymol.thRemove,
		
		thBlock : thymol.thBlock,
		
		thThymeleafPrefixList : thymol.thThymeleafPrefixList,
		thUsingNullPrefix : thymol.thUsingNullPrefix,
		
		thThymeleafElementsList : thymol.thThymeleafElementsList,

		thScriptName : thymol.thScriptName,
		thJQuerySource : thymol.thJQuerySource,
		thVersion : thymol.thVersion,
		thReleaseDate : thymol.thReleaseDate,
		thURL : thymol.thURL,
		thPrefix : thymol.thPrefix,
		thDataPrefix : thymol.thDataPrefix,
		thDefaultPrecision : thymol.thDefaultPrecision,
		thDefaultProtocol : thymol.thDefaultProtocol,
		thDefaultLocale : thymol.thDefaultLocale,
		thDefaultPrecedence : thymol.thDefaultPrecedence,

		init : init,
		addDialect : addDialect,
		configureModule : configureModule,
		configureAttributeProcessor : configureAttributeProcessor,
		configureElementProcessor : configureElementProcessor,
		configurePreExecution : configurePreExecution,
		configurePostExecution : configurePostExecution,
		isFragmentChild : isFragmentChild,
		preProcess : preProcess,
		substitute : substitute,
		substituteParam : substituteParam,
		getMessage : getMessage,
		getLocale : getLocale,
		getExpression : getExpression,
		getWith : getWith,
		getParsedExpr : getParsedExpr,
		getWithProtocol : getWithProtocol,
		getMapped : getMapped,
		getBooleanValue : getBooleanValue,
		objects : thymol.objects,
		ready : ready

	};

}();