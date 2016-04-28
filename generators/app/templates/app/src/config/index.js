import envConfig from 'env-config';
import angular from 'angular';
import translate from 'angular-translate';
import translateLocalStorage from 'angular-translate-storage-local';
import translateCookieStorage from 'angular-translate-storage-cookie';

import translateConfig from './translate.config';

export default angular.module('config', [
  translate,
  translateLocalStorage,
  translateCookieStorage
]).config(envConfig.translate ? translateConfig : () => {})
  .name;
