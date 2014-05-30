
var  thVarsStsm1 = [

                  ["seedStarterRow0",    "#{'variety' : #var3, 'seedsPerCell' : 20}"],
                  ["seedStarterRow1",    "#{'variety' : #var4, 'seedsPerCell' : 15}"],

                  ["seedStarterRows",    "#[ #seedStarterRow0,  #seedStarterRow1]"],

                  ["seedStarter",    "#{'id' : 1, 'datePlanted' : '2013/5/3', 'covered' : false, 'type' : #typeWood, 'features' : #emptyList, 'rows' : #seedStarterRows}"],
                              
                  ["allSeedStarters",    "#[ #seedStarter]"]
           ];

var  thVars = thVarsCommon.concat(thVarsStsm1);
