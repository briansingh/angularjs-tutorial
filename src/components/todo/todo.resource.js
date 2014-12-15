'use strict';

angular.module('angularjsTutorial')
  .constant('firebaseUrl', 'https://bsangularjstutorial.firebaseio.com/');

angular.module('angularjsTutorial')
  .factory('Todo', ['$resource', '$log', 'firebaseUrl', function ($resource, $log, firebaseUrl) {
    $log.log('Todo instantiated');

    return $resource(firebaseUrl + 'todos/:id',
      { id: '@$id'},
      {
        query : {
          isArray: true,
          url: firebaseUrl + 'todos.json',
          transformResponse: function(data, headersGetter){
            $log.log('Todo query response', data);
            var json = angular.fromJson(data);
            var responseAsArray = Object.keys(json).map(function(key){
              var todo = json[key];
              todo.$id = key;
              return todo;
            });
            return responseAsArray;
          }
        },

        get : {
          url : firebaseUrl + 'todos/:id.json'
        },

        add : {
          method : 'POST',
          url : firebaseUrl + 'todos.json',
          transformResponse : function(data, headersGetter){
            $log.log('Todo add transformResponse', data, this);
            return angular.fromJson(data);
          }
        },

        save : {
          url : firebaseUrl + 'todos/:id.json',
          method : 'PUT',
          transformRequest : function(data, headersGetter){
            $log.log('Todo save transformResponse', data, this);
            var requestData = angular.copy(data);
            requestData.$id = undefined;
            return angular.toJson(requestData);
          }
        },

        update : {
          url : firebaseUrl + 'todos/:id.json',
          method : 'PUT',
          transformRequest : function(data, headersGetter){
            $log.log('Todo update transformResponse', data, this);
            var requestData = angular.copy(data);
            requestData.$id = undefined;
            return angular.toJson(requestData);
          }
        },

        remove : {
          url : firebaseUrl + 'todos/:id.json',
          method : 'DELETE'
        }
      }
    );

  }]);

