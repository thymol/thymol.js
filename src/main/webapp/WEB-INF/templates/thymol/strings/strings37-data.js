thymol.ready(function () {
  thymol.configurePreExecution( function() {
    var target = '<stuff>hello world!</stuff>';
    var before = ['&',' '];
    var after = ['%26','+'];
    thymol.applicationContext.createVariable("target", target );
    thymol.applicationContext.createVariable("before", before );
    thymol.applicationContext.createVariable("after", after );
  });
});