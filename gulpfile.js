var gulp = require('gulp');
var tslint = require('gulp-tslint');
var exec = require('child_process').exec;
var jasmine = require('gulp-jasmine');
var gulp = require('gulp-help')(gulp);
var tsconfig = require('gulp-tsconfig-files');
var gulpSequence = require('gulp-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var rimraf = require('rimraf');
var plumber = require('gulp-plumber')
require('dotbin');

var tsFilesGlob = (function (c) {
  return c.filesGlob || c.files || '**/*.ts';
})(require('./tsconfig.json'));

var appName = (function (p) {
  return p.name;
})(require('./package.json'));

gulp.task('default', ['build', 'watch']);

gulp.task('update-tsconfig', 'Update files section in tsconfig.json', function () {
  gulp.src(tsFilesGlob).pipe(tsconfig());
});

gulp.task('clean', 'Cleans the generated js files from lib directory', function () {
  return rimraf('./lib/**/*');
});

gulp.task('tslint', 'Lints all TypeScript source files', function () {
  return gulp.src(tsFilesGlob)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('copy-typings', function() {
  return gulp.src('./src/**/*.d.ts')
    .pipe(gulp.dest('./lib'));
});

gulp.task('_build', 'INTERNAL TASK - Compiles all TypeScript source files', function (cb) {
  return gulp.src('./src/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(gulp.dest('./lib'));
});

gulp.task('build', 'Compiles all TypeScript source files and updates module references', function(callback) {
    rimraf.sync('./lib');
    return gulpSequence('tslint', ['update-tsconfig'], ['_build', 'copy-typings'])(callback);
});

gulp.task('test', 'Runs the Jasmine test specs', ['test-build-src', 'test-build-test'], function () {
    var pipeline = gulp.src('./.test/**/*.js');
    pipeline.pipe(plumber())
    return pipeline.pipe(jasmine());
});

gulp.task('test-build-src', ['test-clean'], function() {
  return gulp.src('./src/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(gulp.dest('./.test/src'));
});

gulp.task('test-build-test', ['test-clean'], function() {
  return gulp.src('./test/**/*.ts')
    .pipe(ts({target: 'es5'}))
    .pipe(gulp.dest('./.test/test'));
});

gulp.task('test-clean', function() {
  return rimraf.sync('./.test');
})

gulp.task('watch', 'Watches ts source files and runs build on change', function () {
  gulp.watch('./src/**/*.ts', ['build', 'test']);
  gulp.watch('./test/**/*.ts', ['test']);
});
