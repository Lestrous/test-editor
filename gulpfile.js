'use strict';

const gulp  = require('gulp');
const $ 		= require('gulp-load-plugins')({	pattern: '*'	});

const src    = 'src/';
const styles = 'src/styles/';

const paths = {
	styles_src:						[styles + '**', src + 'Components/**/*.scss'],
	styles_dst:  					src,

	scss_app_src: 				styles + 'app.scss',
	// scss_tmp_dst: 				src + 'tmp/scss/',

	// img_app_src:		 			src + 'img/*',

	// sprite_app_src:		  	src + 'sprite/*.png',
	// sprite_working_dst:		working + 'sprite/',

	// fonts_app_src:				src + 'fonts/',

	// favicon_app_src:			src + 'favicon/*',

	// slick_src:						src + 'slick/**'
};

function getTask(taskName, options) {
	options = options || {};
	options.gulp = gulp;
	options.$ = $;
	options.paths = paths;
	options.app = src;
	
	return require('./gulp-tasks/' + taskName)(options);
}

gulp.task('css', getTask('css', {
	src: paths.scss_app_src,
	dst: paths.styles_dst
}));
// gulp.task('copy_all', getTask('copy_all', {
// 	dst: working
// }));

// gulp.task('spritesmith', getTask('spritesmith', {
// 	src: paths.sprite_app_src,
// 	padding: 10,
// 	img_dst: paths.sprite_working_dst,
// 	scss_dst: paths.scss_tmp_dst
// }));

gulp.task('watcher', function() {
	// gulp.watch(paths.sprites_app_src, gulp.series('spritesmith', 'css'));
	gulp.watch(paths.styles_src, gulp.series('css'));
});

var gulp_group = [
	// 'copy_all',
	// 'spritesmith',
	'css'
];

gulp.task('default', gulp.series(gulp_group, 'watcher'));