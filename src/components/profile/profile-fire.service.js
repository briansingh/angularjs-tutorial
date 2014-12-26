'use strict';

angular.module('angularjsTutorial')
  .factory('ProfileFireService', ['$window', '$log', '$q', '$timeout', '$firebase', 'firebaseUrl', '$http',
    function ($window, $log, $q, $timeout, $firebase, firebaseUrl, $http) {

      $log.log('ProfileFireService instantiated');

      var rootReference = new Firebase(firebaseUrl);
      var message;
      var redirect;

      return {

        getProfileName : function(uid){
          var deferred = $q.defer();
          $http.get(firebaseUrl + 'users/' + uid + '/name.json')
            .success(function(data, status){
              $log.log('ProfileFireService getProfileName success', data);
              deferred.resolve(data);
            })
            .error(function(data, status){
              $log.log('ProfileFireService getProfileName error', data);
              deferred.reject(data);
            });
          return deferred.promise;
        },

        setProfileName : function(uid, name){
          var nameReference = new Firebase(firebaseUrl + 'users/' + uid);
          nameReference.update({name : name});
        },

        resetProfilePassword : function(email, callback){
          rootReference.resetPassword({
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
          rootReference.removeUser({
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
