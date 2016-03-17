'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var config = {
  assets: 'public',
  production: !!$.util.env.production
};

// Styles
gulp.task('compile-styles', function() {
  return gulp.src('./app/styles/application.scss')
    .pipe($.sass({
      indentedSyntax: false,
      errLogToConsole: true
    }))
    .pipe(gulp.dest(config.assets + '/styles'))
    .pipe($.size());
});

gulp.task('watch-styles', function() {
  gulp.watch('./app/styles/**/*.scss', ['compile-styles']);
});

// Scripts
gulp.task('compile-scripts', function() {
  return browserify({
      entries: './app/scripts/index.jsx',
      extensions: ['.js', '.jsx'],
      paths: ['./node_modules', './app/scripts']
    })
    .transform('babelify')
    .bundle()
    .pipe(source('application.js'))
    .pipe($.buffer())
    .pipe(config.production ? $.uglify() : $.util.noop())
    .pipe(config.production ? $.stripDebug() : $.util.noop())
    .pipe(gulp.dest(config.assets + '/scripts'))
    .pipe($.size());
});

gulp.task('watch-scripts', function() {
  gulp.watch('./app/scripts/**/*.{js,jsx}', ['compile-scripts']);
});

// Build
gulp.task('build', ['compile-styles', 'compile-scripts']);

// Watch
gulp.task('watch', ['watch-styles', 'watch-scripts']);

// Development
gulp.task('dev', ['watch', 'build']);

// Default task
gulp.task('default', ['build']);
