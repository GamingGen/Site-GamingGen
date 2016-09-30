// Karma configuration
// Generated on Thu Sep 29 2016 21:38:18 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'View/Javascript/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-sinon'],


    // list of files / patterns to load in the browser
    files: [
      '/home/ubuntu/workspace/node_modules/angular/angular.min.js',
      '/home/ubuntu/workspace/node_modules/angular-ui-router/release/angular-ui-router.min.js',
      '/home/ubuntu/workspace/node_modules/angular-mocks/angular-mocks.js',
      '*.js',
      '**/*.js',
      'http://localhost:8080/socket.io/socket.io.js'
    ],


    // list of files to exclude
    exclude: [
      'Lib/*.js',
      'tinyMCE/*.js',
      'tinyMCE/**/*.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '*.js'   : ['babel'],
      '**/*.js': ['babel'],
    },
    
    
    // Babel preprocessor specific configuration
    babelPreprocessor: {
      options: {
        presets  : ['es2015'], // use the es2015 preset
        sourceMap: 'inline' // inline source maps inside compiled files
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    
    
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};