import envConfig from 'env-config';
import en from '../languages/en.json';

export default ngInject(function ($translateProvider) {
  $translateProvider
    .translations('en', en)
    .useSanitizeValueStrategy('escaped')
    .useLocalStorage();

  if (!$translateProvider.use()) {
    $translateProvider.use(envConfig.defaultLang);
  }
});
