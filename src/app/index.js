'use strict';

var angularjsTutorial = angular.module('angularjsTutorial', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'firebase']);

angularjsTutorial.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as mainCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactCtrl as contactCtrl'
  });

    $urlRouterProvider.otherwise('/');
  });

angularjsTutorial.controller('GlobalCtrl', function(){
  this.message = 'ThisGlobal';
  });
