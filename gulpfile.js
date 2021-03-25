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

const uglify = require('gulp-uglify');
const { series } = require('gulp');

const sync = require('browser-sync').create();

exports.styles = styles = () => {
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
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
    cb();
}

const imgmin = () => {
    return gulp.src('src/img/*.*')
        .pipe(imagemin())
        .pipe(rename((p) => {
            p.basename += ".min"
        }))
        .pipe(gulp.dest('src/img'))
        .pipe(sync.stream());
}

const towebp = () => {
    return gulp.src('src/img/*.min.{jpg,png}')
        .pipe(webp({
            quality: 50
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(sync.stream()),

        gulp.src('src/img/*.min.svg')
            .pipe(gulp.dest('dist/img'))
            .pipe(sync.stream());
}

exports.jsmin = jsmin = () => {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename((p) => {
            p.basename += ".min"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
}

exports.html = html = () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
}

const browsersync = (start) => {
    sync.init({
        server: {
            baseDir: 'src'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    start();
}

const watcher = () => {
    gulp.watch('src/*.html').on('change', sync.reload);
    gulp.watch('src/*.scss', gulp.series('styles'));
    gulp.watch('src/*.js', gulp.series('jsmin'));
}

exports.images = series(imagemin, towebp);
exports.default = series(styles, jsmin, html, browsersync, watcher);

