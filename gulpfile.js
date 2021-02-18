var syntax = "sass"; // Syntax: sass or scss;

var gulp = require("gulp"),
    gutil = require("gulp-util"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    cleancss = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    autoprefixer = require("gulp-autoprefixer"),
    notify = require("gulp-notify"),
    rsync = require("gulp-rsync"),
    imagemin = require("gulp-imagemin");

gulp.task("imagemin", () =>
    gulp
        .src("img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"))
);

gulp.task("browser-sync", function() {
    browserSync.init({
        server: "./"
    });
});

gulp.task("styles", function() {
    return gulp
        .src(syntax + "/**/*." + syntax + "")
        .pipe(sass({ outputStyle: "expand" }).on("error", notify.onError()))
        .pipe(rename({ suffix: ".min", prefix: "" }))
        .pipe(autoprefixer(["last 15 versions"]))
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task("js", function() {
    return (
        gulp
            .src([
                "js/script.js" // Always at the end
            ])
            .pipe(concat("scripts.min.js"))
            // .pipe(uglify()) // Mifify js (opt.)
            .pipe(gulp.dest("js"))
            .pipe(browserSync.reload({ stream: true }))
    );
});

gulp.task("watch", function() {
    gulp.watch(syntax + "/**/*." + syntax + "", gulp.parallel("styles"));
    gulp.watch(["libs/**/*.js", "js/filters.js"], gulp.parallel("js"));
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task("default", gulp.parallel("watch", "styles", "js", "browser-sync"));
