'use strict';

// Requires
const gulp        = require('gulp');
const jsdoc       = require('gulp-jsdoc3');
const gulpif      = require('gulp-if');
const uglify      = require('gulp-uglify');
const inifyCss    = require('gulp-clean-css');
const sass        = require('gulp-sass');
const runSequence = require('run-sequence');

// Include plugins
const plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
const sources     = ['server.js', 'Controller/*.js', 'Model/*.js', 'View/Javascript/Controllers/*.js', 'View/Javascript/Factories/*.js', 'View/Javascript/Tests/*.js'];
const sassFiles   = ['View/Style/*.+(scss|sass)'];
const htmlSource  = 'View/index.html';
const destination = 'View/dist'; // dossier à livrer
const cssDest     = 'View/Style';
const pathDocs    = ['./docs/docco/', './docs/jsdoc/'];

// Tâche "watch"
gulp.task('watch', () => {
  gulp.watch(sources, ['default']);
  gulp.watch(sassFiles, ['styles']);
});

gulp.task('clean', () => {
  return gulp.src(destination, {read: false})
    .pipe(plugins.clean());
});

gulp.task('cleanDoc', () => {
  return gulp.src(pathDocs, {read: false})
    .pipe(plugins.clean());
});

gulp.task('docco', ['cleanDoc'], () => {
  return gulp.src(sources)
    .pipe(plugins.docco())
    .pipe(gulp.dest('./docs/docco'));
});

gulp.task('jsdoc', ['cleanDoc'], (cb) => {
  var config = require('./confJSDoc.json');
  gulp.src(sources)
    .pipe(jsdoc(config, cb));
});

gulp.task('styles', function(){  
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('prod', () => {
  return gulp.src(htmlSource)
    .pipe(plugins.plumber())
    .pipe(plugins.useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', inifyCss()))
    .pipe(gulp.dest(destination));
});

gulp.task('build', (callback) => {
  runSequence('clean', 'styles', 'prod', callback);
});

// Tâche par défaut
gulp.task('default', ['docco', 'jsdoc', 'styles'], () => {
  
});