"use strict";var angularjsTutorial=angular.module("angularjsTutorial",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","firebase"]);angularjsTutorial.config(["$stateProvider","$urlRouterProvider",function(o,a){o.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl as mainCtrl"}).state("contact",{url:"/contact",templateUrl:"app/contact/contact.html",controller:"ContactCtrl as contactCtrl"}),a.otherwise("/")}]),angularjsTutorial.controller("GlobalCtrl",function(){this.message="ThisGlobal"}),angular.module("angularjsTutorial").constant("firebaseUrl","https://bsangularjstutorial.firebaseio.com/"),angular.module("angularjsTutorial").factory("TodoService",["$window","$log","$q","$timeout","$firebase","firebaseUrl",function(o,a,t,n,e,r){a.log("TodoService instantiated");var l,i=new Firebase(r+"todos"),s=e(i),c=function(){};return c(),{getTodos:function(){var o=t.defer();return s.$asArray().$loaded().then(function(t){l=t,a.log("todos loaded",l===t,t),o.resolve(l)}).catch(function(o){a.log("Error retrieving todos from firebase",o)}),o.promise},addTodo:function(o){var n=t.defer();return l.$add({title:o.title,completed:!1}).then(function(o){a.log("new todo added",o.$id,o.key(),o,l),a.log("resolving addTodo promise"),n.resolve(o)}).catch(function(o){console.log("error adding todo",o),a.log("rejecting addTodo promise"),n.reject(o)}),n.promise},removeTodo:function(o){var n=t.defer();return l.$remove(o).then(function(o){a.log("resolving removeTodo promise"),n.resolve(o)}).catch(function(o){a.log("error removing todo",o),a.log("rejecting removeTodo promise"),n.reject(o)}),n.promise},saveTodo:function(o){var n=t.defer();return l.$save(o).then(function(o){a.log("resolving saveTodo promise"),n.resolve(o)}).catch(function(o){a.log("error saving todo",o),a.log("rejecting saveTodo promise"),n.reject(o)}),n.promise}}}]),angular.module("angularjsTutorial").controller("MainCtrl",["$scope","$log","$q","TodoService",function(o,a,t,n){a.log("MainCtrl instantiated");var e=this;e.newTodoTitle="",e.getTodos=function(){return n.getTodos().then(function(o){return e.todos=o,e.todos})},e.addTodo=function(o){var a;return n.addTodo(o).then(function(o){a=o,e.newTodoTitle=""},function(o){console.log(o)})},e.removeTodo=function(o){return n.removeTodo(o)},e.getTodoClasses=function(o){return{completed:o.completed}},e.saveTodo=function(o){return n.saveTodo(o)},e.getTodos()}]),angular.module("angularjsTutorial").controller("ContactCtrl",["$scope",function(){console.log("ContactCtrl instantiated")}]),angular.module("angularjsTutorial").controller("NavbarCtrl",["$scope",function(o){o.date=new Date}]),function(o){try{o=angular.module("angularjsTutorial")}catch(a){o=angular.module("angularjsTutorial",[])}o.run(["$templateCache",function(o){o.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ui-sref="home">Home</a></li><li><a ng-href="#">About</a></li><li><a ui-sref="contact">Contact</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></nav>')}])}(),function(o){try{o=angular.module("angularjsTutorial")}catch(a){o=angular.module("angularjsTutorial",[])}o.run(["$templateCache",function(o){o.put("app/contact/contact.html",'<div class="container"><h1>Contact</h1></div>')}])}(),function(o){try{o=angular.module("angularjsTutorial")}catch(a){o=angular.module("angularjsTutorial",[])}o.run(["$templateCache",function(o){o.put("app/main/main.html",'<div class="container"><h1>Todo</h1><div class="row"><div class="col-md-12"><form ng-submit="mainCtrl.addTodo({ title : mainCtrl.newTodoTitle })"><input type="text" class="form-control" ng-model="mainCtrl.newTodoTitle" placeholder="Type title here"></form></div></div><div class="row"><div class="col-md-12"><ul class="todos"><li class="todo-item slide-animation" ng-repeat="todo in mainCtrl.todos track by todo.$id" ng-class="mainCtrl.getToDoClasses(todo)"><div class="input-group"><span class="input-group-addon"><input type="checkbox" ng-model="todo.completed" ng-change="mainCtrl.saveTodo(todo)"></span> <input type="text" class="form-control" ng-model="todo.title" ng-change="mainCtrl.saveTodo(todo)"> <span class="input-group-btn"><button class="btn btn-default" ng-click="mainCtrl.removeTodo(todo)"><span class="glyphicon glyphicon-remove-circle"><span class="sr-only">Remove</span></span></button></span></div></li></ul></div></div></div>')}])}();