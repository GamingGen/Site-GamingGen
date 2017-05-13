/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var ListRolesCtrl = angular.module('AppControllers');

ListRolesCtrl.controller('ListPagesCtrl', ['$scope', '$http', 'socket', 'rolesService', function($scope, $http, socket, rolesService) {
  // ----- Init -----
  var lstPages  = this;
  lstPages.data = rolesService;
  
  
  // ----- GET / SET Data -----
  // socket.emit('getChannelTwitch');
  
  // socket.on('toogleLive', function(live) {
  //   $scope.live = live;
  // });
  
  $http.get('/confs/pages').success(function(data) {
    lstPages.data.pageList = data;
  });
  
  
  // comparer la liste des pages avec les pages du role pour check ou non une checkbox
  
  // ----- Public Méthode -----
  
  $scope.setSelected = function (id, selectedElement) {
    if (id !== undefined && selectedElement !== undefined){
      $scope.idSelectedElement = id;
      if (lstPages.data.selectedRole !== undefined) {
        selectedElement.allowed = !selectedElement.allowed;
        rolesService.togglePage(selectedElement);
        
      }
    }
  };
  
  $scope.selectAll = function () {
    rolesService.selectAll();
  };
  $scope.unselectAll = function () {
    rolesService.unselectAll();
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