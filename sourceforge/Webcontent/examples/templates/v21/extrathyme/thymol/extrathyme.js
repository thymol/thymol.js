/*
  This is a Thymol extension to emulate the behaviour of the "extrathyme" example dialect from http://www.thymeleaf.org/doc/html/Extending-Thymeleaf.html.
 */

//thRoot = "/home/jim/Project/thymol-2.x/dist/Webcontent/examples/templates/v21/extrathyme/webapp";
//thMessagePath = thRoot + "/../resources";

var	thProtocol = "";
var	thRelativeRootPath = "Webcontent/examples/templates/v21/extrathyme/webapp";
var     thMessagePath = "../resources";
var	thPath="";

thDebug = true;

var WORLD_CHAMPIONS_LEAGUE = 0;
var CONTINENTAL_PLAYOFFS = 1;
var RELEGATION = 2;

var remarks = [];
remarks[WORLD_CHAMPIONS_LEAGUE] = "WORLD_CHAMPIONS_LEAGUE";
remarks[CONTINENTAL_PLAYOFFS] = "CONTINENTAL_PLAYOFFS";
remarks[RELEGATION] = "RELEGATION";

function getRemarkForPosition(position) {        
        if (position === null) {
            return null;
        }
        switch (position) {
            case 1: return remarks[WORLD_CHAMPIONS_LEAGUE];
            case 2:
            case 3: return remarks[CONTINENTAL_PLAYOFFS];
            case 10: return remarks[RELEGATION];
        }
        return null;        
}

function getClassForPosition(position) {        
        if (position === null) {
            return null;
        }
        switch (position) {
            case 1: return "wcl";
            case 2:
            case 3: return "cpo";
            case 10: return "rel";
        }
        return null;        
}

function classForPositionAttrProcessor(element, attr, thAttr) {
	var position = thymol.getExpression(attr.nodeValue, element);
	var newClass = getClassForPosition(position);	
        if (newClass != null) {
	  element.setAttribute("class", newClass);
        }
	element.removeAttribute(attr.name);
	return true; // We modified the DOM, return "true"
}

function remarkForPositionAttrProcessor(element, attr, thAttr) {
	var position = thymol.getExpression(attr.nodeValue, element);
	var remark = "remarks." + getRemarkForPosition(position);
        var message = thymol.getMessage(remark);
	for (var i = 0, iLimit = element.childNodes.length; i < iLimit; i++) {
	  if( element.childNodes[i].nodeType === Node.TEXT_NODE ) {
	    element.childNodes[i].nodeValue = message;
	  }
	}
	element.removeAttribute(attr.name);
	return true; // We modified the DOM, return "true"
}

function headlinesElementProcessor(element) {
	var headlineText = "";
	var orderAttr = element.getAttribute("order").toString().toLowerCase();
	var headLines = thymol.applicationContext["headLines"];
	var hll = headLines.length;
	if ("random" === orderAttr) {
		var rnd = Math.floor(Math.random() * hll);
		headlineText = headLines[rnd].text;
	}
	else {
		headLines.sort(function(a, b) {
			return a[0].date > b[0].date ? -1 : 1;
		});
		headlineText = headLines[hll - 1];
	}
	var newDiv = element.ownerDocument.createElement("div");
	newDiv.setAttribute("class", "headlines");
	var newContent = element.ownerDocument.createTextNode(headlineText); 
	newDiv.appendChild(newContent);
	element.parentElement.insertBefore(newDiv, element);	
	// N.B. ThUtils.removeTag leaves the children of "element" in place,
	// we need to do this because some browsers won't honour the XHTML empty-tag style of closing the custom element.
	ThUtils.removeTag(element);
	return true; // We modified the DOM, return "true"
}

function Headline(dateArg,textArg) {
	this.date = dateArg;		
	this.text = textArg;		
}

function Team(codeArg,nameArg,pointsArg,wonArg,drawnArg,lostArg) {
	this.code = codeArg;		
	this.name = nameArg;		
	this.points = pointsArg;		
	this.won = wonArg;		
	this.drawn = drawnArg;		
	this.lost = lostArg;		
}

thymol.configurePreExecution( function() {
    var execInfo = {};
    var now = thymol.objects.thDatesObject.createNow();
    execInfo.now = now;        
    execInfo.now.time = thymol.objects.thDatesObject.format(now,thymol.objects.thDatesObject.dateFormat.masks.longDate);
    thymol.applicationContext.createVariable("execInfo",execInfo);    
    var headLines = [ 
      new Headline(thymol.objects.thDatesObject.createNow(),"Spearmint Caterpillars 1 - 0 Parsley Warriors"),
      new Headline(thymol.objects.thDatesObject.createNow(),"Laurel Troglodytes 1 - 1 Rosemary 75ers"),
      new Headline(thymol.objects.thDatesObject.createNow(),"Saffron Hunters 0 - 2 Polar Corianders"),
      new Headline(thymol.objects.thDatesObject.createNow(),"Angry Red Peppers 4 - 2 Basil Dragons"),
      new Headline(thymol.objects.thDatesObject.createNow(),"Sweet Paprika Savages 1 - 3 Cinnamon Sailors")			      
    ];
    thymol.applicationContext.createVariable("headLines",headLines);    
    var teams = [
       new Team("SPC", "Spearmint Caterpillars", 73, 21, 10, 5),
       new Team("BAD", "Basil Dragons", 72, 21, 9, 6),
       new Team("SPS", "Sweet Paprika Savages", 57, 15, 12, 9),
       new Team("PAW", "Parsley Warriors", 54, 15, 9, 12),
       new Team("PCO", "Polar Corianders", 49, 11, 16, 9),
       new Team("CSA", "Cinnamon Sailors", 48, 13, 9, 14),
       new Team("LTR", "Laurel Troglodytes", 41, 10, 11, 15),
       new Team("ARP", "Angry Red Peppers", 32, 8, 8, 20),
       new Team("ROS", "Rosemary 75ers", 32, 7, 11, 18),
       new Team("SHU", "Saffron Hunters", 31, 8, 7, 21)
    ];
    thymol.applicationContext.createVariable("teams",teams);      
	thymol.addDialect({
		prefix : 'score',
		attributeProcessors : [ {
			name : 'classforposition',
			processor : classForPositionAttrProcessor,
			precedence : 12000
		}, {
			name : 'remarkforposition',
			processor : remarkForPositionAttrProcessor,
			precedence : 12000
		} ],
		elementProcessors : [ {
			name : 'headlines',
			processor : headlinesElementProcessor,
		} ]
	});
});