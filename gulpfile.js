var gulp = require('gulp');

var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var compressor = require('gulp-compressor');

var paths = {
  src: {
    less: './assets/less/*.less',
    scripts: './assets/scripts/*.js',
    images: './assets/images/**/*',
    vendor: [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/voronoi/rhill-voronoi-core.js'
    ]
  },
  dest: {
    less: './dist/styles/',
    scripts: './dist/scripts/',
    images: './dist/images/',
    vendor: './dist/scripts/'
  }
};

gulp.task('scripts', function() {
  return gulp.src(paths.src.scripts)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('less', function() {
  return gulp.src(paths.src.less)
    .pipe(less())
    .pipe(compressor())
    .pipe(gulp.dest(paths.dest.less));
});

gulp.task('images', function() {
  return gulp.src(paths.src.images)
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(paths.dest.images));
});

gulp.task('vendor', function() {
  return gulp.src(paths.src.vendor)
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.dest.vendor));
});

gulp.task('default', ['scripts', 'less', 'images', 'vendor']);

gulp.task('watch', function () {
  gulp.watch(paths.src.scripts, ['scripts']);
  gulp.watch(paths.src.less, ['less']);
  gulp.watch(paths.src.images, ['images']);
});
