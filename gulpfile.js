var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cssimport = require("gulp-cssimport");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');


var paths = {
  scripts: [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/fullpage.js/vendors/jquery.easings.min.js',
    './node_modules/fullpage.js/vendors/scrolloverflow.js',
    './node_modules/fullpage.js/dist/jquery.fullpage.js',
    './assets/js/garden.js'
  ],
  scss: [
    './assets/scss/garden.scss',
  ]
};

gulp.task('sass', function () {
 return gulp.src('./assets/scss/garden.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./static/css'))
  .pipe(notify('SCSS compiled...'));
});

gulp.task('js', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('garden.js'))
    .pipe(gulp.dest('./static/js'))
    .pipe(notify('JS compiled...'));
});

gulp.task('production', function() {
  gulp.src('./static/css/garden.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./static/css'))
    .pipe(notify('CSS minified...'));

  gulp.src('./static/js/garden.js')
    .pipe(uglify())
    .pipe(gulp.dest('./static/js'))
    .pipe(notify('JS minified...'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./assets/js/**/*.js', ['js']);
});

// default task
gulp.task('default', ['watch', 'sass', 'js']);
