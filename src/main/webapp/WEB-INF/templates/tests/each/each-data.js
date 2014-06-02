var	thRoot="${thDeploy}";
var	thPath="templates/tests/each";

var	thDebug=true;

var	thVars = [

   	    ["product1",		"#{ 'name': 'Lettuce',	'price': 12.0 }"],   	        
		["product2",		"#{ 'name': 'Apricot',	'price': 8.0 }"],   	        
   		["product3",		"#{ 'name': 'Thyme',	'price': 1.23 }"],   	        
   		["product4",		"#{ 'name': 'Carrot',	'price': 2.0 }"],   	        
     	["products",		"#[ #product1, #product2, #product3, #product4 ]"],
        
  	    ["c1",				"#{ 'key': 'Galicia',	'value': 'Santiago de Compostela' }"],   	        
  	    ["c2",				"#{ 'key': 'Asturias',	'value': 'Oviedo' }"],   	        
  	    ["c3",				"#{ 'key': 'Cantabria',	'value': 'Santander' }"],   	             	
     	["capitals",		"#[ #c1, #c2, #c3 ]"],
        
  	    ["e1",				"#{ 'entry': 'MILLISECONDS=2' }"],   	        
  	    ["e2",				"#{ 'entry': 'SECONDS=1' }"],   	        
     	["map",				"#[ #e1, #e2 ]"]

     ];