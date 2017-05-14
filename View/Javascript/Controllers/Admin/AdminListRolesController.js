/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var ListRolesCtrl = angular.module('AppControllers');

ListRolesCtrl.controller('ListRolesCtrl', ['$scope', 'socket', 'rolesAndPermissionsService', function($scope, socket, rolesAndPermissionsService) {
  // ----- Init -----
  var lstRoles  = this;
  lstRoles.data = rolesAndPermissionsService;
  // ----- GET / SET Data -----
  
  
  // ----- Public Méthode -----
  
  $scope.setSelected = function (selectedRole) {
    if (selectedRole !== undefined) {
      $scope.selectedRole = selectedRole;
      lstRoles.data.setCurrentRole(selectedRole);
    }
  };
  
  $scope.unselectRole = function () {
    $scope.selectedRole = undefined;
    lstRoles.data.unselectRole();
  };
  
  $scope.removeRole = function (role) {
    lstRoles.data.removeRole(role);
  };
}]);