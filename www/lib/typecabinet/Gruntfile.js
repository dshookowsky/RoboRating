// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development
// runs acetate, deploys the site, and tags new releases

// Gets current version description from CHANGELOG.md
function findVersion(log) {
  var newVersion = log.split('## v')[1];
  var description = newVersion.substring(5,newVersion.length);
  return description;
}

// Javascript banner
var banner = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '*  <%= pkg.homepage %>\n' +
                '*  Copyright (c) <%= grunt.template.today("yyyy") %> Atelier Wise\n' +
                '*  Apache 2.0 License */\n';

module.exports = function(grunt) {

  var currentVersion = 'v' + grunt.file.readJSON('package.json').version;
  var log = grunt.file.read('CHANGELOG.md');
  var description = findVersion(log);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'acetate': {
      // Rebuild site with Acetate
      build: {
        config: 'docs/acetate.conf.js'
      },
      // Run a development server with Acetate
      server: {
        config: 'docs/acetate.conf.js',
        options: {
          watch: true,
          server: true,
          port: 8888,
          host: '0.0.0.0'
        }
      }
    },

    // Watch files
    'watch': {
      scripts: {
        files: ['lib/js/typecabinet.js'],
        tasks: [
          'concat:doc',
          'copy:doc',
          'jshint'
        ]
      },
      images: {
        files: ['lib/img/**/*'],
        tasks: [
          'newer:imagemin:doc',
          'copy:doc'
        ]
      },
      libsass: {
        files: ['lib/sass/**/*', 'docs/source/assets/css/**/*'],
        tasks: [
          'libsass:doc',
          'copy:doc'
        ]
      }
    },

    // Check Javascript for errors
    'jshint': {
      all: ['lib/js/typecabinet.js']
    },

    // Build CSS files to dist
    'libsass': {

      options: {
        loadPath: ['lib/sass/']
      },

      expanded: {
        src: 'lib/sass/typecabinet.scss',
        dest: 'dist/css/typecabinet.css'
      },

      doc: {
        expand: true,
        cwd: 'docs/source/assets/css',
        src: ['**/*.scss'],
        dest: 'docs/build/assets/css',
        ext: '.css'
      }
    },

    // Build minified Javascript file to dist
    'uglify': {
      options: {
        mangle: false,
        banner: banner
      },
      dist: {
        files: {
          'dist/js/typecabinet.min.js': ['lib/js/typecabinet.js']
        }
      }
    },

    // Copy libsass files to dist, doc assets to build
    'copy': {
      libsass: {
        expand: true,
        cwd: 'lib/',
        src: ['sass/**/*'],
        dest: 'dist/'
      },
      doc: {
        expand: true,
        cwd: 'docs/source/',
        src: ['assets/img/**/*', 'assets/js/**/*'],
        dest: 'docs/build/'
      }
    },

    // Copy Javascript to dist and doc
    'concat': {
      options: {
        banner: banner
      },
      dist: {
        files: {
          'dist/js/typecabinet.js': 'lib/js/typecabinet.js'
        }
      },
      doc: {
        files: {
          'docs/source/assets/js/libs/typecabinet.js': 'lib/js/typecabinet.js'
        }
      }
    },

    // Optimize images and icons for dist and doc
    'imagemin': {
      dist: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['img/**/*.{png,jpg,svg,ico}'],
          dest: 'dist/'
        }]
      },
      doc: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['img/**/*.{png,jpg,svg,ico}'],
          dest: 'docs/source/assets/'
        }]
      }
    },

    // Make a zip file of the dist folder
    'compress': {
      main: {
        options: {
          archive: 'typecabinet.zip'
        },
        files: [
          {
            src: ['dist/**'],
            dest: './'
          },
        ]
      }
    },

    // Ask for GitHub username and password
    'prompt': {
      target: {
        options: {
          questions: [
            {
              config: 'github-release.options.auth.user',
              type: 'input',
              message: 'GitHub username:'
            },
            {
              config: 'github-release.options.auth.password',
              type: 'password',
              message: 'GitHub password:'
            }
          ]
        }
      }
    },

    // Bump the version on GitHub
    'github-release': {
      options: {
        repository: 'nikolaswise/typecabinet',
        release: {
          tag_name: currentVersion,
          name: currentVersion,
          body: description,
          prerelease: true
        }
      },
      files: {
        src: ['typecabinet.zip']
      }
    },

    // Deploy doc site to gh-pages
    'gh-pages': {
      options: {
        base: 'docs/build',
        repo: 'https://github.com/nikolaswise/typecabinet.git'
      },
      src: ['**']
    },

    // Runs tasks concurrently, speeding up Grunt
    'concurrent': {
      prepublish: [
        'libsass',
        'uglify',
        'copy',
        'concat:dist',
        'newer:imagemin:dist'
      ]
    }

  });

  // load all grunt modules
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // ┌─────────────┐
  // │ Grunt tasks │
  // └─────────────┘

  // Run a development environment
  grunt.registerTask('dev', [
    'acetate:server',
    'newer:imagemin:doc',
    'concat:doc',
    'libsass:doc',
    'copy:doc',
    'watch'
  ]);

  // Test typecabinet.js
  grunt.registerTask('test', [
    'jshint'
  ]);

  // Build a dist folder with all assets
  grunt.registerTask('prepublish', [
    'concurrent:prepublish'
  ]);

  // Build and deploy doc site to github pages
  grunt.registerTask('deploy', 'Deploy documentation to github pages', function(n) {
    if (grunt.option('message')) {
      grunt.config.set('gh-pages.options.message', grunt.option('message'));
    }
    grunt.task.run([
      'acetate:build',
      'newer:imagemin:doc',
      'concat:doc',
      'libsass:doc',
      'copy:doc',
      'gh-pages'
    ]);
  });

  // Release a new version of the framework
  grunt.registerTask('release', [
    'prompt',
    'prepublish',
    'compress',
    'github-release'
  ]);

  // Default task starts up a dev environment
  grunt.registerTask('default', ['dev']);

};
