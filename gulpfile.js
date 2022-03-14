var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
 	sass        = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("theme/styles/sass/**/*.scss")
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer('last 3 versions'))
        .pipe(gulp.dest("theme/styles/"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
	gulp.src('theme/scripts/master.js')
		.pipe(plumber({
			errorHandler: function (error) { 
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(jshint.reporter('default'))
		.pipe(concat('master.min.js'))
		.pipe(uglify({ 
			//preserveComments: 'some' 
		}))
		.pipe(gulp.dest('theme/scripts/')) 
		.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./",
		notify: false, 
		ui: false
    });
 
    gulp.watch("theme/styles/sass/**/*.scss", gulp.series('sass'));
	gulp.watch('theme/scripts/**/*.js', gulp.series('scripts'));
    gulp.watch("*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));