'use strict';

var ListRoles = angular.module('UserS', []);

ListRoles.service('usersService', ['socket', function (socket) {
  var self = this;
  
  self.addUserToList = function(user, isBanned) {
    if (isBanned)
      self.banList.push(user);
    else
      self.userList.push(user);
  };
  
  self.sendPermissions = function(user, permissions, allPermissions) {
    if (permissions.length > 0) {
      // Wipe user permissions without extras permissions
      angular.forEach(allPermissions, function (_permission) {
        if (user.access.permissions.includes(_permission.name)) {
          
          var index = user.access.permissions
          .findIndex(function(permission) { return permission === _permission.name; });
        }

        user.access.permissions.splice(index, 1)
      });

      // Update user permissions
      angular.forEach(permissions, function (_permission) {
        if (!user.access.permissions.includes(_permission)) {
          user.access.permissions.push(_permission);
        }
      });
      socket.emit('UpdateUserPermissions', {_id: user._id, permissions: user.access.permissions});
    }
  };
}]);