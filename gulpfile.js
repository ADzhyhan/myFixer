const gulp = require('gulp');
const sass = require('gulp-sass');
const njk = require('gulp-nunjucks');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function nunjucks() {
  return gulp.src('./src/templates/*.html')
    .pipe(njk.compile())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

async function build() {
  await style();
  await nunjucks();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: 'index.html'
    }
  });
  gulp.watch('./src/sass/**/*.scss', style);
  gulp.watch('./src/templates/*.html', nunjucks);
}

exports.style = style;
exports.build = build;
exports.watch = watch;
exports.nunjucks = nunjucks;
exports.default = build;