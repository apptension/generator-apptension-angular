import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import ngTouch from 'angular-touch';
import uirouter from 'angular-ui-router';

/**
 * Modules
 */
import routing from './app.routes';
import config from '../config';
import error404 from './error404';
import home from './home';

/**
 * Local imports
 */
import AppController from './app.controller';


export default angular.module('app', [
  ngCookies,
  ngSanitize,
  ngTouch,
  uirouter,
  config,
  error404,
  home
])
  .config(routing)
  .controller('AppController', AppController)
  .name;
