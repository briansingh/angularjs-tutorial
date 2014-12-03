'use strict';

angular.module('angularjsTutorial')
  .factory('TodoService', ['$window', function ($window) {

    console.log('TodoService instantiated');

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
      console.trace();
      console.log('saveToLocalStorage', todos, angular.toJson(todos));
      $window.localStorage.setItem(localStorageTodosKey, angular.toJson(todos));
    };

    var init = function(){
      getFromLocalStorage();

      if (!todos){
        todos = [];
        saveToLocalStorage();
      }

      console.log("$window.localStorage['todos']", $window.localStorage.getItem(localStorageTodosKey));
    }

    init();

    return {

      getTodos : function(){
        getFromLocalStorage();
        return todos;
      },

      addTodo : function(options){
        console.log('addTodo', options);
        var newTodo = {
          id : Date.now().toString() + Math.random(),
          title : options.title,
          completed : false
        };

        todos.push(newTodo);

        saveToLocalStorage();

        return newTodo;
      },


      removeTodo : function(todo){
        todos = todos.filter(function(item){
          return item.id !== todo.id;
        });
        saveToLocalStorage();
      },

      saveTodos : function(){
        saveToLocalStorage();
      }
    };
  }]);
