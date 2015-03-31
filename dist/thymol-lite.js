/*-------------------- Thymol - the flavour of Thymeleaf --------------------*

   Thymol version 2.0.0 Copyright (C) 2012-2015 James J. Benson
   jjbenson .AT. users.sf.net (http://www.thymoljs.org/)

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

thymol = function() {
    thymol.thVersion = "2.0.0";
    thymol.thReleaseDate = "2015-03-31";
    thymol.thURL = "http://www.thymoljs.org";
    thymol.thAltURL = "http://www.thymeleaf.org";
    thymol.thUsingNullPrefix = false;
    thymol.thThymeleafPrefixList = [];
    thymol.thThymeleafElementsList = [];
    thymol.objects = {};
    var textFuncSynonym = "~~~~", varRefExpr = /([$#]{.*?})/, literalTokenExpr = /^[a-zA-Z0-9\[\]\.\-_]*$/, startParserLevelCommentExpr = /^\s*\/\*\s*$/, endParserLevelCommentExpr = /^\s*\*\/\s*$/, startParserLevelCommentExpr2 = /^\/\*[^\/].*/, endParserLevelCommentExpr2 = /.*[^\/]\*\/$/, prototypeOnlyCommentEscpExpr = /\/\*\/(.*)\/\*\//, varExpr3 = /[\$\*#@]{1}\{(.*)\}$/, nonURLExpr = /[\$\*#]{1}\{(?:!?[^}]*)\}/, numericExpr = /^[+\-]?[0-9]*?[.]?[0-9]*?$/, varParExpr = /([^(]*)\s*[(]([^)]*?)[)]/, domSelectExpr = /([\/]{1,2})?([A-Za-z0-9_\-]*(?:[\(][\)])?)?([^\[]\S[A-Za-z0-9_\-]*(?:[\(][\)])?[\/]*(?:[\.\/#]?[^\[]\S[A-Za-z0-9_\-]*(?:[\(][\)])?[\/]*)*)?([\[][^\]]*?[\]])?/, litSubstExpr = /\.*?([\|][^\|]*?[\|])\.*?/;
    function Thymol() {}
    function isClientSide() {
        if (typeof thymol.isServerSide !== "undefined" && !!thymol.isServerSide()) {
            thymol.isClientSide = function() {
                return false;
            };
            return false;
        }
        thymol.isClientSide = function() {
            return true;
        };
        return true;
    }
    function execute(doc) {
        if (typeof thymol.protocol === "undefined") {
            thymol.protocol = "";
        }
        if (typeof thymol.root === "undefined") {
            thymol.root = "";
        }
        if (typeof thymol.path === "undefined") {
            thymol.path = "";
        }
        thymol.thDocument = doc;
        var theWindow = thymol.thWindow;
        if (typeof thymol.thWindow === "undefined") {
            if (typeof doc.defaultView !== "undefined") {
                theWindow = doc.defaultView;
            } else if (typeof doc.parentWindow !== "undefined") {
                theWindow = doc.parentWindow;
            }
        }
        thymol.thWindow = theWindow;
        var theTop = thymol.thTop;
        if (typeof thymol.thTop === "undefined") {
            if (typeof top !== "undefined") {
                theTop = top;
            }
        }
        thymol.thTop = theTop;
        thymol.init();
        var base = new ThNode(thymol.thDocument, false, null, null, null, thymol.thDocument.nodeName, "::", false, thymol.thDocument);
        Thymol.prototype.process(base);
        postExecute();
        return thymol.thDocument;
    }
    function jqSetup(jq) {
        jq.fn.extend({
            getComments: function() {
                return this.filter(function() {
                    return this.nodeType === 8;
                });
            },
            getThDecorated: function(thInst) {
                var i, iAttrName, iLength, j, jLength, instances = [], result = null, expanded = false;
                if (thInst.escpName !== null) {
                    instances = this.filter(thInst.escpName);
                }
                if (thInst.escpSynonym !== null) {
                    instances = instances.add(this.filter(thInst.escpSynonym));
                }
                for (i = 0, iLength = instances.length; i < iLength; i++) {
                    if (instances[i]) {
                        for (j = 0, jLength = instances[i].attributes.length; j < jLength; j++) {
                            if (instances[i].attributes[j]) {
                                iAttrName = instances[i].attributes[j].name;
                                if (iAttrName && (thInst.name == iAttrName || thInst.synonym == iAttrName)) {
                                    expanded = thymol.ThUtils.processElement(thInst.process, instances[i], instances[i].attributes[j], thInst);
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
    }
    function ready(func) {
        if (typeof thymolDeferredFunctions === "undefined" || thymolDeferredFunctions === null) {
            thymolDeferredFunctions = [];
        }
        thymolDeferredFunctions.push(func);
    }
    function setupEnv() {
        thymol.prefix = Thymol.prototype.getThParam("thPrefix", false, false, thymol.thDefaultPrefix);
        thymol.dataPrefix = Thymol.prototype.getThParam("thDataPrefix", false, false, thymol.thDefaultDataPrefix);
        thymol.messagePath = Thymol.prototype.getThParam("thMessagePath", false, true, thymol.thDefaultMessagePath);
        thymol.resourcePath = Thymol.prototype.getThParam("thResourcePath", false, true, thymol.thDefaultResourcePath);
        thymol.messagesBaseName = Thymol.prototype.getThParam("thMessagesBaseName", false, false, thymol.thDefaultMessagesBaseName);
        thymol.relativeRootPath = Thymol.prototype.getThParam("thRelativeRootPath", false, true, thymol.thDefaultRelativeRootPath);
        thymol.extendedMapping = Thymol.prototype.getThParam("thExtendedMapping", true, false, thymol.thDefaultExtendedMapping);
        thymol.localMessages = Thymol.prototype.getThParam("thLocalMessages", true, false, thymol.thDefaultLocalMessages);
        thymol.disableMessages = Thymol.prototype.getThParam("thDisableMessages", true, false, thymol.thDefaultDisableMessages);
        thymol.templateSuffix = Thymol.prototype.getThParam("thTemplateSuffix", false, false, thymol.thDefaultTemplateSuffix);
        thymol.scriptPath = "";
        if (typeof thymol.thScriptPath !== "undefined") {
            thymol.scriptPath = Thymol.prototype.getThParam("thScriptPath", false, true, thymol.thScriptPath);
        }
        thymol.absolutePath = "";
        if (typeof thymol.thAbsolutePath !== "undefined") {
            thymol.absolutePath = Thymol.prototype.getThParam("thAbsolutePath", false, true, thymol.thAbsolutePath);
        }
        thymol.useAbsolutePath = false;
        if (typeof thymol.thUseAbsolutePath !== "undefined") {
            thymol.useAbsolutePath = Thymol.prototype.getThParam("thUseAbsolutePath", true, false, thymol.thUseAbsolutePath);
        }
        thymol.useFullURLPath = true;
        if (typeof thymol.thUseFullURLPath !== "undefined") {
            thymol.useFullURLPath = Thymol.prototype.getThParam("thUseFullURLPath", true, false, thymol.thUseFullURLPath);
        }
        thymol.indexFile = Thymol.prototype.getThParam("thIndexFile", false, false, null);
        thymol.debug = Thymol.prototype.getThParam("thDebug", true, false, false);
        thymol.allowNullText = Thymol.prototype.getThParam("thAllowNullText", true, false, true);
        thymol.location = thymol.thLocation;
        if ("" !== thymol.relativeRootPath) {
            thymol.root = thymol.location + thymol.relativeRootPath;
            thymol.messagePath = thymol.root + thymol.messagePath;
        } else {
            if (typeof thymol.thMessagePath !== "undefined") {
                thymol.messagePath = Thymol.prototype.getThParam("thMessagePath", false, true, thymol.thMessagePath);
            }
            if (typeof thymol.thRoot !== "undefined") {
                thymol.root = Thymol.prototype.getThParam("thRoot", false, true, thymol.thRoot);
            }
        }
        thymol.root = Thymol.prototype.getThParam("thRoot", false, true, thymol.root);
        if (typeof thymol.thPath !== "undefined") {
            thymol.path = Thymol.prototype.getThParam("thPath", false, true, thymol.thPath);
        }
        thymol.path = Thymol.prototype.getThParam("thPath", false, true, thymol.path);
        thymol.protocol = thymol.thDocument.location.protocol;
        if ("" == thymol.protocol) {
            thymol.protocol = thymol.thDefaultProtocol;
        } else {
            thymol.protocol += "//";
            if ("" == thymol.thDocument.location.host) {
                thymol.protocol += "/";
            }
        }
        thymol.protocol = Thymol.prototype.getThParam("thProtocol", false, false, thymol.protocol);
        thymol.resourcePath = Thymol.prototype.getThParam("thResourcePath", false, true, thymol.resourcePath);
    }
    function updatePrefix(pref) {
        thymol.prefix = pref;
        thymol.thThymeleafPrefixList = [];
        thymol.thThymeleafElementsList = [];
    }
    function init() {
        this.messages = null;
        this.mappings = null;
        this.debug = null;
        getLocations(this);
        this.locale = new thymol.ThObject();
        getLanguage();
        var accessor = undefined, i, iLimit, j, jLimit;
        if (typeof thVars !== "undefined") {
            accessor = new thymol.ThVarsAccessor(thVars, "thVars");
        }
        this.applicationContext = thymol.makeContext("application", accessor);
        this.sessionContext = thymol.makeContext("session", undefined);
        this.sessionContext.persist = function() {
            var save = this.serialise();
            thymol.thTop.name = save;
        };
        this.requestContext = thymol.makeContext("request", undefined);
        this.booleanAndNullTokens = new Array();
        this.booleanAndNullTokens["null"] = this.applicationContext.createVariable("null", null);
        this.booleanAndNullTokens["true"] = this.applicationContext.createVariable("true", true);
        this.booleanAndNullTokens["false"] = this.applicationContext.createVariable("false", false);
        this.allowNullText = null;
        setupEnv();
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
        thymol.configureModule(thymol.objects.thHttpServletRequestObject);
        thymol.configureModule(thymol.objects.thHttpSessionObject);
        if (typeof thymol.thObjectsConfigureModules !== "undefined") {
            thymol.thObjectsConfigureModules();
        }
        var scripts = thymol.thDocument.getElementsByTagName("script");
        for (var i = 0, iLimit = scripts.length; i < iLimit; i++) {
            var parameters = scripts[i].getAttribute("data-thymol-load");
            if (!!parameters) {
                var splits = parameters.split(",");
                for (var j = 0, jLimit = splits.length; j < jLimit; j++) {
                    thymol.ThUtils.loadScript(splits[j]);
                }
            }
        }
        setupEnv();
        if (typeof thymol.thPreExecutionFunctions === "undefined" || thymol.thPreExecutionFunctions === null) {
            thymol.thPreExecutionFunctions = [];
        }
        if (typeof thymol.thPostExecutionFunctions === "undefined" || thymol.thPostExecutionFunctions === null) {
            thymol.thPostExecutionFunctions = [];
        }
        $.ajaxSetup({
            async: false,
            isLocal: true,
            dataType: "text"
        });
        if (!(typeof thVars === "undefined")) {
            for (i = 0, iLimit = thVars.length; i < iLimit; i++) {
                this.applicationContext.createVariable(thVars[i][0], thVars[i][1]);
            }
        }
        executeDeferred();
        (function() {
            var htmlTagAttrs = $("html")[0].attributes, tp = null, tu, nsspec;
            $([ thymol.thURL, thymol.thAltURL ]).each(function() {
                tu = this;
                $(htmlTagAttrs).each(function() {
                    if (this.value == tu) {
                        nsspec = this.localName.split(":");
                        if (nsspec.length > 0) {
                            tp = nsspec[nsspec.length - 1];
                            return false;
                        }
                    }
                });
                if (tp) {
                    thymol.updatePrefix(tp);
                    return false;
                }
            });
        })();
        var defaultScriptUrl = "";
        if (!!thymol.thRequest) {
            thymol.thWindow.location.search = thymol.thRequest;
        }
        (function(app, req) {
            var e, f, a = /\+/g, r = /([^&=]+)=?([^&]*)/g, d = function(s) {
                return decodeURIComponent(s.replace(a, " "));
            }, q = thymol.thWindow.location.search.substring(1), surl, scriptUrl = defaultScriptUrl;
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
                  case "thPrefix":
                    thymol.prefix = e[2];
                    break;

                  case "thDataPrefix":
                    thymol.dataPrefix = e[2];
                    break;

                  case "thMessagePath":
                    thymol.messagePath = e[2];
                    break;

                  case "thResourcePath":
                    thymol.resourcePath = e[2];
                    break;

                  case "thMessagesBaseName":
                    thymol.messagesBaseName = e[2];
                    break;

                  case "thRelativeRootPath":
                    thymol.relativeRootPath = e[2];
                    break;

                  case "thExtendedMapping":
                    thymol.extendedMapping = e[2];
                    break;

                  case "thTemplateSuffix":
                    thymol.templateSuffix = e[2];
                    break;

                  case "thLocalMessages":
                    thymol.localMessages = e[2];
                    break;

                  case "thDisableMessages":
                    thymol.disableMessages = e[2];
                    break;

                  case "thIndexFile":
                    thymol.indexFile = e[2];
                    break;

                  case "thProtocol":
                    thymol.protocol = e[2];
                    break;

                  case "thDebug":
                    thymol.debug = e[2];
                    break;

                  case "thRoot":
                    thymol.root = e[2];
                    break;

                  case "thPath":
                    thymol.path = e[2];
                    break;

                  case "thAllowNullText":
                    thymol.allowNullText = e[2];
                    break;

                  case "thLocale":
                    thymol.locale.value = e[2];
                    break;

                  case "thDefaultPrecision":
                    thymol.thDefaultPrecision = e[2];
                    break;

                  case "thDefaultPrecedence":
                    thymol.thDefaultPrecedence = e[2];
                    break;

                  default:
                    app.createVariable(e[1], e[2]);
                }
            }
            while (e = r.exec(q)) {
                req.createVariable(d(e[1]), e[2], true);
            }
        })(this.applicationContext, this.requestContext);
        thymol.thInclude = new thymol.ThAttr("include", null, 100, null, thymol.prefix);
        thymol.thReplace = new thymol.ThAttr("replace", null, 100, null, thymol.prefix);
        thymol.thSubstituteby = new thymol.ThAttr("substituteby", null, 100, null, thymol.prefix);
        thymol.thFragment = new thymol.ThAttr("fragment", null, 2e4, null, thymol.prefix);
        thymol.thRemove = null;
        thymol.thBlock = new thymol.ThElement("block", function(element) {
            var i, limit = element.childNodes.length;
            for (i = 0; i < limit; i++) {
                if (element.childNodes[i].nodeType === 1) {
                    element.childNodes[i].isBlockChild = true;
                }
            }
        }, thymol.prefix);
        this.applicationContext.resolveJSONReferences();
        thymol.setupAttrList();
        preExecute(this.applicationContext);
        this.thExpressionObjects["#vars"] = this.applicationContext;
        this.thExpressionObjects["#root"] = this.applicationContext;
        this.sessionContext.init();
        this.sessionContext.resolveJSONReferences();
        this.requestContext.resolveJSONReferences();
        this.thExpressionObjects["#ctx"]["variables"] = this.applicationContext;
        this.thExpressionObjects["#ctx"]["requestParameters"] = this.requestContext;
        this.thExpressionObjects["#ctx"]["servletContext"] = this.applicationContext;
        this.thExpressionObjects["#ctx"]["httpServletRequest"] = this.thExpressionObjects["#httpServletRequest"];
        this.thExpressionObjects["#ctx"]["httpSession"] = this.thExpressionObjects["#httpSession"];
        this.protocol = Thymol.prototype.override("thProtocol", this.protocol);
        this.debug = Thymol.prototype.override("thDebug", this.debug);
        this.root = Thymol.prototype.override("thRoot", this.root);
        if ("" !== this.relativeRootPath) {
            var rootURI = thymol.thDocument.location.href;
            var quePos = rootURI.indexOf("?");
            if (quePos >= 0) {
                rootURI = rootURI.substring(0, quePos);
            }
            var sepPos = rootURI.lastIndexOf("/");
            if (sepPos >= 0) {
                rootURI = rootURI.substring(0, sepPos + 1);
            }
            var newThRoot = rootURI + this.thLocation + this.relativeRootPath;
            this.thRoot = Thymol.prototype.getThParam("thRoot", false, true, newThRoot);
        }
        this.path = Thymol.prototype.override("thPath", this.path);
        this.allowNullText = Thymol.prototype.override("thAllowNullText", this.allowNullText);
        this.locale.value = Thymol.prototype.override("thLocale", this.locale.value);
        if (!(typeof thMappings === "undefined")) {
            this.mappings = [];
            for (j = 0, jLimit = thMappings.length; j < jLimit; j++) {
                this.mappings.push([ thMappings[j][0], thMappings[j][1] ]);
            }
            this.mappings.sort(function(a, b) {
                return a[0].length > b[0].length ? -1 : 1;
            });
        }
        this.messages = {};
        setLocaleValue();
        if (!(typeof thMessages === "undefined")) {
            this.messages[""] = [];
            for (j = 0, jLimit = thMessages.length; j < jLimit; j++) {
                this.messages[""][thMessages[j][0]] = thMessages[j][1];
            }
            for (var k in thMessages) {
                if (thMessages.hasOwnProperty(k)) {
                    if (!k.match(numericExpr)) {
                        this.messages[k] = [];
                        for (j = 0, jLimit = thMessages[k].length; j < jLimit; j++) {
                            this.messages[k][thMessages[k][j][0]] = thMessages[k][j][1];
                        }
                    }
                }
            }
        }
        if (!(typeof thDisable === "undefined")) {
            for (j = 0, jLimit = thDisable.length; j < jLimit; j++) {
                Thymol.prototype.doDisable(thDisable[j]);
            }
        }
        thymol.thRemove = Thymol.prototype.getThAttrByName("remove");
    }
    function getLocations(thiz) {
        thiz.templateName = "";
        thiz.templatePath = "";
        if (!!thymol.thDocument.location.href) {
            var templateName = templatePath = thymol.thDocument.location.href;
            thiz.templateName = templateName.substring(0, templateName.indexOf(".") == -1 ? templateName.length : templateName.lastIndexOf("."));
            thiz.templatePath = templatePath.substring(0, templatePath.indexOf("/") == -1 ? 0 : templatePath.lastIndexOf("/") + 1);
        }
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
        } else {
            thymol.thUsingNullPrefix = true;
        }
        p = new thymol.ThAttr(suffix, func, prec, thymol.thThymeleafPrefixList, prefix, dataAttr);
    }
    function configureElementProcessor(prefix, suffix, func) {
        var p = new thymol.ThElement(suffix, func, prefix);
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
                    throw new thymol.ThError("Mismatched pre-processing indicators", element);
                }
                var head = result.substring(0, fp);
                var centre = result.substring(fp + 2, lp);
                centre = this.getParsedExpr(centre, element);
                var tail = result.substring(lp + 2);
                result = head + centre + tail;
                fp = result.indexOf("__");
            }
        } while (fp >= 0);
        result = result.replace(/\\_\\_/g, "__");
        return result;
    }
    function substituteParam(argValue, mode, element) {
        var result = argValue, varName = argValue, subs = null, msg, expo;
        if (result) {
            if (mode === 4) {
                msg = thymol.getMessage(varName);
                if (msg) {
                    subs = msg;
                }
            } else if (mode === 6) {
                subs = argValue;
            } else {
                var token = thymol.booleanAndNullTokens[result];
                if (!(typeof token === "undefined")) {
                    if (token === null) {
                        subs = null;
                    } else {
                        subs = token.value;
                    }
                } else {
                    if (varName.charAt(0) === "#") {
                        if ("#object" === varName) {
                            if (element.thObjectVar) {
                                subs = element.thObjectVar;
                            }
                        } else {
                            expo = thymol.thExpressionObjects[varName];
                            if (typeof expo !== "undefined" && expo !== null) {
                                subs = expo;
                            }
                        }
                    }
                    if ((typeof subs === "undefined" || subs == null) && element.thObjectVar) {
                        subs = element.thObjectVar[varName];
                    }
                    if ((typeof subs === "undefined" || subs == null) && element.thLocalVars) {
                        subs = element.thLocalVars[varName];
                    }
                    if (typeof subs === "undefined" || subs == null) {
                        subs = thymol.ThUtils.getParameter(varName);
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
                    if (mode === 2 && (typeof subs === "undefined" || subs == null)) {
                        subs = argValue;
                    }
                }
            }
            result = subs;
            if (subs instanceof thymol.ThParam) {
                result = subs.value;
            }
        }
        return result;
    }
    function getStandardURL(initial) {
        var result = initial.trim(), mapped, head;
        mapped = thymol.getMapped(result, thymol.extendedMapping);
        if (mapped) {
            result = mapped;
        }
        if ("/" === result && !!thymol.indexFile) {
            result += thymol.indexFile;
        }
        if (!/.*:\/\/.*/.test(result)) {
            if (/^~?\/.*$/.test(result)) {
                if (/^~.*$/.test(result)) {
                    result = result.substring(1);
                }
                if (!/^\/\/.*$/.test(result)) {
                    if (thymol.useFullURLPath) {
                        head = thymol.root + thymol.resourcePath;
                        if (head != "") {
                            if (head.charAt(head.length - 1) !== "/") {
                                head = head + "/";
                            }
                            if (result.charAt(0) === "/") {
                                result = head + result.substring(1);
                            } else {
                                result = head + result;
                            }
                        }
                    } else {
                        result = thymol.resourcePath + result;
                    }
                }
            }
        }
        return result;
    }
    function getExpression(argValue, element) {
        var result = argValue, subst = false, initial, shortCut, args, negate, token, lsp;
        if (typeof argValue === "string") {
            initial = argValue.trim();
            result = initial;
            if (result) {
                shortCut = thymol.ThUtils.getParameter(result);
                if (!shortCut) {
                    args = result.match(varExpr3);
                    if (args) {
                        if (args[1] && args[1].length > 0) {
                            shortCut = thymol.ThUtils.getParameter(args[1]);
                        }
                    }
                }
                if (shortCut) {
                    if (shortCut instanceof thymol.ThParam) {
                        result = shortCut.value;
                    } else {
                        result = shortCut;
                    }
                    if (typeof result === "string" && result.match(numericExpr)) {
                        result = parseInt(result);
                    }
                } else {
                    initial = thymol.ThUtils.unParenthesise(result);
                    negate = false;
                    if (initial.charAt(0) == "!") {
                        negate = true;
                        initial = initial.substring(1, initial.length);
                        initial = thymol.ThUtils.unParenthesise(initial);
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
                            if (thymol.ThUtils.charOcurrences(lsp[1], "'") < 2) {
                                initial = Thymol.prototype.doLiteralSubstExpr(initial, lsp[1]);
                            }
                        }
                        result = "";
                        if (initial != "") {
                            initial = thymol.ThUtils.unParenthesise(initial);
                            initial = thymol.preProcess(initial, element);
                            result = thymol.getParsedExpr(initial, element, true);
                        }
                    }
                    if (result == initial && typeof result == typeof initial) {
                        result = null;
                    } else if (typeof result === "string") {
                        if (!lsp) {
                            result = result.replace(/[\\][\\]/g, "\\");
                        }
                        result = result.replace(/&#39;/g, "'").replace(/&apos;/gi, "'");
                    }
                    if (negate) {
                        if (typeof result === "boolean") {
                            result = !result;
                        } else if (typeof result === "number") {
                            result = result == 0;
                        } else if (typeof result === "string") {
                            result = !thymol.ThUtils.testLiteralFalse(result);
                        }
                    }
                }
            }
        }
        return result;
    }
    function getMapped(uri, extended) {
        var mapped = null, i, iLimit, key;
        if (uri && typeof uri === "string") {
            if (thymol.mappings) {
                for (i = 0, iLimit = thymol.mappings.length; i < iLimit; i++) {
                    key = thymol.mappings[i][0];
                    if (uri == key) {
                        mapped = thymol.mappings[i][1];
                        break;
                    } else if (extended) {
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
    }
    function substitute(initial, element, lenient) {
        var argValue = initial, result, args, token, re, subs, saved;
        if (typeof argValue === "string") {
            argValue = argValue.trim();
        }
        result = argValue;
        args = "";
        while (args != null) {
            args = argValue.match(/.*([$\*#@]{(!?[^}]*)}).*/);
            if (args != null && args.length > 0) {
                if (args.length == 3) {
                    token = args[1];
                    token = token.replace(/[$]/g, "[$]").replace(/[*]/g, "[*]").replace(/[\']/g, "[']").replace(/[+]/g, "[+]").replace(/[\(]/g, "[(]").replace(/[\)]/g, "[)]");
                    re = new RegExp(token);
                    subs = this.getExpression(args[2], element);
                    if (subs != args[2]) {
                        result = result.replace(re, subs, "g");
                        if (result == "null") {
                            result = null;
                        }
                    } else {
                        subs = "";
                        if (thymol.debug && !lenient) {
                            thymol.thWindow.alert('thymol variable substitution failed: "' + initial + '"');
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
    }
    function getWith(element, content) {
        var argValue = content.trim(), argCount = 0;
        if (argValue) {
            do {
                var argsExpr = thymol.ThParser.parse(argValue, true, false);
                var identifier = argsExpr.tokens.shift();
                if (identifier.type_ === 3) {
                    var result = argsExpr.evaluate(element);
                    var varName = identifier.index_;
                    if (!!varName) {
                        argCount++;
                        if (!element.thLocalVars) {
                            element.thLocalVars = {};
                        }
                        element.thLocalVars[varName] = result;
                    }
                    argValue = argValue.substring(argsExpr.position);
                } else {
                    break;
                }
            } while (argValue.length > 0);
        }
        return argCount;
    }
    function getParsedExpr(initial, element, preprocessed) {
        var expr, result = initial;
        expr = thymol.ThParser.parse(result, false, preprocessed);
        expr = expr.simplify();
        result = expr.evaluate(element);
        if (typeof result === "number") {
            result = thymol.ThUtils.getToPrecision(result, expr.precision);
        }
        return result;
    }
    function getBooleanValue(param) {
        var flag = false, val, args;
        if (param != null) {
            if (typeof param === "boolean") {
                flag = param;
            } else if (typeof param === "number") {
                flag = param != 0;
            } else {
                val = param;
                if (Object.prototype.toString.call(val) === "[object Array]") {
                    if (val.length === 1) {
                        val = val[0];
                    } else {
                        val = true;
                    }
                }
                if (typeof val === "boolean") {
                    flag = val;
                } else if (typeof val === "number") {
                    flag = val != 0;
                } else if (typeof val === "string") {
                    args = val.match(nonURLExpr);
                    if (args) {
                        val = args[1];
                        flag = this.testParam(val);
                    } else {
                        flag = !thymol.ThUtils.testLiteralFalse(val);
                    }
                } else if (val instanceof thymol.ThParam) {
                    flag = val.getBooleanValue();
                } else {
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
    function setLocale(locValue) {
        thymol.locale.value = locValue;
        setLocaleValue();
    }
    function getLocale() {
        return thymol.locale.value;
    }
    function getLanguage() {
        if (!thymol.locale.value) {
            if (typeof navigator !== "undefined" && !!navigator) {
                var userLang = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;
                if (!!userLang) {
                    thymol.locale.value = userLang.replace(/\-/g, "_");
                }
            }
        }
    }
    function setLocaleValue() {
        if (!thymol.locale.value) {
            thymol.locale.value = thymol.thDefaultLocale;
        }
        var sepPos;
        var locale = thymol.locale.value.replace(/\-/g, "_");
        var level = thymol.locale.value;
        var levels = [];
        var part, parts = [];
        do {
            levels.push(level);
            sepPos = locale.lastIndexOf("_");
            if (sepPos >= 0) {
                part = locale.substring(sepPos + 1);
                parts.push(part);
                locale = locale.substring(0, sepPos);
                level = level.substring(0, sepPos);
            }
        } while (sepPos >= 0);
        thymol.locale.language = level;
        if (!!parts) {
            parts.reverse();
            for (var i = 0, iLimit = parts.length; i < iLimit; i++) {
                if (i === 0) {
                    thymol.locale.country = parts[i];
                } else if (i === 1) {
                    thymol.locale.variant = parts[i];
                }
            }
        }
        thymol.locale.levels = levels;
        thymol.thExpressionObjects["#ctx"]["locale"] = thymol.locale;
        thymol.thExpressionObjects["#locale"] = thymol.locale;
    }
    function getMessage(varName, parameters, returnStringAlways) {
        if (thymol.disableMessages) {
            return undefined;
        }
        var msgKey = null;
        var locale;
        if (!!thymol.locale.levels) {
            var prefix = "$";
            var ident, section, jLower = thymol.localMessages ? 0 : 1;
            for (var j = jLower; j < 2; j++) {
                for (var i = 0, iLimit = thymol.locale.levels.length; i < iLimit + 1; i++) {
                    ident = prefix;
                    if (i < iLimit) {
                        locale = thymol.locale.levels[i];
                    } else {
                        locale = "";
                    }
                    ident = ident + locale;
                    section = thymol.messages[ident];
                    if (!section) {
                        if (j < 1) {
                            section = getLocalMessages(locale);
                        } else {
                            section = getDefaultMessages(locale);
                        }
                    }
                    if (!!section) {
                        thymol.messages[ident] = section;
                        msgKey = section[varName];
                        if (!!msgKey) {
                            break;
                        }
                    }
                }
                if (!!msgKey) {
                    break;
                }
                prefix += "$";
            }
        }
        if (!msgKey) {
            for (var i = 0, iLimit = thymol.locale.levels.length; i <= iLimit; i++) {
                if (i < iLimit) {
                    locale = thymol.locale.levels[i];
                } else {
                    locale = "";
                }
                if (!!thymol.messages[locale]) {
                    msgKey = thymol.messages[locale][varName];
                    if (!!msgKey) {
                        break;
                    }
                }
            }
        }
        if (!!msgKey) {
            if (typeof parameters === "undefined") {
                return msgKey;
            } else {
                return thymol.ThUtils.renderMessage(msgKey, parameters);
            }
        } else if (returnStringAlways !== undefined && returnStringAlways) {
            return "??" + varName + "_" + thymol.locale.value + "??";
        }
        return null;
    }
    function getProperties(propFile) {
        var props = null;
        var messages = [];
        $.get(propFile, function(textContent, status) {
            var err = null;
            try {
                if ("success" == status) {
                    props = textContent;
                } else if (thymol.debug) {
                    thymol.thWindow.alert("read failed: " + propFile);
                }
            } catch (err) {
                if (thymol.debug) {
                    thymol.thWindow.alert("properties file read failed: " + propFile + " error: " + err);
                }
            }
        }, "text");
        if (props !== null) {
            var splits = props.split("\n");
            if (splits.length > 0) {
                for (var i = 0, iLimit = splits.length; i < iLimit; i++) {
                    var line = splits[i].trim();
                    if (line.charAt(0) !== "#") {
                        var p = line.split("=");
                        if (p.length > 1) {
                            messages[p[0].trim()] = thymol.ThUtils.unicodeUnescape(p[1].trim());
                        }
                    }
                }
            }
        }
        return messages;
    }
    function getLocalMessages(locale) {
        var messages = [];
        if (!!thymol.thDocument.location.href) {
            var propsFile = thymol.templateName;
            if (!!locale && locale !== "") {
                propsFile += "_" + locale;
            }
            propsFile += ".properties";
            messages = getProperties(propsFile);
        }
        return messages;
    }
    function getDefaultMessages(locale) {
        var messages = null;
        var propsPath = "";
        if (thymol.useAbsolutePath) {
            propsPath += thymol.protocol + thymol.root + thymol.path;
        }
        propsPath += thymol.messagePath;
        if (propsPath !== "") {
            propsPath += "/";
        }
        var propsFile = propsPath + thymol.messagesBaseName;
        if (!!locale && locale !== "") {
            propsFile += "_" + locale;
        }
        propsFile += ".properties";
        messages = getProperties(propsFile);
        return messages;
    }
    Thymol.prototype = {
        process: function(rootNode) {
            var n = rootNode;
            try {
                while (n.thDoc) {
                    this.getChildren(n);
                    if (n.firstChild && n.firstChild.thDoc && !n.visited) {
                        n.visited = true;
                        n = n.firstChild;
                    } else {
                        if (n.element != n.thDoc) {
                            this.doReplace(n.isNode, n.element, n.thDoc);
                            if (!n.isNode) {
                                n.thDoc = n.element;
                            }
                        }
                        if (n.nextSibling && n.nextSibling.thDoc) {
                            n = n.nextSibling;
                        } else {
                            if (n == rootNode) {
                                break;
                            }
                            n = n.parentDoc;
                        }
                    }
                }
                this.processChildren(rootNode);
            } catch (err) {
                if (thymol.debug) {
                    if (err instanceof thymol.ThError) {
                        if (!err.suppress) {
                            thymol.thWindow.alert(err);
                        }
                    } else {
                        thymol.thWindow.alert(err);
                    }
                }
            }
        },
        getChildren: function(rootNode) {
            var count = 0, last = null, changed = false, child, froot, fstar, fchildren, i, iLimit, j, jLimit, element, matches, theAttr;
            if (!rootNode.visited) {
                this.processComments(rootNode);
                var rnd = this.getContentRoot(rootNode);
                froot = $(rnd);
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
                            } else {
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
        processChildren: function(rootNode) {
            var i, iLimit, j, jLimit, k, kLimit;
            var elements = rootNode.thDoc.getElementsByTagName("*");
            for (k = 0, kLimit = elements.length; k < kLimit; k++) {
                var element = elements[k];
                for (j = 0, jLimit = thymol.thThymeleafElementsList.length; j < jLimit; j++) {
                    if (element.localName == thymol.thThymeleafElementsList[j].name || element.localName == thymol.thThymeleafElementsList[j].synonym) {
                        var updated = thymol.thThymeleafElementsList[j].process(element);
                        if (updated) {
                            elements = rootNode.thDoc.getElementsByTagName("*");
                            k--;
                            kLimit = elements.length;
                        }
                        break;
                    }
                }
                var allAttributes = element.attributes;
                if (allAttributes && allAttributes.length > 0) {
                    var attributes = [], aii = 0;
                    if (!thymol.thUsingNullPrefix) {
                        for (i = 0, iLimit = allAttributes.length; i < iLimit; i++) {
                            var ai = allAttributes[i];
                            if (ai) {
                                for (j = 0, jLimit = thymol.thThymeleafPrefixList.length; j < jLimit; j++) {
                                    var attrName = ai.name.toString();
                                    if (attrName.length > thymol.thThymeleafPrefixList[j].length) {
                                        attrName = attrName.substring(0, thymol.thThymeleafPrefixList[j].length);
                                        if (attrName === thymol.thThymeleafPrefixList[j]) {
                                            ai.order = i;
                                            attributes[aii++] = ai;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        attributes = allAttributes;
                    }
                    if (attributes.length > 0) {
                        attributes.sort(function(a, b) {
                            return b.order - a.order;
                        });
                        var matchedAttributes = [];
                        for (i = 0, iLimit = attributes.length; i < iLimit; i++) {
                            var splits = attributes[i].name.toString().split(":");
                            if (splits && splits.length > 0) {
                                var prefix = "", name;
                                if (splits.length > 1) {
                                    prefix = splits[0];
                                    name = splits[1];
                                } else {
                                    name = splits[0];
                                    var hpos = name.lastIndexOf("-");
                                    if (hpos >= 0) {
                                        prefix = name.substring(0, hpos + 1);
                                    }
                                }
                                var attrList = thymol.thThymeleafPrefixList[prefix];
                                if (splits.length > 1) {
                                    prefix += ":";
                                }
                                if (attrList) {
                                    for (j = 0, jLimit = attrList.length; j < jLimit; j++) {
                                        var matched = false;
                                        if (name === attrList[j].suffix || name === attrList[j].synonym) {
                                            matched = true;
                                        } else if (attrList[j].regex !== null) {
                                            var fqn = prefix + name;
                                            matched = attrList[j].regex.test(fqn);
                                        }
                                        if (matched) {
                                            var matchedAttribute = {};
                                            matchedAttribute.attr = attrList[j];
                                            matchedAttribute.elementAttr = attributes[i];
                                            matchedAttributes.push(matchedAttribute);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        if (matchedAttributes.length > 0) {
                            matchedAttributes.sort(function(a, b) {
                                return a.attr.precedence - b.attr.precedence;
                            });
                            var updated = false;
                            for (i = 0, iLimit = matchedAttributes.length; i < iLimit; i++) {
                                var exp = thymol.ThUtils.processElement(matchedAttributes[i].attr.process, element, matchedAttributes[i].elementAttr, matchedAttributes[i].attr, 1);
                                updated = exp || updated;
                            }
                            if (updated) {
                                elements = rootNode.thDoc.getElementsByTagName("*");
                                k--;
                                kLimit = elements.length;
                            }
                        }
                    }
                }
            }
            elements = rootNode.thDoc.getElementsByTagName("*");
            var kc = 0;
            for (k = 0, kLimit = elements.length; k < kLimit; k++) {
                var element = elements[kc];
                var elName = element.nodeName.toLowerCase();
                if (elName == thymol.thBlock.name || elName == thymol.thBlock.synonym) {
                    thymol.ThUtils.removeTag(element);
                    elements = rootNode.thDoc.getElementsByTagName("*");
                } else {
                    kc++;
                }
            }
        },
        override: function(paramName, paramValue) {
            var param = paramValue, thv;
            thv = thymol.thWindow[paramName];
            if (typeof thv === "undefined") {
                thv = thymol.applicationContext.javascriptify(paramName);
            }
            if (thv) {
                if (thv instanceof thymol.ThParam) {
                    param = thv.value;
                } else {
                    param = thv;
                }
            }
            thv = thymol.applicationContext[paramName];
            if (thv) {
                if (thv instanceof thymol.ThParam) {
                    param = thv.value;
                } else {
                    param = thv;
                }
            }
            thv = thymol.requestContext[paramName];
            if (thv) {
                if (thv instanceof thymol.ThParam) {
                    param = thv.value;
                } else {
                    param = thv;
                }
            }
            return param;
        },
        doDisable: function(attrName) {
            var tha = this.getThAttrByName(attrName);
            if (tha !== null) {
                tha.disable();
            } else {
                if (thymol.debug) {
                    thymol.thWindow.alert('cannot disable unknown attribute "' + attrName + '"');
                }
            }
        },
        getThAttrByName: function(name) {
            var attrList = thymol.thThymeleafPrefixList[thymol.prefix];
            attrList.push(thymol.thInclude);
            attrList.push(thymol.thReplace);
            attrList.push(thymol.thSubstituteby);
            attrList.push(thymol.thFragment);
            var i, iLimit = attrList.length;
            for (i = 0; i < iLimit; i++) {
                if (name === attrList[i].suffix) {
                    return attrList[i];
                }
            }
            return null;
        },
        getContents: function(rootNode) {
            var rnd = this.getContentRoot(rootNode);
            var froot = $(rnd);
            var fstar = froot.find("*");
            return fstar;
        },
        getContentRoot: function(rn) {
            var rnd = rn.thDoc;
            if (rnd.nodeName !== "#document") {
                rnd = rnd.childNodes;
            }
            return rnd;
        },
        processComments: function(rootNode) {
            var comments = null, fstar, changed, i, iLimit, startComment, parent, startValue, pointer, nextPointer;
            do {
                fstar = this.getContents(rootNode);
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
                                changed = parent.removeChild(pointer) != null;
                                break;
                            }
                            nextPointer = pointer.nextSibling;
                            changed = parent.removeChild(pointer) != null;
                            pointer = nextPointer;
                        }
                    } else if (startParserLevelCommentExpr2.test(startValue) && endParserLevelCommentExpr2.test(startValue)) {
                        parent.removeChild(startComment);
                        changed = true;
                    }
                }
            } while (changed);
            this.processPrototypeOnlyComments(rootNode);
        },
        processPrototypeOnlyComments: function(rootNode) {
            var comments = null, fstar, changed, indexOfLast, i, iLimit, j, jLimit, k, kLimit, startComment, parent, deletions, res, fullText, innerNodes, done, next, commentText, res2, blockElement, blockDoc, blockDocBody, blockBase, newNode, newDoc;
            do {
                fstar = this.getContents(rootNode);
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
                                    if (startValue.indexOf(thymol.thBlock.endName) < 0 || startValue.indexOf(thymol.thBlock.endSynonym) < 0) {
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
                                                    } else {
                                                        innerNodes.push(next);
                                                    }
                                                }
                                            } else {
                                                done = true;
                                            }
                                        } while (!done);
                                        blockElement = null;
                                        blockDoc = new thymol.thDomParser().parseFromString(fullText, "text/html");
                                        blockDocBody = $(blockDoc).find("body")[0];
                                        for (j = 0, jLimit = blockDocBody.childNodes.length; j < jLimit; j++) {
                                            if (blockDocBody.childNodes[j].localName == thymol.thBlock.name || blockDocBody.childNodes[j].localName == thymol.thBlock.synonym) {
                                                blockElement = blockDocBody.childNodes[j];
                                                for (k = 0, kLimit = innerNodes.length; k < kLimit; k++) {
                                                    newNode = blockDoc.importNode(innerNodes[k], true);
                                                    blockElement.appendChild(newNode);
                                                }
                                            }
                                        }
                                        if (blockElement != null) {
                                            blockBase = new ThNode(blockDoc, false, null, null, null, blockDoc.nodeName, "::", false, blockDoc);
                                            this.processChildren(blockBase);
                                            changed = this.insertUncommented(blockBase.thDoc, deletions, parent);
                                        } else {
                                            parent.removeChild(startComment);
                                            changed = true;
                                        }
                                    } else {
                                        parent.removeChild(startComment);
                                        changed = true;
                                    }
                                }
                            } else {
                                startValue = startValue.substring(3, startValue.length - 3);
                                newDoc = new thymol.thDomParser().parseFromString(startValue, "text/html");
                                changed = this.insertUncommented(newDoc, deletions, parent);
                            }
                        }
                    }
                }
            } while (changed);
        },
        insertUncommented: function(doc, deletions, parent) {
            var docBody = $(doc).find("body")[0], i, iLimit, newNode;
            for (i = 0, iLimit = docBody.childNodes.length; i < iLimit; i++) {
                if (parent.ownerDocument === doc) {
                    newNode = docBody.childNodes[i].cloneNode(true);
                } else {
                    newNode = parent.ownerDocument.importNode(docBody.childNodes[i], true);
                    newNode.parentNode = parent;
                }
                parent.insertBefore(newNode, deletions[0]);
            }
            for (i = 0, iLimit = deletions.length; i < iLimit; i++) {
                parent.removeChild(deletions[i]);
            }
            return true;
        },
        getList: function(element, content) {
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
        testParam: function(param) {
            var initial = param, result = false, theParam = null, negate = false;
            if (typeof initial === "boolean") {
                result = initial;
            } else {
                theParam = null;
                negate = false;
                if (typeof initial === "object" && initial instanceof thymol.ThParam) {
                    theParam = initial;
                } else {
                    initial = initial.valueOf();
                    if (initial.charAt(0) == "!") {
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
        processImport: function(element, rootNode, attr) {
            var importNode = null, filePart, fragmentPart, names, parts, fragmentArgsList, isNode, fragment, fileName, content, importError;
            filePart = null;
            if (attr.value.indexOf("::") < 0) {
                filePart = attr.value;
                fragmentPart = "::";
            } else {
                names = attr.value.split("::");
                filePart = names[0].trim();
                fragmentPart = names[1].trim();
            }
            if ("this" === filePart) {
                filePart = "";
            } else {
                filePart = this.getFilePath(filePart, element);
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
                if (filePart != "" || !isFragmentChild(element)) {
                    isNode = thymol.thReplace.name == attr.localName || thymol.thReplace.synonym == attr.localName || thymol.thSubstituteby.name == attr.localName || thymol.thSubstituteby.synonym == attr.localName;
                    if (thymol.thCache[filePart] != null && thymol.thCache[filePart][fragmentPart] != null) {
                        isNode = isNode || fragmentPart == "::";
                        importNode = new ThNode(thymol.thCache[filePart][fragmentPart], false, rootNode, null, null, filePart, fragmentPart, isNode, element);
                    } else {
                        fragment = null;
                        importError = null;
                        if (filePart != "") {
                            fileName = filePart + thymol.templateSuffix;
                            $.get(fileName, function(textContent, status) {
                                try {
                                    if ("success" == status) {
                                        content = new thymol.thDomParser().parseFromString(textContent, "text/html");
                                        fragment = Thymol.prototype.getImportNode(element, filePart, fragmentPart, fragmentArgsList, content);
                                    } else if (thymol.debug) {
                                        thymol.thWindow.alert("thymol.processImport file read failed: " + filePart + " fragment: " + fragmentPart);
                                    }
                                } catch (err) {
                                    importError = err;
                                }
                            }, "text");
                        } else {
                            fragment = this.getImportNode(element, filePart, fragmentPart, fragmentArgsList, thymol.thDocument);
                        }
                        if (fragment == null) {
                            if (importError !== null) {
                                throw importError;
                            }
                            if (thymol.debug) {
                                thymol.thWindow.alert("thymol.processImport fragment import failed: " + filePart + " fragment: " + fragmentPart);
                            }
                        } else {
                            importNode = new ThNode(fragment, false, rootNode, null, null, filePart, fragmentPart, isNode, element);
                        }
                    }
                }
            }
            element.removeAttribute(attr.name);
            return importNode;
        },
        getImportNode: function(element, filePart, fragmentArg, fragmentArgsList, content) {
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
                        } else {
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
            } else {
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
                                    } else if (vlArgs.length > argsCount) {
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
                } else {
                    if (!element.isBlockChild) {
                        throw new thymol.ThError('getImportNode cannot match fragment: "' + fragmentName + '"', element);
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
        getDOMSelection: function(initial, content) {
            var spec = initial, result = null, scope = "", query = new Array(), parts = "", innr = thymol.ThUtils.unBracket(spec), i, iLimit, j, jLimit, k, kLimit, m, mLimit, token, indx, saved, indxed, start, selection, descend, subQuery, exprFrags, classSpecs, qTerms, subSelect, partial, html, newNode;
            if (spec != innr && innr.charAt(innr.length - 1) == "]") {
                spec = innr;
            }
            while (spec != "") {
                parts = spec.match(domSelectExpr);
                if (parts != null && parts.length > 1) {
                    for (i = 1, iLimit = parts.length; i < iLimit; i++) {
                        if (parts[i] != null) {
                            token = parts[i];
                            indx = null;
                            innr = thymol.ThUtils.unBracket(token);
                            if (token != innr) {
                                if (innr.match(numericExpr)) {
                                    indx = innr;
                                }
                            }
                            saved = spec;
                            spec = spec.replace(token, "");
                            if (saved == spec) {
                                spec = "";
                            }
                            if (indx) {
                                token = query[query.length - 1];
                                indxed = new String(token);
                                indxed.indx = indx;
                                query[query.length - 1] = indxed;
                            } else {
                                query.push(token.trim());
                            }
                            break;
                        }
                    }
                } else {
                    break;
                }
            }
            start = 0;
            if (query.length > 0 && query[0] != "" && query[0].charAt(0) == "/") {
                scope = query[0];
                start = 1;
            }
            selection = [];
            selection.push(content);
            descend = false;
            for (i = start, iLimit = query.length; i < iLimit; i++) {
                subQuery = query[i];
                innr = thymol.ThUtils.unBracket(subQuery);
                if (subQuery != innr) {
                    innr = innr.replace(/[']/g, '"');
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
                            } else {
                                subQuery = subQuery + "[" + exprFrags[j] + "]";
                            }
                        } else if (exprFrags[j] == "or") {
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
                                    return this.nodeType === 3;
                                });
                            } else if (descend) {
                                partial = $(selection[k]).children(qTerms[j]);
                            } else if (j == 0) {
                                if (scope == "/") {
                                    html = $("html", selection[k]);
                                    if (html.length > 0) {
                                        selection[k] = html;
                                    }
                                    partial = $(selection[k]).children("body").children(qTerms[j]);
                                    scope = "";
                                } else {
                                    if (i == 0 || scope == "//") {
                                        partial = $(selection[k]).find(qTerms[j]);
                                        scope = "";
                                    } else {
                                        partial = $(selection[k]).filter(qTerms[j]);
                                    }
                                }
                            } else {
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
                descend = qTerms[qTerms.length - 1] == "";
            }
            result = selection;
            if (result != null && !(result.length === undefined)) {
                if (result.length > 1) {
                    newNode = thymol.thDocument.createDocumentFragment();
                    for (i = 0, iLimit = result.length; i < iLimit; i++) {
                        var newChild = thymol.thDocument.importNode(result[i], true);
                        newNode.appendChild(newChild);
                    }
                    result = newNode;
                } else {
                    result = result[0];
                }
            }
            return result;
        },
        getFilePath: function(part, element) {
            var result = thymol.substitute(part, element), mapped = null, slashpos;
            if (result) {
                if (thymol.mappings) {
                    mapped = thymol.getMapped(result, false);
                }
            }
            if (mapped) {
                result = mapped;
            } else {
                var dotFirst = result.charAt(0) === ".";
                if (result && (thymol.useAbsolutePath || !dotFirst)) {
                    slashpos = result.indexOf("/");
                    if (thymol.useAbsolutePath || slashpos >= 0) {
                        if (slashpos == 0 && !thymol.useAbsolutePath) {
                            result = result.substring(1);
                        }
                        var proto = "";
                        if (thymol.useAbsolutePath) {
                            proto = thymol.protocol;
                        }
                        if (thymol.useAbsolutePath && !!thymol.absolutePath) {
                            result = proto + thymol.absolutePath + result;
                        } else {
                            if (dotFirst) {
                                result = thymol.templatePath + result;
                            } else {
                                result = proto + thymol.root + thymol.path + result;
                            }
                        }
                    }
                }
            }
            return result;
        },
        doLiteralSubstExpr: function(param, primary) {
            var result = param.trim(), term, subst, lsp;
            if (thymol.ThUtils.isLiteralSubst(result)) {
                result = this.decodeLiteralSubst(result);
            } else {
                term = primary;
                while (term != null) {
                    if (thymol.ThUtils.isLiteralSubst(term)) {
                        subst = this.decodeLiteralSubst(term);
                        result = result.replace(term, subst);
                        lsp = result.match(litSubstExpr);
                        if (lsp && lsp.length > 0) {
                            term = lsp[1];
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
            return result;
        },
        decodeLiteralSubst: function(param) {
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
                        } else {
                            rep = rep + "+" + parts[i];
                        }
                    }
                }
                result = rep;
            }
            return result;
        },
        doReplace: function(isNode, element, content) {
            if (isNode) {
                var parent = element.parentNode;
                if (content.nodeName.toLowerCase() == "html") {
                    this.doInsertion(element, content, function(e, n) {
                        if (n.nodeType == 1) {
                            n.removeAttribute(thymol.thFragment.name);
                            n.removeAttribute(thymol.thFragment.synonym);
                        }
                        e.parentNode.insertBefore(n, e);
                    });
                    parent.removeChild(element);
                } else {
                    var node = this.doClone(content, parent.ownerDocument);
                    if (node.nodeType == 1) {
                        node.removeAttribute(thymol.thFragment.name);
                        node.removeAttribute(thymol.thFragment.synonym);
                    }
                    parent.replaceChild(node, element);
                    node.parentNode = parent;
                }
            } else {
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
                } catch (err) {
                    element.innerHTML = content.innerHTML;
                }
            }
        },
        doClone: function(old, targetDoc) {
            var node, cNodes, i, iNode, aNode;
            if (!!old.parentNode && old.parentNode.ownerDocument === targetDoc) {
                node = old.cloneNode(false);
            } else {
                node = targetDoc.importNode(old, false);
            }
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
                                aNode = this.doClone(iNode, targetDoc);
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
        doInsertion: function(element, content, func) {
            var topLevel = true, parent = element.parentElement, i, iLimit, iNode, elementName, j, jLimit, jNode, cJNode, cINode;
            if (parent != null) {
                topLevel = element.parentElement.nodeName.toLowerCase() == "html";
            }
            for (i = 0, iLimit = content.childNodes.length; i < iLimit; i++) {
                iNode = content.childNodes[i];
                if (iNode) {
                    if (!topLevel) {
                        elementName = iNode.nodeName.toLowerCase();
                        if (elementName != "head") {
                            if (elementName == "body") {
                                for (j = 0, jLimit = iNode.childNodes.length; j < jLimit; j++) {
                                    jNode = iNode.childNodes[j];
                                    if (jNode) {
                                        cJNode = this.doClone(jNode, parent.ownerDocument);
                                        func(element, cJNode);
                                    }
                                }
                            } else {
                                cINode = this.doClone(iNode, parent.ownerDocument);
                                func(element, cINode);
                            }
                        }
                    } else {
                        cINode = this.doClone(iNode, parent.ownerDocument);
                        func(element, cINode);
                    }
                }
            }
        },
        getThParam: function(paramName, isBoolean, isPath, defaultValue) {
            var localValue = defaultValue, globalValue = thymol.thWindow[paramName], theParam = thymol.ThUtils.getParameter(paramName);
            if (typeof globalValue === "undefined") {
                globalValue = thymol.applicationContext.javascriptify(paramName);
            }
            if (!!theParam) {
                if (theParam instanceof ThParam) {
                    if (theParam.globalValue !== globalValue) {
                        theParam.globalValue = globalValue;
                        theParam.value = globalValue;
                        localValue = globalValue;
                    }
                }
                if (isBoolean) {
                    localValue = theParam.getBooleanValue();
                }
            } else {
                if (!(typeof globalValue === "undefined")) {
                    if (globalValue != null) {
                        if (isBoolean) {
                            localValue = globalValue == true;
                        } else {
                            localValue = globalValue;
                        }
                    }
                }
            }
            if (!isBoolean && isPath && localValue.length > 0 && localValue.charAt(localValue.length - 1) != "/") {
                localValue = localValue + "/";
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
                    } else {
                        prec = thymol.thDefaultPrecedence;
                    }
                    configureAttributeProcessor(spec.prefix, spec.attributeProcessors[i].name, spec.attributeProcessors[i].processor, prec, null);
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
                    } else {
                        configureModule(spec.objects[i]);
                    }
                }
            }
        }
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
    function ThError(message, element, source) {
        this.name = "ThError";
        this.message = message || "Default Message";
        if (element !== null && typeof element !== "undefined" && element.isBlockChild) {
            this.suppress = true;
        } else {
            this.element = element || {};
            this.suppress = false;
        }
        if (!!source) {
            if (!!source.stack) {
                this.stack = source.stack;
            }
        }
    }
    ThError.prototype = new Error();
    ThError.prototype.constructor = ThError;
    function ThParam(valueArg) {
        this.value = valueArg;
        this.globalValue;
        this["class"] = new thymol.ThClass("Thymol.ThParam");
        this.getBooleanValue = function() {
            return !thymol.ThUtils.testLiteralFalse(this.value);
        };
        this.toString = function() {
            return this.value;
        };
        this.getNumericValue = function() {
            return Number(this.value);
        };
    }
    function ThAttr(suffix, func, prec, list, pref, dataAttr) {
        var prefix = "", dataPrefix = null, escpPrefix = "";
        if (typeof pref !== "undefined" && pref !== null) {
            prefix = pref + ":";
            if (thymol.thThymeleafPrefixList.indexOf(prefix) < 0) {
                thymol.thThymeleafPrefixList.push(prefix);
            }
            escpPrefix = pref + "\\:";
            if (typeof dataAttr === "undefined" || dataAttr === null) {
                dataPrefix = thymol.dataPrefix + "-" + pref + "-";
                if (thymol.thThymeleafPrefixList.indexOf(dataPrefix) < 0) {
                    thymol.thThymeleafPrefixList.push(dataPrefix);
                }
            } else {
                dataPrefix = dataAttr;
            }
        }
        this.suffix = suffix;
        this.name = prefix + suffix;
        this.regex = null;
        if (suffix.indexOf("*") >= 0 || suffix.indexOf("?") >= 0 || suffix.indexOf("+") >= 0 || suffix.indexOf("\\") >= 0 || suffix.indexOf("|") >= 0 || suffix.indexOf("[") >= 0 || suffix.indexOf("]") >= 0 || suffix.indexOf("{") >= 0 || suffix.indexOf("}") >= 0) {
            if ("*" === suffix) {
                suffix = ".*";
            }
            suffix = prefix + suffix;
            this.regex = new RegExp(suffix);
        }
        this.escpName = "[" + escpPrefix + suffix + "]";
        if (dataPrefix !== null) {
            this.synonym = dataPrefix + suffix;
            this.escpSynonym = "[" + this.synonym + "]";
        } else {
            this.synonym = null;
            this.escpSynonym = null;
        }
        if (typeof prec !== "undefined" && prec !== null) {
            this.precedence = prec;
        } else {
            this.precedence = thymol.thDefaultPrecedence;
        }
        if (!!list) {
            var attrList = list[pref];
            if (!attrList) {
                attrList = [];
                list[pref] = attrList;
                if (dataPrefix !== null) {
                    list[dataPrefix] = attrList;
                }
            }
            attrList.push(this);
        }
        this.process = function() {
            thymol.thWindow.alert('unsupported processing function for attribute "' + this.name + '"');
        };
        if (!(typeof func === "undefined")) {
            this.process = func;
        }
        this.disable = function() {
            this.name = null;
            this.escpName = null;
            this.escpSynonym = null;
            this.process = function() {};
        };
    }
    function ThElement(suffix, func, pref) {
        var tha = new thymol.ThAttr(suffix, null, 0, null, pref);
        this.name = tha.name;
        this.synonym = tha.synonym;
        this.endName = "/" + tha.name;
        this.endSynonym = "/" + tha.synonym;
        this.process = function() {
            thymol.thWindow.alert('unsupported processing function for element "' + this.name + '"');
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
            return this.hasOwnProperty(k) && typeof this[k] !== "function" && k !== "that" && k !== "setSize";
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
            for (var k in this) {
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
            if (typeof keys === "Array" || Object.prototype.toString.call(keys) === "[object Array]") {
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
        var set = new thymol.ThSet(), i, iLimit;
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
            for (var k in t) {
                put(k, t[k]);
            }
        };
        this.values = function() {
            return this.that;
        };
    }
    ThMap.prototype = new ThSet();
    ThMap.prototype.constructor = ThMap;
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
        this["class"] = new thymol.ThClass("Thymol.ThObject");
        this.toNonThObject = function() {
            var plain = {};
            for (prop in this) {
                if (this.hasOwnProperty(prop)) {
                    if (prop) {
                        if (!plain[prop]) {
                            if (prop !== "toNonThObject") {
                                if (prop !== "class" || prop === "class" && this[prop] !== null && this[prop].name !== "Thymol.ThObject") {
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
    }
    return {
        Thymol: Thymol,
        ThError: ThError,
        ThParam: ThParam,
        ThAttr: ThAttr,
        ThElement: ThElement,
        ThSet: ThSet,
        ThMap: ThMap,
        ThObject: ThObject,
        ThVarsAccessor: ThVarsAccessor,
        ThClass: ThClass,
        thDomParser: thymol.thDomParser,
        thDocument: thymol.thDocument,
        thWindow: thymol.thWindow,
        thTop: thymol.thTop,
        thRequest: thymol.thRequest,
        thVersion: thymol.thVersion,
        thReleaseDate: thymol.thReleaseDate,
        thURL: thymol.thURL,
        thAltURL: thymol.thAltURL,
        thInclude: thymol.thInclude,
        thReplace: thymol.thReplace,
        thSubstituteby: thymol.thSubstituteby,
        thFragment: thymol.thFragment,
        thRemove: thymol.thRemove,
        thBlock: thymol.thBlock,
        thScriptName: thymol.thScriptName,
        thDefaultPrefix: thymol.thDefaultPrefix,
        thDefaultDataPrefix: thymol.thDefaultDataPrefix,
        thDefaultPrecision: thymol.thDefaultPrecision,
        thDefaultProtocol: thymol.thDefaultProtocol,
        thDefaultLocale: thymol.thDefaultLocale,
        thDefaultPrecedence: thymol.thDefaultPrecedence,
        thDefaultMessagePath: thymol.thDefaultMessagePath,
        thDefaultResourcePath: thymol.thDefaultResourcePath,
        thDefaultMessagesBaseName: thymol.thDefaultMessagesBaseName,
        thDefaultRelativeRootPath: thymol.thDefaultRelativeRootPath,
        thDefaultExtendedMapping: thymol.thDefaultExtendedMapping,
        thDefaultLocalMessages: thymol.thDefaultLocalMessages,
        thDefaultDisableMessages: thymol.thDefaultDisableMessages,
        thDefaultTemplateSuffix: thymol.thDefaultTemplateSuffix,
        thThymeleafPrefixList: thymol.thThymeleafPrefixList,
        thThymeleafElementsList: thymol.thThymeleafElementsList,
        thLocation: thymol.thLocation,
        messagePath: thymol.messagePath,
        resourcePath: thymol.resourcePath,
        relativeRootPath: thymol.relativeRootPath,
        messagesBaseName: thymol.messagesBaseName,
        extendedMapping: thymol.extendedMapping,
        scriptPath: thymol.scriptPath,
        absolutePath: thymol.absolutePath,
        useAbsolutePath: thymol.useAbsolutePath,
        useFullURLPath: thymol.useFullURLPath,
        localMessages: thymol.localMessages,
        indexFile: thymol.indexFile,
        disableMessages: thymol.disableMessages,
        templateSuffix: thymol.templateSuffix,
        prefix: thymol.prefix,
        dataPrefix: thymol.dataPrefix,
        templateName: thymol.templateName,
        templatePath: thymol.templatePath,
        objects: thymol.objects,
        jqSetup: jqSetup,
        isClientSide: isClientSide,
        execute: execute,
        updatePrefix: updatePrefix,
        init: init,
        ready: ready,
        addDialect: addDialect,
        isFragmentChild: isFragmentChild,
        preProcess: preProcess,
        substitute: substitute,
        substituteParam: substituteParam,
        configureModule: configureModule,
        configureAttributeProcessor: configureAttributeProcessor,
        configureElementProcessor: configureElementProcessor,
        configurePreExecution: configurePreExecution,
        configurePostExecution: configurePostExecution,
        getStandardURL: getStandardURL,
        getMessage: getMessage,
        getExpression: getExpression,
        getWith: getWith,
        getParsedExpr: getParsedExpr,
        getLocale: getLocale,
        getMapped: getMapped,
        getBooleanValue: getBooleanValue,
        setLocale: setLocale
    };
}();

thymol.makeContext = function(contextNameParam, varAccessorParam) {
    var jsonDeclSpec = "(?:\\W*([\\'][A-Za-z]+(?:\\w|[$])*[\\'])\\s*[:])?\\s*([#][A-Za-z]+(?:\\w|[$])*)(?:\\W|[^$])*", jsonDeclExpr = new RegExp(jsonDeclSpec), context = new Array();
    context.contextName = contextNameParam;
    context.varAccessor = varAccessorParam;
    context.varStore = [];
    context.varNamePrefix = "";
    if (typeof varAccessorParam === "undefined") {
        context.varAccessor = new thymol.ThVarsAccessor(context.varStore, "varStore");
    }
    context.varNamePrefix = context.varAccessor.arrayName + "[";
    context.getJSONView = function(param, rootVal) {
        var pType = typeof param, view = "", objType;
        if (pType === "string") {
            view = view + "'" + param + "'";
        } else if (pType === "number" || pType === "boolean") {
            view = view + param;
        } else if (pType === "object") {
            if (param instanceof Object) {
                objType = Object.prototype.toString.call(param);
                if ("[object Array]" === objType) {
                    view = this.getJSONViewArray(param, false);
                } else if ("[object Object]" === objType) {
                    view = this.getJSONViewObject(param, false);
                }
                view = "#" + view;
            }
        }
        return view;
    };
    context.init = function() {
        var persisted = thymol.thTop.name, paramRow, paramName, params, i, iLimit, paramValue;
        if (persisted && persisted !== "") {
            params = this.javascriptify(persisted);
            if (params && params.length > 0) {
                for (i = 0, iLimit = params.length; i < iLimit; i++) {
                    paramRow = params[i];
                    if (paramRow) {
                        paramName = paramRow[0];
                        if (paramName) {
                            paramValue = paramRow[1];
                            this.createVariable(paramName, paramValue);
                        }
                    }
                }
            }
        }
    };
    context.getJSONViewObject = function(param, rootVal) {
        var isRoot = true, key = null, view = "{", value, identifier, definition, suffix, instanceNamePrefix, isTaken, i, iLimit, instanceValue;
        if (typeof rootVal === "boolean") {
            isRoot = rootVal;
        }
        for (key in param) {
            if (key) {
                value = param[key];
                if (typeof value !== "function") {
                    if (view != "{") {
                        view = view + ",";
                    }
                    identifier = this.getJSONView(key, false);
                    definition = this.getJSONView(value, false);
                    view = view + identifier + ":";
                    if (!isRoot && typeof value === "object") {
                        suffix = 1;
                        instanceNamePrefix = key + "$";
                        instanceName = null;
                        isTaken = false;
                        do {
                            instanceName = instanceNamePrefix + suffix++;
                            instanceValue = context[instanceName];
                            if (instanceValue === null || typeof instanceValue === "undefined") {
                                isTaken = false;
                                for (i = 0, iLimit = varStore.length; i < iLimit; i++) {
                                    if (instanceName === varStore[i][0]) {
                                        isTaken = true;
                                        break;
                                    }
                                }
                                if (!isTaken) {
                                    this.addAttribute(instanceName, definition);
                                }
                            }
                        } while (isTaken);
                        if (instanceName !== null) {
                            view = view + "#" + instanceName;
                        }
                    } else {
                        view = view + definition;
                    }
                }
            }
        }
        view = view + "}";
        return view;
    };
    context.getJSONViewArray = function(param, rootVal) {
        var view = "[", i;
        for (i = 0; i < param.length; i++) {
            view = view + this.getJSONView(param[i], false);
            if (i < param.length - 1) {
                view = view + ",";
            }
        }
        view = view + "]";
        return view;
    };
    context.getAttribute = function(name) {
        return context[name];
    };
    context.addAttribute = function(name, value) {
        var entry = [];
        entry[0] = name;
        entry[1] = value;
        varStore.push(entry);
    };
    context.serialise = function() {
        varStore = [];
        var serialised = "[", key = null, value, cn, view, name, i, iLimit;
        for (key in context) {
            if (key) {
                value = context[key];
                if (value != null && typeof value === "object") {
                    cn = Object.prototype.toString.call(value);
                    if ("[object Array]" !== cn && !(value instanceof thymol.ThClass) && !(value instanceof thymol.ThVarsAccessor)) {
                        if (serialised !== "[") {
                            serialised = serialised + ",";
                        }
                        view = this.getJSONView(value, true);
                        serialised = serialised + "[";
                        serialised = serialised + '"' + key + '"';
                        serialised = serialised + ",";
                        serialised = serialised + '"' + view + '"';
                        serialised = serialised + "]";
                    }
                }
            }
        }
        for (i = 0, iLimit = varStore.length; i < iLimit; i++) {
            name = varStore[i][0];
            view = varStore[i][1];
            serialised = serialised + ",[";
            serialised = serialised + '"' + name + '"';
            serialised = serialised + ",";
            serialised = serialised + '"' + view + '"';
            serialised = serialised + "]";
        }
        serialised = serialised + "]";
        return serialised;
    };
    context.javascriptify = function(fn) {
        try {
            return new Function("return " + fn)();
        } catch (err) {
            return undefined;
        }
    };
    context.createVariable = function(name, valParam, isReq) {
        var value = valParam, param, tt, literalBoolean, strValue, initial, existing, newArray;
        param = value;
        if (!(value instanceof thymol.ThParam)) {
            tt = typeof valParam;
            if (tt !== "function" && tt !== "object") {
                if (tt === "string") {
                    try {
                        value = isReq ? decodeURIComponent(value) : decodeURI(value);
                    } catch (err) {}
                }
                if (tt === "boolean" || tt === "number") {
                    param = new thymol.ThParam(value);
                } else if (value || value === "") {
                    literalBoolean = thymol.ThUtils.testLiteralFalse(value);
                    if (literalBoolean) {
                        param = false;
                    } else {
                        strValue = new String(value);
                        initial = strValue.trim();
                        if (initial.charAt(0) === "#") {
                            initial = initial.substring(1);
                            try {
                                param = this.createJSONVariable(initial);
                            } catch (err) {
                                if (err instanceof ReferenceError) {}
                                if (err instanceof EvalError) {}
                                if (param == null || isReq) {
                                    param = new thymol.ThParam(value);
                                }
                            }
                        } else {
                            param = new thymol.ThParam(strValue.toString());
                        }
                    }
                }
            }
        }
        if (isReq) {
            existing = context[name];
            if (typeof existing !== "undefined" && existing !== null) {
                if (Object.prototype.toString.call(existing) === "[object Array]") {
                    existing.push(param);
                } else {
                    if (thymol.debug) {
                        thymol.thWindow.alert('request parameters should be of type string array "' + name + '"');
                    }
                }
            } else {
                newArray = new Array();
                newArray["class"] = {};
                newArray["class"]["name"] = "[Thymol.ThParam]";
                newArray.push(param);
                context[name] = newArray;
            }
        } else {
            context[name] = param;
        }
        return param;
    };
    context.createJSONVariable = function(initial) {
        var current = initial.trim(), parts = " ", substIndex, token, re, vName, obj, result;
        substIndex = this.varAccessor.length() + 1;
        while (parts) {
            parts = current.match(jsonDeclExpr);
            if (parts && parts.length > 2) {
                token = parts[2];
                token = token.replace(/[\']/g, "[']").replace(/[$]/g, "[$]");
                re = new RegExp(token);
                vName = this.varNamePrefix + substIndex + "]";
                obj = new Object();
                obj.name = parts[2].substring(1);
                this.varAccessor.set(substIndex, obj);
                substIndex = substIndex + 1;
                current = current.replace(re, "'" + vName + "'", "g");
            }
        }
        current = current.replace(/[\']/g, '"');
        result = $.parseJSON(current);
        if ("[object Array]" !== Object.prototype.toString.call(result)) {
            result = new thymol.ThObject(result);
        }
        return result;
    };
    context.resolveJSONReferences = function() {
        var key = null, param, prop = null, val, ref, subst, isReq = "request" === this.contextName;
        for (key in context) {
            if (key) {
                param = context[key];
                if (param != null && typeof param === "object") {
                    if (!(param instanceof thymol.ThVarsAccessor) && !(param instanceof thymol.ThClass)) {
                        if (!(param instanceof thymol.ThParam)) {
                            if (isReq && Object.prototype.toString.call(param) === "[object Array]") {
                                for (var i = 0, iLimit = param.length; i < iLimit; i++) {
                                    var pi = param[i];
                                    if (!!pi && typeof pi.value === "string" && pi.value.charAt(0) == "#") {
                                        var pv = thymol.ThUtils.getParameter(pi.value.substring(1));
                                        param[i] = pv;
                                    }
                                }
                            } else {
                                for (prop in param) {
                                    if (prop) {
                                        val = param[prop];
                                        if (typeof val === "string") {
                                            if (val.indexOf(this.varNamePrefix) == 0) {
                                                subst = null;
                                                if (prop.match(/\d*/)) {
                                                    ref = val.substring(this.varNamePrefix.length, val.length - 1);
                                                    ref = this.varAccessor.get(ref);
                                                    subst = context[ref.name];
                                                } else {
                                                    subst = context[prop];
                                                }
                                                param[prop] = subst;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (typeof param.value === "string" && param.value.charAt(0) == "#") {
                            subst = context[param.value.substring(1)];
                            context[key] = subst;
                        }
                    }
                }
            }
        }
    };
    return context;
};

thymol.ThUtils = function() {
    function mergeVars(thiz, other) {
        var current = thiz, prop = null;
        if (!current) {
            current = {};
        }
        for (prop in other) {
            if (other.hasOwnProperty(prop)) {
                if (prop) {
                    if (!current[prop]) {
                        current[prop] = other[prop];
                    }
                }
            }
        }
        return current;
    }
    function processElement(func, element, arg, obj) {
        var result = null, parent = element.parentElement;
        if (!thymol.isFragmentChild(element)) {
            if (!element.thObjectVar) {
                parent = element.parentElement;
                while (parent) {
                    if (parent.thObjectVar) {
                        element.thObjectVar = parent.thObjectVar;
                        break;
                    }
                    parent = parent.parentElement;
                }
            }
            parent = element.parentElement;
            while (parent) {
                if (parent.thLocalVars) {
                    element.thLocalVars = mergeVars(element.thLocalVars, parent.thLocalVars);
                    break;
                }
                parent = parent.parentElement;
            }
            result = func(element, arg, obj);
        }
        return result;
    }
    function unQuote(param) {
        var par = param, pared;
        if (par) {
            if (typeof par === "string") {
                par = par.trim();
                if (par.charAt(0) == '"') {
                    if (par.charAt(par.length - 1) == '"') {
                        pared = par.substring(1, par.length - 1);
                        if (pairParity(pared, '"', '"') == 0) {
                            par = pared;
                        }
                    }
                } else if (par.charAt(0) == "'") {
                    if (par.charAt(par.length - 1) == "'") {
                        pared = par.substring(1, par.length - 1);
                        if (pairParity(pared, "'", "'") == 0) {
                            par = pared;
                        }
                    }
                }
            }
        }
        return par;
    }
    function unParenthesise(param) {
        var par = param, pared;
        if (par) {
            if (typeof par === "string") {
                par = par.trim();
                if (par.charAt(0) == "(") {
                    if (par.charAt(par.length - 1) == ")") {
                        pared = par.substring(1, par.length - 1).trim();
                        if (pairParity(pared, "(", ")") == 0) {
                            par = pared;
                        }
                    }
                }
            }
        }
        return par;
    }
    function pairParity(str, left, right) {
        var i, ch, strLength = str.length, parity = 0;
        for (i = 0; i < strLength; i++) {
            ch = str.charAt(i);
            if (ch == left) {
                parity++;
            } else if (ch == right) {
                parity--;
                if (parity < 0) {
                    break;
                }
            }
        }
        return parity;
    }
    function unBracket(param) {
        var par = param, pared;
        if (typeof par === "string") {
            par = par.trim();
        }
        if (par) {
            if (par.charAt(0) == "[") {
                if (par.charAt(par.length - 1) == "]") {
                    pared = par.substring(1, par.length - 1);
                    if (pairParity(pared, "[", "]") == 0) {
                        par = pared;
                    }
                }
            }
        }
        return par;
    }
    function getToPrecision(n, p) {
        if (typeof p === "undefined") {
            return n;
        }
        var up = thymol.thDefaultPrecision, ndp = 0, s, sl, dp, v;
        if (p > up) {
            up = p;
        } else {
            s = n.toString();
            sl = s.length;
            dp = s.indexOf(".");
            if (dp >= 0) {
                ndp = sl - 1 - dp;
            }
            if (ndp > up) {
                v = n.toPrecision(ndp + 1);
                v = truncateDecimals(v);
                s = v.toString();
                sl = s.length;
                if (dp >= 0) {
                    ndp = sl - 1 - dp;
                }
            }
            if (p > ndp) {
                up = p;
            } else if (ndp < up) {
                up = ndp;
            }
        }
        v = parseFloat(n);
        v = v.toFixed(up);
        if (p === 0) {
            v = Number(v);
        }
        return v;
    }
    function truncateDecimals(valp) {
        var val = valp, iLimit = valp.length - 1, i;
        for (i = iLimit; i >= 0; i--) {
            if (val.charAt(i) === "0") {
                val = val.substr(0, i);
            } else {
                break;
            }
        }
        return val;
    }
    function getDecimalDigits(val) {
        var digits = 0, s, dp;
        s = val.toString();
        dp = s.indexOf(".") + 1;
        if (dp > 0) {
            digits = s.length - dp;
        }
        return digits;
    }
    function testLiteralFalse(initial) {
        var result = false, val;
        if (typeof initial === "string") {
            val = initial.toLowerCase();
            result = val == "false" || val == "off" || val == "no";
        } else if (typeof initial === "boolean") {
            result = !initial;
        }
        return result;
    }
    function renderMessage(msg, values) {
        var result = msg, i, iLimit;
        if (Object.prototype.toString.call(values) == "[object Array]") {
            for (i = 0, iLimit = values.length; i < iLimit; i++) {
                result = renderMessageArg(result, i, values[i]);
            }
        } else {
            result = renderMessageArg(msg, 0, values);
        }
        return result;
    }
    function renderMessageArg(msg, index, value) {
        var result = msg, splits, i, iLimit, iUpper;
        splits = msg.split("{" + index + "}");
        if (splits.length > 0) {
            result = "";
            for (i = 0, iLimit = splits.length, iUpper = iLimit - 1; i < iLimit; i++) {
                result += splits[i];
                if (i < iUpper) {
                    result += value;
                }
            }
        }
        return result;
    }
    function getParameter(name) {
        var result, tor;
        result = thymol.requestContext[name];
        tor = typeof result;
        if (tor === "undefined") {
            result = thymol.sessionContext[name];
            if (typeof result === "undefined") {
                result = thymol.applicationContext[name];
            }
        } else if (tor === "object") {
            if (Object.prototype.toString.call(result) === "[object Array]") {
                if (result.length === 1) {
                    result = result[0];
                }
            }
        }
        return result;
    }
    function charOcurrences(str, chr) {
        var count = 0, i = 0, iLimit = str.length;
        for (;i < iLimit; i++) {
            if (str.charAt(i) === chr) {
                count++;
            }
        }
        return count;
    }
    function isLiteral(val) {
        var first, last;
        if (typeof val === "string") {
            first = val.charAt(0);
            last = val.charAt(val.length - 1);
            if (first == "'" && last == "'") {
                return true;
            }
            if (first == '"' && last == '"') {
                return true;
            }
        }
        return false;
    }
    function isLiteralSubst(param) {
        var result = false, par = param;
        if (typeof par === "string") {
            par = par.trim();
        }
        if (par) {
            if (par.charAt(0) == "|") {
                if (par.charAt(par.length - 1) == "|") {
                    result = true;
                }
            }
        }
        return result;
    }
    function loadScript(file) {
        var script = thymol.Thymol.prototype.getFilePath(file);
        var status = "";
        var jqxhr = $.ajax({
            type: "GET",
            url: script,
            dataType: "script",
            cache: true,
            async: false
        }).done(function() {
            status = "success";
        }).fail(function() {
            status = "error";
        });
    }
    function unescape(text) {
        var result = text, i, iLimit, iUpper, c, cc;
        if (text !== null && typeof text !== "undefined") {
            result = "";
            iLimit = text.length;
            iUpper = iLimit - 3;
            for (i = 0; i < iLimit; i++) {
                c = text.charAt(i);
                if (i < iUpper) {
                    if (c === "&") {
                        cc = text.charAt(i + 1).toLowerCase();
                        if ((cc === "g" || cc === "l") && text.charAt(i + 2).toLowerCase() === "t" && text.charAt(i + 3) === ";") {
                            i += 3;
                            if (cc === "g") {
                                c = ">";
                            } else {
                                c = "<";
                            }
                        } else if (i < iUpper - 1 && cc === "a" && text.charAt(i + 2).toLowerCase() === "m" && text.charAt(i + 3).toLowerCase() === "p" && text.charAt(i + 4) === ";") {
                            i += 4;
                        } else if (i < iUpper - 2) {
                            if (cc === "q" && text.charAt(i + 2).toLowerCase() === "u" && text.charAt(i + 3).toLowerCase() === "o" && text.charAt(i + 4).toLowerCase() === "t" && text.charAt(i + 5) === ";") {
                                i += 5;
                                c = '"';
                            } else if (cc === "a" && text.charAt(i + 2).toLowerCase() === "p" && text.charAt(i + 3).toLowerCase() === "o" && text.charAt(i + 4).toLowerCase() === "s" && text.charAt(i + 5) === ";") {
                                i += 5;
                                c = "'";
                            }
                        }
                    }
                }
                result += c;
            }
        }
        return result;
    }
    function unicodeUnescape(initial) {
        var result = initial.replace(/\\u([\da-f]{4})/gi, function(match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        });
        result = unescape(result);
        return result;
    }
    function removeTag(element) {
        var parent = element.parentNode, i, iLimit, savedObject = element.thObjectVar, savedLocals = element.thLocalVars;
        if (!!parent) {
            for (i = 0, iLimit = element.childNodes.length; i < iLimit; i++) {
                var newNode = element.childNodes[i].cloneNode(true);
                if (newNode.nodeType === 1) {
                    if (!!savedObject) {
                        newNode.thObjectVar = savedObject;
                    }
                    if (!!savedLocals) {
                        newNode.thLocalVars = savedLocals;
                    }
                }
                parent.insertBefore(newNode, element);
            }
            parent.removeChild(element);
        }
    }
    function getRequestEncoded(initial) {
        var result = initial;
        result = encodeURIComponent(result);
        result = result.replace(/%20/g, "+");
        result = result.replace(/%26/g, "&");
        result = result.replace(/%3A/g, ":");
        result = result.replace(/!/g, "%21");
        result = result.replace(/'/g, "%27");
        result = result.replace(/\(/g, "%28");
        result = result.replace(/\)/g, "%29");
        result = result.replace(/\*/g, "%2A");
        result = result.replace(/~/g, "%7E");
        return result;
    }
    return {
        getParameter: getParameter,
        processElement: processElement,
        unQuote: unQuote,
        unParenthesise: unParenthesise,
        unBracket: unBracket,
        getToPrecision: getToPrecision,
        getDecimalDigits: getDecimalDigits,
        testLiteralFalse: testLiteralFalse,
        renderMessage: renderMessage,
        charOcurrences: charOcurrences,
        isLiteral: isLiteral,
        isLiteralSubst: isLiteralSubst,
        loadScript: loadScript,
        unescape: unescape,
        unicodeUnescape: unicodeUnescape,
        removeTag: removeTag,
        getRequestEncoded: getRequestEncoded
    };
}();

thymol.ThParser = function(scope) {
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
    function NullReturn(varName) {
        this.varName = varName;
    }
    var TNUMBER = 0;
    var TOP1 = 1;
    var TOP2 = 2;
    var TVAR = 3;
    var TFUNCALL = 4;
    var MSGSUBST = 5;
    var ARGLIST = 6;
    function Token(type_p, index_p, prio_p, number_p, mode_p, meta_p) {
        this.type_ = type_p;
        this.index_ = index_p || 0;
        this.prio_ = prio_p || 0;
        this.number_ = number_p !== undefined && number_p !== null ? number_p : 0;
        this.mode_ = mode_p !== undefined && mode_p !== null ? mode_p : 0;
        this.meta_ = meta_p;
        this.toString = function() {
            switch (this.type_) {
              case TNUMBER:
                return this.number_;

              case TOP1:
              case TOP2:
              case TVAR:
                return this.index_;

              case TFUNCALL:
              case MSGSUBST:
              case ARGLIST:
                return "CALL";

              default:
                return "Invalid Token";
            }
        };
    }
    function Expression(tokens, ops1, ops2, functions, precision, position) {
        this.tokens = tokens;
        this.ops1 = ops1;
        this.ops2 = ops2;
        this.functions = functions;
        this.precision = precision;
        this.position = position;
    }
    Expression.prototype = {
        simplify: function(valuesParam) {
            var values = valuesParam || {};
            var nstack = [];
            var newexpression = [];
            var n1;
            var n2;
            var f;
            var L = this.tokens.length;
            var item;
            var i = 0;
            for (i = 0; i < L; i++) {
                item = this.tokens[i];
                var type_ = item.type_;
                if (type_ === TNUMBER) {
                    nstack.push(item);
                } else if (type_ === TVAR && !(item.index_ in new Object()) && item.index_ in values) {
                    item = new Token(TNUMBER, 0, 0, values[item.index_]);
                    nstack.push(item);
                } else if (type_ === TOP2 && nstack.length > 1) {
                    f = this.ops2[item.index_];
                    if (!!f) {
                        n2 = nstack.pop();
                        n1 = nstack.pop();
                        item = new Token(TNUMBER, 0, 0, f(n1.number_, n2.number_));
                    }
                    nstack.push(item);
                } else if (type_ === TOP1 && nstack.length > 0) {
                    if ("{" == item.index_) {
                        if (item.mode_ == 2) {
                            nstack.push(item);
                        }
                    } else {
                        n1 = nstack.pop();
                        f = this.ops1[item.index_];
                        item = new Token(TNUMBER, 0, 0, f(n1.number_));
                        nstack.push(item);
                    }
                } else {
                    while (nstack.length > 0) {
                        newexpression.push(nstack.shift());
                    }
                    newexpression.push(item);
                }
            }
            while (nstack.length > 0) {
                newexpression.push(nstack.shift());
            }
            var res = new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions), this.precision);
            return res;
        },
        evaluate: function(element) {
            var nstack = [];
            var n1;
            var n2;
            var f;
            var res = null;
            var L = this.tokens.length;
            var item;
            var i = 0;
            var result;
            for (i = 0; i < L; i++) {
                item = this.tokens[i];
                if (i === 0 && thymol.disableMessages && item.mode_ === 4) {
                    var nullReturn = new thymol.ThClass();
                    nullReturn.abort = true;
                    return nullReturn;
                }
                var type_ = item.type_;
                if (type_ === TNUMBER) {
                    nstack.push(item.number_);
                    if (i == L - 1) {
                        break;
                    }
                } else if (type_ === TOP2) {
                    n2 = nstack.pop();
                    if (typeof n2 === "undefined" || n2 instanceof NullReturn) {
                        n2 = null;
                    }
                    n1 = nstack.pop();
                    if (typeof n1 === "undefined" || n1 instanceof NullReturn) {
                        n1 = null;
                    }
                    f = this.ops2[item.index_];
                    var pathMatch = false;
                    try {
                        if (item.mode_ === 6) {
                            if (f === dot) {
                                res = n1 + "[" + n2 + "]";
                            } else if (f === append) {
                                if (!!item.meta_) {
                                    if (!!item.meta_.paths) {
                                        var values = item.meta_.paths[n1];
                                        if (!!values) {
                                            values.push(n2);
                                            pathMatch = true;
                                            res = null;
                                        }
                                    }
                                }
                                if (!pathMatch) {
                                    if (!item.meta_) {
                                        item.meta_ = {};
                                    }
                                    if (!item.meta_.params) {
                                        item.meta_.params = [];
                                    }
                                    var values = item.meta_.params[n1];
                                    if (!values) {
                                        values = [];
                                        item.meta_.params[n1] = values;
                                    }
                                    values.push(n2);
                                    pathMatch = true;
                                }
                            } else {
                                res = n2;
                                nstack.push(n1);
                            }
                        } else {
                            if (f === dot && "class" === n2 && !!n1 && !n1["class"]) {
                                var tn2 = typeof n2;
                                if (tn2 === "object" && n2 instanceof thymol.ThParam) {
                                    res = f(n1, n2);
                                } else {
                                    res = new thymol.ThClass("JavaScript:" + tn2);
                                }
                            } else {
                                res = f(n1, n2);
                                if (typeof res === "function") {
                                    if (L - 1 > i) {
                                        next = this.tokens[i + 1];
                                        if (next.type_ === TNUMBER && Object.prototype.toString.call(next.number_) == "[object Array]" && next.number_.length == 0) {
                                            i += 1;
                                            nstack.push(res);
                                            n1.isDirect = true;
                                            res = n1;
                                        }
                                    }
                                }
                            }
                            if (f !== append) {
                                if (Object.prototype.toString.call(res) == "[object Array]") {
                                    res.arrayResult = true;
                                }
                            }
                        }
                    } catch (err) {
                        if (!element.isBlockChild) {
                            var aValue = n1 == null ? "null" : n1;
                            var bValue = n2 == null ? "null" : n2;
                            var message = "while evaluating expression: " + this.tokens[i - 2].index_ + ": " + aValue + ", " + this.tokens[i - 1].index_ + ": " + bValue;
                            throw new thymol.ThError(message, element, err);
                        }
                    }
                    if (!pathMatch) {
                        nstack.push(res);
                    }
                } else if (type_ === TVAR) {
                    var next = null, pushed = nstack.length;
                    if (item.index_ != null) {
                        if (L - 1 > i) {
                            next = this.tokens[i + 1];
                            if (next.type_ === TOP2 && next.index_ === ".") {
                                nstack.push(item.index_);
                            }
                        }
                        if (pushed === nstack.length) {
                            var val = thymol.substituteParam(item.index_, item.mode_, element);
                            if (Object.prototype.toString.call(val) == "[object Array]") {
                                val.arrayResult = true;
                            }
                            this.updatePrecision(val);
                            if (val === null) {
                                val = new NullReturn(item.index_);
                            }
                            nstack.push(val);
                        }
                    } else if (pushed === nstack.length && item.index_ in this.functions) {
                        nstack.push(this.functions[item.index_]);
                    } else {
                        if (!element.isBlockChild) {
                            throw new thymol.ThError("Exception undefined variable: " + item.index_, element);
                        }
                    }
                } else if (type_ === TOP1) {
                    n1 = nstack.pop();
                    if (typeof n1 === "undefined" || n1 instanceof NullReturn) {
                        if (item.mode_ === 2) {
                            n1 = "";
                        } else {
                            n1 = null;
                        }
                    }
                    res = n1;
                    if ("{" === item.index_) {
                        var prev = this.tokens[i - 1];
                        if (prev.mode_ == 7) {
                            if (thymol.conversionService) {
                                n1 = thymol.conversionService(n1);
                                res = n1;
                            }
                        }
                        if (typeof n1 === "string") {
                            if (item.mode_ === 2) {
                                res = thymol.getStandardURL(n1);
                            } else {
                                var subst = thymol.substituteParam(n1, item.mode_, element);
                                if (subst != null) {
                                    this.updatePrecision(subst);
                                    res = subst;
                                }
                            }
                        }
                    } else {
                        f = this.ops1[item.index_];
                        try {
                            res = f(n1);
                        } catch (err) {
                            if (!element.isBlockChild) {
                                var aValue = n1 == null ? "null" : n1;
                                var message = "while evaluating expression: " + this.tokens[i - 2].index_ + ": " + aValue;
                                throw new thymol.ThError(message, element, err);
                            }
                        }
                    }
                    if (Object.prototype.toString.call(res) == "[object Array]") {
                        res.arrayResult = true;
                    }
                    nstack.push(res);
                } else if (type_ === TFUNCALL || type_ === MSGSUBST || type_ === ARGLIST) {
                    n1 = nstack.pop();
                    f = nstack.pop();
                    if (type_ === MSGSUBST) {
                        if (f instanceof NullReturn) {
                            res = "??" + f.varName + "_" + thymol.locale.value + "??";
                        } else {
                            res = thymol.ThUtils.renderMessage(f, n1);
                        }
                        nstack.push(res);
                    } else if (type_ === ARGLIST) {
                        var pathMatch = false;
                        n2 = nstack.pop();
                        if (typeof n2 === "undefined") {
                            n2 = f;
                            f = n1;
                            n1 = "";
                        }
                        if (!!item.meta_) {
                            if (!!item.meta_.paths) {
                                var values = item.meta_.paths[f];
                                if (!!values) {
                                    values.push(n1);
                                    pathMatch = true;
                                }
                                for (var j in item.meta_.paths) {
                                    if (item.meta_.paths.hasOwnProperty(j)) {
                                        var values = item.meta_.paths[j];
                                        var isReq = n2.indexOf("?") >= 0;
                                        if (!!values && values.length > 0) {
                                            var pathVar = "{" + j + "}";
                                            var repReg = new RegExp(pathVar, "g");
                                            var rep = "";
                                            values.reverse();
                                            for (var k = 0, kLimit = values.length; k < kLimit; k++) {
                                                if (rep.length > 0) {
                                                    rep = rep + ",";
                                                }
                                                if (isReq) {
                                                    rep = rep + thymol.ThUtils.getRequestEncoded(values[k]);
                                                } else {
                                                    rep = rep + encodeURIComponent(values[k]);
                                                }
                                            }
                                            n2 = n2.replace(repReg, rep);
                                        }
                                    }
                                }
                            }
                        }
                        if (pathMatch) {
                            res = n2;
                        } else {
                            if (typeof f === "undefined" || f instanceof NullReturn) {
                                f = "";
                            } else {
                                f = f.toString();
                            }
                            f = thymol.ThUtils.getRequestEncoded(f);
                            f = "?" + f;
                            n1 = n1.toString();
                            if (f != "?" && n1 != "") {
                                f = f + "=";
                            }
                            if (n1 != "") {
                                n1 = thymol.ThUtils.getRequestEncoded(n1);
                                f = f + n1;
                            }
                            if (typeof n2 === "undefined" || n2 instanceof NullReturn) {
                                n2 = "";
                            } else {
                                n2 = n2.toString();
                            }
                            res = n2 + f;
                        }
                        if (!!item.meta_) {
                            var separator = res.indexOf("?") >= 0 ? "&" : "?";
                            for (var j in item.meta_.params) {
                                if (item.meta_.params.hasOwnProperty(j)) {
                                    var values = item.meta_.params[j];
                                    if (!!values && values.length > 0) {
                                        for (var k = 0, kLimit = values.length; k < kLimit; k++) {
                                            res = res + separator + thymol.ThUtils.getRequestEncoded(j) + "=" + thymol.ThUtils.getRequestEncoded(values[k]);
                                            if (k == 0) {
                                                separator = "&";
                                            }
                                        }
                                    }
                                }
                            }
                            if (!!item.meta_.urlFragment) {
                                res = res + item.meta_.urlFragment;
                            }
                        }
                        nstack.push(res);
                    } else if (f.apply && f.call) {
                        if (!!n1 && !!n1.isDirect) {
                            res = f.call(n1);
                        } else {
                            if (n1 instanceof NullReturn) {
                                n1 = null;
                            }
                            if (n1 != null && (n1.arrayResult || Object.prototype.toString.call(n1) !== "[object Array]")) {
                                res = f.call(element, n1);
                            } else {
                                res = f.apply(element, n1);
                            }
                        }
                        if (res instanceof String) {
                            if (res.precision) {
                                if (typeof this.precision === "undefined" || res.precision > this.precision) {
                                    this.precision = res.precision;
                                }
                            }
                            res = res.toString();
                        } else if (Object.prototype.toString.call(res) == "[object Array]") {
                            res.arrayResult = true;
                        }
                        nstack.push(res);
                    } else {
                        if (!element.isBlockChild) {
                            throw new thymol.ThError(f + " is not a function", element);
                        }
                    }
                } else {
                    if (!element.isBlockChild) {
                        throw new thymol.ThError("invalid expression item type: " + type_, element);
                    }
                }
            }
            if (nstack.length > 1) {
                if (!element.isBlockChild) {
                    throw new thymol.ThError("invalid Expression (parity)", element);
                }
            }
            result = nstack[0];
            return result;
        },
        updatePrecision: function(val) {
            if (typeof val === "number") {
                var p = thymol.ThUtils.getDecimalDigits(val);
                if (typeof this.precision === "undefined" || p > this.precision) {
                    this.precision = p;
                }
            }
        }
    };
    function add(a, b) {
        return a + b;
    }
    function assign(a) {
        return a;
    }
    function sub(a, b) {
        return a - b;
    }
    function mul(a, b) {
        return a * b;
    }
    function div(a, b) {
        return a / b;
    }
    function mod(a, b) {
        return a % b;
    }
    function concat(a, b) {
        return "" + a + b;
    }
    function neg(a) {
        return -a;
    }
    function not(a) {
        var v = thymol.getBooleanValue(a);
        return !v;
    }
    function random(a) {
        return Math.random() * (a || 1);
    }
    function fac(a) {
        var aa = Math.floor(a);
        var b = aa;
        while (aa > 1) {
            b = b * --aa;
        }
        return b;
    }
    function append(a, b) {
        if (a != null) {
            if (a.arrayResult === true || Object.prototype.toString.call(a) != "[object Array]") {
                return [ a, b ];
            }
        } else {
            if (b != null) {
                if (b.arrayResult === true || Object.prototype.toString.call(b) != "[object Array]") {
                    return [ a, b ];
                }
                return b;
            }
            return null;
        }
        var aa = a.slice();
        aa.push(b);
        return aa;
    }
    function equal(a, b) {
        return a == b;
    }
    function notEqual(a, b) {
        return a != b;
    }
    function gt(a, b) {
        return a > b;
    }
    function ge(a, b) {
        return a >= b;
    }
    function lt(a, b) {
        return a < b;
    }
    function le(a, b) {
        return a <= b;
    }
    function and(a, b) {
        return a && b;
    }
    function or(a, b) {
        return a || b;
    }
    function dot(a, b) {
        return a[b];
    }
    function binary(a, b) {
        return a ? b : null;
    }
    function elvis(a, b) {
        return a != null ? a : b;
    }
    function getStr(pos, expression, mode, partial, preprocessed) {
        var localMode = mode;
        var s = "";
        var c = expression.charAt(pos);
        var start = pos + 1;
        var end = expression.length;
        var stopChar = c;
        if (localMode === 4 || c === "#") {
            stopChar = "}";
            localMode = 4;
        }
        var i = start;
        var inCurly = false;
        var curlyPos = null;
        var urlFragPos = -1;
        var meta = null;
        if (localMode !== 4 && c !== "'" && c !== '"') {
            for (;i <= end; i++) {
                if (c.toUpperCase() === c.toLowerCase()) {
                    if (c === "{") {
                        inCurly = true;
                        curlyPos = i;
                        if (meta === null) {
                            meta = {};
                            meta.paths = [];
                        }
                    } else if (mode === 2 && c === "#") {
                        urlFragPos = i;
                    }
                    if (i === pos || !inCurly && c === "}" || c !== "_" && c !== "?" && c !== ":" && (c < "0" || c > "9")) {
                        if (!(partial && c == "-") && !((mode === 2 || mode === 6) && (c === "/" || c === "." || c === "~" || c === "?" || c === "=" || c === ":" || c === "-" || c === "_" || c === "[" || c === "]" || c === "#" || inCurly && c === "{" || inCurly && c === "}")) || mode === 6 && c === "=") {
                            i = i - 1;
                            break;
                        }
                    }
                    if (inCurly && c === "}") {
                        inCurly = false;
                        if (meta === null) {
                            var message = 'bad path variable definition in expression: "' + expression + '" near column ' + pos;
                            throw new thymol.ThError(message, element);
                        }
                        var curlyVar = expression.substring(curlyPos, i - 1);
                        var values = [];
                        meta.paths[curlyVar] = values;
                    }
                }
                s += c;
                c = expression.charAt(i);
            }
            if (urlFragPos >= 0) {
                var urlFrag = expression.substring(urlFragPos - 1, i);
                s = s.substring(0, s.length - urlFrag.length);
                if (meta === null) {
                    meta = {};
                    meta.urlFragment = urlFrag;
                }
            }
        } else {
            var quoted = false;
            var preprocessing = false;
            if (c === "'" || c === '"') {
                quoted = true;
                stopChar = c;
            }
            while (i <= end) {
                if (c === stopChar && i > start && !preprocessing) {
                    if (localMode !== 4 || quoted) {
                        s += c;
                    } else {
                        i = i - 1;
                    }
                    break;
                }
                var nc = expression.charAt(i);
                if (c === "_" && nc === "_" && !preprocessed) {
                    preprocessing = !preprocessing;
                }
                if (c === "\\") {
                    if (nc === "'" && s.charAt(s.length - 1) !== "\\") {
                        c = "&#39;";
                        if (i + 1 > end) {
                            break;
                        }
                        i = i + 1;
                        nc = expression.charAt(i);
                    }
                }
                if (!quoted) {
                    if (c === ".") {
                        var exp = thymol.thExpressionObjects[s];
                        if (typeof exp !== "undefined" && exp !== null) {
                            i -= 1;
                            break;
                        }
                    }
                    if (c === "(") {
                        i -= 1;
                        break;
                    }
                }
                s += c;
                if (i + 1 > end) {
                    break;
                }
                i = i + 1;
                c = nc;
            }
        }
        var str = new Object();
        str.str = s;
        str.pos = i;
        if (meta !== null) {
            str.meta = meta;
        }
        return str;
    }
    function ThParser() {
        this.precision;
        this.success = false;
        this.errormsg = "";
        this.expression = "";
        this.pos = 0;
        this.tokennumber = 0;
        this.tokenprio = 0;
        this.tokenindex = 0;
        this.tmpprio = 0;
        this.ops1 = {
            sin: Math.sin,
            cos: Math.cos,
            tan: Math.tan,
            asin: Math.asin,
            acos: Math.acos,
            atan: Math.atan,
            sqrt: Math.sqrt,
            log: Math.log,
            abs: Math.abs,
            ceil: Math.ceil,
            floor: Math.floor,
            round: Math.round,
            "-": neg,
            "!": not,
            not: not,
            exp: Math.exp,
            "=": assign
        };
        this.ops2 = {
            "?": binary,
            ":": elvis,
            "?:": elvis,
            "+": add,
            "-": sub,
            "*": mul,
            "/": div,
            "%": mod,
            "^": Math.pow,
            ",": append,
            "||": concat,
            "==": equal,
            eq: equal,
            "!=": notEqual,
            ne: notEqual,
            neq: notEqual,
            div: div,
            mod: mod,
            and: and,
            or: or,
            ">": gt,
            gt: gt,
            ">=": ge,
            "=>": ge,
            ge: ge,
            "<": lt,
            lt: lt,
            "<=": le,
            "=<": le,
            le: le,
            ".": dot,
            "[": dot
        };
        this.functions = {
            random: random,
            fac: fac,
            min: Math.min,
            max: Math.max,
            pow: Math.pow
        };
        this.consts = {
            E: Math.E,
            PI: Math.PI
        };
    }
    ThParser.parse = function(expr, partial, preprocessed) {
        return new thymol.ThParser().parse(expr, partial, preprocessed);
    };
    ThParser.evaluate = function(expr, partial, element) {
        return thymol.ThParser.parse(expr, partial, false).evaluate(element);
    };
    ThParser.Expression = Expression;
    ThParser.values = {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        asin: Math.asin,
        acos: Math.acos,
        atan: Math.atan,
        sqrt: Math.sqrt,
        log: Math.log,
        abs: Math.abs,
        ceil: Math.ceil,
        floor: Math.floor,
        round: Math.round,
        random: random,
        fac: fac,
        exp: Math.exp,
        min: Math.min,
        max: Math.max,
        pow: Math.pow,
        E: Math.E,
        PI: Math.PI
    };
    var PRIMARY = 1 << 0;
    var OPERATOR = 1 << 1;
    var FUNCTION = 1 << 2;
    var LPAREN = 1 << 3;
    var RPAREN = 1 << 4;
    var COMMA = 1 << 5;
    var SIGN = 1 << 6;
    var CALL = 1 << 7;
    var NULLARY_CALL = 1 << 8;
    var LBRACK = 1 << 9;
    var RBRACK = 1 << 10;
    var LVARBRK = 1 << 11;
    var RVARBRK = 1 << 11;
    var OPTION = 1 << 12;
    var ASSIGN = 1 << 13;
    ThParser.prototype = {
        parse: function(expr, partial, preprocessed) {
            this.errormsg = "";
            this.success = true;
            var operstack = [];
            var tokenstack = [];
            var modestack = [];
            this.tmpprio = 0;
            var expected = PRIMARY | LPAREN | LVARBRK | FUNCTION | OPERATOR | SIGN | OPTION;
            var noperators = 0;
            this.expression = expr;
            this.pos = 0;
            this.mode = 0;
            while (this.pos < this.expression.length) {
                if (this.isWhite()) {} else if (this.isOperator()) {
                    if (this.isSign() && expected & SIGN) {
                        if (this.isNegativeSign()) {
                            this.tokenprio = 6;
                            this.tokenindex = "-";
                            noperators++;
                            this.addfunc(tokenstack, operstack, TOP1);
                        }
                        expected = PRIMARY | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION;
                    } else if (this.isAssign() && expected & ASSIGN) {
                        noperators++;
                        expected = PRIMARY | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION;
                    } else if (this.isComment()) {} else {
                        if (this.tokenindex == "!") {
                            if ((expected & SIGN) === 0) {
                                this.error_parsing(this.pos, "unexpected sign");
                            }
                            noperators += 1;
                            this.addfunc(tokenstack, operstack, TOP1);
                        } else {
                            if ((expected & OPERATOR) === 0) {
                                this.error_parsing(this.pos, "unexpected operator");
                            }
                            noperators += 2;
                            this.addfunc(tokenstack, operstack, TOP2);
                        }
                        if (this.expression.charAt(this.pos - 1) === "[") {
                            this.tmpprio += 20;
                        }
                        expected = PRIMARY | OPERATOR | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION;
                    }
                } else if (this.isNumber()) {
                    if ((expected & PRIMARY) === 0) {
                        this.error_parsing(this.pos, "unexpected number");
                    }
                    var token = new Token(TNUMBER, 0, 0, this.tokennumber);
                    tokenstack.push(token);
                    expected = OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA;
                } else if (this.isLeftParenth()) {
                    if ((expected & LPAREN) === 0) {
                        this.error_parsing(this.pos, 'unexpected "("');
                    }
                    modestack.push(this.mode);
                    if (expected & CALL) {
                        noperators += 2;
                        this.tokenprio = -2;
                        this.tokenindex = -1;
                        this.tmpprio += 2;
                        var ft = TFUNCALL;
                        if (this.mode === 4) {
                            ft = MSGSUBST;
                            this.mode = 5;
                        } else if (this.mode === 2) {
                            ft = ARGLIST;
                            this.mode = 6;
                            var url = tokenstack[tokenstack.length - 1];
                            if (!url.meta_) {
                                url.meta_ = {};
                            }
                            this.meta = url.meta_;
                        } else {
                            this.mode = 5;
                        }
                        this.addfunc(tokenstack, operstack, ft);
                        this.tmpprio -= 2;
                    }
                    if (this.mode === 5 || this.mode === 6) {
                        this.tmpprio += 10;
                    }
                    expected = PRIMARY | OPERATOR | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION | NULLARY_CALL;
                } else if (this.isRightParenth()) {
                    if (expected & NULLARY_CALL) {
                        var token = new Token(TNUMBER, 0, 0, []);
                        tokenstack.push(token);
                    } else if ((expected & RPAREN) === 0) {
                        this.error_parsing(this.pos, 'unexpected ")"');
                    }
                    if (this.mode === 5 || this.mode === 6) {
                        this.tmpprio -= 10;
                    }
                    this.mode = modestack.pop();
                    expected = OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | LVARBRK | CALL | OPTION;
                } else if (this.isRightBracket()) {
                    if ((expected & RBRACK) === 0) {
                        this.error_parsing(this.pos, 'unexpected "]"');
                    }
                    expected = OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | LVARBRK | CALL | OPTION;
                } else if (this.isLeftVarBrk(modestack)) {
                    if ((expected & LVARBRK) === 0) {
                        this.error_parsing(this.pos, 'unexpected "{"');
                    }
                    noperators += 1;
                    this.addfunc(tokenstack, operstack, TOP1);
                    expected = PRIMARY | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION;
                } else if (this.isRightVarBrk()) {
                    if ((expected & RVARBRK) === 0) {
                        this.error_parsing(this.pos, 'unexpected "}"');
                    }
                    this.mode = modestack.pop();
                    expected = FUNCTION | OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | LVARBRK | CALL | OPTION;
                } else if (this.isLeftCurly()) {
                    if (this.mode == 1 || this.mode == 2 || this.mode == 3 || this.mode == 4) {
                        modestack.push(this.mode);
                        this.mode = 7;
                    } else {
                        this.error_parsing(this.pos, 'unexpected "{"');
                    }
                } else if (this.isRightCurly()) {
                    if (this.mode == 7) {
                        this.mode = modestack.pop();
                    } else {
                        this.error_parsing(this.pos, 'unexpected "}"');
                    }
                } else if (this.isComma()) {
                    if ((expected & COMMA) === 0) {
                        this.error_parsing(this.pos, 'unexpected ","');
                    }
                    if (!!partial) {
                        break;
                    }
                    if (this.mode === 5 || this.mode === 6) {
                        this.tmpprio -= 10;
                    }
                    this.tmpprio += 2;
                    this.addfunc(tokenstack, operstack, TOP2);
                    this.tmpprio -= 2;
                    if (this.mode === 5 || this.mode === 6) {
                        this.tmpprio += 10;
                    }
                    noperators += 2;
                    expected = PRIMARY | LPAREN | LVARBRK | FUNCTION | SIGN | OPTION;
                } else if (this.isConst()) {
                    if ((expected & PRIMARY) === 0) {
                        this.error_parsing(this.pos, "unexpected constant");
                    }
                    var consttoken = new Token(TNUMBER, 0, 0, this.tokennumber);
                    tokenstack.push(consttoken);
                    expected = OPERATOR | RPAREN | RVARBRK | RBRACK | COMMA;
                } else {
                    var str = getStr(this.pos, this.expression, this.mode, partial, preprocessed);
                    if (this.isOpX(str, this.ops2) && (this.mode !== 2 && "/" !== str)) {
                        if ("and" === str.str || "or" === str.str) {
                            this.tokenprio = 3;
                        }
                        if ((expected & OPERATOR) === 0) {
                            this.error_parsing(this.pos, "unexpected binary operator");
                        }
                        this.addfunc(tokenstack, operstack, TOP2);
                        noperators += 2;
                        expected = PRIMARY | LPAREN | LVARBRK | FUNCTION | OPERATOR | SIGN | OPTION;
                    } else if (this.isOpX(str, this.ops1)) {
                        if ((expected & OPERATOR) === 0) {
                            this.error_parsing(this.pos, "unexpected unary operator");
                        }
                        this.addfunc(tokenstack, operstack, TOP1);
                        noperators++;
                        expected = PRIMARY | LPAREN | LVARBRK | FUNCTION;
                    } else if (this.isLiteralValue(str)) {
                        if ((expected & PRIMARY) === 0) {
                            this.error_parsing(this.pos, "unexpected literal value");
                        }
                        var token = new Token(TNUMBER, 0, 0, this.tokennumber);
                        tokenstack.push(token);
                        expected = FUNCTION | OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | RVARBRK | LBRACK | CALL | OPTION;
                        if (this.mode === 6) {
                            expected = expected | ASSIGN;
                        }
                    } else if (this.isVar(str)) {
                        if ((expected & PRIMARY) === 0) {
                            this.error_parsing(this.pos, "unexpected variable");
                        }
                        var vartoken = new Token(TVAR, this.tokenindex, 0, 0, this.mode, str.meta);
                        tokenstack.push(vartoken);
                        expected = FUNCTION | OPERATOR | RPAREN | RBRACK | RVARBRK | COMMA | LPAREN | RVARBRK | LBRACK | CALL | OPTION | ASSIGN;
                    } else {
                        if (this.errormsg === "") {
                            this.error_parsing(this.pos, "unknown character");
                        } else {
                            this.error_parsing(this.pos, this.errormsg);
                        }
                    }
                }
            }
            if (this.tmpprio < 0 || this.tmpprio >= 10) {
                this.error_parsing(this.pos, 'unmatched "() or []"');
            }
            while (operstack.length > 0) {
                var tmp = operstack.pop();
                tokenstack.push(tmp);
            }
            if (noperators + 1 !== tokenstack.length) {
                this.error_parsing(this.pos, "parity");
            }
            var res = new Expression(tokenstack, object(this.ops1), object(this.ops2), object(this.functions), this.precision, this.pos);
            return res;
        },
        evaluate: function(expr, element) {
            return this.parse(expr).evaluate(element);
        },
        error_parsing: function(column, msg) {
            this.success = false;
            this.errormsg = "parse error [column " + column + "]: " + msg;
            throw new Error(this.errormsg);
        },
        addfunc: function(tokenstack, operstack, type_) {
            var operator = new Token(type_, this.tokenindex, this.tokenprio + this.tmpprio, 0, this.mode, this.meta);
            while (operstack.length > 0) {
                if (operator.prio_ <= operstack[operstack.length - 1].prio_) {
                    tokenstack.push(operstack.pop());
                } else {
                    break;
                }
            }
            operstack.push(operator);
        },
        isNumber: function() {
            var r = false;
            var str = "";
            var prec = -1;
            while (this.pos < this.expression.length) {
                var code = this.expression.charCodeAt(this.pos);
                if (code >= 48 && code <= 57 || code === 46) {
                    str += this.expression.charAt(this.pos);
                    if (prec >= 0 || code === 46) {
                        prec++;
                    }
                    this.pos++;
                    r = true;
                } else {
                    break;
                }
            }
            if (r) {
                if (prec >= 0 && (typeof this.precision === "undefined" || prec > this.precision)) {
                    this.precision = prec;
                }
                this.tokennumber = parseFloat(str);
            }
            return r;
        },
        isConst: function() {
            var str;
            for (var i in this.consts) {
                if (true) {
                    var L = i.length;
                    str = this.expression.substr(this.pos, L);
                    if (i === str) {
                        this.tokennumber = this.consts[i];
                        this.pos += L;
                        return true;
                    }
                }
            }
            return false;
        },
        isOperator: function() {
            var ch = this.expression.charAt(this.pos);
            if (ch === "+") {
                this.tokenprio = 0;
                this.tokenindex = "+";
            } else if (ch === "-") {
                this.tokenprio = 0;
                this.tokenindex = "-";
            } else if (ch === "|") {
                if (this.expression.charAt(this.pos + 1) === "|") {
                    this.pos++;
                    this.tokenprio = 0;
                    this.tokenindex = "||";
                } else {
                    return false;
                }
            } else if (ch === "*") {
                if (this.expression.charAt(this.pos + 1) === "{") {
                    return false;
                }
                this.tokenprio = 1;
                this.tokenindex = "*";
            } else if (ch === "/" && this.mode != 2 && this.pos > 0) {
                this.tokenprio = 2;
                this.tokenindex = "/";
            } else if (ch === "%") {
                this.tokenprio = 2;
                this.tokenindex = "%";
            } else if (ch === "^") {
                this.tokenprio = 3;
                this.tokenindex = "^";
            } else if (ch === "=" || ch === "!") {
                if (this.expression.charAt(this.pos + 1) === "=") {
                    if (ch === "=") {
                        this.tokenindex = "==";
                    } else if (ch === "!") {
                        this.tokenindex = "!=";
                    } else {
                        return false;
                    }
                    this.pos++;
                    this.tokenprio = 6;
                } else if (ch === "!") {
                    this.tokenprio = 7;
                    this.tokenindex = "!";
                } else if (ch === "=") {
                    this.tokenindex = "=";
                } else {
                    return false;
                }
            } else if (ch === "<") {
                if (this.expression.charAt(this.pos + 1) === "=") {
                    this.tokenindex = "<=";
                    this.pos++;
                } else {
                    this.tokenindex = "<";
                }
                this.tokenprio = 4;
            } else if (ch === ">") {
                if (this.expression.charAt(this.pos + 1) === "=") {
                    this.tokenindex = ">=";
                    this.pos++;
                } else {
                    this.tokenindex = ">";
                }
                this.tokenprio = 4;
            } else if (ch === "." || ch === "[") {
                this.tokenprio = 10;
                this.tokenindex = ".";
            } else {
                return false;
            }
            this.pos++;
            return true;
        },
        isRightBracket: function() {
            var code = this.expression.charCodeAt(this.pos);
            if (code === 93) {
                this.pos++;
                this.tmpprio -= 20;
                return true;
            }
            return false;
        },
        isSign: function() {
            var code = this.expression.charCodeAt(this.pos - 1);
            if (code === 45 || code === 43) {
                return true;
            }
            return false;
        },
        isAssign: function() {
            var code = this.expression.charCodeAt(this.pos - 1);
            if (code === 61) {
                var cha = this.expression.charAt(this.pos - 2);
                if (cha === "!" || cha === ">" || cha === "<" || cha === "=") {
                    return false;
                }
                cha = this.expression.charAt(this.pos);
                if (cha === ">" || cha === "<" || cha === "=") {
                    return false;
                }
                return true;
            }
            return false;
        },
        isPositiveSign: function() {
            var code = this.expression.charCodeAt(this.pos - 1);
            if (code === 43) {
                return true;
            }
            return false;
        },
        isNegativeSign: function() {
            var code = this.expression.charCodeAt(this.pos - 1);
            if (code === 45) {
                return true;
            }
            return false;
        },
        isLeftParenth: function() {
            var code = this.expression.charCodeAt(this.pos);
            if (code === 40) {
                this.pos++;
                this.tmpprio += 10;
                return true;
            }
            return false;
        },
        isRightParenth: function() {
            var code = this.expression.charCodeAt(this.pos);
            if (code === 41) {
                this.pos++;
                this.tmpprio -= 10;
                return true;
            }
            return false;
        },
        isLeftCurly: function() {
            var code = this.expression.charCodeAt(this.pos);
            if (code === 123) {
                this.pos++;
                this.tmpprio += 10;
                return true;
            }
            return false;
        },
        isRightCurly: function() {
            var code = this.expression.charCodeAt(this.pos);
            if (code === 125) {
                this.pos++;
                this.tmpprio -= 10;
                return true;
            }
            return false;
        },
        isComma: function() {
            var code = this.expression.charCodeAt(this.pos);
            if (code === 44) {
                this.pos++;
                this.tokenprio = -1;
                this.tokenindex = ",";
                return true;
            }
            return false;
        },
        isWhite: function() {
            var code = this.expression.charCodeAt(this.pos);
            if (code === 32 || code === 9 || code === 10 || code === 13) {
                this.pos++;
                return true;
            }
            return false;
        },
        isLeftVarBrk: function(modestack) {
            var pp = this.pos, ch = this.expression.charAt(pp);
            if (ch === "$" || ch === "@" || ch === "*" || ch === "#") {
                pp++;
                var ch2 = this.expression.charAt(pp);
                if (ch2 === "{") {
                    pp++;
                    this.tmpprio += 10;
                    this.tokenprio = -4;
                    var oldMode = this.mode;
                    modestack.push(oldMode);
                    if (ch === "$") {
                        this.mode = 1;
                    } else if (ch === "@") {
                        this.mode = 2;
                    } else if (ch === "*") {
                        this.mode = 3;
                    } else if (ch === "#") {
                        this.mode = 4;
                    }
                    this.tokenindex = "{";
                    this.pos = pp;
                    return true;
                }
            }
            return false;
        },
        isRightVarBrk: function() {
            var code = this.expression.charCodeAt(this.pos);
            if (code === 125) {
                this.pos++;
                this.tmpprio -= 10;
                return true;
            }
            return false;
        },
        isOpX: function(str, group) {
            if (str.str.length > 0) {
                if (str.str in new Object()) {
                    return false;
                }
                if (str.str in group) {
                    this.tokenindex = str.str;
                    this.tokenprio = 5;
                    this.pos = str.pos;
                    return true;
                }
            }
            return false;
        },
        isLiteralValue: function(str) {
            if (typeof str.str === "string") {
                var first = str.str.charAt(0);
                var last = str.str.charAt(str.str.length - 1);
                if (first == "'" && last == "'" || first == '"' && last == '"') {
                    this.tokennumber = str.str.substring(1, str.str.length - 1);
                    this.pos = str.pos;
                    return true;
                }
            }
            return false;
        },
        isVar: function(str) {
            if (str.str.length > 0) {
                this.tokenindex = str.str;
                this.tokenprio = 4;
                this.pos = str.pos;
                return true;
            }
            return false;
        },
        isComment: function() {
            var code = this.expression.charCodeAt(this.pos - 1);
            if (code === 47 && this.expression.charCodeAt(this.pos) === 42) {
                this.pos = this.expression.indexOf("*/", this.pos) + 2;
                if (this.pos === 1) {
                    this.pos = this.expression.length;
                }
                return true;
            }
            return false;
        }
    };
    return ThParser;
}();

(function() {
    var specAttrModList = [ "abbr", "accept", "accept-charset", "accesskey", "action", "align", "alt", "archive", "audio", "autocomplete", "axis", "background", "bgcolor", "border", "cellpadding", "cellspacing", "challenge", "charset", "cite", "class", "classid", "codebase", "codetype", "cols", "colspan", "compact", "content", "contenteditable", "contextmenu", "data", "datetime", "dir", "draggable", "dropzone", "enctype", "for", "form", "formaction", "formenctype", "formmethod", "formtarget", "frame", "frameborder", "headers", "height", "high", "href", "hreflang", "hspace", "http-equiv", "icon", "id", "keytype", "kind", "label", "lang", "list", "longdesc", "low", "manifest", "marginheight", "marginwidth", "max", "maxlength", "media", "method", "min", "name", "optimum", "pattern", "placeholder", "poster", "preload", "radiogroup", "rel", "rev", "rows", "rowspan", "rules", "sandbox", "scheme", "scope", "scrolling", "size", "sizes", "span", "spellcheck", "src", "srclang", "standby", "start", "step", "style", "summary", "tabindex", "target", "title", "type", "usemap", "value", "valuetype", "vspace", "width", "wrap", "xmlbase", "xmllang", "xmlspace" ];
    var fixedValBoolAttrList = [ "async", "autofocus", "autoplay", "checked", "controls", "declare", "default", "defer", "disabled", "formnovalidate", "hidden", "ismap", "loop", "multiple", "novalidate", "nowrap", "open", "pubdate", "readonly", "required", "reversed", "scoped", "seamless", "selected" ];
    var eventAttrList = [ "onabort", "onafterprint", "onbeforeprint", "onbeforeunload", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncontextmenu", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchanged", "onemptied", "onended", "onerror", "onfocus", "onformchange", "onforminput", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmessage", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onoffline", "ononline", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onreadystatechange", "onredo", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "onundo", "onunload", "onvolumechange", "onwaiting" ];
    var literalTokenExpr = /^[a-zA-Z0-9\[\]\.\-_]*$/;
    var numericExpr = /^[+\-]?[0-9]*?[.]?[0-9]*?$/;
    var nonURLExpr = /[\$\*#]{1}\{(?:!?[^}]*)\}/;
    var varExpr = /[\$\*#@]{1}\{(!?[^}]*)\}/;
    var textInlineCommentExpr = /\[\[(.*)\]\]/;
    var javascriptInlineCommentExpr = /\/\*\[\[(.*)\]\]\*\//;
    var javascriptInlineRemainderExpr = /\s*(?:['][^']*['])*(?:["][^"]*["])*(?:[\(][^\(\)]*[\)])*(?:[\{][^\{\}]*[\}])*(?:[\[][^\[\]]*[\]])*((?:[;,\(\)\[\]:\{\}](?=(?:\s*\/\/.*?(?:\n|$)))(?:\s*\/\/.*?(?:\n|$)))|(?:\s*\/\/.*?(?:\n|$))|(?:[;,\(\)\[\]:\{\}](?=(?:\s*(?:\n|$)))(?:\s*(?:\n|$)))|(?:\s*(?:\n|$)))/;
    var thCase;
    thymol.getThAttribute = function(part, element) {
        var result = thymol.ThUtils.unParenthesise(part);
        result = thymol.doExpression(result, element);
        if (Object.prototype.toString.call(result) === "[object Array]") {
            if (result.length === 1) {
                result = result[0];
            }
        }
        if (result instanceof thymol.ThParam) {
            result = result.value;
        }
        return result;
    };
    thymol.doExpression = function(part, element) {
        var result = thymol.ThUtils.unParenthesise(part), expr, unq, token, mapped;
        expr = null;
        unq = thymol.ThUtils.unQuote(result);
        if (unq != result) {
            result = thymol.preProcess(unq, element);
        } else {
            if (literalTokenExpr.test(result)) {
                token = thymol.booleanAndNullTokens[result];
                if (!(typeof token === "undefined")) {
                    result = token;
                } else {
                    if (result.match(numericExpr)) {
                        result = thymol.ThUtils.getToPrecision(result, thymol.ThUtils.getDecimalDigits(result));
                    } else {
                        expr = thymol.getExpression(result, element);
                        if (expr !== undefined && expr !== null && !(expr != expr)) {
                            result = expr;
                        }
                    }
                }
            } else {
                expr = thymol.getExpression(result, element);
                if (expr !== null && !(expr != expr)) {
                    result = expr;
                } else {
                    result = null;
                }
            }
        }
        return result;
    };
    thymol.processText = function(element, thUrlAttr, thAttr) {
        var url = thymol.getThAttribute(thUrlAttr.value, element), updated = false, text, newTextNode, i, iLimit, iUpper;
        if (url == null) {
            if (!thymol.allowNullText) {
                if (thymol.debug) {
                    thymol.thWindow.alert("thymol.processText cannot process: " + thUrlAttr.name + '="' + thUrlAttr.value + '"\n' + element.innerHTML);
                }
                return updated;
            }
            url = "";
        } else {
            if (url instanceof thymol.ThParam || url instanceof thymol.ThObject) {
                if (url.value) {
                    url = url.value;
                }
            } else if (url instanceof thymol.ThClass && url.abort) {
                element.removeAttribute(thUrlAttr.name);
                return true;
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
                if (Object.prototype.toString.call(url) === "[object Array]") {
                    text = "[";
                    for (i = 0, iLimit = url.length, iUpper = url.length - 1; i < iLimit; i++) {
                        text += url[i].toString();
                        if (i < iUpper) {
                            text += ", ";
                        }
                    }
                    text += "]";
                } else {
                    text = url.toString();
                }
                text = thymol.ThUtils.unescape(text);
                newTextNode = element.ownerDocument.createTextNode(text);
                element.appendChild(newTextNode);
                updated = true;
            }
            if ("utext" == thAttr.suffix) {
                element.innerHTML = url;
            }
            element.removeAttribute(thUrlAttr.name);
        } catch (err) {
            if (thymol.debug) {
                thymol.thWindow.alert("text replace error");
            }
        }
        return updated;
    };
    thymol.processSpecAttrMod = function(element, thUrlAttr, thAttrObj) {
        var url = thymol.getThAttribute(thUrlAttr.value, element);
        if (!url || !(url instanceof thymol.ThClass) || !url.abort) {
            element.setAttribute(thAttrObj.suffix, url);
        }
        element.removeAttribute(thUrlAttr.name);
    };
    thymol.processAttr = function(element, thUrlAttr, thAttrObj) {
        var argValue = thUrlAttr.value.trim(), argsExpr, expr, identifier, attrName = null, ep, lp, url, tt;
        if (argValue) {
            do {
                argsExpr = thymol.ThParser.parse(argValue, true, false);
                identifier = argsExpr.tokens.shift();
                if (identifier.type_ === 3) {
                    attrName = identifier.index_;
                    if (!!attrName) {
                        ep = argValue.indexOf("=");
                        if (ep >= 0) {
                            lp = argsExpr.position - 1;
                            if (argsExpr.position === argValue.length) {
                                lp = argValue.position;
                            }
                            expr = argValue.substring(ep + 1, lp).trim();
                            if (fixedValBoolAttrList.indexOf(attrName) >= 0) {
                                thymol.doFixedValBoolAttr(expr, element, attrName);
                            } else {
                                url = thymol.getThAttribute(expr, element);
                                tt = typeof url;
                                if (thAttrObj.suffix == "attrappend" || thAttrObj.suffix == "attrprepend") {
                                    if (url !== null && (tt === "number" || tt === "string" && url.length > 0)) {
                                        existing = element.getAttribute(attrName);
                                        if (existing) {
                                            if (thAttrObj.suffix == "attrappend") {
                                                url = existing + url;
                                            } else if (thAttrObj.suffix == "attrprepend") {
                                                url = url + existing;
                                            }
                                        }
                                    }
                                }
                                if (url !== null && (tt === "number" || tt === "string" && url.length > 0)) {
                                    element.setAttribute(attrName, url);
                                }
                            }
                        }
                    }
                    argValue = argValue.substring(argsExpr.position);
                } else {
                    break;
                }
            } while (argValue.length > 0);
        }
        element.removeAttribute(thUrlAttr.name);
    };
    thymol.processCSSAttr = function(element, thUrlAttr, thAttrObj) {
        var parts = thUrlAttr.value.split(","), i, iLimit, expr, attrName, url, tt, existing;
        for (i = 0, iLimit = parts.length; i < iLimit; i++) {
            expr = parts[i];
            attrName = thAttrObj.suffix == "classappend" ? "class" : "style";
            if (!!attrName) {
                if (!!expr) {
                    url = thymol.getThAttribute(expr, element);
                    tt = typeof url;
                    if (url !== null && (tt === "number" || tt === "string" && url.length > 0)) {
                        existing = element.getAttribute(attrName);
                        if (existing) {
                            url = existing + " " + url;
                        }
                    }
                    if (url !== null && (tt === "number" || tt === "string" && url.length > 0)) {
                        element.setAttribute(attrName, url);
                    }
                }
            }
        }
        element.removeAttribute(thUrlAttr.name);
    };
    thymol.processFixedValBoolAttr = function(element, thUrlAttr, thAttrObj) {
        var val = thymol.doFixedValBoolAttr(thUrlAttr.value, element, thAttrObj.suffix);
        if (val != null) {
            element.removeAttribute(thUrlAttr.name);
        } else {
            if (thymol.debug) {
                thymol.thWindow.alert("thymol.processFixedValBoolAttr cannot process: " + thUrlAttr.name + '="' + thUrlAttr.value + '"\n' + element.innerHTML);
            }
        }
    };
    thymol.doFixedValBoolAttr = function(valParam, element, attr) {
        var val = thymol.getBoolean(valParam, element);
        if (val) {
            element.setAttribute(attr, attr);
        }
        return val;
    };
    thymol.processPairedAttr = function(element, thUrlAttr, thAttrObj) {
        var url = thymol.getThAttribute(thUrlAttr.value, element);
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
        } else {
            if (thymol.debug) {
                thymol.thWindow.alert("thymol.processPairedAttr cannot process: " + thUrlAttr.name + '="' + thUrlAttr.value + '"\n' + element.innerHTML);
            }
        }
    };
    thymol.processConditional = function(element, attr, thAttrObj) {
        var removed = false;
        if (attr.value) {
            removed = thymol.doIfOrUnless(element, attr.value, thAttrObj.suffix === "if");
        }
        element.removeAttribute(attr.name);
        return removed;
    };
    thymol.doIfOrUnless = function(element, value, isIf) {
        var processed = false, flag;
        if (value) {
            flag = thymol.getBoolean(value, element);
            processed = true;
            if (!flag) {
                if (isIf) {
                    element.parentNode.removeChild(element);
                    return true;
                }
            } else {
                if (!isIf) {
                    element.parentNode.removeChild(element);
                    return true;
                }
            }
        }
        if (!processed && thymol.debug) {
            thymol.thWindow.alert("thymol.processConditional cannot process conditional: " + value + "\n" + element.innerHTML);
        }
        return false;
    };
    thymol.processEach = function(element, thUrlAttr, junk) {
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
                } else {
                    statVarName = varName + "Stat";
                }
                expr = initial.substr(colonPos + 1);
                if (expr) {
                    expr = expr.trim();
                    expr = thymol.getExpression(expr, element);
                    if (expr instanceof thymol.ThSet) {
                        expr = expr.toArray();
                    }
                    root = element.parentNode;
                    if (expr && expr instanceof Object && expr.length > 0) {
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
                            } else {
                                stat.first = false;
                            }
                            if (i == expr.length - 1) {
                                stat.last = true;
                            } else {
                                stat.last = false;
                            }
                            if (i % 2) {
                                stat.odd = true;
                                stat.even = false;
                            } else {
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
                                } else {
                                    next = root.appendChild(newNode);
                                }
                                node = next;
                                elementsUpdated = true;
                            }
                        }
                    } else {
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
    thymol.processObject = function(element, thUrlAttr) {
        var argValue = thUrlAttr.value.trim(), val;
        if (argValue) {
            val = thymol.getExpression(argValue, element);
            if (val) {
                element.thObjectVar = val;
            }
        }
        element.removeAttribute(thUrlAttr.name);
    };
    thymol.processInline = function(element, thUrlAttr, thAttrObj) {
        var mode = thymol.getThAttribute(thUrlAttr.value, element);
        if (mode == "text") {
            thymol.doInlineText(element);
        } else if (mode == "javascript" || mode == "dart") {
            thymol.doInlineJavascript(element);
        } else {
            if (thymol.debug) {
                thymol.thWindow.alert('thymol.processInline cannot process scripting mode: "' + mode + '" - it isn\'t supported by version "' + thymol.thVersion + '"\n');
            }
        }
        element.removeAttribute(thUrlAttr.name);
    };
    thymol.doInlineText = function(element) {
        var changed, value, i, iLimit, expr, term, result;
        for (i = 0, iLimit = element.childNodes.length; i < iLimit; i++) {
            do {
                changed = false;
                if (element.childNodes[i].nodeType == 1) {
                    thymol.doInlineText(element.childNodes[i]);
                } else if (element.childNodes[i].nodeType == 3) {
                    value = element.childNodes[i].nodeValue;
                    if (value) {
                        expr = textInlineCommentExpr.exec(value);
                        if (expr) {
                            term = "";
                            if (expr.length > 1) {
                                term = "[[" + expr[1] + "]]";
                            }
                            if (expr.length > 1) {
                                result = thymol.getThAttribute(expr[1], element);
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
    thymol.doInlineJavascript = function(element) {
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
                            if (result instanceof thymol.ThObject) {
                                result = result.toNonThObject();
                            }
                            if (!thymol.ThUtils.isLiteral(result)) {
                                result = thymol.getStringView(result);
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
    thymol.getStringView = function(param) {
        var view = "", objType;
        if (typeof param === "string") {
            view = view + "'" + param + "'";
        } else if (typeof param === "number" || typeof param === "boolean") {
            view = view + param;
        } else if (typeof param === "object") {
            if (param instanceof Object) {
                objType = Object.prototype.toString.call(param);
                if ("[object Array]" == objType) {
                    view = thymol.getStringViewArray(param);
                } else if ("[object Object]" == objType) {
                    view = thymol.getStringViewObject(param);
                }
            }
        }
        return view;
    };
    thymol.getStringViewArray = function(param) {
        var view = "[", i, iLimit;
        for (i = 0, iLimit = param.length; i < iLimit; i++) {
            view = view + thymol.getStringView(param[i]);
            if (i < param.length - 1) {
                view = view + ",";
            }
        }
        view = view + "]";
        return view;
    };
    thymol.getStringViewObject = function(param) {
        var view = "{", key = null;
        for (key in param) {
            if (key) {
                if (view != "{") {
                    view = view + ",";
                }
                view = view + thymol.getStringView(key) + ":";
                view = view + thymol.getStringView(param[key]);
            }
        }
        view = view + "}";
        return view;
    };
    thymol.processRemove = function(element, thUrlAttr) {
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
        arg = thymol.getThAttribute(thUrlAttr.value, element);
        element.thLocalVars = savedLocals;
        element.removeAttribute(thUrlAttr.name);
        if ("all" == arg) {
            if (element.parentNode != null) {
                element.parentNode.removeChild(element);
                haveRemoved = true;
            }
        } else if ("body" == arg) {
            element.innerHTML = "";
            haveRemoved = true;
        } else if ("tag" == arg) {
            thymol.ThUtils.removeTag(element);
            haveRemoved = true;
        } else if ("all-but-first" == arg) {
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
        } else if ("none" == arg || null == arg) {}
        return haveRemoved;
    };
    thymol.processSwitch = function(element, attr) {
        var val = thymol.ThUtils.unParenthesise(attr.value), updated = false, args, matched = false, thCaseSpecs, caseClause, remove, ccAttr;
        val = thymol.getThAttribute(val, element);
        if (typeof val === "string") {
            args = val.match(nonURLExpr);
            if (args) {
                val = args[1];
            }
        }
        val = thymol.ThUtils.unQuote(val);
        thCaseSpecs = $(thCase.escpName, element);
        thCaseSpecs.each(function() {
            caseClause = this;
            remove = true;
            $(caseClause.attributes).each(function() {
                ccAttr = this;
                if (thCase.name == ccAttr.name || thCase.synonym == ccAttr.name) {
                    if (!matched) {
                        matched = thymol.processCase(element, ccAttr, val);
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
    thymol.processCase = function(element, attr, param) {
        var val = thymol.substitute(attr.value, element);
        val = thymol.ThUtils.unQuote(val);
        if (val == "*" || param && param == val) {
            return true;
        }
        return false;
    };
    thymol.processWith = function(element, thUrlAttr) {
        thymol.getWith(element, thUrlAttr.value);
        element.removeAttribute(thUrlAttr.name);
    };
    thymol.processAssert = function(element, thUrlAttr) {
        var argValue = thUrlAttr.value.trim(), result = true, term = "", terms, i, iLimit, expr, val, flag;
        if (argValue) {
            terms = argValue.split(",");
            for (i = 0, iLimit = terms.length; i < iLimit; i++) {
                term = terms[i];
                expr = thymol.ThUtils.unParenthesise(term);
                if (expr != null) {
                    val = thymol.getExpression(expr, element);
                    if (val) {
                        flag = thymol.getBoolean(val, element);
                        if (!flag) {
                            result = false;
                            break;
                        }
                    } else {
                        result = false;
                        break;
                    }
                } else {
                    result = false;
                    break;
                }
            }
        }
        if (!result) {
            if (argValue != term) {
                argValue = " list is: " + argValue;
            } else {
                argValue = "";
            }
            if (term != "") {
                term = ' false term is: "' + term + '"';
            }
            if (thymol.debug) {
                thymol.thWindow.alert("thymol.processAssert assertion failure -" + argValue + term + "\n");
            }
        }
        element.removeAttribute(thUrlAttr.name);
    };
    thymol.processFragment = function(element, thUrlAttr, thAttrObj) {
        element.removeAttribute(thUrlAttr.name);
    };
    thymol.getBoolean = function(param, element) {
        if (param == null) {
            return false;
        }
        if (typeof param === "boolean") {
            return param;
        } else if (typeof param === "number") {
            return param != 0;
        }
        var initial = thymol.ThUtils.unParenthesise(param), negate = false, val, args, flag;
        if (initial.charAt(0) == "!") {
            negate = true;
            initial = initial.substring(1, initial.length);
            initial = thymol.ThUtils.unParenthesise(initial);
        }
        val = thymol.getThAttribute(initial, element);
        if (val == null) {
            args = initial.match(varExpr);
            if (args) {
                if (args[1].charAt(0) == "!") {
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
    thymol.appendToAttrList = function(func, prec, attrArray) {
        var j, jLimit = attrArray.length, tha = null;
        for (j = 0; j < jLimit; j++) {
            tha = new thymol.ThAttr(attrArray[j], func, prec, thymol.thThymeleafPrefixList, thymol.prefix);
        }
        j = tha;
    };
    thymol.setupAttrList = function() {
        thCase = new thymol.ThAttr("case", null, 275, thymol.thThymeleafPrefixList, thymol.prefix);
        thymol.addDialect({
            prefix: thymol.prefix,
            attributeProcessors: [ {
                name: "each",
                processor: thymol.processEach,
                precedence: 200
            }, {
                name: "switch",
                processor: thymol.processSwitch,
                precedence: 250
            }, {
                name: "if",
                processor: thymol.processConditional,
                precedence: 300
            }, {
                name: "unless",
                processor: thymol.processConditional,
                precedence: 400
            }, {
                name: "object",
                processor: thymol.processObject,
                precedence: 500
            }, {
                name: "with",
                processor: thymol.processWith,
                precedence: 600
            }, {
                name: "attr",
                processor: thymol.processAttr,
                precedence: 700
            }, {
                name: "attrprepend",
                processor: thymol.processAttr,
                precedence: 800
            }, {
                name: "attrappend",
                processor: thymol.processAttr,
                precedence: 900
            }, {
                name: "alt-title",
                processor: thymol.processPairedAttr,
                precedence: 990
            }, {
                name: "lang-xmllang",
                processor: thymol.processPairedAttr,
                precedence: 990
            }, {
                name: "inline",
                processor: thymol.processInline,
                precedence: 1e3
            }, {
                name: "classappend",
                processor: thymol.processCSSAttr,
                precedence: 1100
            }, {
                name: "styleappend",
                processor: thymol.processCSSAttr,
                precedence: 1100
            }, {
                name: "text",
                processor: thymol.processText,
                precedence: 1300
            }, {
                name: "utext",
                processor: thymol.processText,
                precedence: 1400
            }, {
                name: "fragment",
                processor: thymol.processFragment,
                precedence: 1500
            }, {
                name: "assert",
                processor: thymol.processAssert,
                precedence: 1550
            }, {
                name: "remove",
                processor: thymol.processRemove,
                precedence: 1600
            } ]
        });
        thymol.appendToAttrList(thymol.processSpecAttrMod, 1e3, specAttrModList);
        thymol.appendToAttrList(thymol.processSpecAttrMod, 1e3, eventAttrList);
        thymol.appendToAttrList(thymol.processFixedValBoolAttr, 1e3, fixedValBoolAttrList);
    };
})();

thymol.objects.thHttpSessionObject = function() {
    var thExpressionObjectName = "#httpSession";
    function getAttribute(name) {
        var result = thymol.sessionContext[name];
        return result;
    }
    function getParameter(name) {
        var result = thymol.sessionContext[name];
        return result;
    }
    function getServletContext() {
        var result = thymol.applicationContext;
        return result;
    }
    function getSessionContext() {
        var result = thymol.sessionContext;
        return result;
    }
    function getContextPath() {
        var result = "";
        return result;
    }
    function getRequestName() {
        var result = "";
        return result;
    }
    function getParameterValues(name) {
        var result = thymol.sessionContext[name];
        return result;
    }
    return {
        thExpressionObjectName: thExpressionObjectName,
        getAttribute: getAttribute,
        getParameter: getParameter,
        getServletContext: getServletContext,
        getSessionContext: getSessionContext,
        getContextPath: getContextPath,
        getRequestName: getRequestName,
        getParameterValues: getParameterValues
    };
}();

thymol.objects.thHttpServletRequestObject = function() {
    var thExpressionObjectName = "#httpServletRequest";
    function getAttribute(name) {
        var result = thymol.requestContext[name][0];
        if (result instanceof thymol.ThParam) {
            result = thymol.ThUtils.unQuote(result.value);
        }
        return result;
    }
    function getParameter(name) {
        var result = thymol.requestContext[name];
        return result;
    }
    function getContextPath() {
        var result = "";
        return result;
    }
    function getRequestName() {
        var result = "";
        return result;
    }
    function getParameterValues(name) {
        var result = thymol.requestContext[name];
        return result;
    }
    function getSession(create) {
        return thymol.objects.thHttpSessionObject;
    }
    return {
        thExpressionObjectName: thExpressionObjectName,
        getAttribute: getAttribute,
        getParameter: getParameter,
        getContextPath: getContextPath,
        getRequestName: getRequestName,
        getParameterValues: getParameterValues,
        getSession: getSession
    };
}();

(function() {
    var DOMParser_proto = thymol.thDomParser.prototype, real_parseFromString = DOMParser_proto.parseFromString;
    try {
        if (new thymol.thDomParser().parseFromString("", "text/html")) {
            return;
        }
    } catch (ignore) {}
    DOMParser_proto.parseFromString = function(markup, type) {
        var res, doc;
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            doc = thymol.thDocument.implementation.createHTMLDocument("");
            if (markup.toLowerCase().indexOf("<!doctype") > -1) {
                doc.documentElement.innerHTML = markup;
            } else {
                doc.body.innerHTML = markup;
            }
            res = doc;
        } else {
            res = real_parseFromString.apply(this, arguments);
        }
        return res;
    };
})();

if (!Array.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = start || 0; i < this.length; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}

$(function() {
    thymol.jqSetup($);
    thymol.execute(document);
});

$(window).unload(function() {
    if (thymol.sessionContext && thymol.sessionContext.persist) {
        thymol.sessionContext.persist();
    }
});