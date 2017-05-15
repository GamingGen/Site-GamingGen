/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('AdminListUsersCtrl', ['$scope', '$http', 'socket', 'usersService', 'rolesAndPermissionsService', function($scope, $http, socket, usersService, rolesAndPermissionsService) {
  // ----- Init -----
  var lstUsers                        = this;
  lstUsers.userList                   = [];
  lstUsers.currentPermissions         = [];
  lstUsers.usersService               = usersService;
  lstUsers.rolesAndPermissionsService = rolesAndPermissionsService;
  var allPermissions                  = [];
  
  $http.get('/users/listAll').then(function(data) {
    lstUsers.userList = data.data;
    // lstUsers.usersService.setCurrentPermissions(lstUsers.userList.access.permissions)
  }).catch(function(err) {
    console.log(err);
  });
  
  $scope.setSelected = function (selectedUser) {
    if (selectedUser !== undefined ){
      $scope.selectedUser = selectedUser;
      lstUsers.currentPermissions = selectedUser.access.permissions;
      lstUsers.rolesAndPermissionsService.refreshLstPermissions(lstUsers.currentPermissions);
    }
  };
  
  $scope.updateUser = function () {
    lstUsers.currentPermissions = lstUsers.rolesAndPermissionsService.getCurrentPermissions();
    allPermissions = lstUsers.rolesAndPermissionsService.getAllPermissions();
    if (lstUsers.currentPermissions.length > 0) {
      lstUsers.usersService.sendPermissions($scope.selectedUser, lstUsers.currentPermissions, allPermissions);
    }
  };
}]);