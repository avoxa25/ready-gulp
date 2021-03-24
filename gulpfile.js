const gulp = require('gulp');

const plumber = require('gulp-plumber');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

const uglify = require('gulp-uglify');

const rename = require("gulp-rename");

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const styles = () => {
    return gulp.src('src/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(cleanCss())
    .pipe(rename((p) => {
        p.basename += '.min';
        p.extname = '.css';
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src'));
}

const svgmin = () => {
    return gulp.src('src/img/*.*')
    .pipe(imagemin())
    .pipe(rename((p) => {
        p.basename += ".min"
    }))
    .pipe(gulp.dest('src/img'));
}

const toWebp = () => {
    return gulp.src('src/img/*.min.{jpg,png}')
    .pipe(webp({
        quality: 50
    }))
    .pipe(gulp.dest('src/img'));;
}

exports.styles = styles;
exports.svgmin = svgmin;
exports.toWebp = toWebp;