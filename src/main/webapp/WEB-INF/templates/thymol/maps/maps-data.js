thDebug = true;

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var ar1 = [ 1, 3, 57, 99 ];
		var ar2 = [ new Number(1.1), new Number(3.3), new Number(57.57), new Number(99.99) ];
		var ar3 = [ "1", "3", "57", "99" ].sort();
		var ar4 = [ new String("1"), new String("3"), new String("57"), new String("99") ].sort();
		var ar5 = [ "one", "three", "fifty-seven", "ninety-nine" ].sort();

		thymol.applicationContext.createVariable("ar1", ar1 );
		thymol.applicationContext.createVariable("ar2", ar2 );
		thymol.applicationContext.createVariable("ar3", ar3 );
		thymol.applicationContext.createVariable("ar4", ar4 );
		thymol.applicationContext.createVariable("ar5", ar5 );
			
		var tm1 = new ThMap();
		tm1.put("ar1",ar1);
		tm1.put("ar2",ar2);
		tm1.put("ar3",ar3);
		tm1.put("ar4",ar4);
		
		thymol.applicationContext.createVariable("tm1", tm1 );
		
		var ka1 = ["ar1","ar2","ar3","ar4"];
		thymol.applicationContext.createVariable("ka1", ka1 );
	    
		var va1 = [ar1,ar2,ar3,ar4];
		thymol.applicationContext.createVariable("va1", va1 );
	    
		var ks1 = new ThSet();
		ks1.add("ar1");
		ks1.add("ar2");
		ks1.add("ar3");
		ks1.add("ar4");
		thymol.applicationContext.createVariable("ks1", ks1 );
	    
		var vs1 = new ThSet();
		vs1.add(ar1);
		vs1.add(ar2);
		vs1.add(ar3);
		vs1.add(ar4);
		thymol.applicationContext.createVariable("vs1", vs1 );
	    
		var ka2 = ["ar1","ar2","ar3","ar4","ar5"];
		thymol.applicationContext.createVariable("ka2", ka2 );
	   
		var va2 = [ar1,ar2,ar3,ar4,ar5];
		thymol.applicationContext.createVariable("va2", va2 );
		
		var ks2 = new ThSet();
		ks2.add("ar1");
		ks2.add("ar2");
		ks2.add("ar3");
		ks2.add("ar4");
		ks2.add("ar5");
		thymol.applicationContext.createVariable("ks2", ks2 );
	    
		var vs2 = new ThSet();
		vs2.add(ar1);
		vs2.add(ar2);
		vs2.add(ar3);
		vs2.add(ar4);
		vs2.add(ar5);
		thymol.applicationContext.createVariable("vs2", vs2 );
	    
		var ka3 = ["ar1","ar2","ar3"];
		thymol.applicationContext.createVariable("ka3", ka3 );
	    
		var va3 = [ar1,ar2,ar3];
		thymol.applicationContext.createVariable("va3", va3 );
	    
		var ks3 = new ThSet();
		ks3.add("ar1");
		ks3.add("ar2");
		ks3.add("ar3");
		thymol.applicationContext.createVariable("ks3", ks3 );
	    
		var vs3 = new ThSet();
		vs3.add(ar1);
		vs3.add(ar2);
		vs3.add(ar3);
		thymol.applicationContext.createVariable("vs3", vs3 );
	    
		var tm2 = new ThSet();
		tm2.add(ar1);
		tm2.add(ar2);
		tm2.add(ar3);
		tm2.add(ar4);
		
		thymol.applicationContext.createVariable("tm2", tm2 );
	    
		var tm3 = new ThMap();
		tm3.put("ar1",ar1);
		tm3.put("ar2",ar2);
		tm3.put("ar3",ar1);
		tm3.put("ar4",null);
		
		thymol.applicationContext.createVariable("tm3", tm3 );

		var tm4 = new Object();
		tm4["ar1"] = ar1;
		tm4["ar2"] = ar2;
		tm4["ar3"] = ar3;
		tm4["ar4"] = ar4;
		
		thymol.applicationContext.createVariable("tm4", tm4 );

		var tm5 = new ThMap();
		thymol.applicationContext.createVariable("tm5", tm5 );
	});
});