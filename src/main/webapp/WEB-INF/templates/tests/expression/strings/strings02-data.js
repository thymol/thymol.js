thymol.ready(function () {
  thymol.configurePreExecution( function() {
    thymol.applicationContext.createVariable("anotherOney", "one");
    thymol.applicationContext.createVariable("anotherOne2y", "oneone");
    thymol.applicationContext.createVariable("anotherTwoy", "TWO");
    thymol.applicationContext.createVariable("anully", null);
  });
});                
