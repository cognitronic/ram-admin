/**
 * Created by Danny Schreiber on 8/3/14.
 */

module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),

        'meta': {
            'jsFilesForTesting': [
                'client/vendor/jquery/dist/jquery.js',
                'client/vendor/angular/angular.js',
                'client/vendor/angular-ui-router/release/angular-ui-router.js',
                'client/vendor/angular-sanitize/angular-sanitize.js',
                'client/vendor/angular-mocks/angular-mocks.js',
                'client/vendor/restangular/dist/restangular.js',
                'client/vendor/underscore/underscore.js',
                'specs/**/*Spec.js'
            ]
        },
        'karma': {
            'development': {
                'configFile': 'karma.conf.js',
                'options': {
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        'client/app/**/*.js'
                    ]
                }
            },
            'dist': {
                'options': {
                    'configFile': 'karma.conf.js',
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        'dist/<%= pkg.name %>-<%= pkg.version %>.js'
                    ]
                }
            },
            'minified': {
                'options': {
                    'configFile': 'karma.conf.js',
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
                    ]
                }
            }
        },
        'concat': {
            'dist': {
                'src': ['client/app/**/*.js'],
                'dest': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        'uglify': {
            'options': {
                'mangle': false
            },
            'dist': {
                'files': {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js']
                }
            }
        },
        'jsdoc': {
            'src': ['client/app/**/*.js'],
            'options': {
                'destination': 'doc'
            }
        }
    });

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('build', [
        'karma:development',
        'concat',
        'karma:dist',
        'uglify',
        'karma:minified',
        'jsdoc'
    ]);
};