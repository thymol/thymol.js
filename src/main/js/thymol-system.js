/*-------------------- Thymol - the flavour of Thymeleaf --------------------*

   Thymol version ${thymolVersion} Copyright 2012-2014 James J. Benson.
   jjbenson .AT. users.sf.net

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" basis,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either expressed or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

 *---------------------------------------------------------------------------*/

var thymol;
var ThUtils;

(function(DOMParser) {
	var DOMParser_proto = DOMParser.prototype, real_parseFromString = DOMParser_proto.parseFromString;
	try {
		if ((new DOMParser()).parseFromString("", "text/html")) {
			return;
		}
	}
	catch (ignore) {
		// Do nothing
	}
	DOMParser_proto.parseFromString = function(markup, type) {
		var res, doc;
		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
			doc = document.implementation.createHTMLDocument("");
			if (markup.toLowerCase().indexOf('<!doctype') > -1) {
				doc.documentElement.innerHTML = markup;
			}
			else {
				doc.body.innerHTML = markup;
			}
			res = doc;
		}
		else {
			res = real_parseFromString.apply(this, arguments);
		}
		return res;
	};
}(DOMParser));

(function($) {
	/**
	 * @memberOf $.fn
	 */
	$.fn.extend({

		getComments : function() {
			return this.filter(function() {
				return this.nodeType === 8;
			});
		},

		getThDecorated : function(thInst) {
			var i, iAttrName, iLength, j, jLength, instances = [], result = null, expanded = false;
			if( thInst.escpName !== null ) {
				instances = this.filter(thInst.escpName);
			}
			if( thInst.escpSynonym !== null ) {
				instances = instances.add( this.filter(thInst.escpSynonym) );
			}
			for (i = 0, iLength = instances.length; i < iLength; i++) {
				if (instances[i]) {
					for (j = 0, jLength = instances[i].attributes.length; j < jLength; j++) {
						if (instances[i].attributes[j]) {
							iAttrName = instances[i].attributes[j].name;
							if ( iAttrName && ( thInst.name == iAttrName || thInst.synonym == iAttrName )) {
								expanded = ThUtils.processElement(thInst.process, instances[i], instances[i].attributes[j], thInst);
								if (expanded) {
									if (result === null) {
										result = [];
									}
									result.push(instances[i]);
								}
							}
						}
					}
				}
			}
			return result;
		}

	});
})($);

if (!Array.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0); i < this.length; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
};

$(window).unload(function() {
	if (thymol.sessionContext && thymol.sessionContext.persist) {
		thymol.sessionContext.persist();
	}
});