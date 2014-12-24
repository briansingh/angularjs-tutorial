'use strict';

angular.module('angularjsTutorial')
  .controller('ProfileCtrl', ['$scope', '$log', function ($scope, $log) {
    console.log('ProfileCtrl instantiated');
    var self = this;

    self.submit = function(uid, email) {
      self.err = null;
      if(uid == undefined || email == undefined || self.password == undefined){
        return false;
      }

      $log.log('ProfileCtrl.uid is', uid);
      $log.log('ProfileCtrl.email is', email);
      $log.log('ProfileCtrl.password is', self.password);

      /*
      AuthService[self.mode === 'Login' ? 'login' : 'createUser'](self.email, self.password)
        .then(function(user) {
          $log.log('AuthService ' + self.mode + ' succeeded, redirecting', user);
          $state.go($stateParams.redirect || '/home');
        }, function(err) {
          $log.log('AuthService.login failed', err);
          self.err = err;
        });
      */
    };

  }]);
