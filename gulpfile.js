const gulp = require('gulp');

const clean = require('./gulp/tasks/clean');
const pugToHtml = require('./gulp/tasks/pugToHtml');
const style = require('./gulp/tasks/style');
const script = require('./gulp/tasks/script');
const images = require('./gulp/tasks/images');
const fonts = require('./gulp/tasks/fonts');
const svgSprite = require('./gulp/tasks/svgSprite');
const serve = require('./gulp/tasks/serve');

function setMode(mode = 'development'){
    return function(callback){
        process.env.NODE_ENV = mode;
        callback();
    };
};

const tasks = gulp.parallel(pugToHtml, style, script, images, fonts, svgSprite);
const build = gulp.series(clean, tasks);

module.exports = {
    start: gulp.series(setMode('development'), build, serve),
    build: gulp.series(setMode('production'), build),
};
