/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var adminRolesCtrl = angular.module('AppControllers');

adminRolesCtrl.controller('adminRolesCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var adminRoles           = this;
  $scope.tab               = 2;
  
  
  // ----- GET / SET Data -----
  // socket.emit('getChannelTwitch');
  
  // socket.on('toogleLive', function(live) {
  //   $scope.live = live;
  // });
  
  
  // Utiliser des sous vue, comparer la liste des pages avec les pages du role pour check ou non une checkbox
  
  // ----- Public Méthode -----
  $scope.selectTab = function(setTab) {
    $scope.tab = setTab;
  };
  
  $scope.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  };
  
  
  // ----- Private Méthode -----
  // function ChangeChannelTwitch(channel) {
  //   playerAdmin.setChannel(channel);
  //   // playerAdmin.setVolume(1.0);
  //   playerAdmin.setMuted(false);
  //   if (playerAdmin.isPaused()) {
  //     playerAdmin.play();
  //     console.log('Player play ?');
  //   }
  // }
}]);