const gulp = require('gulp');
const server = require('browser-sync').create();

const pugToHtml = require('./pugToHtml');
const style = require('./style');
const script = require('./script');
const images = require('./images');
const fonts = require('./fonts');
const svgSprite = require('./svgSprite');

function reload(callback){
    server.reload();
    callback();
};

module.exports = function serve(callback){
    server.init({
        server: 'build',
        notify: false,
        open: true,
    });
    gulp.watch('src/pages/**/*.pug', gulp.series(pugToHtml, reload(callback)));
    gulp.watch('src/style/**/*.scss', gulp.series(style, reload(callback)));
    gulp.watch('src/js/**/*.js', gulp.series(script, reload(callback)));
    gulp.watch(['src/img/**/*.{png,svg,jpg,jpeg,gif}', '!src/img/sprite/**/*.*'], gulp.series(images, reload(callback)));
    gulp.watch('src/fonts/**/*.{eot,woff2,woff,ttf,svg}', gulp.series(fonts, reload(callback)));
    gulp.watch('src/img/sprite/**/*.svg', gulp.series(svgSprite, reload(callback)));
    return callback();
};