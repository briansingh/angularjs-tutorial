'use strict';

angular.module('angularjsTutorial')
  .controller('ProfileCtrl', ['$scope', '$state', '$stateParams', '$log', 'ProfileFireService',
    function($scope, $state, $stateParams, $log, ProfileFireService) {
    $log.log('ProfileCtrl instantiated');
    var self = this;
    self.mode = 'Edit'; // Edit, Delete
    self.err = null;

    self.submit = function(uid, name, email) {
      self.err = null;
      if(name == undefined){
        self.err = { 'message' : "Please enter name" };
        return false;
      }

      if(email == undefined){
        self.err = { 'message' : "Please enter email" };
        return false;
      }

      if(self.password == undefined){
        self.err = { 'message' : "Please enter password" };
        return false;
      }

      if(self.mode === 'Edit') {
        ProfileFireService.setProfileName(uid, name);
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
