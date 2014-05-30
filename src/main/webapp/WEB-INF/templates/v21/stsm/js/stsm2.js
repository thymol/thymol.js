
var  thVarsStsm2 = [                  
                    
                    ["seedStarter0Row0",    "#{'variety' : #var3, 'seedsPerCell' : 20}" ],
                    ["seedStarter0Row1",    "#{'variety' : #var4, 'seedsPerCell' : 15}" ],

                    ["seedStarter0Rows",    "#[ #seedStarter0Row0,  #seedStarter0Row1 ]" ],
                    ["seedStarter0Features",    "#[ #featureFertilizer, #featurePhCorrector ]" ],

                    ["seedStarter0",    "#{'id' : 1, 'datePlanted' : '2013/5/3', 'covered' : true, 'type' : #typeWood, 'features' : #seedStarter0Features, 'rows' : #seedStarter0Rows}" ],
                                                  
                    ["seedStarterRow0",    "#{'variety' : #var2, 'seedsPerCell' : 50}" ],

                    ["seedStarterRow1",    "#{'variety' : #var1, 'seedsPerCell' : 6}" ],

                    ["seedStarterRows",    "#[ #seedStarterRow0,  #seedStarterRow1 ]" ],

                    ["seedStarter1Row0",    "#{'variety' : #var2, 'seedsPerCell' : 50}"],
                    ["seedStarter1Row1",    "#{'variety' : #var1, 'seedsPerCell' : 6}"],

                    ["seedStarter1Rows",    "#[ #seedStarter1Row0,  #seedStarter1Row1]"],

                    ["seedStarter1",    "#{'id' : 2, 'datePlanted' : '2013/5/5', 'covered' : false, 'type' : #typePlastic, 'features' : #emptyList, 'rows' : #seedStarter1Rows}"],
		    
                    ["seedStarter",    "#{'id' : 1, 'datePlanted' : '2013/5/3', 'rows' : #seedStarterRows}"],
                                                                           
                    ["allSeedStarters",    "#[ #seedStarter0, #seedStarter1 ]" ]
             ];

  var  thVars = thVarsCommon.concat(thVarsStsm2);
