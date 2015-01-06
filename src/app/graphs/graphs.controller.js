'use strict';

angular.module('angularjsTutorial')
  .controller('GraphsCtrl', ['$scope', '$log', '$window',
    function ($scope, $log, $window) {
      $log.log('$window.moment', $window.moment);

      var self = this;

      self.todos = [];

      // Generate some sample data
      // We're gonna look at TODO's completion times
      var todoTemplate = {
        title : 'Sample title ',
        completed : false,
        createdAt : undefined,
        completedAt : undefined
      };

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      // Returns a random integer between min (included) and max (excluded)
      var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      };

      var generateSampleTodo = function(title){
        var todo = angular.copy(todoTemplate);

        todo.title = title;

        todo.createdAt = $window.moment().subtract(getRandomInt(1, 30), 'days').toDate();
        todo.completedAt = $window.moment(todo.createdAt).add(getRandomInt(1, 5), 'days').toDate();
        todo.completed = true;

        if (todo.completedAt.valueOf() > Date.now()){
          todo.completedAt = undefined;
          todo.completed = false;
        }

        return todo;
      };



      self.generateData = function(){
        self.todos = [];
        for (var i = 0; i < 100; i++){
          self.todos.push(generateSampleTodo('Sample title ' + i));
        }
      };

      self.generateData();

    }
  ]);
