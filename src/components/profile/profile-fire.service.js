'use strict';

angular.module('angularjsTutorial')
  .factory('ProfileFireService', ['$window', '$log', '$q', '$timeout', '$firebase', 'firebaseUrl',
    function ($window, $log, $q, $timeout, $firebase, firebaseUrl) {

      $log.log('ProfileFireService instantiated');

      var firebaseReference = new Firebase(firebaseUrl);
      var message;

      return {

        resetProfilePassword : function(email, callback){
          firebaseReference.resetPassword({
            email : email
           }, function(error) {
            if (error === null) {
              message = "Password reset email sent successfully";
            } else {
              message = "Error sending password reset email: " + error;
            }
            $log.log(message);
            callback(message);
          })
        },

        deleteProfile : function(email, password, message){
          firebaseReference.removeUser({
            email : email,
            password : password
          }, function(error) {
            if (error === null) {
              message = "User removed successfully";
            } else {
              message = "Error removing user: " + error;
            }
            $log.log(message);
            return message;
          })
        }
      };
    }]);
