module.exports = function(grunt) {

	var bower = require('bower');
	var path = require('path');
	
	mavenProperties = grunt.file.readJSON('maven-properties.json');	
	grunt.log.writeln('path to jQuery is: ' + mavenProperties.pathToJquery);
	
	var jquerySource = mavenProperties.pathToJquery;
	
	var tmpDir = "target/dist-tmp/";
	var bowerThymolPath = "bower_components/thymol/";
	var bowerThymolDistPath = bowerThymolPath + "dist/";


	var thymolFile = "thymol.js";
	var thymolFileMin = "thymol.min.js";
	var liteFile = "thymol-lite.js";
	var fullFile = "thymol-full.js";
	var liteFileMin = "thymol-lite.min.js";
	var fullFileMin = "thymol-full.min.js";

	var tmpThymolFile = tmpDir + thymolFile;
	var tmpThymolFileMin = tmpDir + thymolFileMin;
	var tmpLiteFile = tmpDir + liteFile;
	var tmpFullFile = tmpDir + fullFile;
	var tmpLiteFileMin = tmpDir + liteFileMin;
	var tmpFullFileMin = tmpDir + fullFileMin;

	var thymolBootstrap =  [ "src/main/js/thymol.js" ];
	
	var tmpThymolFileObj = {};	
	tmpThymolFileObj[tmpThymolFile] = thymolBootstrap;

	var coreThymolFiles = [
                  	        "src/main/js/thymol-main.js",
                  			"src/main/js/core/thymol-classes.js",
                  			"src/main/js/core/thymol-core.js",
                  			"src/main/js/core/thymol-context.js",
                  			"src/main/js/core/thymol-utils.js",
                  			"src/main/js/core/thymol-parser.js",
                  			"src/main/js/core/thymol-standarddialect.js",
                  			"src/main/js/core/thymol-http.js"
                  			];

	var optionalThymolFiles = [
	               			"src/main/js/obj/aggregates-object.js",
	            			"src/main/js/obj/arrays-object.js",
	            			"src/main/js/obj/bools-object.js",
	            			"src/main/js/obj/dates-object.js",
	            			"src/main/js/obj/calendars-object.js",
	            			"src/main/js/obj/ids-object.js",
	            			"src/main/js/obj/lists-object.js",
	            			"src/main/js/obj/maps-object.js",
	            			"src/main/js/obj/messages-object.js",
	            			"src/main/js/obj/numbers-object.js",
	            			"src/main/js/obj/objects-object.js",
	            			"src/main/js/obj/sets-object.js",
	            			"src/main/js/obj/strings-object.js",
	            			"src/main/js/obj/objects-modules-config.js"
                  			];

	var thymolConfig = ["src/main/js/thymol-config.js"];
	
	var tmpLiteFileObj = {};
	tmpLiteFileObj[tmpLiteFile] = coreThymolFiles.concat(thymolConfig);
 
	var tmpFullFileObj = {};
	tmpFullFileObj[tmpFullFile] = coreThymolFiles.concat(optionalThymolFiles).concat(thymolConfig); 
		
	var tmpLiteFileMinObj = {};
	tmpLiteFileMinObj[tmpLiteFileMin] = [ tmpLiteFile ];

	var tmpFullFileMinObj = {};
	tmpFullFileMinObj[tmpFullFileMin] = [ tmpFullFile ];

	var tmpThymolFileMinObj = {};
	tmpThymolFileMinObj[tmpThymolFileMin] = thymolBootstrap;

	grunt.initConfig({

		pkg : grunt.file.readJSON('package.json'),
		
		banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
				+ '<%= grunt.template.today("yyyy-mm-dd") %>\n'
				+ '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
				+ '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
				+ ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		clean : [ "dist/", tmpDir, bowerThymolPath ],

		uglify : {
			thymol : {
				files : tmpThymolFileObj,
				options : {
					beautify : true,
					mangle : false,
					compress : false,
					banner : "<%= pkg.strapline %>\n\n"
							+ "   <%= pkg.title %> version <%= pkg.version %> Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n"
							+ "   <%= pkg.author.email %> <%= pkg.author.url %>\n\n"
							+ "<%= pkg.license %>\n"
							+ "<%= pkg.tail %>\n\n"
				}
			},
			lite : {
				files : tmpLiteFileObj,
				options : {
					beautify : true,
					mangle : false,
					compress : false,
					banner : "<%= pkg.strapline %>\n\n"
							+ "   <%= pkg.title %> version <%= pkg.version %> Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n"
							+ "   <%= pkg.author.email %> <%= pkg.author.url %>\n\n"
							+ "<%= pkg.license %>\n"
							+ "<%= pkg.tail %>\n\n"
				}
			},
			full : {
				files : tmpFullFileObj,
				options : {
					beautify : true,
					mangle : false,
					compress : false,
					banner : "<%= pkg.strapline %>\n\n"
							+ "   <%= pkg.title %> version <%= pkg.version %> Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n"
							+ "   <%= pkg.author.email %> <%= pkg.author.url %>\n\n"
							+ "<%= pkg.license %>\n"
							+ "<%= pkg.tail %>\n\n"
				}
			},
			thymol_min : {
				files : tmpThymolFileMinObj,
				options : {
					compress : true,
					mangle : true,
					banner : "/* <%= pkg.title %> version <%= pkg.version %> | Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %> | <%= pkg.short_license %> */"
				}
			},
			lite_min : {
				files : tmpLiteFileMinObj,
				options : {
					compress : true,
					mangle : true,
					banner : "/* <%= pkg.title %> version <%= pkg.version %> | Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %> | <%= pkg.short_license %> */"
				}
			},
			full_min : {
				files : tmpFullFileMinObj,
				options : {
					compress : true,
					mangle : true,
					banner : "/* <%= pkg.title %> version <%= pkg.version %> | Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %> | <%= pkg.short_license %> */"
				}
			}
		},

		copy : {
			thymol : {
				expand : true,
				cwd : tmpDir,
				src : [ "**/" + thymolFile ],
				dest : "dist/",
				options : {
					flatten : true,
					process : function(content, srcpath) {
						content = content.replace("${thThymolSource}", fullFile);
						return content.replace("${thJQuerySource}", jquerySource);
					}
				}
			},
		    thymol_min : {
			    expand : true,
     			cwd : tmpDir,
	    		src : [ "**/" + thymolFileMin ],
		    	dest : "dist/",
			    options : {
				    flatten : true,
				    process : function(content, srcpath) {
				   	    content = content.replace("${thThymolSource}", fullFileMin);
					    return content.replace("${thJQuerySource}", jquerySource);
				    }
			    }
		    },
		    thymol_main : {
			    expand : true,
     			cwd : tmpDir,
	    		src : [ "**/thymol-full*.js", "**/thymol-lite*.js" ],
		    	dest : "dist/"
		    },		    
			bower_dist : {
				expand : true,
				cwd : "dist/",
				src : [ "**/*.js" ],
				dest : bowerThymolDistPath
			}		    

		}
		
	});
 
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", [ "clean", "uglify", "copy" ]);

};
