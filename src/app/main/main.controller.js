'use strict';

angular.module('angularjsTutorial')
  .controller('MainCtrl', function () {
    var self = this;
    self.todos = [];
    self.addTodo = function(todo) {

      var obj = {
        title : undefined,
        description : undefined,
        completed : false,
        dueDate : undefined
      };

      if(todo.title === undefined) return;

      obj.title = todo.title;
      obj.description = todo.description;
      obj.dueDate = todo.dueDate;

      if(todo.completed !== undefined){
        obj.completed = todo.completed;
      }
      
      self.todos.push(obj);
    };
    self.removeTodo = function(title) {
      self.todos = self.todos.filter(function(item){
        return item.title !== title;
      });
    };

  });
