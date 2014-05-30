var	thRoot="${thRoot}";
var	thPath="templates/tests/expression/numbers";

var	thDebug=true;

thVars = [
          ["onex",         123],
          ["twox",         254123154123124],
          ["threex",       0.124],
          ["fourx",        0.1243541231123123124123125412312],
          ["fivex",        254123154123124.123125452131243541231123123124123125412312],          
          ["numberListx",  "#[#onex, #twox, #threex, #fourx, #fivex]" ],
          ["integerListx", "#[#onex, #twox]" ],
          ["decimalListx", "#[#threex, #fourx, #fivex]" ]
];
