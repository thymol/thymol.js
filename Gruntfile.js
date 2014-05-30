module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    
    uglify: {
        lite: {
          files: {
            "target/test-classes/js/thymol-lite.js": 
            [
              "src/main/resources/js/thymol-main.js",
                "src/main/resources/js/core/thymol-classes.js",
                "src/main/resources/js/core/thymol-core.js",
                "src/main/resources/js/core/thymol-context.js",
                "src/main/resources/js/core/thymol-utils.js",
                "src/main/resources/js/core/thymol-parser.js",
                "src/main/resources/js/core/thymol-standarddialect.js",
                "src/main/resources/js/core/thymol-http.js",
              "src/main/resources/js/thymol-config.js"
            ]
          },
          options: {
            beautify: true,
            mangle: false,
            compress: false,
            banner: 
                "<%= pkg.strapline %>\n\n" +
                "   <%= pkg.title %> version <%= pkg.version %> Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
                "   <%= pkg.author.email %> <%= pkg.author.url %>\n\n" +
                "<%= pkg.license %>\n" +
                "<%= pkg.tail %>\n\n"
          }
        },
        full: {
            files: {
              "target/test-classes/js/thymol-full.js": 
            [
             "src/main/resources/js/thymol-main.js",
               "src/main/resources/js/core/thymol-classes.js",
               "src/main/resources/js/core/thymol-core.js",
               "src/main/resources/js/core/thymol-context.js",
               "src/main/resources/js/core/thymol-utils.js",
               "src/main/resources/js/core/thymol-parser.js",
               "src/main/resources/js/core/thymol-standarddialect.js",
               "src/main/resources/js/core/thymol-http.js",
               "src/main/resources/js/obj/aggregates-object.js",
               "src/main/resources/js/obj/arrays-object.js",
               "src/main/resources/js/obj/bools-object.js",
               "src/main/resources/js/obj/dates-object.js",
               "src/main/resources/js/obj/calendars-object.js",
               "src/main/resources/js/obj/ids-object.js",
               "src/main/resources/js/obj/lists-object.js",
               "src/main/resources/js/obj/maps-object.js",
               "src/main/resources/js/obj/messages-object.js",
               "src/main/resources/js/obj/numbers-object.js",
               "src/main/resources/js/obj/objects-object.js",
               "src/main/resources/js/obj/sets-object.js",
               "src/main/resources/js/obj/strings-object.js",
             "src/main/resources/js/thymol-config.js"
         ]
        },
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          banner: 
          "<%= pkg.strapline %>\n\n" +
          "   <%= pkg.title %> version <%= pkg.version %> Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
          "   <%= pkg.author.email %> <%= pkg.author.url %>\n\n" +
          "<%= pkg.license %>\n" +
          "<%= pkg.tail %>\n\n"
        }
      },
      lite_min: {
          files: {
            "target/test-classes/js/thymol-lite.min.js": 
            [
              "src/main/resources/js/thymol-main.js",
                "src/main/resources/js/core/thymol-classes.js",
                "src/main/resources/js/core/thymol-core.js",
                "src/main/resources/js/core/thymol-context.js",
                "src/main/resources/js/core/thymol-utils.js",
                "src/main/resources/js/core/thymol-parser.js",
                "src/main/resources/js/core/thymol-standarddialect.js",
                "src/main/resources/js/core/thymol-http.js",
              "src/main/resources/js/thymol-config.js"
            ]
          },
          options: {
            compress: true,
            mangle: true,
            banner: "/*! <%= pkg.title %> version <%= pkg.version %> | Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %> |  <%= pkg.short_license %> */"        
          }
        },
        full_min: {
            files: {
              "target/test-classes/js/thymol-full.min.js": 
            [
             "src/main/resources/js/thymol-main.js",
               "src/main/resources/js/core/thymol-classes.js",
               "src/main/resources/js/core/thymol-core.js",
               "src/main/resources/js/core/thymol-context.js",
               "src/main/resources/js/core/thymol-utils.js",
               "src/main/resources/js/core/thymol-parser.js",
               "src/main/resources/js/core/thymol-standarddialect.js",
               "src/main/resources/js/core/thymol-http.js",
               "src/main/resources/js/obj/aggregates-object.js",
               "src/main/resources/js/obj/arrays-object.js",
               "src/main/resources/js/obj/bools-object.js",
               "src/main/resources/js/obj/dates-object.js",
               "src/main/resources/js/obj/calendars-object.js",
               "src/main/resources/js/obj/ids-object.js",
               "src/main/resources/js/obj/lists-object.js",
               "src/main/resources/js/obj/maps-object.js",
               "src/main/resources/js/obj/messages-object.js",
               "src/main/resources/js/obj/numbers-object.js",
               "src/main/resources/js/obj/objects-object.js",
               "src/main/resources/js/obj/sets-object.js",
               "src/main/resources/js/obj/strings-object.js",
             "src/main/resources/js/thymol-config.js"
         ]
        },
        options: {
          compress: true,
          mangle: true,
          banner: "/*! <%= pkg.title %> version <%= pkg.version %> | Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %> |  <%= pkg.short_license %> */"        
        }
      },
      thymol: {
          files: {
            "target/test-classes/js/thymol.min.js": 
            [
             "src/main/resources/js/thymol.js"
            ]
        },
        options: {
          compress: true,
          mangle: true,
          banner: "/*! <%= pkg.title %> version <%= pkg.version %> | Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %> |  <%= pkg.short_license %> */"        
        }
      }
    }
  });

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-contrib-uglify');
	
  // Default task.
  grunt.registerTask('default', ['uglify']);

};
