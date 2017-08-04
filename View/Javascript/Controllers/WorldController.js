'use strict';

var AppControllers = angular.module('AppControllers');
AppControllers.controller('worldCtrl', ['$http', '$scope', 'socket', '$filter', function($http, $scope, socket){
  // ----- Init -----
  
  
  // ----- GET / SET Data -----
  $scope.videoFestival = "1UDR9KEGkTM";
  $scope.playerVars = {
    controls: 1,
    autoplay: 0
  };
  
  
  // ----- Public Méthode -----
  
  // ----- Private Méthode -----
  
  // ----- jQuery -----
  
}]);