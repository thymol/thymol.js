$(function() {
	thymol.configureModule(thymol.objects.thHttpServletRequestObject);
	thymol.configureModule(thymol.objects.thHttpSessionObject);
	if (typeof thymol.thObjectsConfigureModules !== "undefined") {
		thymol.thObjectsConfigureModules();
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