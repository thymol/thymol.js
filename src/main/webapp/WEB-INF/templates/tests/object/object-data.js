var	thDebug=true;
var thAllowNullText=false;

var	thVars = [
  ["product",  "#{ 'name': 'Lettuce', 'prices': { 'euros': '9', 'dollars': '12' } }"]
];

thymol.ready(function () {
//  thymol.configurePreExecution( function() {
//    thAllowNullText=false;
//  });
  thymol.configurePostExecution( function() {
    thAllowNullText=true;
  });
});
