'use strict';

describe('controllers', function(){
  var scope;
  var TodoService;
  var $window;

  beforeEach(module('angularjsTutorial'));

  beforeEach(inject(function($rootScope, _TodoService_, _$window_) {
    scope = $rootScope.$new();
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

  it('should have an array of todos', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope,
      TodoService : TodoService
    });

    expect(angular.isArray(mainCtrl.todos)).toBeTruthy();
  }));

  it('should be able to add a todo and return the newly created todo', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope,
      TodoService : TodoService
    });

    var newTodo = mainCtrl.addTodo({
      title : 'test title'
    });

    expect(mainCtrl.todos.length === 1).toBeTruthy();
    expect(newTodo).toBeDefined();
  }));

  it('should be able to remove a todo by reference', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope,
      TodoService : TodoService
    });

    var title = 'test title';

    var newTodo = mainCtrl.addTodo({
      title : title
    });

    expect(mainCtrl.todos.length === 1).toBeTruthy();

    mainCtrl.removeTodo(newTodo);

    expect(mainCtrl.getTodos().length === 0).toBeTruthy();
  }));


  it('should create "title" and "completed" properties on todos', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope,
      TodoService : TodoService
    });

    mainCtrl.addTodo({
      title : 'test title'
    });

    expect(mainCtrl.todos.length === 1).toBeTruthy();

    expect(mainCtrl.todos[0].title).toBeDefined();
    expect(mainCtrl.todos[0].completed).toBeDefined();
    expect(mainCtrl.todos[0].completed).toBe(false);
  }));

});
