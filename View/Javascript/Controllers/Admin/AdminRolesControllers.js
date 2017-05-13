/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var adminRolesCtrl = angular.module('AppControllers');

adminRolesCtrl.controller('adminRolesCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var adminRoles           = this;
  adminRoles.roleList      = [];
  adminRoles.pageList      = [];
  $scope.tab               = 2;
  $scope.idSelectedElement = undefined;
  
  
  // ----- GET / SET Data -----
  // socket.emit('getChannelTwitch');
  
  // socket.on('toogleLive', function(live) {
  //   $scope.live = live;
  // });
  
  $http.get('/confs/roles').success(function(data) {
    adminRoles.roleList = data;
    console.log(adminRoles.roleList);
  });
  
  $http.get('/confs/pages').success(function(data) {
    adminRoles.pageList = data;
    console.log(adminRoles.pageList);
  });
  
  
  // Utiliser des sous vue, comparer la liste des pages avec les pages du role pour check ou non une checkbox
  
  // ----- Public Méthode -----
  
  $scope.setSelected = function (idSelectedElement) {
    if (idSelectedElement != undefined){
      $scope.idSelectedElement = idSelectedElement;
    }
  };
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