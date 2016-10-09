/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('AdminListBansCtrl', ['$scope', '$http', 'socket', 'usersService', function($scope, $http, socket, usersService) {
  // ----- Init -----
  var lstUsers             = this;
  lstUsers.data            = usersService;
  
  $http.get('/users/listBan').success(function(data) {
    lstUsers.data.banList = data;
  });
  
  $scope.unbanUser = function(index) {
    let user = lstUsers.data.banList[index];
    if (user !== undefined) {
      $http.post('/users/unban', {'user' : user.pseudo}).success(function() {
        usersService.addUserToList(user, false);
        lstUsers.data.banList.splice(index, 1);
      });
    }
  }
  
}]);