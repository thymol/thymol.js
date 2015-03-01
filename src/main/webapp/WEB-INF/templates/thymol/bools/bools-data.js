thDebug = true;

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var fred;
		var bx1 = new thymol.ThParam("Hello world!");
		var bx2 = new String("Hole mundo");
		var bx3 = "Bonjour tout le monde!";
		var bx4 = new Number(28.2743334/9);
		var bx5 = 1;
		var bx6 = 0;
		var bxArray = [bx1,null,fred,bx4,bx5,bx6];
	    thymol.applicationContext.createVariable("bx1", bx1 );
	    thymol.applicationContext.createVariable("bx2", bx2 );
	    thymol.applicationContext.createVariable("bx3", bx3 );
	    thymol.applicationContext.createVariable("bx4", bx4 );
	    thymol.applicationContext.createVariable("bx5", bx5 );
	    thymol.applicationContext.createVariable("bx6", bx6 );
	    thymol.applicationContext.createVariable("bxArray", bxArray );
	    thymol.applicationContext.createVariable("bxSet", thymol.ThSet.prototype.fromArray(bxArray) );    

		var bx2Array = [true,true,true,true];
	    thymol.applicationContext.createVariable("bx2Array", bx2Array );
	    thymol.applicationContext.createVariable("bx2Set", thymol.ThSet.prototype.fromArray(bx2Array) );    

		var bx3Array = [false,false,false,false];
	    thymol.applicationContext.createVariable("bx3Array", bx3Array );
	    thymol.applicationContext.createVariable("bx3Set", thymol.ThSet.prototype.fromArray(bx3Array) );    
	});
});