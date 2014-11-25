'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('angularjsTutorial'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should have an array of todos', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope
    });
    expect(angular.isArray(mainCtrl.todos)).toBeTruthy();
  }));

  it('should be able to add a todo', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope
    });
    mainCtrl.addTodo({
      title : 'test title'
    });
    expect(mainCtrl.todos.length == 1).toBeTruthy();
  }));

  it('should be able to remove a todo', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope
    });
    var title = 'test title';
    mainCtrl.addTodo({
      title : 'test title'
    });
    expect(mainCtrl.todos.length == 1).toBeTruthy();
    mainCtrl.removeTodo(title);
    expect(mainCtrl.todos.length == 0).toBeTruthy();
  }));

  it('should create "title" and "completed" properties on todo', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope
    });
    mainCtrl.addTodo({
      title : 'test title'
    });
    expect(mainCtrl.todos.length == 1).toBeTruthy();
    expect(mainCtrl.todos[0].title).toBeDefined();
    expect(mainCtrl.todos[0].completed).toBeDefined();
    expect(mainCtrl.todos[0].completed).toBe(false);
  }));

  it('should be able to add a todo and return a reference to the newly created todo', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope
    });

    var title = 'test title';
    var newTodo = mainCtrl.addTodo({
      title : title
    });
    expect(newTodo).toBeDefined();
    expect(newTodo.title === title).toBeTruthy();
  }));

  it('should be able to remove a todo by reference', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl', {
      $scope : scope
    });

    var title = 'test title';
    var newTodo = mainCtrl.addTodo({
      title : title
    });

    expect(mainCtrl.todos.length == 1).toBeTruthy();
    mainCtrl.removeTodoByReference(newTodo);
    expect(mainCtrl.todos.length == 0).toBeTruthy();
  }));

});
