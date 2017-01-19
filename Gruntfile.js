module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    concat: {
      options: {
        separator: '\n// NEW PAGE\n',
      },
      dist: {
        src: ['server-config.js', 'server.js', './app/*/*.js', './app/*.js', './lib/*.js', './public/client/*.js', './public/lib/*.js'],
        dest: 'dist/build.js',
      },
    },

    uglify: {
      myTarget: {
        files: {
          './public/dist/output.min.js': ['dist/build.js']
        }
      }
    }, 

    gitpush: {
      yourTarget: {
        options: {
          remote: 'live',
          branch: 'master'
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'server-config.js', 'server.js', './app/*/*.js', './app/*.js', './lib/*.js', './public/client/*.js', './public/lib/*.js'
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    // 'test',
    'eslint',
    'concat',
    'uglify',
    'gitpush'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'test',
    'build',
    'upload'
  ]);


};
