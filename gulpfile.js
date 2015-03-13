var gulp    = require('gulp')
,   _       = require('lodash')
,   jshint  = require('gulp-jshint')
,   uglify  = require('gulp-uglify')
,   rename  = require('gulp-rename')
,   bump    = require('gulp-bump')
,   argv    = require('yargs').argv
,   header  = require('gulp-header')
,   strip   = require('gulp-strip-banner');

var today = new Date();

var src = 'src/*.js';
var pkg = require('./package.json');
var banner = '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        today.getFullYear() + '-' + ( today.getMonth() < 10 ? '0' : '' ) + ( today.getMonth() + 1 ) + '-' + today.getDate() + '\n' +
        ( pkg.homepage ? '* <%= pkg.homepage %>\n' : '' ) +
        '* Copyright (c) <%= today.getFullYear() %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */' + '\n\n';

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
    .pipe(strip())
    .pipe(header(banner, { pkg : pkg, today: today, _: _ } ))
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['lint', 'min']);

gulp.task('bump', function(){
  var type = argv.type || 'patch';
  gulp.src(['package.json', 'bower.json'])
    .pipe(bump({ type: type }))
    .pipe(gulp.dest('./'));
});