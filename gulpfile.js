var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');

gulp.task('default', function(){
	//var watcher = gulp.watch('js/src/**/*.js', ['lint', 'scripts']);
	//watcher.on('change', function(event) {
	//	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	//});
	gulp.watch('./js/src/**/*.js', ['lint', 'compress', 'scripts']);
});

gulp.task('scripts', function(){
	var bundler = browserify({
		entries: ['./js/src/script.js']
	});
	return bundler.bundle()
	.on('error', function(err) {
		console.log(err.message);
		gutil.beep(); //beep bij fout
		this.emit('end');
	})
	.pipe(source('script.dist.js'))
	.pipe(gulp.dest('./js'));
});

gulp.task('lint', function() {
  return gulp.src('js/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('compress', function() {
  gulp.src('./js/script.dist.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});


