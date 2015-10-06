module.exports = function(grunt) {

    grunt.registerTask( 'default', [ 'clean', 'copy', 'hapi', 'watch'] );

    grunt.registerTask( 'build', [ 'clean', 'copy' ] );

    grunt.registerTask( 'run', [ 'hapi', 'watch' ]);

    grunt.registerTask( 'pages', [ 'gh-pages' ]);

    grunt.initConfig({

        watch: {
            hapi: {
                files: [
                    './app/assets/**/*.{png,jpg,jpeg,mp3}',
                    './app/scripts/**/*.js',
                    './app/styles/**/*.css',
                    './app/pages/**/*.html',
                    './app/templates/**/*.html',
                    './app/sounds/**/*.mp3',
                    'Gruntfile.js'
                ],
                tasks: [
                    'clean',
                    'copy'
                ],
                options: {
                    spawn: false
                }
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: [ './assets/**/*.{png,jpg,jpeg,mp3}' ],
                    dest: './dist',
                    cwd: './app'
                }, {
                    expand: true,
                    src: [ './**/*.html' ],
                    dest: './dist',
                    cwd: './app/pages'
                }, {
                    expand: true,
                    src: [ './**/*.css' ],
                    dest: './dist/css',
                    cwd: './app/styles'
                }, {
                    expand: true,
                    src: [ './**/*.js' ],
                    dest: './dist/js',
                    cwd: './app/scripts'
                }, {
                    expand: true,
                    src: [ './**/*.html' ],
                    dest: './dist/templates',
                    cwd: './app/templates'
                },{
                    expand: true,
                    src: [ './**/*.mp3' ],
                    dest: './dist/sounds',
                    cwd: './app/sounds'
                }]
            },
            cname: {
                files: {
                    '.dist/CNAME': './CNAME'
                }
            }
        },

        hapi: {
            custom_options: {
                options: {
                    server: require('path').resolve('./server'),
                    bases: {
                        '/dist': require('path').resolve('./dist/')
                    }
                }
            }
        },

        clean: ['./dist'],

        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-hapi');
    grunt.loadNpmTasks('grunt-gh-pages');

};