thDebug = true;
thymol.ready(function () {
  thymol.configurePreExecution( function() {    
    if (!thymol.objects.thIdsObject.thLocalVars) {
      thymol.objects.thIdsObject.thLocalVars = [];
    }
    if (!thymol.objects.thIdsObject.thLocalVars["thIdCounts"]) {
      thymol.objects.thIdsObject.thLocalVars["thIdCounts"] = [];
    }
    thymol.objects.thIdsObject.thLocalVars["thIdCounts"]["thing"] = 0;
  });
});