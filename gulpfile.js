const gulp = require('gulp');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
 
gulp.task('auto', () =>
    gulp.src('dist/css/bundle.css')
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('dist/css/'))
); 
gulp.task('concatCss', function () {
  return gulp.src('app/css/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('dist/css/'));
});


gulp.task('cssmin', function () {
    gulp.src('dist/css/bundle.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'));
}); 
gulp.task('sass', function () {
  return gulp.src('app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('app/sass/*.sass', ['sass']);
}); 



gulp.task('server', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['server'])