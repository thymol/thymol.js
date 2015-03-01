    thDebug = true;
        thymol.ready(function () {
          thymol.configurePreExecution( function() {
                thymol.applicationContext.createVariable("twocalendar", thymol.objects.thDatesObject.create(1732,10,12) );
          });
        });                
