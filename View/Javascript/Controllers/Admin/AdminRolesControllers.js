/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var adminRolesCtrl = angular.module('AppControllers');

adminRolesCtrl.controller('adminRolesCtrl', ['$scope', 'socket', function($scope, socket) {
  // ----- Init -----
  var adminRoles           = this;
  adminRoles.pageList      = [];
  $scope.tab               = 2;
  $scope.idSelectedElement = undefined;
  
  
  // ----- GET / SET Data -----
  
  
  // ----- Public Méthode -----
  $scope.selectTab = function(setTab) {
    $scope.tab = setTab;
  };
  
  $scope.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  };
  
  
  // ----- Private Méthode -----
}]);