thDebug = true;

thymol.ready(function() {
	thymol.configurePreExecution(function() {
		var p1 = new ThParam("Hello world!");
		var p2 = new ThParam("Bonjour tout le monde!");
		var p3 = new ThParam("Hola mundo!");
		var p4 = new ThParam("Kaixo mundua!");
		var pArray = ([ p1, p2, p3, p4 ]).sort();
		thymol.applicationContext.createVariable("p1", p1);
		thymol.applicationContext.createVariable("p2", p2);
		thymol.applicationContext.createVariable("p3", p3);
		thymol.applicationContext.createVariable("p4", p4);
		thymol.applicationContext.createVariable("pArray", pArray);
		thymol.applicationContext.createVariable("pList", pArray);
		thymol.applicationContext.createVariable("pSet", ThSet.prototype.fromArray(pArray));
		var b1 = "o";
		var b2 = " ";
		var b3 = "X";
		var bArray = [ b1, b2, b3 ];
		thymol.applicationContext.createVariable("bArray", bArray);
		var a1 = "O";
		var a2 = "";
		var a3 = "!";
		var aArray = [ a1, a2, a3 ];
		thymol.applicationContext.createVariable("aArray", aArray);

		var ps1 = "Bonjour tout le monde!   ";
		var ps2 = "   Hello world!  ";
		var ps3 = "    Hola mundo!";
		var ps4 = "\tKaixo mundua!\t\n";
		var psArray = [ ps1, ps2, ps3, ps4 ];
		// psArray = psArray.sort();
		thymol.applicationContext.createVariable("ps1", ps1);
		thymol.applicationContext.createVariable("ps2", ps2);
		thymol.applicationContext.createVariable("ps3", ps3);
		thymol.applicationContext.createVariable("ps4", ps4);
		thymol.applicationContext.createVariable("psArray", psArray);
		thymol.applicationContext.createVariable("psSet", ThSet.prototype.fromArray(psArray));

		var s1 = "the quick brown fox jumps	over the\nlazy dog";
		var s2 = "\t\tevery\tgood\tboy\tdeserves\tfavour\t\t";
		// var s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell\vas\fsweet\r"; // Selenium translates the /r to /n and so tests fail
		var s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell\vas\fsweet\n";
		var sArray = ([ s1, s2, s3 ]).sort();
		var sSet = ThSet.prototype.fromArray(sArray);
		thymol.applicationContext.createVariable("s1", s1);
		thymol.applicationContext.createVariable("s2", s2);
		thymol.applicationContext.createVariable("s3", s3);
		thymol.applicationContext.createVariable("sArray", sArray);
		thymol.applicationContext.createVariable("sSet", sSet);

		var sa1 = "the~quick#brown@fox:jumps:@~over#the#lazy#dog";
		var sa2 = "~~~every:good@boy~deserves#favour~~~";
		var sa3 = "a?rose?by?any?other?name?would?n'ere?smell?as?sweet";
		var saArray = ([ sa1, sa2, sa3 ]).sort();
		var saSet = ThSet.prototype.fromArray(saArray);
		thymol.applicationContext.createVariable("sa1", sa1);
		thymol.applicationContext.createVariable("sa2", sa2);
		thymol.applicationContext.createVariable("sa3", sa3);
		thymol.applicationContext.createVariable("saArray", saArray);
		thymol.applicationContext.createVariable("saSet", saSet);

		var xs1 = "<a>b<c></a>";
		thymol.applicationContext.createVariable("xs1", xs1);
		var xs2 = "Be consistent when you use apostrophes after words that end in \"s.</b><b>\"</b> When someone's name ends with an \"s,\" it is acceptable to use an apostrophe without an \"s\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \"s\" after the apostrophe.";
		thymol.applicationContext.createVariable("xs2", xs2);
		var xs3 = "If the family's last name ends in \"s,\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \"the Williamses\" in a plural sense. If you wanted to reference their dog, you'd say \"the Williamses' dog.\" If the last name seems awkward to say that way, sidestep the issue by saying \"the Williams family\" and \"the Williams family's dog.\"";
		thymol.applicationContext.createVariable("xs3", xs3);
		var xs4 = "<b class=\"whb\">Use apostrophes in contractions.</b> Sometimes, especially in <a href=\"/Avoid-Colloquial-(Informal)-Writing\" title=\"Avoid Colloquial (Informal) Writing\">informal writing</a>, apostrophes are used to indicate one or more missing letters. For example, the word \"don't\" is short for \"do not\"; other examples include \"isn't,\" \"wouldn't,\" and \"can't.\" Contractions can also be made with the verbs \"is,\" \"has,\" and \"have.\" For example, we can write \"She's going to school\" instead of \"She is going to school\"; or \"He's lost the game\" instead of \"He has lost the game.\"<div class=\"clearall\"></div>";
		thymol.applicationContext.createVariable("xs4", xs4);
		var xsArray = ([ xs1, xs2, xs3, xs4 ]).sort();
		thymol.applicationContext.createVariable("xsArray", xsArray);
		var xsSet = ThSet.prototype.fromArray(xsArray);
		thymol.applicationContext.createVariable("xsSet", xsSet);

		var s4 = "silly m\\u009";
		var s5 = "someone needs a\\";
		var s6 = "silly M\\u09ngo and Midge";
		thymol.applicationContext.createVariable("s4", s4);
		thymol.applicationContext.createVariable("s5", s5);
		thymol.applicationContext.createVariable("s6", s6);

		var sa2Array = ([ sa1, null, "", sa2, "", null, sa3 ]);
		thymol.applicationContext.createVariable("sa2Array", sa2Array);
		var sa3Array = ([ sa1, null, "", sa2, "", null, sa3 ]).sort();
		var sa2Set = ThSet.prototype.fromArray(sa3Array);
		thymol.applicationContext.createVariable("sa2Set", sa2Set);

	});
});