//thRoot = "/";
//thMappings = [
//      ["/image",    "/image"]
//];
//thExtendedMapping = true;
thymol.ready(function () {
  thymol.configurePreExecution( function() {
    thymol.applicationContext.createVariable("images_paths", thymol.objects.thListsObject.toList([ "path_image_one", "path_image_two" ]) );
  });
});