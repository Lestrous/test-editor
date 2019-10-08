module.exports = function (o) {
	let gulp = o.gulp;
	let $ = o.$;

	let spritesmithopts = {
		imgName: 'sprite.png',
		cssName: '_sprite.scss',
		imgPath: 'sprite/sprite.png',
		algorithm: 'binary-tree',
		padding: o.padding,
		cssFormat: 'scss'
	};

	return function(done) {
		let spriteData = gulp.src([o.src, '!app/**/service_file.txt'], {since: gulp.lastRun('spritesmith')}) // путь, откуда берем картинки для спрайта
			.pipe($.imagemin())
			.pipe($.spritesmith(spritesmithopts));

		spriteData.img.pipe(gulp.dest(o.img_dst)) // путь, куда сохраняем картинку
		spriteData.css.pipe(gulp.dest(o.scss_dst)); // путь, куда сохраняем стили

		done();
	};
};