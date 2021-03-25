const gulp = require('gulp');

const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const sync = require('browser-sync').create();

const uglify = require('gulp-uglify');

exports.styles = () => {
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
        .pipe(gulp.dest('src'))
        .pipe(sync.stream());
}

exports.imgmin = () => {
    return gulp.src('src/img/*.*')
        .pipe(imagemin())
        .pipe(rename((p) => {
            p.basename += ".min"
        }))
        .pipe(gulp.dest('src/img'))
        .pipe(sync.stream());
}

exports.towebp = () => {
    return gulp.src('src/img/*.min.{jpg,png}')
        .pipe(webp({
            quality: 50
        }))
        .pipe(gulp.dest('src/img'))
        .pipe(sync.stream());
}

exports.browsersync = (start) => {
    sync.init({
        server: {
            baseDir: 'src'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    start();

    gulp.watch('src/*.scss', gulp.series('styles'));
    gulp.watch('src/*.html').on('change', sync.reload);
}

