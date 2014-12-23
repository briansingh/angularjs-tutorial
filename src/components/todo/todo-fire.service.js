'use strict';

angular.module('angularjsTutorial')
  .factory('TodoFireService', ['$window', '$log', '$q', '$timeout', '$firebase', 'firebaseUrl',
    function ($window, $log, $q, $timeout, $firebase, firebaseUrl) {

      $log.log('TodoFireService instantiated');

      var todos;

      var init = function(){

      };

      init();

      return {

        getTodos : function(user){
          var deferred = $q.defer();

          var firebaseReference = new Firebase(firebaseUrl + 'users/' + user.uid + '/todos');
          var firebaseSync = $firebase(firebaseReference);

          firebaseSync.$asArray().$loaded().then(function(response){
            todos = response;
            $log.log('todos loaded', todos === response, response);
            deferred.resolve(todos);
          }).catch(function(err){
            $log.log('Error retrieving todos from firebase', err);
          });
          return deferred.promise;
        },

        addTodo : function(options){
          var deferred = $q.defer();
          todos.$add({
            title : options.title,
            completed : false
          }).then(function(newTodoRef){
            $log.log('new todo added', newTodoRef.$id, newTodoRef.key(), newTodoRef, todos);
            $log.log('resolving addTodo promise');
            deferred.resolve(newTodoRef);
          }).catch(function(err){
            console.log('error adding todo', err);
            $log.log('rejecting addTodo promise');
            deferred.reject(err);
          });
          return deferred.promise;
        },

        removeTodo : function(todo){
          var deferred = $q.defer();
          todos.$remove(todo).then(function(todoRef){
            $log.log('resolving removeTodo promise');
            deferred.resolve(todoRef);
          })
            .catch(function(err){
              $log.log('error removing todo', err);
              $log.log('rejecting removeTodo promise');
              deferred.reject(err);
            });
          return deferred.promise;
        },

        saveTodo : function(todo){
          var deferred = $q.defer();
          todos.$save(todo).then(function(todoRef){
            $log.log('resolving saveTodo promise');
            deferred.resolve(todoRef);
          })
            .catch(function(err){
              $log.log('error saving todo', err);
              $log.log('rejecting saveTodo promise');
              deferred.reject(err);
            });
          return deferred.promise;
        }
      };
    }]);
