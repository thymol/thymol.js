var	thRoot="${project.build.directory}/${project.artifactId}-${project.version}";
var	thPath="WEB-INF/thymeleaf";
var	thDebug=true;

var	thMappings = [
// External URLs for included web-content libraries
	 ["/webjars/bootstrap/2.3.0/css/bootstrap.min.css",                      "http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap.min.css"],
	 ["/webjars/jquery/1.9.0/jquery.min.js",                                 "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"],
	 ["/webjars/jquery-ui/1.9.2/js/jquery-ui-1.9.2.custom.js",               "http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"],
	 ["/webjars/jquery-ui/1.9.2/css/smoothness/jquery-ui-1.9.2.custom.css",  "http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/smoothness/jquery-ui.css"],
// Local URIs for links and anchors
	 ["/thymol",                                 "${project.build.directory}/${project.artifactId}-${project.version}/test-classes/thymol"],
	 ["/resources",      	                     "${project.build.directory}/${project.artifactId}-${project.version}/resources"],
	 ["/vets.html",      	                     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/vets/vetList.html"],
	 ["/oups.html",      	                     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/exception.html"],
	 ["/owners.html",      	                     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/ownersList.html"],
	 ["/ownerDetails.html",                      "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/ownerDetails.html"],
	 ["/owners/find.html",                       "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/findOwners.html"],
	 ["/owners/new",      	                     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/createOrUpdateOwnerForm.html"],
// Overridden dynamic requests
	 ["smith123/edit.html",                      "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/createOrUpdateOwnerForm.html?owner=%23smith1"],
	 ["smith123/pets/new.html",                  "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet1a"],
	 ["adams123/edit.html",                      "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/createOrUpdateOwnerForm.html?owner=%23adams1"],
	 ["adams123/pets/new.html",                  "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet3a"],
	 ["munst123/edit.html",                      "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/createOrUpdateOwnerForm.html?owner=%23munst1"],
	 ["munst123/pets/new.html",                  "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet5a"],

	 ["/owners/smith123",                        "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/ownerDetails.html?owner=%23smith1"],
	 ["/owners/adams123",                        "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/ownerDetails.html?owner=%23adams1"],
	 ["/owners/munst123",                        "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/owners/ownerDetails.html?owner=%23munst1"],

	 ["/owners/smith123/pets/991/edit",    	     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet1"],
	 ["/owners/smith123/pets/992/edit",    	     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet2"],
	 ["/owners/adams123/pets/993/edit",    	     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet3"],
	 ["/owners/adams123/pets/994/edit",          "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet4"],	 
	 ["/owners/munst123/pets/995/edit",          "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet5"],
	 ["/owners/munst123/pets/996/edit",    	     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet6"],	 
	 
	 ["/owners/smith123/pets/991/visits/new",    "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdateVisitForm.html?visit=%23visit1a"],	 
	 ["/owners/smith123/pets/992/visits/new",    "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdateVisitForm.html?visit=%23visit2a"],	 	 	 
	 ["/owners/adams123/pets/993/visits/new",    "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdateVisitForm.html?visit=%23visit3a"],	 
	 ["/owners/adams123/pets/994/visits/new",    "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdateVisitForm.html?visit=%23visit4a"],	 	 	 
	 ["/owners/munst123/pets/995/visits/new",    "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdateVisitForm.html?visit=%23visit5a"],	 
	 ["/owners/munst123/pets/996/visits/new",    "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdateVisitForm.html?visit=%23visit6a"],	 
	 	 
	 ["/pets/991/edit",      	                 "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdatePetForm.html?pet=%23pet1a"],
	 ["/pets/991/visits/new",                    "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/pets/createOrUpdateVisitForm.html"],	 
// Missing functionality
	 ["/vets.xml",      	                     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/exception.html?exception.message=\'XML Serialization not yet supported\'"],	 
	 ["/vets.atom",      	                     "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/exception.html?exception.message=\'Atom Feed Subscription not yet supported\'"],	 
// Back to welcome
	 ["/",                                       "${project.build.directory}/${project.artifactId}-${project.version}/WEB-INF/thymeleaf/welcome.html"]
	];

var	thVars = [
	 ["exception.message",    "What on earth is going on?"],

	 ["smith1",               "#{ 'pets': #smith1Pets, 'new': 'No', 'id': 'smith123', 'firstName': 'Mary', 'lastName': 'Smith-Thymol', 'address': '45, Oxford Street West', 'city': 'Cambridge', 'telephone': '555-555-559' }"],
	 ["pet1",                 "#{ 'id': '991', 'name': 'Tiddles', 'type': { 'name': 'Cat' }, 'owner': #smith1 }"],	 
	 ["pet1a",                "#{ 'new': 'Yes', 'owner': #smith1 }"],	 
	 ["visit1a",              "#{ 'new': 'Yes', 'pet': #pet1 }" ],
	 ["pet2",                 "#{ 'id': '992', 'name': 'Fido', 'type': { 'name': 'Dog' }, 'owner': #smith1 }"],	 
	 ["visit1",               "#{ 'pet': #pet1, 'date': '2011/07/03', 'description': 'Annual check-up' }" ],
	 ["visit2a",              "#{ 'new': 'Yes', 'pet': #pet2 }" ],
	 ["smith1Pets",	          "#[ #pet1, #pet2 ]"], 	 

	 ["adams1",               "#{ 'pets': #adams1Pets, 'new': 'No', 'id': 'adams123', 'firstName': 'Thomas', 'lastName': 'Adams', 'address': '23 Clark St', 'city': 'Anston', 'telephone': '245-954-222' }"],
	 ["pet3",                 "#{ 'id': '993', 'name': 'Squawk', 'type': { 'name': 'Bird' }, 'owner': #adams1, 'visits': #adams1Pet3Visits }"],	 
	 ["pet3a",                "#{ 'new': 'Yes', 'owner': #adams1 }"],	 
	 ["pet4",                 "#{ 'id': '994', 'name': 'Squeek', 'type': { 'name': 'Bird' }, 'owner': #adams1, 'visits': #adams1Pet4Visits }"],	 
	 ["visit2",               "#{ 'pet': #pet3, 'date': '2011/07/04', 'description': 'Annual check-up' }" ],
	 ["visit3",               "#{ 'pet': #pet3, 'date': '2012/07/05', 'description': 'Annual check-up' }" ],
	 ["visit3a",              "#{ 'new': 'Yes', 'pet': #pet3 }" ],
	 ["visit4",               "#{ 'pet': #pet4, 'date': '2011/02/04', 'description': 'Annual check-up' }" ],
	 ["visit5",               "#{ 'pet': #pet4, 'date': '2012/03/07', 'description': 'Annual check-up' }" ],
	 ["visit6",               "#{ 'pet': #pet4, 'date': '2013/03/12', 'description': 'Annual check-up' }" ],
	 ["visit4a",              "#{ 'new': 'Yes', 'pet': #pet4 }" ],
	 ["adams1Pets",      	  "#[ #pet3, #pet4 ]"], 	 
	 ["adams1Pet3Visits",     "#[ #visit2, #visit3 ]"], 	 
	 ["adams1Pet4Visits",     "#[ #visit4, #visit5, #visit6 ]"], 	 

	 ["munst1",               "#{ 'pets': #munst1Pets, 'new': 'No', 'id': 'munst123', 'firstName': 'Albert', 'lastName': 'Munster', 'address': 'Hammer House', 'city': 'Horsfield', 'telephone': '911-911-911' }"],
	 ["pet5",                 "#{ 'id': '995', 'name': 'Squeezy', 'type': { 'name': 'Python' }, 'owner': #munst1, 'visits': #munst1Pet5Visits }"],	 
	 ["pet5a",                "#{ 'new': 'Yes', 'owner': #munst1 }"],	 
	 ["pet6",                 "#{ 'id': '996', 'name': 'Reddit', 'type': { 'name': 'Frog' }, 'owner': #munst1, 'visits': #munst1Pet6Visits }"],	 
	 ["visit7",               "#{ 'pet': #pet5, 'date': '2011/07/06', 'description': 'Annual check-up' }" ],
	 ["visit5a",              "#{ 'new': 'Yes', 'pet': #pet5 }" ],
	 ["visit6a",              "#{ 'new': 'Yes', 'pet': #pet6 }" ],
	 ["munst1Pets",      	  "#[ #pet5, #pet6 ]"], 	 
	 ["munst1Pet5Visits",     "#[ #visit7 ]"], 	 
	 ["munst1Pet6Visits",     "#[ ]"], 	 

	 ["selections",      	  "#[ #smith1, #adams1, #munst1 ]"], 	 
	 ["types",	              "#[ 'Cat', 'Dog', 'Bird', 'Reptile', 'Amphibian' ]"], 	 
	 
	 ["specialty1",      	  "#{ 'name': 'Cats' }"],
	 ["specialty2",      	  "#{ 'name': 'Dogs' }"],
	 ["specialty3",      	  "#{ 'name': 'Birds' }"],
	 ["specialty4",      	  "#{ 'name': 'Amphibians' }"],
	 ["specialty5",      	  "#{ 'name': 'Reptiles' }"],
	 ["sList1",               "#[ #specialty1, #specialty2, #specialty3 ]"], 	 
	 ["sList2",               "#[ #specialty4, #specialty5 ]"], 	 
	 ["sList3",               "#[ #specialty1, #specialty5, #specialty3, #specialty2 ]"], 	 
	 
	 ["vet1",                 "#{ 'firstName': 'John', 'lastName': 'Jones', 'specialties': #sList1 }"],
	 ["vet2",                 "#{ 'firstName': 'James', 'lastName': 'Herriot', 'nrOfSpecialties': 0 }"],
	 ["vet3",                 "#{ 'firstName': 'Alan', 'lastName': 'Turner', 'specialties': #sList2 }"],
	 ["vet4",                 "#{ 'firstName': 'Sylvester', 'lastName': 'Frogget', 'specialties': #sList3 }"],
	 ["vList",                "#[ #vet1, #vet2, #vet3, #vet4 ]"], 	 
	 ["vets",                 "#{ 'vetList': #vList }"],
// Simulate missing Expression objects
	 ["#httpServletRequest.servletPath",    	                        "/ownerDetails.html"],
	 ["#dates.format(pet.birthDate.toDate(), \'yyyy-MM-dd\')",          "2010-09-05"],
	 ["#dates.format(visit.date.toDate(), \'yyyy-MM-dd\')",             "2013-07-12"],
	 ["#dates.format(visit.pet.birthDate.toDate(), \'yyyy/MM/dd\')",	"2011/10/06"]
	];
	
var	thMessages = [
	 ["welcome",               "Welcome to the Pet Clinic (with Thymol)!"]
	];