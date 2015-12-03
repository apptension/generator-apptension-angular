'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('apptension angular:app', function () {

  var promptOptions;

  before(function (done) {
    promptOptions = {
      appName: 'appname',
      author: 'author',
      license: 'UNLICENSED'
    };

    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .withPrompts(promptOptions)
      .on('end', done);
  });

  it('creates bower.json', function () {
    assert.file('bower.json');
  });

  it('creates .editorconfig', function () {
    assert.file('.editorconfig');
  });

  it('creates .eslintrc', function () {
    assert.file('.eslintrc');
  });

  describe('package.json', function () {
    it('is created', function () {
      assert.file('package.json');
    });

    it('has name set', function () {
      assert.fileContent('package.json', propPattern('name', promptOptions.appName))
    });

    it('has author set', function () {
      assert.fileContent('package.json', propPattern('author', promptOptions.author))
    });

    it('has license set', function () {
      assert.fileContent('package.json', propPattern('license', promptOptions.license))
    });

  });

  describe('gulpfile', function () {
    it('is created', function () {
      assert.file('Gulpfile.js');
    });
  });

  it('creates .gitignore', function () {
    assert.file('.gitignore');
  });

  it('creates protractor.conf', function () {
    assert.file('protractor.conf');
  });

  it('creates Vagrantfile', function () {
    assert.file('Vagrantfile');
  });

  it('creates hbs-partials directory', function () {
    assert.file('hbs-partials/.gitkeep');
  });

  describe('app', function () {
    it('main.js file is created', function () {
      assert.file('app/src/main.js');
    });

    it('main.scss file is created', function () {
      assert.file('app/src/main.scss');
    });
  });

  describe('config', function () {
    it('docker-devel-compose.yml file is created', function () {
      assert.file('config/docker-devel-compose.yml');
    });

    it('vagrant-devel-startup.sh file is created', function () {
      assert.file('config/vagrant-devel-startup.sh');
    });

    it('docker-devel-base/Dockerfile is created', function () {
      assert.file('config/docker-devel-base/Dockerfile');
    });

    it('docker-devel-backend/Dockerfile is created', function () {
      assert.file('config/docker-devel-backend/Dockerfile');
    });
  });
});

function propPattern(propName, value) {
  return new RegExp('\\s+"' + propName + '":\\s+"' + value + '"');
}
