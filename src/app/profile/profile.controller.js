'use strict';

angular.module('angularjsTutorial')
  .controller('ProfileCtrl', ['$scope', '$state', '$stateParams', '$log', 'ProfileFireService',
    function($scope, $state, $stateParams, $log, ProfileFireService) {
    $log.log('ProfileCtrl instantiated');
    var self = this;
    self.mode = 'Edit'; // Edit, Delete
    self.err = null;

    self.submit = function(uid, email) {
      self.err = null;
      if(uid == undefined || email == undefined || self.password == undefined){
        self.err = { 'message' : "Please enter uid/email/password" };
        return false;
      }

      if(self.mode === 'Edit') {
        $log.log('ProfileCtrl.uid is', uid);
        $log.log('ProfileCtrl.email is', email);
        $log.log('ProfileCtrl.password is', self.password);

        return false;
      }

      if(self.mode === 'Delete') {
        ProfileFireService.deleteProfile(email, self.password, function(status){
          self.err = { 'message' : status.message };
          if(status.redirect){
            $state.go('home');
          } else {
            var element = angular.element($('#ErrorMessage'));
            element.scope().$apply();
          }
        });
        return false;
      }
    };

  }]);
