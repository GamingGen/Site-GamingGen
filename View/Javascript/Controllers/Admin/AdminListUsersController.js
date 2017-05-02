/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('AdminListUsersCtrl', ['$scope', '$http', 'socket', 'usersService', function($scope, $http, socket, usersService) {
  // ----- Init -----
  var lstUsers             = this;
  lstUsers.data            = usersService;
  
  $http.get('/users/listNoBan').then(function(data) {
    lstUsers.data.userList = data.data;
  }).catch(function(err) {
    console.log(err);
  });
  
  $scope.banUser = function(user) {
    if (user !== undefined) {
      $http.post('/users/ban', {'user' : user.pseudo}).then(function() {
        usersService.addUserToList(user, true);
        lstUsers.data.userList.splice(lstUsers.data.userList.indexOf(user), 1);
      }).catch(function() {
        $("#msgError").html("Erreur lors de l'opération, veuillez réessayer ultérieurement.");
        $("#msgError").show().delay(3000).fadeOut();
      });
    }
  };
  
}]);