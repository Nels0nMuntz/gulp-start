const gulp = require('gulp');

module.exports = function images(){
    return gulp.src('src/img/**/*.{png,svg,jpg,jpeg,gif}')
        .pipe(gulp.dest('build/img'))
};