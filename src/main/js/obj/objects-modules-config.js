thymol.thObjectsConfigureModules = function() {
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