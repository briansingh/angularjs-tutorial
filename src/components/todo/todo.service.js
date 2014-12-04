'use strict';

angular.module('angularjsTutorial')
  .factory('TodoService', ['$window', '$log', '$q', '$timeout', function ($window, $log, $q, $timeout) {

    $log.log('TodoService instantiated');

    var localStorageTodosKey = 'todos',
      todos;

    var getFromLocalStorage = function(){
      var result = $window.localStorage.getItem(localStorageTodosKey);
      if (result){
        todos = JSON.parse(result);
      }
      return todos;
    };

    var saveToLocalStorage = function(){
      $log.log('saveToLocalStorage', todos, angular.toJson(todos));
      $window.localStorage.setItem(localStorageTodosKey, angular.toJson(todos));
    };

    var init = function(){
      getFromLocalStorage();
      if (!todos){
        todos = [];
        saveToLocalStorage();
      }
      $log.log("$window.localStorage['todos']", $window.localStorage.getItem(localStorageTodosKey));
    }

    init();

    return {

      getTodos : function(){
        var deferred = $q.defer();
        $timeout(function(){
          $log.log('getTodos resolving promise');
          getFromLocalStorage();
          deferred.resolve(todos);
        }, 50);
        $log.log('getTodos returning promise');
        return deferred.promise;
      },

      addTodo : function(options){
        var deferred = $q.defer();
        $timeout(function(){
          $log.log('addTodo resolving promise');
          var newTodo = {
            id : Date.now().toString() + Math.random(),
            title : options.title,
            completed : false
          };
          todos.push(newTodo);
          saveToLocalStorage();
          deferred.resolve(newTodo);
        }, 50);
        $log.log('addTodo returning promise');
        return deferred.promise;
      },

      removeTodo : function(todo){
        var deferred = $q.defer();
        $timeout(function(){
          $log.log('removeTodo resolving promise');
          todos = todos.filter(function(item){
            return item.id !== todo.id;
          });
          saveToLocalStorage();
          deferred.resolve();
        }, 50);
        $log.log('removeTodo returning promise');
        return deferred.promise;
      },

      saveTodos : function(){
        saveToLocalStorage();
      }
    };
  }]);
