/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var shell = require('gulp-shell');

gulp.task('server', function()
{
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(require('connect-livereload')({port:35729}))
        .use(serveStatic('three-project'))
        .use(serveIndex('three-project'));

    require('http').createServer(app)
        .listen(9001)
        .on('listening', function()
        {
            console.log('Started a web server on http://localhost:9001');
        });
});

gulp.task('develop', ['server'], function() {
    $.livereload.listen();

    gulp.watch([
        'three-project/**/*'
    ]).on('change', $.livereload.changed);
});

gulp.task('default', function()
{
    gulp.start('develop');
});
