'use strict';

angular.module('angularjsTutorial')
  .factory('ProfileFireService', ['$window', '$log', '$q', '$timeout', '$firebase', 'firebaseUrl',
    function ($window, $log, $q, $timeout, $firebase, firebaseUrl) {

      $log.log('ProfileFireService instantiated');

      var firebaseReference = new Firebase(firebaseUrl);
      var message;
      var redirect;

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

        deleteProfile : function(email, password, callback){
          firebaseReference.removeUser({
            email : email,
            password : password
          }, function(error) {
            if (error) {
              switch (error.code) {
                case "INVALID_USER":
                  message = "The specified user account does not exist.";
                  break;
                case "INVALID_PASSWORD":
                  message = "The specified user account password is incorrect.";
                  break;
                default:
                  message = "Error removing user: " + error;
              }
              redirect = false;
            } else {
              message = "User removed successfully";
              redirect = true;
            }
            $log.log(message);
            callback({'message' : message, 'redirect' : redirect});
          });
        }
      };
    }]);
