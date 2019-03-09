'use strict';

var AppControllers = angular.module('AppControllers');
AppControllers.controller('dragonBallFighterZCtrl', ['$http', '$scope', 'socket', '$window', function($http, $scope, socket, $window){
  // ----- Init -----
  
  // ----- GET / SET Data -----
  
  // ----- Public Méthode -----
  $scope.goRegistration = function() {
    console.log('Bye bye');
    $window.open('https://www.eventbrite.fr/e/billets-gaming-gen-level-7-tournoi-dbfz-56783837988', '_blank');
  };
  
  // ----- Private Méthode -----
  
  // ----- jQuery -----
  
}]);