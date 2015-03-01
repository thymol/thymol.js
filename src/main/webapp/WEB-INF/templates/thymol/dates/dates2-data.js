    thDebug = true;
        thymol.ready(function () {
          thymol.configurePreExecution( function() {
                thymol.applicationContext.createVariable("twodate", thymol.objects.thDatesObject.create(1732,10,12) );
          });
        });                
