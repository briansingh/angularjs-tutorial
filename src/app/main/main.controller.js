'use strict';

angular.module('angularjsTutorial')
  .controller('MainCtrl', function ($scope) {
    var self = this;

    self.newTodoTitle = '';

    self.todos = [];

    self.addTodo = function(todo) {
      var newTodo = {
        title : todo.title,
        completed : false
      };

      self.todos.push(newTodo);
      self.newTodoTitle = '';
      return newTodo;
    };

    self.removeTodo = function(title) {
      self.todos = self.todos.filter(function(item){
        return item.title !== title;
      });
    };

    self.removeTodoByReference = function(todo) {
      self.todos = self.todos.filter(function(item){
        return item !== todo;
      });
    };

    self.getToDoClasses = function(todo){
      return {
        'completed' : todo.completed
      };
    };
/*
    $scope.$watch(function(){
        return self.newTodoTitle;
      }, function(newValue, oldValue){
        console.log('self.newTodoTitle changed', newValue);
      },
      true);

    $scope.$watch(function(){
        return self.todos;
      }, function(newValue, oldValue){
        console.log('self.todos changed', newValue);
      },
      true);
*/
  });
