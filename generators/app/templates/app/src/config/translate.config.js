import envConfig from 'env-config';


export default ngInject(function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: './public/languages/',
    suffix: '.json'
  }).fallbackLanguage(envConfig.defaultLang)
    .useSanitizeValueStrategy('escaped')
    .useLocalStorage();

  if (!$translateProvider.use()) {
    $translateProvider.use(envConfig.defaultLang);
  }
});
