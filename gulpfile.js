var gulp = require('gulp')
, sourcemaps = require('gulp-sourcemaps')
, sass = require('gulp-sass')
, concat = require('gulp-concat')
, CacheBuster = require('gulp-cachebust')
, print = require('gulp-print')
, babel = require('gulp-babel')
, uglify = require('gulp-uglify')
, templateCache = require('gulp-angular-templatecache');


var cachebust = new CacheBuster();

gulp.task('build-css', function(){
   return gulp.src('./style/**/*.scss') //tell gulp to get EVERYTHING inside the styles folder.
       .pipe(sourcemaps.init()) //pipe (take the results from the previous thing and do something). PIPE results to sourcemaps.init() function.
       .pipe(sass()) //process SASS. Turn sass into CSS.
       .pipe(cachebust.resources()) //Keep a copy of something and don't get the new thing. Blow up the old stuff, put in the new stuff!
       .pipe(concat('styles.css')) //put all the sass files into ONE long file. Makes things faster
       .pipe(sourcemaps.write('./maps')) //write out sourcemaps
       .pipe(gulp.dest('./dist')); //stick the sourcemaps into the dist folder.
})

gulp.task('build-js', function() {
   return gulp.src('js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('templates', function() {
    return gulp.src('./views/**/*.html')
      .pipe(templateCache('templateBundle.js', {
          module: 'templatescache',
          standalone: true,
          root: './app/'
      }))
      .pipe(gulp.dest('./dist'));
});


gulp.task('build', ['build-css', 'build-js', 'templates'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js', './views/**/*.html'], ['build']);
});
