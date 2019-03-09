'use strict';

var AppControllers = angular.module('AppControllers');
AppControllers.controller('hearthStoneCtrl', ['$http', '$scope', 'socket', '$window', function($http, $scope, socket, $window){
  // ----- Init -----
  
  // ----- GET / SET Data -----
  
  // ----- Public Méthode -----
  $scope.goRegistration = function() {
    console.log('Bye bye');
    $window.open('https://www.eventbrite.fr/e/billets-gaming-gen-level-7-tournoi-fifa-19-55581063457', '_blank');
  };
  
  // ----- Private Méthode -----
  
  // ----- jQuery -----
  
}]);