const {
    src, 
    dest,
    watch,
    parallel
} = require('gulp');
const sass = require('gulp-sass');
const stripDebug = require('gulp-strip-debug');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

function sass2css(done){ //done is in de docs cb
    return src("./public/source/app.scss") //want alles van de sccs is hierin gelinkt
    //inpluggen dat sass naar css omzet
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest("./public/dist/css/"))
    .pipe(browserSync.stream());

    done();
}

function imagesMin(done){
    return src('./public/preImages/**')
    //soorten images gebruiken
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
       .pipe(gulp.dest('./public/dist/images/'))
       .pipe(browserSync.stream())
       done();
};

function debug(done){
    return src('./public/javascripts/**.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('./public/dist/javascripts/'))
        .pipe(browserSync.stream())
        done()
};

function minifyJs(done){
    return src('./public/dist/javascripts/**.js')
          .pipe(minify())
          .pipe(gulp.dest('./public/dist/miniJavascripts/'))
}

watch("./public/images/",imagesMin);
watch("./public/source/**.scss", sass2css);

// parallel aanspreken van de twee gulps dat moeten doorlopen
//de debug functie doen we hier niet, enkel handmatig na coderen van goeie javascript
var build = gulp.series(gulp.parallel(imagesMin, sass2css));

//exporteren van de alle functies
module.exports.imagesMin = imagesMin;
module.exports.sass2css =  sass2css;
module.exports.debug =  debug;
module.exports.minifyJs =  minifyJs;

module.exports.build = build;

//enkel de default laten runnen door commando gulp
exports.default = build;

