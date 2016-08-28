/*
* @Author: Administrator
* @Date:   2016-08-23 21:07:36
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-23 22:12:22
*/
/*
* @Author: Administrator
* @Date:   2016-08-23 21:07:36
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-23 22:00:14
*/

'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task("script",function(){
	gulp.src(['./*.js','!./node_modules/**/*.js','!./gulpfile.js'])

	.pipe(concat("all.js"))
	.pipe(uglify())
	.pipe(gulp.dest("../dist"));
});