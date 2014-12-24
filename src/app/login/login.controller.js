'use strict';

angular.module('angularjsTutorial')
  .controller('LoginCtrl', ['$scope', '$state', '$stateParams', '$log', 'AuthService', 'ProfileFireService',
    function($scope, $state, $stateParams, $log, AuthService, ProfileFireService) {
      var self = this;
      self.mode = 'Login'; // Login, Register, ResetPassword
      self.err = null;

      $log.log('LoginCtrl instantiated, redirect', $stateParams.redirect);

      self.submit = function() {
        self.err = null;

        if(self.email == undefined){
          self.err = { 'message' : "Please enter email" };
          return false;
        }

        if(self.mode === 'ResetPassword'){
          ProfileFireService.resetProfilePassword(self.email, function(message){
            self.err = { 'message' : message };
            var element = angular.element($('#ErrorMessage'));
            element.scope().$apply();
          });
          return false;
        }

        if(self.password == undefined){
          self.err = { 'message' : "Please enter password" };
          return false;
        }

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
