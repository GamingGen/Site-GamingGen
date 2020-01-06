'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminHomeCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  
  // ----- GET / SET Data -----
  console.log('Emit getCurrentHome !!!!!!!!!!!!!');
  socket.emit('getCurrentHome');
  
  socket.on('currentHome', function(data) {
    console.log('currentHome: ', data);
    
    $scope.title    = data.title;
    $scope.mainInfo = data.mainInfo;
    $scope.detail1  = data.detail1;
    $scope.detail2  = data.detail2;
  });
  
  
  socket.on('InfoSaved', function() {
    console.log('infoSaved');
    
    $scope.title    = '';
    $scope.mainInfo = '';
    $scope.detail1  = '';
    $scope.detail2  = '';
  });
  
  $scope.updateInfosHome = function() {
    var dataToSend = {
      title: $scope.title,
      mainInfo: $scope.mainInfo,
      detail1: $scope.detail1,
      detail2: $scope.detail2
    };
    
    console.log('dataToSend: ', dataToSend);
    
    socket.emit('updateInfoHome', dataToSend);
  };
  
  
  // ----- Private Méthode -----
  
}]);