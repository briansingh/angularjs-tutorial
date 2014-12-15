'use strict';

describe('TodoService', function(){
  var $httpBackend;
  var Todo;
  var firebaseUrl = "https://bsangularjstutorial.firebaseio.com/";

  beforeEach(module('angularjsTutorial'));

  beforeEach(inject(function (_$httpBackend_, _Todo_) {
    $httpBackend = _$httpBackend_;
    Todo = _Todo_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#Todo.query', function(){
    it('should return an array', function() {
      $httpBackend.expect('GET', firebaseUrl + 'todos.json').respond({"-JdAcmgf-ZtUDjsUr1Sv":{"completed":false,"title":"hello"},"-JdAcnM4NmULiOLvRBPy":{"completed":false,"title":"world"}});
      var todos = Todo.query();
      $httpBackend.flush();
      expect(angular.isArray(todos)).toBeTruthy();
      expect(todos.length === 2).toBeTruthy();
    });
  });

  describe('#Todo.add', function(){
    it('should be able to add a todo and return the newly created key object', function() {
      var todo = { title : 'test title' };
      $httpBackend.expect('POST', firebaseUrl + 'todos.json').respond({"name":"-JdAedn_O-kouaPqcDux"});
      var keyObj = Todo.add(todo);
      $httpBackend.flush();
      expect(keyObj).toBeDefined();
      expect(keyObj.name).toBeDefined();
    });
  });

  describe('#Todo.save', function(){
    it('should be able to remove a todo', function() {
      $httpBackend.expect('GET', firebaseUrl + 'todos.json').respond({"-JdAedn_O-kouaPqcDux":{"completed":false,"title":"test"}});
      var todos = Todo.query();
      $httpBackend.flush();
      expect(todos.length === 1).toBeTruthy();

      $httpBackend.resetExpectations();
      var todo = todos[0];
      todo.title = 'changed';

      $httpBackend.expect('PUT', firebaseUrl + 'todos/-JdAedn_O-kouaPqcDux.json').respond({"-JdAedn_O-kouaPqcDux":{"completed":false,"title":"changed"}});
      var saveTodo = Todo.save(todo);
      $httpBackend.flush();
      expect(saveTodo).toBeDefined();
    });
  });

  describe('#Todo.remove', function(){
    it('should be able to remove a todo', function() {
      $httpBackend.expect('GET', firebaseUrl + 'todos.json').respond({"-JdAedn_O-kouaPqcDux":{"completed":false,"title":"test"}});
      var todos = Todo.query();
      $httpBackend.flush();
      expect(todos.length === 1).toBeTruthy();

      $httpBackend.resetExpectations();

      $httpBackend.expect('DELETE', firebaseUrl + 'todos.json?$id=-JdAedn_O-kouaPqcDux&completed=false&title=test').respond(200, null);
      Todo.remove(todos[0]);
      $httpBackend.flush();
    });
  });

});
