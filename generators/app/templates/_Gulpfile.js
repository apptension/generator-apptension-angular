var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');


var tasks = require('apptension-tools/gulp')({
  domain: 'localhost',
  webpack: {
    plugins: [
      new NgAnnotatePlugin({add: true})
    ],
    module: {
      loaders: [
        {test: /\.html$/, loader: 'html'}
      ]
    },
    sassLoader: {
      includePaths: [
        require('bourbon').includePaths,
        require('node-neat').includePaths[1]
      ]
    }
  },
  webpackDevServer: {
    historyApiFallback: true
  }
});
var env = tasks.env;

gulp.task('webpack', tasks.webpack(false));
gulp.task('webpack:watch', tasks.webpack(true));

gulp.task('eslint', tasks.eslint);
gulp.task('eslint:watch', ['eslint'], function () {
  watch(tasks.config.watchPaths.eslint, function () {
    runSequence('eslint');
  });
});

gulp.task('copy-production', tasks.copyProduction);
gulp.task('zip-dist', tasks.zip);

gulp.task('test', tasks.karma(false));
gulp.task('test:watch', tasks.karma(true));

gulp.task('clean', tasks.clean);

gulp.task('browser-sync', tasks.browserSync);

gulp.task('serve', function (callback) {
  env.set(env.DEVELOPMENT);
  runSequence(
    'clean',
    'eslint:watch',
    'webpack:watch',
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
    'webpack',
    'copy-production',
    'zip-dist',
    callback
  );
});
