/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var ModifRoleCtrl = angular.module('AppControllers');

ModifRoleCtrl.controller('ModifRoleCtrl', ['$scope', 'socket', 'rolesAndPermissionsService', function($scope, socket, rolesAndPermissionsService) {
  // ----- Init -----
  var mdfRoles             = this;
  mdfRoles.data            = rolesAndPermissionsService;
  $scope.idSelectedElement = undefined;
  
  // ----- GET / SET Data -----
  
  
  // ----- Public Méthode -----
  
  $scope.clear = function () {
    mdfRoles.data.unselectRole();
  };

  $scope.sendRole = function() {
    mdfRoles.data.sendRole();
  };
  
  
  // ----- Private Méthode -----
}]);