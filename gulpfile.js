var gulp = require('gulp');

var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var compressor = require('gulp-compressor');
var del = require('del');

var paths = {
  src: {
    less: './assets/less/*.less',
    scripts: './assets/scripts/*.js',
    images: './assets/images/**/*',
    vendor_scripts: [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/fotorama/fotorama.js',
      './bower_components/voronoi/rhill-voronoi-core.js',
      './bower_components/matchHeight/jquery.matchHeight.js'
    ],
    vendor_styles: [
      './bower_components/fotorama/fotorama.css',
      './bower_components/monosocialiconsfont/monosocialiconsfont.css'
    ],
    vendor_fonts_css: [
      './bower_components/monosocialiconsfont/monosocialiconsfont.css'
    ],
    vendor_fonts_font: [
      './bower_components/monosocialiconsfont/*.eot',
      './bower_components/monosocialiconsfont/*.otf',
      './bower_components/monosocialiconsfont/*.svg',
      './bower_components/monosocialiconsfont/*.ttf',
      './bower_components/monosocialiconsfont/*.woff'
    ]
  },
  dest: {
    less: './dist/styles/',
    scripts: './dist/scripts/',
    images: './dist/images/',
    vendor_scripts: './dist/scripts/',
    vendor_styles: './dist/styles/',
    vendor_fonts: './dist/fonts/'
  }
};

gulp.task('scripts', function () {
  return gulp.src(paths.src.scripts)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('less', function () {
  return gulp.src(paths.src.less)
    .pipe(less())
    .pipe(compressor())
    .pipe(gulp.dest(paths.dest.less));
});

gulp.task('images', function () {
  return gulp.src(paths.src.images)
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(paths.dest.images));
});

gulp.task('vendor_scripts', function () {
  return gulp.src(paths.src.vendor_scripts)
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.dest.vendor_scripts));
});

gulp.task('vendor_styles', function () {
  return gulp.src(paths.src.vendor_styles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.dest.vendor_styles));
});

gulp.task('vendor_fonts', function () {
  gulp.src(paths.src.vendor_fonts_css)
    .pipe(concat('fonts.css'))
    .pipe(gulp.dest(paths.dest.vendor_fonts));
  return gulp.src(paths.src.vendor_fonts_font)
    .pipe(gulp.dest(paths.dest.vendor_fonts));
});

gulp.task('clean', function () {
  del('./dist');
});

gulp.task('default', ['scripts', 'less', 'images', 'vendor_scripts', 'vendor_styles', 'vendor_styles', 'vendor_fonts']);
gulp.task('build', ['clean', 'default']);

gulp.task('watch', function () {
  gulp.watch(paths.src.scripts, ['scripts']);
  gulp.watch(paths.src.less, ['less']);
  gulp.watch(paths.src.images, ['images']);
});
