(function() {
  var thymolConfiguration = {
	// Please set the values of the following fields!
			thScriptName : "${thThymolSource}",
			thJQuerySource : "${thJQuerySource}",
	// These are defaults, change them if you wish..
			thPrefix : "th",
			thDataPrefix : "data",
			thDefaultPrecision : 10,
			thDefaultProtocol : "file://",
			thDefaultLocale : "en",
			thDefaultPrecedence : 20000
	};
	thymol = function(conf) {		
		conf.ready = function(func) {
			if (typeof thymolDeferredFunctions === "undefined" || thymolDeferredFunctions === null) {
				thymolDeferredFunctions = [];
			}
			thymolDeferredFunctions.push(func);
		};
		return conf;
	}(thymolConfiguration);
	var loadScript = function(script, params) {
		var el = document.createElement('script');
		el.async = false;
		if (typeof script !== "undefined" && script !== null) {
			el.src = script;
		}
		if (typeof params !== "undefined" && params !== null) {
			el.src += "?" + params;
		}
		el.type = 'text/javascript';
		(document.getElementsByTagName('HEAD')[0] || document.body).appendChild(el);
	};
	var scripts = document.getElementsByTagName("script");
	var script = document.currentScript || scripts[scripts.length - 1];
	var path = "";
	var scriptSrc = script.getAttribute("src");
	var pathEnd = scriptSrc.lastIndexOf('/');
	if (pathEnd >= 0) {
		path = scriptSrc.substring(0, 1 + pathEnd);
	}
	var jquerySrc = script.getAttribute("data-jquery-src");
	if (!!jquerySrc) {
		thymol.thJQuerySource = jquerySrc;
		if ("" !== thymol.thJQuerySource) {
			loadScript(thymol.thJQuerySource);
		}
	}
	else if( typeof thymol.thJQuerySource !== "undefined" && thymol.thJQuerySource !== null && thymol.thJQuerySource.length > 0 ) {
		var withProtocol = thymol.thJQuerySource.indexOf(":/") >= 0;
		if( withProtocol || thymol.thJQuerySource.charAt(0) === '/' ) {
			if( !withProtocol ) {
				loadScript(thymol.thDefaultProtocol + thymol.thJQuerySource);
			}
			else {
				loadScript(thymol.thJQuerySource);
			}
		}
		else {
			loadScript(path + thymol.thJQuerySource);
		}
	}
	var thymolSrc = script.getAttribute("data-thymol-src");
	if (!!thymolSrc) {
		thymol.thScriptName = thymolSrc;
	}
	var parameters = null;
	for (var i = 0, iLimit = scripts.length; i < iLimit; i++) {
		parameters = scripts[i].getAttribute("data-thymol-parameters");
		if (!!parameters) {
			break;
		}
	}
	loadScript(path + thymol.thScriptName, parameters);
	
})();