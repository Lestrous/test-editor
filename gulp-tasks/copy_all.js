module.exports = function (o) {
	let gulp = o.gulp;
	let $ = o.$;

	const everything = {
		// favicon
		favicon: o.paths.favicon_app_src,

		// fonts
		Roboto: o.paths.fonts_app_src + 'Roboto/*',
		Proxima_Nova: o.paths.fonts_app_src + 'Proxima_Nova/*',
		Gilroy: o.paths.fonts_app_src + 'Gilroy/*',

		// icon-fonts
		icon_fonts: o.paths.iconfonts_app_src,

		// slick
		slick: o.paths.slick_src
	};
	
	// all except fonts
	const take = [
		// favicon
		everything.favicon,

		// icon-fonts
		everything.icon_fonts,

		// slick
		everything.slick
	];
	
	const fonts = [
		// everything.Roboto,
		// everything.Proxima_Nova,
		everything.Gilroy
	];
	
	const dont_take = [
		//fonts templates
		'!' + o.paths.fonts_app_src + '**/*.scss',

		// my-icon-font
		'!src/icon-fonts/my-font{,/**,/**/*}', '!src/icon-fonts/*.scss',

		// scss in slick
		'!src/slick/*.scss',

		// файлы для существования папок в git
		'!src/**/service_file.txt'
	];

	return function(done) {
		gulp.src(take.concat(fonts, dont_take), {base: 'src'})
			.pipe(gulp.dest(o.dst));

		fonts.forEach(font => {
			gulp.src(font + '.scss')
				.pipe(gulp.dest('src/tmp/scss/'));
		});

		done();
	};
};