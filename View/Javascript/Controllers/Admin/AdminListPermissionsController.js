/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var ListPermissionsCtrl = angular.module('AppControllers');

ListPermissionsCtrl.controller('ListPermissionsCtrl', ['$scope', 'socket', 'rolesAndPermissionsService', function($scope, socket, rolesAndPermissionsService) {
  // ----- Init -----
  var lstPermissions  = this;
  lstPermissions.data = rolesAndPermissionsService;
  
  // ----- GET / SET Data -----
  
  
  // ----- Public Méthode -----

  $scope.setSelected = function (selectedElement) {
    if (selectedElement !== undefined ){
      $scope.SelectedElement = selectedElement;
      lstPermissions.data.togglePermission(selectedElement);
    }
  };
  
  $scope.selectAll = function () {
    lstPermissions.data.selectAllPermissisons();
  };

  $scope.unselectAll = function () {
    lstPermissions.data.unselectAllPermissions();
  };
  
  $scope.removePermission = function (permission) {
    lstPermissions.data.removePermission(permission);
  };
}]);