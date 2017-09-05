'use strict';

// Requires
const gulp        = require('gulp');
const jsdoc       = require('gulp-jsdoc3');
const gulpif      = require('gulp-if');
const gulpIgnore  = require('gulp-ignore');
const htmlmin     = require('gulp-htmlmin');
const uglify      = require('gulp-uglify');
const minifyCss   = require('gulp-clean-css');
const sass        = require('gulp-sass');
const image       = require('gulp-image');
const imageResize = require('gulp-image-resize');
const webp        = require('gulp-webp');
const rename      = require("gulp-rename");
const runSequence = require('run-sequence');

// Include plugins
const plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
const sources            = ['server.js', 'Controller/*.js', 'Model/*.js', 'View/Javascript/Controllers/*.js', 'View/Javascript/Factories/*.js', 'View/Javascript/Tests/*.js'];
const sassFiles          = ['View/Style/*.+(scss|sass)'];
const imageSource        = 'View/Img/**';
const imageSourceResize  = 'View/dist/Img/**';
const indexSource        = 'View/index.html';
const htmlSource         = 'View/Partial/**';
const destination        = 'View/dist';
const cssDest            = 'View/Style';
const pathDocs           = ['./docs/docco/', './docs/jsdoc/'];

const ImageResizeMobile = 300;

const optionsMinHTML = {
  collapseWhitespace: true,
  removeCommentsFromCDATA: true,
  removeComments: true,
  collapseBooleanAttributes: true,
  removeEmptyAttributes: true
};

// Tâche "watch"
gulp.task('watch', () => {
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
  return gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});

gulp.task('optimizeImg', function () {
  gulp.src(imageSourceResize, { nodir: true })
    .pipe(image())
    .pipe(gulp.dest(`${destination}/Img`))
    .pipe(webp({method: 6}))
    .pipe(gulp.dest(`${destination}/Img`));
});

gulp.task('resizeImg', function () {
  gulp.src(imageSource, { nodir: true })
    .pipe(gulp.dest(`${destination}/Img`))
    .pipe(gulpIgnore.exclude('*.svg'))
    .pipe(gulpIgnore.exclude('**/OPTIMIZED*'))
    .pipe(imageResize({
      width: ImageResizeMobile,
      quelity: 1
    }))
    .pipe(rename(function (path) {
      path.basename += `-${ImageResizeMobile}`;
    }))
    .pipe(gulp.dest(`${destination}/Img`));
});

gulp.task('html', function() {
  return gulp.src(htmlSource)
    .pipe(htmlmin(optionsMinHTML))
    .pipe(gulp.dest(`${destination}/Partial`));
});

gulp.task('prod', () => {
  return gulp.src(indexSource)
    .pipe(plugins.plumber())
    .pipe(plugins.useref())
    .pipe(gulpif('*.html', htmlmin(optionsMinHTML)))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss({debug: false}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    })))
    .pipe(gulp.dest(destination));
});

gulp.task('build', (callback) => {
  runSequence('clean', 'styles', 'html', 'resizeImg', 'prod', callback);
});

gulp.task('docs', ['docco', 'jsdoc'], () => {
  
});

// Tâche par défaut
gulp.task('default', ['docs', 'styles'], () => {
  
});