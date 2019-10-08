module.exports = function (o) {
	let gulp = o.gulp;
	let $ = o.$;
	
	let assetsopts = {
		basePath: o.dst
	};

	let postcssOpts  = [
		$.postcssAssets(assetsopts),
		$.cssMqpacker({ sort: true }),
		$.postcssPrettify,
		$.autoprefixer({	grid: 'autoplace'	}),
		// $.cssnano()
	];

	return function() {
		return gulp.src(o.src)
			.pipe($.sourcemaps.init())
			.pipe($.sassGlob())
			.pipe($.sass().on('error', $.sass.logError))
			.pipe($.postcss(postcssOpts))
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(o.dst));
	};
};