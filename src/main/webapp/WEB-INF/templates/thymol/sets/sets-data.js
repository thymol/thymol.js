thDebug = true;

var intOrder = function(a,b) {
  return a - b;
};

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var ar1 = [ 1, 3, 57, 99 ];
		var ar2 = [ new Number(1.1), new Number(3.3), new Number(57.57), new Number(99.99) ];
		var ar3 = [ "1", "3", "57", "99" ].sort();
		var ar4 = [ new String("1"), new String("3"), new String("57"), new String("99") ].sort();
		var ar5 = [ "one", "three", "fifty-seven", "ninety-nine" ].sort();
		var ar6 = [ new String("one"), new String("three"), new String("fifty-seven"), new String("ninety-nine") ].sort();
		var ar7 = [ false, true, false, true ];

		var ar8 = [];

		var ar9 = [ 1, 3, 99 ];
		var ar10 = [ 1, 3, 57, 99, 101 ];
		
		var ar11 = [ "one", "three", "ninety-nine" ].sort();
		var ar12 = [ "one", "three", "fifty-seven", "ninety-nine", "one-hundred-and-one" ].sort();

		var ar13 = [ 1, 57, 3, 57, 99 ].sort();
		var ar14 = [ new Number(1.1), new Number(3.3), new Number(57.57), new Number(3.3), new Number(99.99) ];
		var ar15 = [ "1", "99", "3", "57", "99" ].sort();
		var ar16 = [ new String("1"), new String("3"), new String("57"), new String("99"), new String("1") ].sort();
		var ar17 = [ "one", "three", "three", "three", "fifty-seven", "fifty-seven", "ninety-nine" ].sort();
		
		
		thymol.applicationContext.createVariable("ar1", ar1 );
		thymol.applicationContext.createVariable("ar2", ar2 );
		thymol.applicationContext.createVariable("ar3", ar3 );
		thymol.applicationContext.createVariable("ar4", ar4 );
		thymol.applicationContext.createVariable("ar5", ar5 );
		thymol.applicationContext.createVariable("ar6", ar6 );
		thymol.applicationContext.createVariable("ar7", ar7 );
		thymol.applicationContext.createVariable("ar8", ar8 );
	    
		thymol.applicationContext.createVariable("ar9", ar9 );
		thymol.applicationContext.createVariable("ar10", ar10 );
		thymol.applicationContext.createVariable("ar11", ar11 );
		thymol.applicationContext.createVariable("ar12", ar12);
	    
		thymol.applicationContext.createVariable("ar13", ar13);
		thymol.applicationContext.createVariable("ar14", ar14);
		thymol.applicationContext.createVariable("ar15", ar15);
		thymol.applicationContext.createVariable("ar16", ar16);
		thymol.applicationContext.createVariable("ar17", ar17);
	    
		thymol.applicationContext.createVariable("ar1List", ar1 );	
		thymol.applicationContext.createVariable("ar5List", ar5 );
		thymol.applicationContext.createVariable("ar6List", ar6 );
		thymol.applicationContext.createVariable("ar8List", ar8 );		
		thymol.applicationContext.createVariable("ar9List", ar9 );
		thymol.applicationContext.createVariable("ar10List", ar10 );
		thymol.applicationContext.createVariable("ar11List", ar11 );
		thymol.applicationContext.createVariable("ar12List", ar12 );
		
		thymol.applicationContext.createVariable("ar13List", ar13 );
		thymol.applicationContext.createVariable("ar14List", ar14 );
		thymol.applicationContext.createVariable("ar15List", ar15 );
		thymol.applicationContext.createVariable("ar16List", ar16 );
		thymol.applicationContext.createVariable("ar17List", ar17 );	
		
	    thymol.applicationContext.createVariable("as1", ThSet.prototype.fromArray(ar1) );    
	    thymol.applicationContext.createVariable("as2", ThSet.prototype.fromArray(ar2) );    
	    thymol.applicationContext.createVariable("as3", ThSet.prototype.fromArray(ar3) );    
	    thymol.applicationContext.createVariable("as4", ThSet.prototype.fromArray(ar4) );    
	    thymol.applicationContext.createVariable("as5", ThSet.prototype.fromArray(ar5) );    
	    thymol.applicationContext.createVariable("as6", ThSet.prototype.fromArray(ar6) );
	    thymol.applicationContext.createVariable("as7", ThSet.prototype.fromArray(ar7) );

	    thymol.applicationContext.createVariable("as8", ThSet.prototype.fromArray(ar8) );
	    
	    thymol.applicationContext.createVariable("as9", ThSet.prototype.fromArray(ar9) );
	    thymol.applicationContext.createVariable("as10", ThSet.prototype.fromArray(ar10) );
	    thymol.applicationContext.createVariable("as11", ThSet.prototype.fromArray(ar11) );
	    thymol.applicationContext.createVariable("as12", ThSet.prototype.fromArray(ar12) );

	    thymol.applicationContext.createVariable("as13", ThSet.prototype.fromArray(ar13) );
	    thymol.applicationContext.createVariable("as14", ThSet.prototype.fromArray(ar14) );
	    thymol.applicationContext.createVariable("as15", ThSet.prototype.fromArray(ar15) );
	    thymol.applicationContext.createVariable("as16", ThSet.prototype.fromArray(ar16) );
	    thymol.applicationContext.createVariable("as17", ThSet.prototype.fromArray(ar17) );
	    
	    var ao1 = new Object();
	    ao1["one"] = ar1;
	    ao1[2] = "two";
	    thymol.applicationContext.createVariable("ao1", ao1 );

	    thymol.applicationContext.createVariable("intOrder", intOrder );
	});
});