	function ThAttr(suffix, func, prec, list, pref, dataAttr) {
		var prefix = "", dataPrefix = null, escpPrefix = "";
		if (typeof pref !== "undefined" && pref !== null ) {
			prefix = pref + ":";			
			if (thymol.thThymeleafPrefixList.indexOf(prefix) < 0) {
				thymol.thThymeleafPrefixList.push(prefix);
			}
			escpPrefix = pref + "\\:";
			if (typeof dataAttr === "undefined" || dataAttr === null ) {
				dataPrefix = thymol.dataPrefix + "-" + pref + "-";
				if (thymol.thThymeleafPrefixList.indexOf(dataPrefix) < 0) {
					thymol.thThymeleafPrefixList.push(dataPrefix);
				}
			}
			else {
				dataPrefix = dataAttr;				
			}
		}

// Need name, synonym, escpName and escpSynonym
		this.regex = null;
		if( suffix.indexOf('*') >=0 || suffix.indexOf('?') >=0 || suffix.indexOf('+') >=0 || suffix.indexOf('\\') >=0 || suffix.indexOf('|') >=0 || suffix.indexOf('[') >=0 || suffix.indexOf(']') >=0 || suffix.indexOf('{') >=0 || suffix.indexOf('}') >=0 ) {
			if( "*" === suffix ) {
				suffix = ".*";
			}
			this.regex = new RegExp(suffix);
		}		
		this.suffix = suffix;
		this.name = prefix + suffix;
		this.escpName = "[" + escpPrefix + suffix + "]";
		if( dataPrefix !== null ) {
			this.synonym = dataPrefix + suffix;			
			this.escpSynonym = "[" + this.synonym + "]";
		}
		else {
			this.synonym = null;
			this.escpSynonym = null;
		}
		if (typeof prec !== "undefined" && prec !== null ) {
			this.precedence = prec;
		}
		else {
			this.precedence = thymol.thDefaultPrecedence;
		}		
		if (!!list) {
			var attrList = list[pref];
			if(!attrList) {
				attrList = [];
				list[pref] = attrList;
				if( dataPrefix !== null ) {
					list[dataPrefix] = attrList;
				}				
			}
			attrList.push(this);
		}
		this.process = function() {
			window.alert("unsupported processing function for attribute \"" + this.name + "\"");
		};
		if (!(typeof func === "undefined")) {
			this.process = func;
		}
		this.disable = function() {
			this.name = null;
			this.escpName = null;
			this.escpSynonym = null;
		};
	}

	function ThElement(suffix, func, pref) {
		var tha =  new ThAttr(suffix, null, 0, null, pref);
		this.name = tha.name;		
		this.synonym = tha.synonym;		
		this.endName = "/" + tha.name;
		this.endSynonym = "/" + tha.synonym;
		this.process = function() {
			window.alert("unsupported processing function for element \"" + this.name + "\"");
		};
		if (!(typeof func === "undefined")) {
			this.process = func;
		}
		this.disable = function() {
			this.name = null;
			this.synonym = null;
			this.endName = null;
			this.endSynonym = null;
			this.process = null;
		};
		thymol.thThymeleafElementsList.push(this);
	}

function ThSet() {
	this.that = this;
	this.setSize = 0;
	this.isContent = function(k) {
		return (this.hasOwnProperty(k) && typeof this[k] !== "function" && k !== "that" && k !== "setSize");
	};
	this.add = function(k) {
		var contained = typeof this[k] !== "undefined";
		this[k] = k;
		if (contained !== (typeof this[k] !== "undefined")) {
			this.setSize++;
		}
	};
	this.addAll = function(other) {
		var k = null, value;
		for (k in other) {
			if (other.hasOwnProperty(k)) {
				value = other[k];
				if (typeof value !== "function") {
					add(value);
				}
			}
		}
	};
	this.clear = function() {
		for ( var k in this) {
			if (this.hasOwnProperty(k)) {
				delete this[k];
			}
		}
		setSize = 0;
	};
	this.contains = function(k) {
		return typeof this[k] !== "undefined";
	};
	this.containsAll = function(keys) {
		var keySet = keys, k = null;
		if (typeof keys === "Array" || Object.prototype.toString.call(keys) === '[object Array]') {
			keySet = ThSet.prototype.fromArray(keys);
		}
		for (k in keySet) {
			if (keySet.hasOwnProperty(k)) {
				if (typeof this[k] === "undefined") {
					return false;
				}
			}
		}
		return true;
	};
	this.isEmpty = function() {
		return this.setSize === 0;
	};
	this.size = function() {
		return this.setSize;
	};
	this.remove = function(k) {
		var contained = typeof this[k] !== "undefined";
		delete this[k];
		if (contained !== (typeof this[k] !== "undefined")) {
			this.setSize--;
		}
	};
	this.toArray = function() {
		return getArray(this);
	};
	this.toString = function() {
		var array = getArray();
		return array.toString();
	};
	function getArray(obj) {
		var array = [], k = null, value;
		for (k in obj) {
			if (obj.hasOwnProperty(k) && k !== "that" && k !== "setSize") {
				value = obj[k];
				if (typeof value !== "function") {
					array.push(value);
				}
			}
		}
		return array;
	}
}
ThSet.prototype.fromArray = function(array) {
	var set = new ThSet(), i, iLimit;
	for (i = 0, iLimit = array.length; i < iLimit; i++) {
		set.add(array[i]);
	}
	return set;
};


function ThMap() {
	ThSet.apply(this);
	this.containsKey = function(k) {
		return this.contains(k);
	};
	this.containsValue = function(target) {
		var k = null, value;
		for (k in this.that) {
			if (this.that.hasOwnProperty(k) && k !== "that") {
				value = this.that[k];
				if (value === target) {
					return true;
				}
			}
		}
		return false;
	};
	this.entrySet = function() {
		return this.that;
	};
	this.get = function(k) {
		return this.that[k];
	};
	this.keySet = function() {
		return this.that;
	};
	this.put = function(k, v) {
		var contained = typeof this[k] !== "undefined";
		this.that[k] = v;
		if (contained !== (typeof this[k] !== "undefined")) {
			this.setSize++;
		}
	};
	this.putAll = function(t) {
		for ( var k in t) {
			put(k, t[k]);
		}
	};
	this.values = function() {
		return this.that;
	};
}
ThMap.prototype = new ThSet();
ThMap.prototype.constructor = ThMap;


function ThError(message, element) {
	this.name = "ThError";
	this.message = message || "Default Message";
	if (element !== null && typeof element !== "undefined" && element.isBlockChild) {
		this.suppress = true;
	}
	else {
		this.element = element || {};
		this.suppress = false;
	}
}
ThError.prototype = new Error();
ThError.prototype.constructor = ThError;


function ThParam(valueArg) {
	this.value = valueArg;
	this["class"] = new ThClass("Thymol.ThParam");
	this.getBooleanValue = function() {
		return !ThUtils.testLiteralFalse(this.value);
	};
	this.toString = function() {
		return this.value;
	};
	this.getNumericValue = function() {
		return Number(this.value);
	};
}


function ThObject(dolly) {
	for (prop in dolly) {
		if (dolly.hasOwnProperty(prop)) {
			if (prop) {
				if (!this[prop]) {
					this[prop] = dolly[prop];
				}
			}
		}
	}
	this["class"] = new ThClass("Thymol.ThObject");
	this.toNonThObject = function() {
		var plain = {};
		for (prop in this) {
			if (this.hasOwnProperty(prop)) {
				if (prop) {
					if (!plain[prop]) {
						if (prop !== "toNonThObject") {
							if (prop !== "class" || (prop === "class" && this[prop] !== null && this[prop].name !== "Thymol.ThObject")) {
								plain[prop] = this[prop];
							}
						}
					}
				}
			}
		}
		return plain;
	};
}


function ThVarsAccessor(storeArg, storeNameArg) {
	this.store = storeArg;
	this.arrayName = storeNameArg;
	this.length = function() {
		return this.store.length;
	};
	this.get = function(name) {
		return this.store[name];
	};
	this.set = function(name, value) {
		this.store[name] = value;
	};
}


function ThClass(nValue) {
	this.name = nValue;
};

