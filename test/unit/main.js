'use strict';

describe('controllers', function(){
  beforeEach(module('angularjsTutorial'));

  it('should have an array of todos', inject(function($controller) {
    var ctrl = $controller('MainCtrl', {});
    expect(angular.isArray(ctrl.todos)).toBeTruthy();
  }));

  it('should be able to add a todo', inject(function($controller) {
    var ctrl = $controller('MainCtrl', {});
    ctrl.addTodo({
      title : 'test title'
    });
    expect(ctrl.todos.length == 1).toBeTruthy();
  }));

  it('should be able to remove a todo', inject(function($controller) {
    var ctrl = $controller('MainCtrl', {});
    var title = 'test title';
    ctrl.addTodo({
      title : 'test title'
    });
    expect(ctrl.todos.length == 1).toBeTruthy();
    ctrl.removeTodo(title);
    expect(ctrl.todos.length == 0).toBeTruthy();
  }));

  it('should create "title" and "completed" properties on todo', inject(function($controller) {
    var ctrl = $controller('MainCtrl', {});
    ctrl.addTodo({
      title : 'test title'
    });
    expect(ctrl.todos.length == 1).toBeTruthy();
    expect(ctrl.todos[0].title).toBeDefined();
    expect(ctrl.todos[0].completed).toBeDefined();
    expect(ctrl.todos[0].completed).toBe(false);
  }));

});
