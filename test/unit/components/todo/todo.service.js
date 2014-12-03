'use strict';

describe('TodoService', function(){
  var TodoService;
  var $window;

  beforeEach(module('angularjsTutorial'));

  beforeEach(inject(function (_TodoService_, _$window_) {
    TodoService = _TodoService_;
    $window = _$window_;

    var storage = {};
    spyOn($window.localStorage, 'getItem').andCallFake(function (key) {
      return storage[key];
    });
    spyOn($window.localStorage, 'setItem').andCallFake(function (key, value) {
      return storage[key] = value;
    });

  }));

  describe('#getTodos', function(){
    it('should return an array', function() {
      var todos = TodoService.getTodos();
      expect(angular.isArray(todos)).toBeTruthy();
    });
  });

  describe('#addTodo', function(){
    it('should be able to add a todo and return the newly created todo', function() {
      var newTodo = TodoService.addTodo({
        title : 'test title'
      });

      expect(TodoService.getTodos().length === 1).toBeTruthy();
      expect(newTodo).toBeDefined();
    });

    it('should create "title" and "completed" properties on todo', function() {
      var newTodo = TodoService.addTodo({
        title : 'test title'
      });

      var todos = TodoService.getTodos();
      expect(todos.length === 1).toBeTruthy();
      expect(todos[0].title).toBeDefined();
      expect(todos[0].completed).toBeDefined();
      expect(todos[0].completed).toBe(false);
    });

  });

  describe('#removeTodo', function(){
    it('should be able to remove a todo by reference', function() {
      var title = 'test title';
      var newTodo = TodoService.addTodo({
        title : title
      });
      expect(TodoService.getTodos().length === 1).toBeTruthy();
      TodoService.removeTodo(newTodo);
      expect(TodoService.getTodos().length === 0).toBeTruthy();
    });
  });

});
