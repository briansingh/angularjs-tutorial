'use strict';

angular.module('angularjsTutorial')
  .factory('TodoService', function () {
    console.log('TodoService instantiated');

    var todos = [];

    return {
      getTodos : function(){
        return todos;
      },
      addTodo : function(options) {
        var newTodo = {
          title : options.title,
          completed : false
        };
        todos.push(newTodo);
        return newTodo;
      },
      removeTodo : function(todo){
        todos = todos.filter(function(item){
          return item !== todo;
        });
      }
    };
  });
