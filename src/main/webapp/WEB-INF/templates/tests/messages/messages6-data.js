var thDebug = true;

var thMessages = [
                  ["msg01",    "Hello!"],
                  ["msg02",    "Hello {0}!"],
                  ["msg03",    "Hello {0}, welcome to planet {1}!"],
                  ["msg04",    "Hello {0}, welcome to planet {1}!"]
          ];

thMessages["en_US"] = [
                  ["msg01",    "Howdy!"],
                  ["msg02",    "Howdy {0}!"],
                  ["msg03",    "Howdy {0}, welcome to planet {1}!"]            
          ];

var  thVars = [
           ["var01",    "John Apricot"],
           ["var02",    "John Apricot" + " Jr."],
           ["var03",    "Saturn"],
           ["value02",   true ],
           ["value01",   false ]
           //,                                                           
//           ["var04",    "#[#var01]"],
//           ["var05",    "#[#var01,#var02]"],
//           ["var06",    "#[#var01,#var02,#var03]"],
//           
//           ["var07",    "#['Joe Bloggs','Grimsby','fish']"],                                                           
//           ["var08",    "#['Marie-Antoinette','France','cake']"],                                                           
//           ["var09",    "#['Wallace','62 West Wallaby Street','cheese']"],                                                           
//           ["var10",    "#['Mr. C. Monster','Sesame Street','cookies']"],
//           
//           ["msgArray1",   "#['msg05','msg06','msg07']"],            
//           ["msgList1",    "#['msg05','msg06','msg07']"]            
//           
    ];

//thymol.ready(function () {
//	thymol.configurePreExecution( function() {
//		var msgArray1 = thymol.applicationContext["msgArray1"];
//		var msgSet1 = ThSet.prototype.fromArray(msgArray1);
//	    thymol.applicationContext.createVariable("msgSet1", msgSet1 );
//	});
//});
