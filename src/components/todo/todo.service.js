'use strict';

angular.module('angularjsTutorial')
  .constant('firebaseUrl', 'https://bsangularjstutorial.firebaseio.com/');

angular.module('angularjsTutorial')
  .factory('TodoService', ['$window', '$log', '$q', '$timeout', '$http', 'firebaseUrl',
              function ($window, $log, $q, $timeout, $http, firebaseUrl) {

    $log.log('TodoService instantiated');

    var todos;

    return {

      getTodos : function(){
        var deferred = $q.defer();
        $http.get(firebaseUrl + 'todos.json')
          .success(function(data, status){
            $log.log('TodoService getTodos success', data);
            todos = Object.keys(data).map(function (key) {
              var todo = data[key];
              todo.$id = key;
              return todo;
            });
            $log.log('TodoService getTodos mapping', todos);
            deferred.resolve(todos);
          })
          .error(function(data, status){
            $log.log('TodoService getTodos error', data);
            deferred.reject(data);
          });
        return deferred.promise;
      },

      addTodo : function(options){
        var deferred = $q.defer();
        var newTodo = angular.copy(options);
        $http.post(firebaseUrl + 'todos.json', newTodo)
          .success(function(data, status) {
            $log.log('TodoService addTodo success', data);
            newTodo.$id = data.name;
            todos.push(newTodo);
            deferred.resolve(newTodo);
          }).
          error(function(data, status) {
            $log.log('TodoService addTodo error', data);
            deferred.reject(data);
          });
        return deferred.promise;
      },

      removeTodo : function(todo){
        var deferred = $q.defer();
        $http.delete(firebaseUrl + 'todos/' + todo.$id + '.json')
          .success(function(data, status) {
            $log.log('TodoService removeTodo success', data);
            todos.splice(todos.indexOf(todo),1);
            deferred.resolve();
          }).
          error(function(data, status) {
            $log.log('TodoService removeTodo error', data);
            deferred.reject(data);
          });
        return deferred.promise;
      },

      saveTodo : function(todo){
        var deferred = $q.defer();
        var updateTodo = angular.copy(todo);
        updateTodo.$id = undefined;
        $http.put(firebaseUrl + 'todos/' + todo.$id + '.json', updateTodo)
          .success(function(data, status) {
            $log.log('TodoService saveTodo success', data);
            deferred.resolve(todo);
          }).
          error(function(data, status) {
            $log.log('TodoService saveTodo error', data);
            deferred.reject(data);
          });
        return deferred.promise;
      }
    };
  }]);
