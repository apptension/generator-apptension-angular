export default ngInject(function AppController($state, $translate, locale) {
  if (!locale.lang) {
    changeLanguage($translate.use());
  }

  function changeLanguage(lang) {
    $state.go($state.current.name, {
      lang: lang
    }, {
      notify: false,
      location: 'replace'
    });
  }
});
