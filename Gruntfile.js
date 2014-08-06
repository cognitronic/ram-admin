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
                'vendor/jquery/dist/jquery.js',
                'vendor/angular/angular.js',
                'vendor/angular-ui-router/release/angular-ui-router.js',
                'vendor/angular-sanitize/angular-sanitize.js',
                'vendor/angular-mocks/angular-mocks.js',
                'vendor/restangular/dist/restangular.js',
                'vendor/underscore/underscore.js',
                'tests/**/*Spec.js'
            ]
        },
        'karma': {
            'development': {
                'configFile': 'karma.conf.js',
                'options': {
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        'client/**/*.js'
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
                'src': ['client/**/*.js'],
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
            'src': ['client/**/*.js'],
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