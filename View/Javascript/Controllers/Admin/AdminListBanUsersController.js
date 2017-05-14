/**
 * Controlleur Administration des Rôles
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('AdminListBansCtrl', ['$scope', '$http', 'socket', 'usersService', function($scope, $http, socket, usersService) {
  // ----- Init -----
  var lstUsers             = this;
  lstUsers.data            = usersService;
  
  $http.get('/users/listBan').then(function(data) {
    lstUsers.data.banList = data.data;
  }).catch(function(err) {
    console.log(err);
  });
  
  $scope.unbanUser = function(user) {
    if (user !== undefined) {
      $http.post('/users/unban', {user : {id: user._id, pseudo: user.pseudo}}).then(function() {
        usersService.addUserToList(user, false);
        lstUsers.data.banList.splice(lstUsers.data.banList.indexOf(user), 1);
      }).catch(function() {
        $("#msgError").html("Erreur lors de l'opération, veuillez réessayer ultérieurement.");
        $("#msgError").show().delay(3000).fadeOut();
      });
    }
  };
  
}]);