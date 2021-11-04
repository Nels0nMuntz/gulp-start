const gulp = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
// const eslint = require('gulp-eslint');
const argv = require('yargs').argv;

module.exports = function script(){
    return gulp.src('src/js/main.js')
        .pipe(plumber())
        // .pipe(eslint())
        // .pipe(eslint.format())
        .pipe(webpack({
            mode: process.env.NODE_ENV,
            output: {
                filename: argv.production ? '[name].min.js' : '[name].js',
            },
            module: {
                rules: [
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                            },
                        }
                    },
                    {
                        test: /\.ts/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'ts-loader',
                        },
                    },
                ]
            }
        }))
    .pipe(gulp.dest('build/js'))
};