thymol.thObjectsConfigureModules = function() {
  thymol.addDialect( {
    objects: [
      thymol.objects.thAggregatesObject,
      thymol.objects.thArraysObject,
      thymol.objects.thBoolsObject,
      thymol.objects.thDatesObject,
      thymol.objects.thCalendarsObject,
      thymol.objects.thIdsObject,
      thymol.objects.thListsObject,
      thymol.objects.thMapsObject,
      thymol.objects.thMessagesObject,
      thymol.objects.thNumbersObject,
      thymol.objects.thObjectsObject,
      thymol.objects.thSetsObject,
      thymol.objects.thStringsObject
    ]
  } );
};