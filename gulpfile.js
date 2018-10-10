var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var pug = require('gulp-pug');
var prettify = require('gulp-prettify');

var sassPaths = [
  'node_modules/normalize.scss/sass',
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

const jsFiles = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/feather-icons/dist/feather.js',
  './src/js/**/*.js'
];

const cssFiles = [
  'node_modules/slick-carousel/slick/slick.css',
  'node_modules/slick-carousel/slick/slick-theme.css'
];

gulp.task('sass', function() {
  return gulp
    .src('src/scss/app.scss')
    .pipe(
      $.sass({
        includePaths: sassPaths,
        outputStyle: 'compressed' // if css compressed **file size**
      }).on('error', $.sass.logError)
    )
    .pipe(
      $.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9']
      })
    )
    .pipe(gulp.dest('./css'));
});

gulp.task('static-files', () => {
  gulp.src(jsFiles).pipe(gulp.dest('./js'));
  gulp.src(cssFiles).pipe(gulp.dest('./css'));
});

gulp.task('pug', function buildHTML() {
  return gulp
    .src('src/pages/*.pug')
    .pipe(pug())
    .pipe(prettify())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['sass', 'pug', 'static-files'], function() {
  gulp.watch(['src/scss/**/*.scss', 'src/pages/**/*.pug'], ['sass', 'pug']);
});
