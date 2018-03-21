      "use strict";

      var gulp = require('gulp');
      var sass = require('gulp-sass');
      var nodemon = require('gulp-nodemon');
      var browserSync = require('browser-sync').create();
      var uglify = require('gulp-uglify');

      gulp.task('default', ['nodemon'], function(){
        gulp.watch("src/sass/*.scss", ['sass']);
        gulp.watch("src/js/*.js", ['js']);
        gulp.watch("views/*.ejs").on('change',browserSync.reload);   //Manual Reloading
      })

      // Process JS files and return the stream.
      gulp.task('js', function () {
          return gulp.src('src/js/*.js')
              .pipe(uglify())
              .pipe(gulp.dest('public/javascripts'));
      });

      // Compile SASS to CSS.
      gulp.task('sass', function(){
          return gulp.src('src/sass/*.scss')
                   .pipe(sass().on('error', sass.logError))
                   .pipe(gulp.dest('public/stylesheets'))
                   .pipe(browserSync.stream());
      });


      // Setup proxy for local server.
      gulp.task('browser-sync', ['js','sass'], function() {
      	browserSync.init(null, {
      		proxy: "http://localhost:3000",
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


