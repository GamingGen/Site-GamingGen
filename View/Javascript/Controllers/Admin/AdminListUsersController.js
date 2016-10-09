/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('AdminListUsersCtrl', ['$scope', '$http', 'socket', 'usersService', function($scope, $http, socket, usersService) {
  // ----- Init -----
  var lstUsers             = this;
  lstUsers.data            = usersService;
  
  $http.get('/users/listNoBan').success(function(data) {
    lstUsers.data.userList = data;
  });
  
  $scope.banUser = function(index) {
    let user = lstUsers.data.userList[index];
    if (user !== undefined) {
      $http.post('/users/ban', {'user' : user.pseudo}).success(function() {
        usersService.addUserToList(user, true);
        lstUsers.data.userList.splice(index, 1);
      });
    }
  }
  
}]);