'use strict';

var AppControllers = angular.module('AppControllers');
AppControllers.controller('hearthStoneCtrl', ['$http', '$scope', 'socket', '$window', function($http, $scope, socket, $window){
  // ----- Init -----
  
  // ----- GET / SET Data -----
  
  // ----- Public Méthode -----
  $scope.goRegistration = function() {
    console.log('Bye bye');
    $window.open('https://gg7-csgo.eventbrite.fr', '_blank');
  };
  
  // ----- Private Méthode -----
  
  // ----- jQuery -----
  
}]);