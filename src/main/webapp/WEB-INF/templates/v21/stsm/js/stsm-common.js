
var  thVarsCommon = [

            ["emptyList",	"#[]"],
            ["typePlastic",    "PLASTIC"],
            ["typeWood",    "WOOD"],
            ["allTypes",    "#[ #typePlastic, #typeWood ]"],

            ["featureSubstrate",    "SEEDSTARTER_SPECIFIC_SUBSTRATE"],
            ["featureFertilizer",    "FERTILIZER"],
            ["featurePhCorrector",    "PH_CORRECTOR"],
            ["allFeatures",    "#[ #featureSubstrate, #featureFertilizer, #featurePhCorrector ]"],

         
            ["var1",    "#{'id' : 1, 'name' : 'Thymus vulgaris'}"],
            ["var2",    "#{'id' : 2, 'name' : 'Thymus x citriodorus'}"],
            ["var3",    "#{'id' : 3, 'name' : 'Thymus herba-barona'}"],
            ["var4",    "#{'id' : 4, 'name' : 'Thymus pseudolaginosus'}"],
            ["var5",    "#{'id' : 5, 'name' : 'Thymus serpyllum'}"],
            ["allVarieties",    "#[ #var1, #var2, #var3, #var4, #var5 ]"]//,

    ];

var  thMessages = [
            ["title.application",               "Spring Thyme Seed-Starter Manager"],
            ["title.list",                      "Seed Starter List"],
            ["title.new",                       "Add new Seed Starter"],

            ["date.format",                       "MM/dd/yyyy"],
            ["bool.true",                       "yes"],
            ["bool.false",                       "no"],

            ["seedstarter.data",                       "Seed Starter data"],
            ["seedstarter.create",                       "Add Seed Starter"],
            ["seedstarter.row.add",                       "Add row"],
            ["seedstarter.row.remove",                       "Remove row"],
 
            ["seedstarter.datePlanted",                       "Date planted"],
            ["seedstarter.covered",                       "Covered"],
            ["seedstarter.type",                       "Type"],
            ["seedstarter.features",                       "Features"],
            ["seedstarter.rows",                       "Rows"],

            ["seedstarter.type.WOOD",                       "Wood"],
            ["seedstarter.type.PLASTIC",                       "Plastic"],

            ["seedstarter.feature.SEEDSTARTER_SPECIFIC_SUBSTRATE",                       "Seed starter-specific substrate"],
            ["seedstarter.feature.FERTILIZER",                                    "Fertilizer used"],
            ["seedstarter.feature.PH_CORRECTOR",                             "PH Corrector used"],
 
            ["seedstarter.rows.head.rownum",                                 "Row"],
            ["seedstarter.rows.head.variety",                       "Variety"],
            ["seedstarter.rows.head.seedsPerCell",                       "Seeds per cell"],

            ["typeMismatch.datePlanted",                       "Date has an incorrect format (see pattern)"],
            ["typeMismatch.seedsPerCell",                       "Seeds per cell must be an integer number"]

    ];

thymol.ready(function() {
	thymol.configurePreExecution( function() {
	    thymol.applicationContext.createVariable("dateplanted",thymol.objects.thDatesObject.createToday());
	    thymol.addDialect({
	   	 prefix: 'th',
	   	 processors: [
	   	   {
	   	     name: 'field',
	   	     processor: fieldAttrProcessor,
	   	     precedence : 1200
	   	   }
	   	 ]
	   }); 
	    	    
	    thymol.configureModule(fieldsObject);	
	});
});

