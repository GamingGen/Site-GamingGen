// Karma configuration
// Generated on Thu Sep 29 2016 21:38:18 GMT+0000 (UTC)

const path = require('path');

const base = path.join(__dirname, 'node_modules', '/');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: path.join('View', 'Javascript'),


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-sinon'],


    // list of files / patterns to load in the browser
    files: [
      base + path.join('angular', 'angular.min.js'),
      base + path.join('angular-ui-router', 'release', 'angular-ui-router.min.js'),
      base + path.join('angular-mocks', 'angular-mocks.js'),
      base + path.join('socket.io-client', 'dist', 'socket.io.slim.js'),
      base + path.join('angular-permission', 'dist', 'angular-permission.min.js'),
      // base + path.join('angular-permission', 'dist', 'angular-permission-ui.min.js'),
      // base + path.join('angular-permission', 'dist', 'angular-permission-ng.min.js'),
      '*.js',
      path.join('Controllers', '*.js'), // Obligatoire ?
      path.join('**', '*.js'),
      // 'http://localhost:8080/socket.io/socket.io.js'
      // 'Tests/*Spec.js', // A supprimer
    ],


    // list of files to exclude
    exclude: [
      path.join('Lib', '*.js'),
      path.join('tinyMCE', '*.js'),
      path.join('tinyMCE', '**', '*.js')
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // '*.js'   : ['babel'],
      // 'Controllers/*.js': ['babel'], // Obligatoire ?
      // 'Factories/*.js': ['babel'], // Obligatoire ?
      // 'Services/*.js': ['babel'], // Obligatoire ?
      '**/*.js': ['babel']
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