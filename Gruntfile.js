
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pkgMeta: grunt.file.readJSON('config/meta.json'),
    dest: grunt.option('target') || 'dist',
    basePath: path.join('<%= dest %>', 'App_Plugins', '<%= pkgMeta.name %>'),

    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      dll: {
        files: ['TextOverImage/Umbraco/TextOverImage/**/*.cs'] ,
        tasks: ['msbuild:dist', 'copy:dll']
      },
      js: {
        files: ['TextOverImage/**/*.js'],
        tasks: ['concat:dist']
      },
      html: {
        files: ['TextOverImage/**/*.html'],
        tasks: ['copy:html']
      },
	  sass: {
		files: ['TextOverImage/**/*.scss'],
		tasks: ['sass', 'copy:css']
	  },
	  css: {
		files: ['TextOverImage/**/*.css'],
		tasks: ['copy:css']
	  },
	  manifest: {
		files: ['TextOverImage/package.manifest'],
		tasks: ['copy:manifest']
	  }
    },

    concat: {
      options: {
        stripBanners: false
      },
      dist: {
        src: [
            'TextOverImage/text.over.image.namespaces.js',
            'TextOverImage/models/text.over.image.editor.models.js',
            'TextOverImage/directives/contenteditable.directive.js',
			'TextOverImage/controllers/confirmation.dialog.controller.js',
            'TextOverImage/controllers/text.over.image.editor.controller.js'
        ],
        dest: '<%= basePath %>/js/textOverImage.js'
      }
    },

    copy: {
        dll: {
            cwd: 'TextOverImage/Umbraco/TextOverImage/bin/debug/',
            src: 'TextOverImage.dll',
            dest: '<%= dest %>/bin/',
            expand: true
        },
        html: {
            cwd: 'TextOverImage/views/',
            src: [
                'TextOverImageEditorView.html',
				'ConfirmationDialogView.html'
            ],
            dest: '<%= basePath %>/views/',
            expand: true,
            rename: function(dest, src) {
                return dest + src;
              }
        },
		css: {
			cwd: 'TextOverImage/css/',
			src: [
				'textOverImage.css'
			],
			dest: '<%= basePath %>/css/',
			expand: true,
			rename: function(dest, src) {
				return dest + src;
			}
		},
        manifest: {
            cwd: 'TextOverImage/',
            src: [
                'package.manifest'
            ],
            dest: '<%= basePath %>/',
            expand: true,
            rename: function(dest, src) {
                return dest + src;
            }
        },
       umbraco: {
        cwd: '<%= dest %>',
        src: '**/*',
        dest: 'tmp/umbraco',
        expand: true
      }
    },

    umbracoPackage: {
      options: {
        name: "<%= pkgMeta.name %>",
        version: '<%= pkgMeta.version %>',
        url: '<%= pkgMeta.url %>',
        license: '<%= pkgMeta.license %>',
        licenseUrl: '<%= pkgMeta.licenseUrl %>',
        author: '<%= pkgMeta.author %>',
        authorUrl: '<%= pkgMeta.authorUrl %>',
        manifest: 'config/package.xml',
        readme: 'config/readme.txt',
        sourceDir: 'tmp/umbraco',
        outputDir: 'pkg',
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: {
        src: ['app/**/*.js', 'lib/**/*.js']
      }
  },

  sass: {
		dist: {
			options: {
				style: 'compressed'
			},
			files: {
				'TextOverImage/css/textOverImage.css': 'TextOverImage/sass/textOverImage.scss'
			}
		}
	},

  clean: {
      build: '<%= grunt.config("basePath").substring(0, 4) == "dist" ? "dist/**/*" : "null" %>',
      tmp: ['tmp'],
      html: [
        'TextOverImageEditor/views/*.html',
        '!TextOverImageEditor/views/TextOverImageEditorView.html'
        ],
      js: [
        'TextOverImageEditor/controllers/*.js',
		'TextOverImageEditor/models/*.js',
        'TextOveRImageEditor/directives/*.js',
		'!TextOverImageEditor/controllers/confirmation.dialog.controller.js',
        '!TextOverImageEditor/controllers/text.over.image.editor.controller.js',
		'!TextOverImageEditor/models/text.over.image.editor.models.js',
        '!TextOveRImageEditor/directives/contenteditable.directive.js'
      ],
      css: [
        'TextOverImageEditor/css/*.css',
        '!TextOverImageEditor/css/textOverImage.css'
      ],
	  sass: [
		'TextOverImageEditor/sass/*.scss',
		'!TextOverImageEditor/sass/textOverImage.scss'
	  ]
  },
  msbuild: {
      options: {
        stdout: true,
        verbosity: 'quiet',
        maxCpuCount: 4,
        version: 4.0,
        buildParameters: {
          WarningLevel: 2,
          NoWarn: 1607
        }
    },
    dist: {
        src: ['TextOverImage/Umbraco/TextOverImage/TextOverImage.csproj'],
        options: {
            projectConfiguration: 'Debug',
            targets: ['Clean', 'Rebuild'],
        }
    }
  }

  });

  grunt.registerTask('default', ['concat', 'sass:dist', 'copy:html', 'copy:manifest', 'copy:css', 'msbuild:dist', 'copy:dll', 'clean:html', 'clean:js', 'clean:sass', 'clean:css']);
  grunt.registerTask('umbraco', ['clean:tmp', 'default', 'copy:umbraco', 'umbracoPackage', 'clean:tmp']);
};
