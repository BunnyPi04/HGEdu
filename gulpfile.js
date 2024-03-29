var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssnano = require('cssnano');
var concat = require('gulp-concat');

gulp.task('css', async function() {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/chart.js/dist/Chart.min.css',
            'source/css/*.css'
        ])
        // .pipe(cssnano())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('source/assets/css/'))
        .pipe(gulp.dest('../resources/assets/css/'))
});
gulp.task('minify', async function () {
    return gulp.src([
            'node_modules/moment/min/moment.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/chart.js/dist/Chart.min.js',
            'source/js/*.js',
            'node_modules/jquery-ui-dist/jquery-ui.js',
    ])
        // .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('source/assets/js/'))
        .pipe(gulp.dest('../resources/assets/js/'))
});
gulp.task('cpjs', async function () {
    return gulp.src([
            'source/js/custom_script.js'])
        .pipe(concat('modules_script.js'))
        .pipe(gulp.dest('source/assets/js/'))
        .pipe(gulp.dest('../resources/assets/js/'))
});
gulp.task('default', function(cb) {
    gulp.series(
        'css',
        'minify',
        'cpjs'
    )(cb);
});
