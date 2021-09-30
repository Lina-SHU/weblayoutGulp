const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function copyHTML() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
}

function scss() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
}

// Static server
function browser() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    port: 8080
  });
}

// 監聽各檔案是否修改
function watch() {
  gulp.watch('./src/**/*.html', gulp.series(copyHTML)); // 在 html 內有間聽到更新儲存時會執行
  gulp.watch('./src/scss/**/*.scss', gulp.series(scss));
}


exports.default = gulp.series(copyHTML, scss, gulp.parallel(browser, watch));
// 同時執行 watch 跟 browser 在監聽觸發時再重新開啟瀏覽器