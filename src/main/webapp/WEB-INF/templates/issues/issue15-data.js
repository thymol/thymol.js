thDebug = true;

thymol.configurePreExecution( function() {
  thymol.applicationContext.createVariable("tplName", "Fish" );
  thymol.applicationContext.createVariable("tplName2", "Fowl" );
});
