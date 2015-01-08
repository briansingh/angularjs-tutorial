'use strict';

angular.module('angularjsTutorial')
  .controller('AdminUsersCtrl', ['$scope', '$log', '$window', 'UserService',
    function ($scope, $log, $window, UserService) {
      $log.log('AdminUsersCtrl instantiated');

      var self = this;

      self.uiGridOptions = {
        enableCellEditOnFocus : true,
        columnDefs : [
          {
            name : '$id',
            displayName : 'User Id',
            enableCellEdit: false
          },
          {
            name : 'profile.email',
            enableCellEdit: false
          },
          {
            name : 'roles.admin',
            displayName : 'Admin',
            type : 'boolean'
          },
          {
            name : 'todosCount',
            displayName : 'Number of Todos',
            field : 'getTodosCount()',
            enableCellEdit: false
          }
        ],
        onRegisterApi : function(gridApi){
          //set gridApi on scope
          self.gridApi = gridApi;
          gridApi.edit.on.afterCellEdit($scope, self.saveCell);
        }
      };



      self.saveCell = function(rowEntity, colDef, newValue, oldValue){
        $log.log('gridApi.edit.on.afterCellEdit', rowEntity, colDef, newValue, oldValue);
        self.users.$save(rowEntity);
        // If you made any changes to data that Angular should know about, call $scope.apply()
        $scope.$apply();
      };


      var getTodosCount = function(){
        // called with the context of a user object
        if (!this.todos){ return 0;}

        return Object.keys(this.todos).length;
      };

      UserService.get()
        .then(function(users){
          self.users = users;

          self.users.forEach(function(user){
            user.getTodosCount = getTodosCount;
          });

          self.uiGridOptions.data = self.users;
        })
        .catch(function(err){
          $log.log('AdminUsersCtrl error on UserService.get', err);
        });
    }
  ]);
