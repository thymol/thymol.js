module.exports = function(grunt) {

	var bower = require('bower');
	var path = require('path');
	
	var bowerPath = "bower_components/";

	var thymolPath = bowerPath + "thymol/";

	var thymolDistPath = thymolPath + "dist/";

	console.log('thymolPath: ' + thymolPath);
	var jqueryPath = "jquery/dist/jquery.min.js";

	var thymolSource = "thymol-full.js";

	var jquerySource = "../../" + jqueryPath;
	grunt.log.writeln('jquerySource: ' + jquerySource);
	var jquerySourceDefault = jquerySource;

	var tmpDir = "target/dist-tmp/";

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

	var tmpThymolFileObj = {};
	tmpThymolFileObj[tmpThymolFile] = [ "src/main/js/thymol.js" ];

	var tmpLiteFileObj = {};
	tmpLiteFileObj[tmpLiteFile] = [
	        "src/main/js/thymol-main.js",
			"src/main/js/core/thymol-classes.js",
			"src/main/js/core/thymol-core.js",
			"src/main/js/core/thymol-context.js",
			"src/main/js/core/thymol-utils.js",
			"src/main/js/core/thymol-parser.js",
			"src/main/js/core/thymol-standarddialect.js",
			"src/main/js/core/thymol-http.js",
			"src/main/js/thymol-config.js"
			];

	var tmpFullFileObj = {};
	tmpFullFileObj[tmpFullFile] = [
	        "src/main/js/thymol-main.js",
			"src/main/js/core/thymol-classes.js",
			"src/main/js/core/thymol-core.js",
			"src/main/js/core/thymol-context.js",
			"src/main/js/core/thymol-utils.js",
			"src/main/js/core/thymol-parser.js",
			"src/main/js/core/thymol-standarddialect.js",
			"src/main/js/core/thymol-http.js",
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
			"src/main/js/thymol-config.js"
			];

	var tmpLiteFileMinObj = {};
	tmpLiteFileMinObj[tmpLiteFileMin] = [ tmpLiteFile ];

	var tmpFullFileMinObj = {};
	tmpFullFileMinObj[tmpFullFileMin] = [ tmpFullFile ];

	var tmpThymolFileMinObj = {};
	tmpThymolFileMinObj[tmpThymolFileMin] = [ "src/main/js/thymol.js" ];

	grunt.initConfig({

		pkg : grunt.file.readJSON('package.json'),

		banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
				+ '<%= grunt.template.today("yyyy-mm-dd") %>\n'
				+ '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
				+ '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
				+ ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		clean : [ "dist/", tmpDir, thymolPath ],

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
			first : {
				expand : true,
				cwd : "target/dist-tmp/",
				src : [ "**/*.js" ],
				dest : "dist/",
				options : {
					flatten : true,
					process : function(content, srcpath) {
						content = content.replace("${thThymolSource}", thymolSource);
						return content.replace("${thJQuerySource}", jquerySourceDefault);
					}
				}
			},
			second : {
				expand : true,
				cwd : "target/dist-tmp/",
				src : [ "**/*.js" ],
				dest : thymolDistPath,
				options : {
					flatten : true,
					process : function(content, srcpath) {
						content = content.replace("${thThymolSource}", thymolSource);
						return content.replace("${thJQuerySource}", jquerySource);
					}
				}
			}
		}

	});
 
	grunt.registerTask('extract', function(name) {
		var bower_done = this.async();
		bower.commands.list({paths : true}, {			
		}).on('error', function(data) {
			bower_done(false);
		}).on('end', function(data) {
			for ( var k in data) {
				if (k === "jquery") {
					if (!!data[k]) {
						var jqueryLocation = path.dirname(data[k]);
						if( !!jqueryLocation ) {
							jquerySource = process.cwd() + path.sep + jqueryLocation + path.sep + "jquery.min.js";							
						}
					}
				}
			}
			bower_done();
		});
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", [ "clean", "extract", "uglify", "copy" ]);
	



};
