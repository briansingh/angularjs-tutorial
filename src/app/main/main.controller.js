'use strict';

angular.module('angularjsTutorial')
  .controller('MainCtrl', ['$scope', '$log', '$q', 'TodoService', function ($scope, $log, $q, TodoService) {
    $log.log('MainCtrl instantiated');
    var self = this;

    self.newTodoTitle = '';

    self.getTodos = function(){
      TodoService.getTodos()
        .then(function(todos){
          self.todos = todos;
        });
    };

    self.addTodo = function(options){
      var deferred = $q.defer(),
        newTodo;

      TodoService.addTodo(options)
        .then(function(newTodoResult){
          newTodo = newTodoResult;
        },
        function(err){
          $log.log(err);
        })
        .then(self.getTodos)
        .then(function(todos){
          self.newTodoTitle = '';
          deferred.resolve(newTodo);
        })
        .catch(function(err){
          $log.log(err);
          deferred.reject(err);
        });

      return deferred.promise;
    };

    self.removeTodo = function(todo){
      return TodoService.removeTodo(todo)
        .then(self.getTodos);
    };

    self.getTodoClasses = function(todo){
      return {
        'completed' : todo.completed
      }
    };

    self.saveTodos = function(){
      TodoService.saveTodos();
    }

    self.getTodos();
  }]);
