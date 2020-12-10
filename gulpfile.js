var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

var runSass = function() {
  return gulp.src('src/css/app.scss')
    .pipe (sourcemaps.init())
    .pipe(sass())
    .pipe(
        cleanCSS({
            compatibility: 'ie8'
        })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
}

var html = function() {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
}

var fonts = function() {
    return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
}

var images = function() {
    return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
}

var watch = function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })

    gulp.watch('src/*.html', html).on('change', browserSync.reload)
    gulp.watch('src/css/app.scss', runSass)
    gulp.watch('src/fonts/*', fonts)
    gulp.watch('src/img/*', images)
}

function defaultTask(cb) {
  // place code for your default task here
  html();
  runSass();
  fonts();
  images();
  watch();
  cb();

}



exports.default = defaultTask