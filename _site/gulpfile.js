/*------------------------------------*\
    MODULES
\*------------------------------------*/

var autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    data = require('gulp-data'),
    del = require('del'),
    fs = require('fs'),
    gulp = require('gulp'),
    globImporter = require('sass-glob-importer'),
    merge = require('merge-stream'),
    nunjucksRender = require('gulp-nunjucks-render'),
    plumber = require('gulp-plumber'),
    prettify = require('gulp-prettify'),
    runSequence = require('run-sequence').use(gulp),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    svgmin = require('gulp-svgmin'),
    svgSymbols = require('gulp-svg-symbols'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    wrap = require('gulp-wrap');

/*------------------------------------*\
    GLOBAL CONSTS
\*------------------------------------*/

var SVG_PATH = 'svg',
    TEMPLATE_PATH = 'core/templates',
    SCRIPT_PATH = 'core/scripts',
    SCSS_PATH = 'core/scss',
    IMAGE_PATH = 'core/images',
    SVG_SYMBOL_PATH = IMAGE_PATH + '/icons',
    FONT_PATH = 'core/fonts',
    WEB_PATH = '.public',
    WEB_CSS_PATH = WEB_PATH + '/css',
    WEB_SCRIPT_PATH = WEB_PATH + '/scripts',
    WEB_IMAGE_PATH = WEB_PATH + '/images',
    WEB_FONT_PATH = WEB_PATH + '/fonts',
    WEBSITE_PATH = 'assets',
    WEBSITE_CSS_PATH = WEBSITE_PATH + '/css',
    WEBSITE_SCRIPT_PATH = WEBSITE_PATH + '/scripts',
    WEBSITE_IMAGE_PATH = WEBSITE_PATH + '/images',
    WEBSITE_FONT_PATH = WEBSITE_PATH + '/fonts',
    DATA_FILE = 'data.json';

/*------------------------------------*\
    TASKS
\*------------------------------------*/

// Clean the web path out
gulp.task('clean-web', function() {
    
    return del([WEB_PATH], {force: true});
});

// Find all SVG and smash into a symbols file
gulp.task('process-svg', function() {

    return gulp.src(SVG_PATH + '/*.svg')
                .pipe(svgmin())
                .pipe(svgSymbols({
                    templates: ['default-svg']
                }))
                .pipe(gulp.dest(SVG_SYMBOL_PATH));
});

// Process all the nunjucks templates
gulp.task('process-templates', function() {

    var contents = fs.readFileSync(DATA_FILE);

    return gulp.src(TEMPLATE_PATH + '/*.html')
                .pipe(data(function(file) {
                    return JSON.parse(contents);
                }))
                .pipe(nunjucksRender({
                    path: TEMPLATE_PATH
                }))
                .pipe(prettify({indent_size: 4}))
                .pipe(gulp.dest(WEB_PATH));
});

// Process sass
gulp.task('process-sass', function () {

    return gulp.src(SCSS_PATH + '/**/*.scss')
                .pipe(plumber())
                .pipe(sourcemaps.init())
                .pipe(sass({ importer: globImporter() }).on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(cleanCSS())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(WEB_PATH + '/css'));
});

// Process JavaScript libs
gulp.task('process-script-libs', function() {

    var sources = [
        SCRIPT_PATH + '/lib/*.js'
    ];

    return gulp.src(sources)
                .pipe(plumber())
                .pipe(concat('lib.js'))
                .pipe(uglify())
                .pipe(gulp.dest(WEB_PATH + '/scripts'));
});

// Process images
gulp.task('process-images', function() {

    return gulp.src([IMAGE_PATH + '/**/*'])
                .pipe(gulp.dest(WEB_PATH + '/images'));
});

// Process fonts
gulp.task('process-fonts', function() {

    return gulp.src([FONT_PATH + '/**/*'])
                .pipe(gulp.dest(WEB_PATH + '/fonts'));
});

// Copy assets from the WEB_PATH to the set website asset paths
gulp.task('website-assets', function() {

    // Image files
    var websiteImages = gulp.src([IMAGE_PATH + '/**/*'])
                            .pipe(gulp.dest(WEBSITE_IMAGE_PATH));

    // CSS files
    var websiteCSS = gulp.src([WEB_PATH + '/css/**/*'])
                            .pipe(gulp.dest(WEBSITE_CSS_PATH));

    // Script files
    var websiteScripts = gulp.src([WEB_PATH + '/scripts/**/*'])
                            .pipe(gulp.dest(WEBSITE_SCRIPT_PATH));

    // Font files
    var websiteFonts = gulp.src([WEB_PATH + '/fonts/**/*'])
                            .pipe(gulp.dest(WEBSITE_FONT_PATH));

    // Merge the mini tasks
    return merge(websiteImages, websiteCSS, websiteScripts, websiteFonts);

});

// Global watch task. This task should be run once you have finished with static templates and you are moving on to implementation.
// Set the various 'WEBSITE' paths at the top and run this task. All the watching and processing will happen much like 'gulp serve'.
gulp.task('watch', function() {

    // Run build then set watch targets in the callback
    runSequence('clean-web', 'process-svg', 'process-sass', 'process-images', 'process-fonts', 'website-assets', function() {

        // Watch for changes with SVG
        watch([SVG_PATH + '/*.svg'], function() { runSequence('process-svg', function() { gulp.start('website-assets'); }); });

        // Watch for changes with sass
        watch([SCSS_PATH + '/**/*.scss'], function() { runSequence('process-sass', function() { gulp.start('website-assets'); }); });

        // Watch for changes with images
        watch([IMAGE_PATH + '/**/*'], function() { runSequence('process-images', function() { gulp.start('website-assets'); }); });

        // Watch for changes with fonts
        watch([FONT_PATH + '/**/*'], function() { runSequence('process-fonts', function() { gulp.start('website-assets'); }); });
    });

});

gulp.task('default', function() {
    gulp.start('watch');
});
