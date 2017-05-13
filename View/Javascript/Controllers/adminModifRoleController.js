/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var ListRolesCtrl = angular.module('AppControllers');

ListRolesCtrl.controller('ModifRoleCtrl', ['$scope', '$http', 'socket', 'rolesService', function($scope, $http, socket, rolesService) {
  // ----- Init -----
  var mdfRoles             = this;
  mdfRoles.infos           = rolesService;
  $scope.idSelectedElement = undefined;
  
  // ----- GET / SET Data -----
  // socket.emit('getChannelTwitch');
  
  // socket.on('toogleLive', function(live) {
  //   $scope.live = live;
  // });
  
  
  // Utiliser des sous vue, comparer la liste des pages avec les pages du role pour check ou non une checkbox
  
  // ----- Public Méthode -----
  
  $scope.setSelected = function (idSelectedElement) {
    if (idSelectedElement != undefined){
      $scope.idSelectedElement = idSelectedElement;
    }
  };
  $scope.getSelected = function() {
    return mdfRoles[$scope.idSelectedElement];
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