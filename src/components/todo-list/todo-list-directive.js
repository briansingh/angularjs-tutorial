angular.module('angularjsTutorial')
  .directive('ajstTodoList', function() {
    return {
      templateUrl : 'components/todo-list/todo-list.html',
      transclude : true,
      scope : {
        onGetTodos : '&',
        onRemoveTodo : '&',
        onSaveTodo : '&'
      },
      controllerAs : 'ajstTodoListCtrl',
      controller : [
        '$scope', '$element', '$attrs', '$transclude', '$log', 'TodoFireService',
        function ($scope, $element, $attrs, $transclude, $log, TodoFireService){
          $log.log('ajstTodoList controller instantiated');

          var self = this;

          self.getTodos = function(){
            return TodoFireService.getTodos()
              .then(function(todos){
                self.todos = todos;
                $log.log('ajstTodoList calling $scope.onGetTodos()');
                $scope.onGetTodos({
                  todos : self.todos
                });
                return self.todos;
              });
          };

          self.removeTodo = function(todo){
            return TodoFireService
              .removeTodo(todo)
              .then(function(){
                $log.log('ajstTodoList calling $scope.onRemoveTodo()');
                $scope.onRemoveTodo({
                  todo: todo
                });
              });
          };

          self.getTodoClasses = function(todo){
            return {
              'completed' : todo.completed
            }
          };

          self.saveTodo = function(todo){
            return TodoFireService
              .saveTodo(todo)
              .then(function(){
                $log.log('ajstTodoList calling $scope.onSaveTodo()');
                $scope.onSaveTodo({
                  todo : todo
                });
              });
          };

          self.getTodos();
        }
      ]
    };
  });
