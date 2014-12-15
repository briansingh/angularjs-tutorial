'use strict';

angular.module('angularjsTutorial')
  .controller('MainCtrl', ['$scope', '$log', '$q', 'Todo', function ($scope, $log, $q, Todo) {
    $log.log('MainCtrl instantiated');
    var self = this;

    self.newTodoTitle = '';


    self.getTodos = function(){
      return self.todos = Todo.query();
    };

    self.addTodo = function(options){
      var newTodoOptions = {
        title : options.title,
        completed : false
      };
      Todo.add(newTodoOptions, function(newTodo){
        $log.log('MainCtrl $add newTodo response', newTodo);

        // Move the key to the $id property, like our view expects
        newTodo.$id = newTodo.name;
        newTodo.name = undefined;

        // Firebase only returns the key of the newly created object, not the entire object
        // So we need to add our properties back on to it
        angular.extend(newTodo, newTodoOptions);
        $log.log('MainCtrl $add newTodo after hydration', newTodo);

        self.todos.push(newTodo);
        self.newTodoTitle = '';
      });
    };


    self.removeTodo = function(todo){
      return todo.$remove(function(){
        self.todos.splice(self.todos.indexOf(todo), 1);
      });
    };

    self.getTodoClasses = function(todo){
      return {
        'completed' : todo.completed
      }
    };

    self.saveTodo = function(todo){
      return todo.$update();
    }

    self.getTodos();
  }]);

