var gulp = require('gulp');
var runSequence = require('run-sequence');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');


var tasks = require('apptension-tools/gulp')({
  webpack: {
    plugins: [
      new NgAnnotatePlugin({add: true})
    ]
  },
  webpackDevServer: {
    historyApiFallback: true
  },
  sass: {
    includePaths: [
      require('bourbon').includePaths,
      require('node-neat').includePaths
    ]
  }
});
var env = tasks.env;

gulp.task('webpack', tasks.webpack(false));
gulp.task('webpack:watch', tasks.webpack(true));

gulp.task('compile-index', tasks.compileIndex);
gulp.task('compile-index:watch', ['compile-index'], function () {
  return gulp.watch(tasks.config.paths.index, ['compile-index']);
});

gulp.task('sass', tasks.sass);
gulp.task('sass:watch', ['sass'], function () {
  return gulp.watch(tasks.config.paths.sass, ['sass']);
});

gulp.task('eslint', tasks.eslint);
gulp.task('eslint:watch', ['eslint'], function () {
  gulp.watch(tasks.config.paths.eslint, ['eslint']);
});

gulp.task('spritesmith', tasks.spritesmith);
gulp.task('spritesmith:watch', function () {
  gulp.watch(tasks.config.paths.sprites, ['spritesmith']);
});

gulp.task('images', tasks.images);
gulp.task('images:watch', ['images'], function () {
  gulp.watch(tasks.config.paths.images, ['images']);
});

gulp.task('copy-public-assets', tasks.copyPublicAssets);
gulp.task('copy-public-assets:watch', ['copy-public-assets'], function () {
  gulp.watch(tasks.config.paths.publicAssets, ['copy-public-assets']);
});

gulp.task('copy-htaccess', tasks.copyHtaccess);

gulp.task('test', tasks.karma(false));
gulp.task('test:watch', tasks.karma(true));

gulp.task('clean', tasks.clean);

gulp.task('rev', tasks.rev);

gulp.task('browser-sync', tasks.browserSync);

gulp.task('serve', function (callback) {
  env.set(env.DEVELOPMENT);
  runSequence(
    'clean',
    'eslint:watch',
    'spritesmith',
    ['webpack:watch', 'compile-index:watch', 'sass:watch', 'spritesmith:watch', 'images:watch', 'copy-public-assets:watch'],
    'browser-sync',
    callback
  );
});

gulp.task('serve:dist', function (callback) {
  runSequence(
    'default',
    'browser-sync',
    callback
  );
});

gulp.task('default', function (callback) {
  env.set(env.PRODUCTION);
  runSequence(
    'clean',
    'eslint',
    'test',
    'spritesmith',
    ['webpack', 'sass', 'images', 'copy-htaccess'],
    'copy-public-assets',
    'rev',
    'compile-index',
    callback
  );
});
