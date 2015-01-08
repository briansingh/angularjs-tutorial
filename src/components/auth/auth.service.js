'use strict';

angular.module('angularjsTutorial')
  .factory('AuthService', ['$window', '$log', '$q', '$firebase', '$firebaseAuth', 'firebaseUrl',
    function($window, $log, $q, $firebase, $firebaseAuth, firebaseUrl) {

// Auth needs a reference at the root of your Firebase, no nested path
      var firebaseReference = new $window.Firebase(firebaseUrl);
      var auth = $firebaseAuth(firebaseReference);
      var api = {};

// Called on any auth state change (login, logout)
      api.onAuth = function(callback){
        auth.$onAuth(function(authData){
          $log.log('AuthService $onAuth callback', authData);
          callback(authData);
        });
      };

      api.createUser = function(email, password){
        // returns promise
        return auth.$createUser(email, password)
          .then(function(){
            // We don't get anything passed to the promise resolution for $createUser
            $log.log('auth.$createUser succeeded');
            return api.login({
              email : email,
              password : password
            });
          });
      };

      api.getUser = function(){
        // Returns a promise that resolves with the user object if auth'ed, null if not auth'ed
        return auth.$waitForAuth();
      };

      api.requireUser = function(){
        // returns promise. Resolved with user if successful, rejected with "AUTH_REQUIRED" if not
        return auth.$requireAuth();
      }

      api.getUserSync = function(){
        // Synchronous request, returns user object or null
        return auth.$getAuth();
      };

      api.login = function(email, password){
        // returns promise
        var deferred = $q.defer();

        auth.$authWithPassword({
          email : email,
          password : password
        }).then(function(authData){
          var userProfileReference = new $window.Firebase(firebaseUrl + '/users/' + authData.uid + '/profile');
          var userProfile = $firebase(userProfileReference).$asObject();
          userProfile.uid = authData.uid;
          userProfile.email = authData.password.email;
          userProfile.$save().then(function(){
            $log.log('user profile saved');
            deferred.resolve(authData);
          });

        }).catch(function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      };

      api.logout = function() {
        // returns promise
        auth.$unauth();
      };

      return api;
    }
  ]);
