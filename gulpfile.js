var gulp    = require('gulp')
,   jshint  = require('gulp-jshint')
,   uglify  = require('gulp-uglify')
,   rename  = require('gulp-rename');

var src = 'src/*.js';

gulp.task('lint', function(){
  gulp.src(src)
    .pipe(jshint({
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      boss: true,
      eqnull: true,
      browser: true,
      laxcomma: true,
      globals: {
        'jQuery': true
      }
    }))
    .pipe(jshint.reporter('default'))
});

gulp.task('min', function(){
  gulp.src(src)
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['lint', 'min']);