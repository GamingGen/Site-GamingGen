/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var adminRolesCtrl = angular.module('AppControllers');

adminRolesCtrl.controller('adminRolesCtrl', ['$scope', 'socket', 'rolesAndPermissionsService', function($scope, socket, rolesAndPermissionsService) {
  // ----- Init -----
  var adminRoles           = this;
  adminRoles.data          = rolesAndPermissionsService;
  adminRoles.data.tab      = 2;
  $scope.permissionsList   = adminRoles.data.permissions.map(function(permission) {
    return permission.name;
  });
  
  $scope.$watch('namePermission', checkPermission);
  
  // ----- GET / SET Data -----
  
  
  // ----- Public Méthode -----
  $scope.selectTab = function(setTab) {
    adminRoles.data.tab = setTab;
    adminRoles.data.unselectRole();
    if (setTab !== 1) {
      $scope.namePermission = "";
    }
  };
  
  $scope.isSelected = function(checkTab) {
    return adminRoles.data.tab === checkTab;
  };
  
  $scope.addPermission = function(checkTab) {
    adminRoles.data.addPermission($scope.namePermission);
    $scope.namePermission = "";
  };
  
  
  // ----- Private Méthode -----
  function checkPermission(newValue, oldValue, scope) {
    if (newValue) {
      $scope.permissionsList   = adminRoles.data.permissions.map(function(permission) {
        return permission.name;
      });
    }
  };
}]);