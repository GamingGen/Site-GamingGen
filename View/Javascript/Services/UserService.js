'use strict';

var ListRoles = angular.module('UserS', []);

ListRoles.service('usersService', [function () {
  var self = this;
  
  self.addUserToList = function(user, isBanned) {
    if (isBanned)
        self.banList.push(user);
    else
        self.userList.push(user);
  };
  
}]);