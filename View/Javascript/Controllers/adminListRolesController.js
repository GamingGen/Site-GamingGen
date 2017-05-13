/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var ListRolesCtrl = angular.module('AppControllers');

ListRolesCtrl.controller('ListRolesCtrl', ['$scope', '$http', 'socket', 'rolesService', function($scope, $http, socket, rolesService) {
  // ----- Init -----
  var lstRoles             = this;
  lstRoles.data            = rolesService;
  
  // ----- GET / SET Data -----
  // socket.emit('getChannelTwitch');
  
  // socket.on('toogleLive', function(live) {
  //   $scope.live = live;
  // });
  
  $http.get('/confs/roles').success(function(data) {
    lstRoles.data.roleList = data;
  });
  
  // Utiliser des sous vue, comparer la liste des pages avec les pages du role pour check ou non une checkbox
  
  // ----- Public Méthode -----
  
  $scope.setSelected = function (id, selectedElement) {
    if (id !== undefined && selectedElement !== undefined) {
      $scope.idSelectedElement = id;
      lstRoles.data.selectedRole = selectedElement;
      console.log(selectedElement);
      rolesService.copyAllouedPages();
      
      // angular.forEach(lstRoles.data.pageList, function(value, key) {
      //   if (lstRoles.data.roleList.indexOf(value.name) !== -1) {
      //     value.allowed = true;
      //   }
      // });
      
      
    }
  };
  $scope.getSelected = function() {
    return lstRoles.data.selectedRole;
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