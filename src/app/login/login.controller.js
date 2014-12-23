'use strict';

angular.module('angularjsTutorial')
  .controller('LoginCtrl', ['$scope', '$state', '$stateParams', '$log', 'AuthService',
    function($scope, $state, $stateParams, $log, AuthService) {
      var self = this;
      self.mode = 'Login';

      $log.log('LoginCtrl instantiated, redirect', $stateParams.redirect);

      self.submit = function() {
        self.err = null;
        AuthService[self.mode === 'Login' ? 'login' : 'createUser'](self.email, self.password)
          .then(function(user) {
            $log.log('AuthService ' + self.mode + ' succeeded, redirecting', user);
            $state.go($stateParams.redirect || '/home');
          }, function(err) {
            $log.log('AuthService.login failed', err);
            self.err = err;
          });
      };

      var user = AuthService.getUserSync();
      if (user){
        $state.go($stateParams.redirect || '/home');
      }
    }]
);
