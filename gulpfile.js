const { src, dest, parallel, series, watch } = require('gulp');
const rename = require('gulp-rename');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const del = require('del');

const originJsPaths = ['./js/xuer-blog.js', './js/toc.js'];
const delJsPaths = ['./js/xuer-blog.min.js', './js/toc.min.js'];
const delCssPaths = ['./css/xuer-blog.css', './css/xuer-blog.min.css'];

/**
 * 清除之前生成的旧文件
 * @param {string} delType 删除类型
 */
const delTask = delType =>
  function delTask() {
    const delTypeMap = {
      css: delCssPaths,
      js: delJsPaths,
      all: [].concat(delCssPaths, delJsPaths),
    };

    return del(delTypeMap[delType]);
  };

/**
 * 处理 css 文件
 */
const cssTask = function() {
  return src(`./less/xuer-blog.less`)
    .pipe(
      less({
        paths: [`./less/`],
      })
    ) // less 转译
    .pipe(rename('xuer-blog.css')) // 重命名
    .pipe(dest('./css/')) // 生成转译后 css 文件
    .pipe(
      autoprefixer({
        cascade: false,
      })
    ) // 自动补全浏览器兼容属性
    .pipe(csso()) // css 压缩
    .pipe(rename('xuer-blog.min.css')) // 重命名
    .pipe(dest(`./css/`)); // 生成压缩后的 css 文件
};

/**
 * 处理 js 文件
 */
const jsTask = function() {
  return src(originJsPaths)
    .pipe(uglify())
    .pipe(
      rename(path => {
        return {
          dirname: path.dirname,
          basename: path.basename + '.min',
          extname: path.extname,
        };
      })
    )
    .pipe(dest('./js/'));
};

exports.css = cssTask;
exports.del = delTask('all');
exports.js = jsTask;

exports.watch = function() {
  watch(
    originJsPaths,
    {
      ignoreInitial: false,
    },
    series(delTask('js'), jsTask)
  );

  watch(
    './less/*',
    {
      ignoreInitial: false,
    },
    series(delTask('css'), cssTask)
  );
};

exports.default = series(delTask('all'), parallel(cssTask, jsTask));
