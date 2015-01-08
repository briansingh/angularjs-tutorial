'use strict';

angular.module('angularjsTutorial')
  .controller('AdminCtrl', ['$scope', '$log', '$window',
    function ($scope, $log, $window) {
      $log.log('AdminCtrl instantiated');
    }
  ]);
