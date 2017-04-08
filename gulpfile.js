'use strict';

// Requires
const gulp     = require('gulp');
const jsdoc    = require('gulp-jsdoc3');
const gulpif   = require('gulp-if');
const uglify   = require('gulp-uglify');
const inifyCss = require('gulp-clean-css');

// Include plugins
const plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
const sources     = ['server.js', 'Controller/*.js', 'Model/*.js', 'View/Javascript/Controllers/*.js', 'View/Javascript/Factories/*.js', 'View/Javascript/Tests/*.js'];
const destination = 'View/dist'; // dossier à livrer
const pathDocs    = ['./docs/docco/', './docs/jsdoc/'];

// Tâche "watch"
gulp.task('watch', () => {
  gulp.watch(sources, ['default']);
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

gulp.task('prod', ['clean'], () => {
  return gulp.src('View/index.html')
    .pipe(plugins.plumber())
    .pipe(plugins.useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', inifyCss()))
    .pipe(gulp.dest(destination));
});


// Tâche par défaut
gulp.task('default', ['docco', 'jsdoc'], () => {
  
});