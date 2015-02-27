module.exports = function( grunt ) {

  var bower = require( 'bower' );
  var path = require( 'path' );

  mavenProperties = grunt.file.readJSON( 'maven-properties.json' );
  grunt.log.writeln( 'Thymol version is: ' + mavenProperties.thymolVersion );
  grunt.log.writeln( 'Release date is: ' + mavenProperties.thymolReleaseDate );
  grunt.log.writeln( '\n' );
  grunt.log.writeln( 'bower path to jQuery is: ' + mavenProperties.bowerJQuerySource );
  grunt.log.writeln( 'sourceforge path to jQuery is: ' + mavenProperties.sourceforgeJQuerySource );
  grunt.log.writeln( 'jsdelivr path to jQuery is: ' + mavenProperties.jsdelivrJQuerySource );

  var tmpDir = "target/dist-tmp/";
  var bowerThymolPath = "bower_components/thymol/";
  var bowerThymolDistPath = bowerThymolPath + "dist/";

  var fullFile = "thymol-full.js";
  var fullFileMin = "thymol-full.min.js";

  var tmpThymolFile = tmpDir + "thymol.js";
  var tmpThymolFileMin = tmpDir + "thymol.min.js";
  var tmpLiteFile = tmpDir + "thymol-lite.js";
  var tmpFullFile = tmpDir + fullFile;
  var tmpLiteFileMin = tmpDir + "thymol-lite.min.js";
  var tmpFullFileMin = tmpDir + fullFileMin;

  var nodeFile = "thymol-node.js";
  var nodeFileMin = "thymol-node.min.js";
  var tmpNodeFile = tmpDir + nodeFile;
  var tmpNodeFileMin = tmpDir + nodeFileMin;

  var thymolBootstrap = [ "src/main/js/thymol.js" ];

  var tmpThymolFileObj = {};
  tmpThymolFileObj[ tmpThymolFile ] = thymolBootstrap;

  var coreThymolFiles = [
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

  var mainThymolFiles = [ 
      "src/main/js/thymol-system.js",
      "src/main/js/thymol-main.js"
  ];

  var nodeThymolFiles = [ 
      "src/main/js/thymol-exports.js"
  ];

  var tmpLiteFileObj = {};
  tmpLiteFileObj[ tmpLiteFile ] = coreThymolFiles.concat( mainThymolFiles );

  var tmpFullFileObj = {};
  tmpFullFileObj[ tmpFullFile ] = coreThymolFiles.concat( optionalThymolFiles ).concat( mainThymolFiles );

  var tmpNodeFileObj = {};
  tmpNodeFileObj[ tmpNodeFile ] = coreThymolFiles.concat( optionalThymolFiles ).concat( nodeThymolFiles );

  var tmpLiteFileMinObj = {};
  tmpLiteFileMinObj[ tmpLiteFileMin ] = [ tmpLiteFile ];

  var tmpFullFileMinObj = {};
  tmpFullFileMinObj[ tmpFullFileMin ] = [ tmpFullFile ];

  var tmpNodeFileMinObj = {};
  tmpNodeFileMinObj[ tmpNodeFileMin ] = [ tmpNodeFile ];

  var tmpThymolFileMinObj = {};
  tmpThymolFileMinObj[ tmpThymolFileMin ] = thymolBootstrap;

  var pckJSON = grunt.file.readJSON( 'package.json' );

  pckJSON.version = mavenProperties.thymolVersion;

  var shortBannerComment = "/* <%= pkg.title %> version <%= pkg.version %> | Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %> | <%= pkg.short_license %> */";

  var mediumBannerComment = "<%= pkg.strapline %>\n\n"
    + "   <%= pkg.title %> version <%= pkg.version %> Copyright (C) 2012-<%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n"
    + "   <%= pkg.author.email %> <%= pkg.author.url %>\n\n"
    + "<%= pkg.license %>\n"
    + "<%= pkg.tail %>\n\n";
  
  grunt.initConfig( {
    
    pkg : pckJSON,

    banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
      + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
      + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
      + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
      + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    clean : [ "dist/", "sourceforge/", "jsdelivr/", tmpDir, bowerThymolPath ],

    uglify : {
      thymol : {
        files : tmpThymolFileObj,
        options : {
          beautify : true,
          mangle : false,
          compress : false,
          banner : mediumBannerComment
        }
      },
      lite : {
        files : tmpLiteFileObj,
        options : {
          beautify : true,
          mangle : false,
          compress : false,
          banner : mediumBannerComment
        }
      },
      full : {
        files : tmpFullFileObj,
        options : {
          beautify : true,
          mangle : false,
          compress : false,
          banner : mediumBannerComment
        }
      },
      node : {
        files : tmpNodeFileObj,
        options : {
          beautify : true,
          mangle : false,
          compress : false,
          banner : mediumBannerComment
        }
      },
      thymol_min : {
        files : tmpThymolFileMinObj,
        options : {
          compress : true,
          mangle : true,
          banner : shortBannerComment
        }
      },
      lite_min : {
        files : tmpLiteFileMinObj,
        options : {
          compress : true,
          mangle : true,
          banner : shortBannerComment
        }
      },
      full_min : {
        files : tmpFullFileMinObj,
        options : {
          compress : true,
          mangle : true,
          banner : shortBannerComment
        }
      },
      node_min : {
        files : tmpNodeFileMinObj,
        options : {
          compress : true,
          mangle : true,
          banner : shortBannerComment
        }
      }
    },

    copy : {
      thymol_bower : {
        expand : true,
        cwd : tmpDir,
        src : [ "**/*.js" ],
        dest : "dist/",
        options : {
          flatten : true,
          process : function( content, srcpath ) {
            content = content.replace( "${thymolVersion}", mavenProperties.thymolVersion );
            content = content.replace( "${thymolReleaseDate}", mavenProperties.thymolReleaseDate );
            content = content.replace( "${thThymolSource}", fullFile );
            return content.replace( "${thJQuerySource}", mavenProperties.bowerJQuerySource );
          }
        }
      },
      thymol_sourceforge : {
        expand : true,
        cwd : tmpDir,
        src : [ "**/*.js" ],
        dest : "sourceforge/",
        options : {
          flatten : true,
          process : function( content, srcpath ) {
            content = content.replace( "${thymolVersion}", mavenProperties.thymolVersion );
            content = content.replace( "${thymolReleaseDate}", mavenProperties.thymolReleaseDate );
            content = content.replace( "${thThymolSource}", fullFile );
            return content.replace( "${thJQuerySource}", mavenProperties.sourceforgeJQuerySource );
          }
        }
      },
      thymol_jsdelivr : {
        expand : true,
        cwd : tmpDir,
        src : [ "**/*min*.js" ],
        dest : "jsdelivr/",
        options : {
          flatten : true,
          process : function( content, srcpath ) {
            content = content.replace( "${thymolVersion}", mavenProperties.thymolVersion );
            content = content.replace( "${thymolReleaseDate}", mavenProperties.thymolReleaseDate );
            content = content.replace( "${thThymolSource}", fullFileMin );
            content = content.replace( "${thThymolSource}", nodeFileMin );
            return content.replace( "${thJQuerySource}", mavenProperties.jsdelivrJQuerySource );
          }
        }
      },
      bower_dist : {
        expand : true,
        cwd : "dist/",
        src : [ "**/*.js" ],
        dest : bowerThymolDistPath
      }
    }

  } );

  grunt.loadNpmTasks( "grunt-contrib-clean" );
  grunt.loadNpmTasks( "grunt-contrib-uglify" );
  grunt.loadNpmTasks( "grunt-contrib-copy" );

  grunt.registerTask( "default", [ "clean", "uglify", "copy" ] );

};