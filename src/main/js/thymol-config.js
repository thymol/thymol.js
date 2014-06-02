thObjectsConfigureModules = function() {
    thymol.addDialect({
    	objects: [
			{object: thymol.objects.thAggregatesObject},
			{object: thymol.objects.thArraysObject},
			{object: thymol.objects.thBoolsObject},
			{object: thymol.objects.thDatesObject},
			{object: thymol.objects.thCalendarsObject},
			{object: thymol.objects.thIdsObject},
			{object: thymol.objects.thListsObject},
			{object: thymol.objects.thMapsObject},
			{object: thymol.objects.thMessagesObject},
			{object: thymol.objects.thNumbersObject},
			{object: thymol.objects.thObjectsObject},
			{object: thymol.objects.thSetsObject},
			{object: thymol.objects.thStringsObject}
	   	 ]
	   });
};

$(function() {
	thymol.configureModule(thymol.objects.thHttpServletRequestObject);
	thymol.configureModule(thymol.objects.thHttpSessionObject);
	if (typeof thObjectsConfigureModules !== "undefined") {
		thObjectsConfigureModules();
	}
	var scripts = document.getElementsByTagName("script");
	for (var i = 0, iLimit = scripts.length; i < iLimit; i++) {
		var parameters = scripts[i].getAttribute("data-thymol-load");
		if (!!parameters) {
			var splits = parameters.split(",");
			for (var j = 0, jLimit = splits.length; j < jLimit; j++) {
				ThUtils.loadScript(splits[j]);
			}
		}
	}
	thymol.init();
});