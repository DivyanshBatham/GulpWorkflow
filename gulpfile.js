"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');

// var reload = browserSync.reload;

// LEARNING:
// Logs a message, run using `gulp message`. If not task is provided at the run time gulp will run the default task
// gulp.task("message", function(){
//   return console.log("gulp's Message Task Running.");
// })

// gulp.task('copyFiles', function(){
//   gulp.src('routes/*.js')
//       .pipe(gulp.dest('temp'));
// })

// gulp.task('imageMin', function(){
//   gulp.src('public/images/*')
//              .pipe(imageMin())
//              .pipe(gulp.dest('public/images-min'))
// })

// Uglify removes comments, semicolons, whitespaces.
// gulp.task('minifyJS', function(){
//   gulp.src('src/js/*.js')              // [NO RETURN] ?
//       .pipe(uglify())
//       .pipe(gulp.dest('public/javascripts'));
// });

// var concat = require('gulp-concat');
// Gulp-Concat concatenate multiple js files into 1.
// gulp.task('scripts',function(){
//   gulp.src('src/js/*.js')
//       .pipe(concat())
//       .pipe(gulp.dest('public/javascripts'));
// })



// gulp.task('default', ['sass','browserSync'], function(){
gulp.task('default', ['nodemon'], function(){
  gulp.watch("public/sass/**/*.scss", ['sass']);  // Watch .scss for changes, sass task inturn streams changes to .css
  // gulp.watch("views/**/*.ejs").on('change',browserSync.reload);   Manual Reloading

  // gulp.watch(["public/javascripts/**/*.js","views/*.ejs"], browserSync.reload); // Watch .js and .ejs for changes.
  gulp.watch("views/**/*.ejs").on('change',browserSync.reload);   //Manual Reloading
  gulp.watch("public/javascripts/**/*.js").on('change',browserSync.reload);   //Manual Reloading
})

// Process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        // .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'));
});

// Compile SASS to CSS.
gulp.task('sass', function(){
    // gulp.src('src/sass/*.scss')
    return gulp.src('src/sass/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('public/stylesheets'))
             .pipe(browserSync.stream());
             // .pipe(reload({stream: true}));
});


// Setup proxy for local server.
gulp.task('browser-sync', ['js','sass'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
    // files: ["public/**/*.*"],
    // browser: "google chrome",
    port: 7000,
	});
});


gulp.task('nodemon', ['browser-sync'], function(cb){
  var running = false;
  return nodemon({script: 'bin/www'}).on('start', function(){
    if(!running)
    {
      running = true;
      cb();
    }
  });
})

// gulp.task('nodemon', function(){
//   nodemon({
//     script: 'bin/www'
//   });
// });
