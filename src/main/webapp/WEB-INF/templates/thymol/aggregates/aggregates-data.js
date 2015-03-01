thDebug = true;
	
thymol.ready(function () {
	thymol.configurePreExecution( function() {
			var ar1 = [ 1, 3, 57, 99 ];
			var ar2 = [ new Number(1.1), new Number(3.3), new Number(57.57), new Number(99.99) ];
	
			var ar9 = [ 1, 3, 99 ];
			var ar10 = [ 1, 3, 57, 99, 101 ];
	
			var ar13 = [ 1, 57, 3, 57, 99 ].sort();
			var ar14 = [ new Number(1.1), new Number(3.3), new Number(57.57), new Number(3.3), new Number(99.99) ];
				
			thymol.applicationContext.createVariable("ar1", ar1 );
			thymol.applicationContext.createVariable("ar2", ar2 );
	
			thymol.applicationContext.createVariable("ar9", ar9 );
			thymol.applicationContext.createVariable("ar10", ar10 );
	
			thymol.applicationContext.createVariable("ar13", ar13);
			thymol.applicationContext.createVariable("ar14", ar14);
	
			thymol.applicationContext.createVariable("as1", thymol.ThSet.prototype.fromArray(ar1) );    
			thymol.applicationContext.createVariable("as2", thymol.ThSet.prototype.fromArray(ar2) );    
	
			thymol.applicationContext.createVariable("as9", thymol.ThSet.prototype.fromArray(ar9) );
			thymol.applicationContext.createVariable("as10", thymol.ThSet.prototype.fromArray(ar10) );
	
			thymol.applicationContext.createVariable("as13", thymol.ThSet.prototype.fromArray(ar13) );
			thymol.applicationContext.createVariable("as14", thymol.ThSet.prototype.fromArray(ar14) );
		});
});



