var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    minifyCSS = require('gulp-minify-css'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),

gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(gulp.dest('dist'));
});
gulp.task('bower', function () {
    gulp.src('app/index.html')
        .pipe(wiredep({
            directory : "app/bower"
        }))
        .pipe(gulp.dest('app/'));
});


gulp.task('connect', function () {
    connect.server({
        root: "app/",
        //port: 9000,
        livereload: true
    });
});

gulp.task('css', function () {
    gulp.src('app/css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest('app/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(connect.reload());
});
gulp.task('watch', function(){
    gulp.watch('css/*.css',['css'])
    gulp.watch('app/*.html',['html'])
    gulp.watch('bower.json',['bower'])
});

gulp.task('default',['connect','watch']);