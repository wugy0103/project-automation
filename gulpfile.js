'use strict';
const gulp = require('gulp');

gulp.task('default',['es6toes5AndUglify','cleancss','imagemin','htmlmin','copyfile'],()=>{
	console.log('gulp自动化完毕');
})

// 先将es6语法转出es5语法后再将js文件进行压缩
const gulpbabel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('es6toes5AndUglify',()=>{
	gulp.src(['./src/controllers/*.js','./src/modules/*.js','./src/routes/*.js'],{base:'src'})
	.pipe(gulpbabel({
		presets:['es2015']
	}))
	.pipe(uglify())
	.pipe(gulp.dest('dist'))

	console.log('es6toes5AndUglify执行完成');
})

// 压缩css文件
const cleancss = require('gulp-clean-css');
const rev = require('gulp-rev');
gulp.task('cleancss',()=>{
	gulp.src('./src/statics/css/*.css',{base:'src'})
	.pipe(cleancss({compatibility:'ie8'}))
	.pipe(rev())
	.pipe(gulp.dest('dist'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('./src/rev'));


	console.log('cleancss执行完成');
})

// 压缩图片资源
const imagemin = require('gulp-imagemin');

gulp.task('imagemin',()=>{
	gulp.src('./src/statics/images/*.*',{base:'src'})
	.pipe(imagemin())
	.pipe(gulp.dest('dist'));


	console.log('imagemin执行完成');
})

// 压缩html
const htmlmin = require('gulp-htmlmin');
const revCollector = require('gulp-rev-collector')
gulp.task('htmlmin',()=>{
	gulp.src(['./src/views/*.html','./src/rev/*.json'],{base:'src'})
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(revCollector())
	.pipe(gulp.dest('dist'));

	console.log('htmlmin执行完成');
})

// 利用gulp-copy 插件实现文件拷贝
const copyfile = require('gulp-copy');

gulp.task('copyfile',()=>{
	gulp.src('./src/statics/bowersrc/**/*.*',{base:'src'})
	.pipe(copyfile('dist',{prefix:1}))

	console.log('copyfile执行完成');

})





















