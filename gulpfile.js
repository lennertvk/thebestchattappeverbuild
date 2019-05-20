const {
    src, 
    dest,
    watch,
    parallel
} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function sass2css(done){ //done is in de docs cb
    return src("./public/source/app.scss") //want alles van de sccs is hierin gelinkt

    //inpluggen dat sass naar css omzet
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest("./public/dist/css/"))
    .pipe(browserSync.stream());

    done();
}

watch("./public/source/**.scss", sass2css);

const imagemin = require('gulp-imagemin');
const gulp =require('gulp');

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

watch("./public/source/**.scss", sass2css);
watch("./public/images/", imagesMin);


module.exports.default = parallel(sass2css);
module.exports.imagesMin = parallel(imagesMin);



