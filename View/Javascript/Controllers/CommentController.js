'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('commentCtrl', ['$scope', '$http', 'socket', 'UserService', function($scope, $http, socket, UserService) {
  // ----- Init -----
  $scope.User = UserService.currentUser;
  
  
  // ----- Public Méthode -----
  $scope.submitComment = function() {
    var comment = {
          articleId : Number($('#articleId').val()),
          username  : $scope.User.isLoggedIn ? $scope.User.pseudo : 'Un visiteur du futur',
          text      : $scope.comment
        };
    
    socket.emit('saveComment', comment);
    
    $scope.comment = "";
  };
  
  
  // ----- Private Méthode -----
}]);