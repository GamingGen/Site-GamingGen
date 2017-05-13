/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var adminRolesCtrl = angular.module('AppControllers', []);

adminRolesCtrl.controller('adminRolesCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var roles  = this;
  $scope.tab = 1;
  
  
  // ----- GET / SET Data -----
  // socket.emit('getChannelTwitch');
  
  // socket.on('toogleLive', function(live) {
  //   $scope.live = live;
  // });
  
  $http.get('/confs/roles').success(function(data) {
    roles.list = data;
    console.log(roles.list);
  });
  
  
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