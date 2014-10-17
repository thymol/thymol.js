var	thRoot="${thDeploy}";
var	thPath="templates/tests21/syntax";

var	thDebug=true;
var thShowNullOperands=true;

function PCDate(dv) {
  this.dateValue = new Date(dv);
  this.toDate = function() {
    return this.dateValue;
  }
  this.toString = function() {
    return this.dateValue.toString();
  }
}
PCDate.prototype.constructor = PCDate;

var	thVars = [
   	   	    ["bd1", new PCDate('2008-04-23')],
   	   	    ["pet",				"#{ 'id': '23pet1', 'name': 'Tiddles', 'type': { 'name': 'Cat' }, 'owner': #smith1, 'birthDate': #bd1 }"]	       	    
];