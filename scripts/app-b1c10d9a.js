"use strict";var angularjsTutorial=angular.module("angularjsTutorial",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router"]);angularjsTutorial.config(["$stateProvider","$urlRouterProvider",function(a,n){a.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl as mainCtrl"}),n.otherwise("/")}]),angularjsTutorial.controller("GlobalCtrl",function(){this.message="ThisGlobal"}),angular.module("angularjsTutorial").controller("MainCtrl",["$scope",function(){var a=this;a.newTodoTitle="",a.todos=[],a.addTodo=function(n){var o={title:n.title,completed:!1};return a.todos.push(o),a.newTodoTitle="",o},a.removeTodo=function(n){a.todos=a.todos.filter(function(a){return a.title!==n})},a.removeTodoByReference=function(n){a.todos=a.todos.filter(function(a){return a!==n})},a.getToDoClasses=function(a){return{completed:a.completed}}}]),angular.module("angularjsTutorial").controller("NavbarCtrl",["$scope",function(a){a.date=new Date}]),function(a){try{a=angular.module("angularjsTutorial")}catch(n){a=angular.module("angularjsTutorial",[])}a.run(["$templateCache",function(a){a.put("app/main/main.html",'<div class="container"><div ng-include="\'components/navbar/navbar.html\'"></div><h1>Todo</h1><div class="row"><div class="col-md-12"><form ng-submit="mainCtrl.addTodo({ title : mainCtrl.newTodoTitle })"><input type="text" class="form-control" ng-model="mainCtrl.newTodoTitle" placeholder="Type title here"></form></div></div><div class="row"><div class="col-md-12"><ul class="todos"><li class="todo-item slide-animation" ng-repeat="todo in mainCtrl.todos" ng-class="mainCtrl.getToDoClasses(todo)"><div class="input-group"><span class="input-group-addon"><input type="checkbox" ng-model="todo.completed"></span> <input type="text" class="form-control" ng-model="todo.title"> <span class="input-group-btn"><button class="btn btn-default" ng-click="mainCtrl.removeTodoByReference(todo)"><span class="glyphicon glyphicon-remove-circle"><span class="sr-only">Remove</span></span></button></span></div></li></ul></div></div></div>')}])}(),function(a){try{a=angular.module("angularjsTutorial")}catch(n){a=angular.module("angularjsTutorial",[])}a.run(["$templateCache",function(a){a.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></nav>')}])}();