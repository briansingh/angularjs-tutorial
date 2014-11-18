'use strict';

describe('controllers', function(){
  beforeEach(module('angularjsTutorial'));

  it('should define more than 5 awesome things', inject(function($controller) {
    var ctrl = $controller('MainCtrl', {});
    expect(angular.isArray(ctrl.awesomeThings)).toBeTruthy();
    expect(ctrl.awesomeThings.length > 5).toBeTruthy();
  }));

  it('should have exactly 9 awesome things', inject(function($controller) {
    var ctrl = $controller('MainCtrl', {});
    expect(ctrl.awesomeThings.length === 9).toBeTruthy();
  }));

  it('should display items in expected positions', inject(function($controller) {
    var ctrl = $controller('MainCtrl', {});

    expect(ctrl.awesomeThings[0].key).toMatch('angular');
    expect(ctrl.awesomeThings[1].key).toMatch('browsersync');
    expect(ctrl.awesomeThings[2].key).toMatch('gulp');
    expect(ctrl.awesomeThings[3].key).toMatch('jasmine');
    expect(ctrl.awesomeThings[4].key).toMatch('karma');
    expect(ctrl.awesomeThings[5].key).toMatch('protractor');
    expect(ctrl.awesomeThings[6].key).toMatch('jquery');
    expect(ctrl.awesomeThings[7].key).toMatch('bootstrap');
    expect(ctrl.awesomeThings[8].key).toMatch('node-sass');
  }));

  it('should have all expected properties on each item', inject(function($controller) {
    var ctrl = $controller('MainCtrl', {});

    ctrl.awesomeThings.forEach(function (scenario) {
      expect(scenario.key).toBeDefined();
      expect(scenario.title).toBeDefined();
      expect(scenario.url).toBeDefined();
      expect(scenario.description).toBeDefined();
      expect(scenario.logo).toBeDefined();
    });

  }));
  
});
