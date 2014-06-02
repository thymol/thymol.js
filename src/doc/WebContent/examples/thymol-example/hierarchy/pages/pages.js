var	thRoot="${project.basedir}/dist/Webcontent/examples/hierarchy";		// In an exploded war, this is usually webapp root
var	thPath="";		// In an exploded war, this is usually WEB-INF/<some-path>

var thDebug = true;

var	thVars = [
   	       ["currentUser", "#{ 'gravatar': 'ffa96040bb4211cad1c66f385d8cb77b', 'login': 'duyhai', 'firstname': 'Duyhai', 'lastname': 'DOAN' }"],
   	       ["error", ""],
   	       ["disco1", "#['John Otway & Wild Willy Barrett', 'Deep & Meaningless', 'Where Did I Go Right?', 'Way & Bar', 'All Balls & No Willy', 'The Wimp & The Wild', 'Cheryl, a Rock Opera', 'Under the Covers and Over the Top', 'Live', 'Premature Adulation', 'OT-AIR', 'Bunsen Burner']" ],
   	       ["artist1", "#{'name' : 'John Otway', 'firstname' : 'John', 'lastname' : 'Otway', 'discography' : #disco1, 'bio' : 'John Otway, (born 2 October 1952, Aylesbury, Buckinghamshire, England) is an English singer-songwriter who has built a sizeable cult audience through extensive touring.'}" ],
   	       ["disco2", "#['Wreckless Eric', 'The Wonderful World of Wreckless Eric', 'The Whole Wide World', 'Big Smash!', 'The Donovan of Trash', 'Almost a Jubilee: 25 Years at the BBC (with Gaps)', 'Bungalow Hi']" ],
   	       ["artist2", "#{'name' : 'Wreckless Eric', 'firstname' : 'Eric', 'lastname' : 'Goulden', 'discography' : #disco2, 'bio' : 'Eric Goulden (born 18 May 1954, Newhaven, East Sussex, England), known as Wreckless Eric, is an English rock and roll/new wave singer-songwriter, best known for his 1977 single &quot;(I&apos;d Go The) Whole Wide World&quot; on Stiff Records.'}" ],
   	       ["disco3", "#['11 Tracks of Whack', 'Circus Money']" ],
   	       ["artist3", "#{'name' : 'Walter Becker', 'firstname' : 'Walter', 'lastname' : 'Becker', 'discography' : #disco3, 'bio' : 'Walter Carl Becker (born February 20, 1950) is an American musician, songwriter, and record producer. He is best known as the co-founder, guitarist, bassist and co-songwriter of Steely Dan.'}" ],
   	       ["disco4", "#['AN1','J&apos;te fais un plan','L&apos;Album','Plastiquez vos baffles','Grands succès/Greatest Hits','Chat va...Et Toi?','Pix','Suite diagonale','Ultraterrestre','Dandy Bandit']" ],
   	       ["artist4", "#{'name' : 'Plastic Bertrand', 'firstname' : 'Roger', 'lastname' : 'Jouret', 'discography' : #disco4, 'bio' : 'Plastic Bertrand (born Roger Allen François Jouret, 24 February 1954, Brussels[1]) is a Belgian musician, songwriter, producer, editor and television presenter, best known for the 1978 international hit single &quot;Ça plane pour moi&quot;.'}" ],
   	       ["results", "#[#artist1, #artist2, #artist3, #artist4]"],
   	       ["styleList", "#['Soul','Jazz','New Wave','Progressive']"],
   	       ["countryList", "#['Australia','Belgium','Canada','France','United Kingdom','USA']"],
   	       ["listArtits", "#[#artist1, #artist2, #artist3, #artist4]"],
	       ["demoApplication", "#{ 'APPLICATION_NAME': 'Thymol Demo' }"]
   	   ];

var doan = {};
doan.thymeleaf = {};
doan.thymeleaf.demo = {};
doan.thymeleaf.demo.util = {};
doan.thymeleaf.demo.util.Constants = "";  //Just a placeholder
var sec = {};
sec.principal = {};
sec.principal.username = "fred";
sec.principal.authorities = ["administrator","manager","worker"];

var bigT = function(clazzName) {
    return thymol.applicationContext["demoApplication"]; // Mix-in with thVars value (above)
};

thymol.ready(function () {
	thymol.configurePreExecution( function() {
	    thymol.applicationContext.createVariable("sec", sec );
	    thymol.applicationContext.createVariable("doan", doan );
	    thymol.applicationContext.createVariable("T", bigT );
	});
});