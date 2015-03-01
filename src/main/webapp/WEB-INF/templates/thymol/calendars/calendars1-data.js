    thDebug = true;
      thymol.ready(function () {
        thymol.configurePreExecution( function() {
              thymol.applicationContext.createVariable("onecalendar", thymol.objects.thDatesObject.create(1992,10,12) );
              thymol.applicationContext.createVariable("twocalendar", thymol.objects.thDatesObject.create(1732,10,12) );
        });
      });                                
