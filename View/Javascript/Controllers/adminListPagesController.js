/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var ListRolesCtrl = angular.module('AppControllers');

ListRolesCtrl.controller('ListPagesCtrl', ['$scope', '$http', 'socket', 'rolesService', function($scope, $http, socket, rolesService) {
  // ----- Init -----
  var lstPages             = this;
  lstPages.pageList        = [];
  lstPages.selectedPages   = rolesService;
  $scope.idSelectedElement = undefined;
  
  
  // ----- GET / SET Data -----
  // socket.emit('getChannelTwitch');
  
  // socket.on('toogleLive', function(live) {
  //   $scope.live = live;
  // });
  
  $http.get('/confs/pages').success(function(data) {
    lstPages.pageList = data;
    console.log(lstPages.pageList);
  });
  
  
  // comparer la liste des pages avec les pages du role pour check ou non une checkbox
  
  // ----- Public Méthode -----
  
  $scope.setSelected = function (idSelectedElement) {
    if (idSelectedElement != undefined){
      $scope.idSelectedElement = idSelectedElement;
      
      if (lstPages.selectedPages.data.pages.indexOf(lstPages.pageList[idSelectedElement].name) === -1) {
        lstPages.selectedPages.data.pages.push(lstPages.pageList[idSelectedElement].name);
      }
    }
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