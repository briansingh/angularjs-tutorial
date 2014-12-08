'use strict';

describe('TodoService', function(){
  var TodoService, $timeout;

  beforeEach(module('angularjsTutorial'));

  beforeEach(inject(function (_$timeout_) {
    $timeout = _$timeout_;
  }));

  beforeEach(inject(function (_TodoService_) {
    TodoService = _TodoService_;
  }));

  describe('#getTodos', function(){
    it('should return an array', function(done) {
      TodoService.getTodos()
        .then(function(todos){
          expect(angular.isArray(todos)).toBeTruthy();
          console.log('in getTodos handler');
        })
        .finally(function(){
          console.log('finally');
          done();
        });
      $timeout.flush();
    });
  });

  describe('#addTodo', function(){

    it('should be able to add a todo and return the newly created todo', function(done) {
      var obj = { title : 'test title' };
      TodoService.addTodo(obj)
        .then(function(newTodo){
          console.log('then #1');
          expect(newTodo).toBeDefined();
          console.log('got to addTodo handler');
        })
        .then(function(){
          console.log('then #2');
          return TodoService.getTodos();
        })
        .then(function(todos){
          console.log('then #3');
          console.log('got to getTodos handler');
          expect(todos.length === 1).toBeTruthy();
        })
        .finally(function(){
          console.log('finally');
          done();
        });
      $timeout.flush();
      $timeout.flush();
    });

    it('should create "title" and "completed" properties on todo', function(done) {
      var obj = { title : 'test title' };
      TodoService.addTodo(obj)
        .then(function(){
          console.log('got to addTodo handler');
          console.log('then #1');
          return TodoService.getTodos();
        })
        .then(function(todos){
          console.log('then #2');
          console.log('got to getTodos handler');
          expect(todos.length === 1).toBeTruthy();
          expect(todos[0].title).toBeDefined();
          expect(todos[0].completed).toBeDefined();
          expect(todos[0].completed).toBe(false);
        })
        .finally(function(){
          console.log('finally');
          done();
        });
      $timeout.flush();
      $timeout.flush();
    });

  });

  describe('#removeTodo', function(){
    it('should be able to remove a todo', function(done) {
      var obj = { title : 'test title' };
      var newTodoReturned;
      TodoService.addTodo(obj)
        .then(function(newTodo){
          console.log('then #1');
          console.log('got to addTodo handler');
          newTodoReturned = newTodo;
        })
        .then(function(){
          console.log('then #2');
          return TodoService.getTodos();
        })
        .then(function(todos){
          console.log('then #3');
          console.log('got to getTodos handler');
          expect(todos.length === 1).toBeTruthy();
        })
        .then(function(){
          TodoService.removeTodo(newTodoReturned);
        })
        .then(function(){
          console.log('then #4');
          return TodoService.getTodos();
        })
        .then(function(secondTodos){
          console.log('then #5');
          console.log('got to second getTodos handler');
          expect(secondTodos.length === 0).toBeTruthy();
        })
        .finally(function(){
          console.log('finally');
          done();
        });
      $timeout.flush();
      $timeout.flush();
      $timeout.flush();
    });
  });

});
