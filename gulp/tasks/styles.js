const gulp = require("gulp");
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require('gulp-sourcemaps');
const shorthand = require('gulp-shorthand');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename")


module.exports = function styles(){
    gulp.src("src/styles/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: true,
        }))
        // .pipe(shorthand())
        // .pipe(cleanCSS())
        .pipe(gulpif(argv.production, shorthand()))
        .pipe(gulpif(argv.production, cleanCSS()))
        .pipe(sourcemaps.write())
        .pipe(gulpif(argv.production, rename({ suffix: '.min' })))
        .pipe(gulp.dest('build/css'))
};