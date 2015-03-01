var thDebug = true;
var thLocale = "en_GB";

var  thMessages = [
            ["msg01",    "Hello!"],
            ["msg02",    "Hello {0}!"],
            ["msg03",    "Hello {0}, welcome to planet {1}!"],
            ["msg04",    "Hello {0} and {1}, welcome to planet {2}!"],            
            ["msg05",    "My friend {0}, comes from {1} and likes to eat {2}."],
            ["msg06",    null],
            ["msg07",    "We went to {1} to meet with {0} and share some {2}."]
    ];

var  thVars = [
           ["var01",    "John Apricot"],
           ["var02",    "John Apricot" + " Jr."],
           ["var03",    "Saturn"],                                                           
           ["var04",    "#[#var01]"],
           ["var05",    "#[#var01,#var02]"],
           ["var06",    "#[#var01,#var02,#var03]"],
           
           ["var07",    "#['Joe Bloggs','Grimsby','fish']"],                                                           
           ["var08",    "#['Marie-Antoinette','France','cake']"],                                                           
           ["var09",    "#['Wallace','62 West Wallaby Street','cheese']"],                                                           
           ["var10",    "#['Mr. C. Monster','Sesame Street','cookies']"],
           
           ["msgArray1",   "#['msg05','msg06','msg07']"],            
           ["msgList1",    "#['msg05','msg06','msg07']"]            
           
    ];

thymol.ready(function () {
	thymol.configurePreExecution( function() {
		var msgArray1 = thymol.applicationContext["msgArray1"];
		var msgSet1 = thymol.ThSet.prototype.fromArray(msgArray1);
	    thymol.applicationContext.createVariable("msgSet1", msgSet1 );
	});
});






