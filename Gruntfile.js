module.exports = function(grunt) {

	// Initializing the configuration object
	grunt.initConfig({

		// Task configuration
		copy: {  // copy bootstrap and jquery files
		    main: {
			    files: [
			    	{expand: true, src: ['bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js'], dest: 'online/'},
			    	{expand: true, src: ['bower_components/angular/angular.js'], dest: 'online/'},
			    	{expand: true, src: ['bower_components/angular-route/angular-route.js'], dest: 'online/'},
			    	{expand: true, src: ['css/*'], dest: 'online/'},
			    	{expand: true, src: ['fonts/*'], dest: 'online/'},
			    	{expand: true, src: ['img/*'], dest: 'online/'},
			    	{expand: true, src: ['js/*'], dest: 'online/'},
			    	{expand: true, src: ['partials/*'], dest: 'online/'},
			    	{expand: true, src: ['index.html'], dest: 'online/'}
			    ]
		    }
		},
		less: {  // compile .less files
			dev: {
				options: {
					compress: false,  // set to true if you want to minify the result
				},
				files: {
					// compiling style.less into style.css
					'css/app.css':'less/app.less'
				}
			},
			prod: {
				options: {
					compress: true,  // set to true if you want to minify the result
				},
				files: {
					// compiling style.less into style.css
					'css/app.css':'less/app.less'
				}
			}
		},
		concat: {  // concatenate multiple files into one file
			options: {
				separator: ';',
			},
			theme_js: {
				src: [
				'bower_components/angular/angular.js',
				'bower_components/angular-route/angular-route.js',
				'js/app.js',
				'js/services.js',
				'js/controllers.js',
				'js/filters.js',
				'js/directives.js'
				],
				dest: 'js/production.js'
			}
		},
		uglify: {  // minify js files
			options: {
				mangle: false // Use if you want the names of your functions and variables unchanged
			},
			theme_js: {
				files: {
					'js/production.js':'js/production.js',
				}
			}
		},
		watch: {  // watch files and perform tasks after changes
			less: {
				files: ['less/app.less'], // watched files
				tasks: ['less:dev'], // tasks to run
				/*
				options: {
					livereload: true // reloads the browser
				}
				*/
			}
		}
	});

	// Plugin loading
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Task definition
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['copy']);
	grunt.registerTask('prod', ['less:prod', 'concat', 'uglify']); // on production, concat and minify
};