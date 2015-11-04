import 'angular';
import 'angular-mocks/angular-mocks';
import 'phantomjs-polyfill';

window.ngInject = (fn) => fn;

var appContext = require.context('../src', true, /\.js$/);
appContext.keys().forEach(appContext);
