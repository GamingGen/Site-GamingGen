'use strict';

var ListRoles = angular.module('RolesS', []);

ListRoles.service('rolesAndPermissionsService', ['$http', 'socket', function ($http, socket) {
  console.log('Service Roles Fired...');
  var self                = this;
  self._idConf            = undefined;
  self.roles              = {};
  self.roleList           = [];
  self.permissions        = [];
  self.currentRole        = undefined;
  self.currentPermissions = [];
  self.newRole            = true;
  var removePermission    = false;

  getRolesAndPermissions(function(data) {
    self._idConf      = data._id;
    self.roles        = data.roles;
    self.permissions  = data.permissions;
    refreshLstRoles();
  });
  
  self.selectAllPermissisons = function() {
    if (self.currentRole !== undefined) {
      selectAllPermissions();
    }
  };
  
  self.unselectAllPermissions = function() {
    unselectAllPermissions();
  };
  
  self.setCurrentRole = function(selectedRole) {
    if (selectedRole !== undefined) {
      self.currentRole = selectedRole;
      self.newRole     = false;
      refreshLstPermissions();
    }
  };
  
  self.togglePermission = function(selectedPermission) {
    var temp = self.currentPermissions.map(function(permission) {
      return permission.name;
    });
    if (temp.includes(selectedPermission.name)) {
      var index = self.currentPermissions
      .findIndex(function(permission) { return permission.name === selectedPermission.name; });

      self.currentPermissions.splice(index, 1);

      var index = self.permissions
      .findIndex(function(permission) { return permission.name === selectedPermission.name; });

      self.permissions[index].allowed = false;
    }
    else {
      self.currentPermissions.push(selectedPermission);
      var index = self.permissions
      .findIndex(function(permission) { return permission.name === selectedPermission.name; });

      self.permissions[index].allowed = true;
    }
  };
  
  self.unselectRole = function() {
    unselectAllRoles();
  };
  
  self.removeRole = function(role) {
    delete self.roles[role.name];

    socket.emit('UpdateRoles', {_id: self._idConf, roles: self.roles});
  };
  
  self.sendRole = function() {
    if (self.currentRole !== undefined && self.currentPermissions.length > 0) {
      var temp = [];
      angular.forEach(self.currentPermissions, function (permission) {
        temp.push(permission.name);
      });
      self.roles[self.currentRole.name] = temp;

      socket.emit('UpdateRoles', {_id: self._idConf, roles: self.roles});
    }
  };
  
  socket.on('RolesUpdated', function(data) {
    unselectAllRoles();

    self.roles        = data.roles;
    self.permissions  = data.permissions;
    refreshLstRoles();
  });
  
  // Private methode
  function getRoles (callback) {
    $http.get('/confs/roles').then(function(data) {
      callback(data.data);
    }).catch(function(err) {
      console.log(err);
    });
  }

  function refreshLstRoles () {
    var temp = Object.keys(self.roles);
    self.roleList = [];
    angular.forEach(temp, function(role) {
      self.roleList.push({name: role});
    });
  }

  function getPermissions (callback) {
    $http.get('/confs/permissions').then(function(data) {
      callback(data.data);
    }).catch(function(err) {
      console.log(err);
    });
  }

  function refreshLstPermissions () {
    if (self.currentRole !== undefined) {
      self.currentPermissions = [];
      
      // Set false all allowed permissions
      angular.forEach(self.permissions, function(permission) {
        permission.allowed = false;
      });

      angular.forEach(self.roles[self.currentRole.name], function(_permission) {
        self.currentPermissions.push({name: _permission});

        var index = self.permissions
        .findIndex(function(permission) { return permission.name === _permission; });

        self.permissions[index].allowed = true;
      });
    }
  }

  function unselectAllRoles () {
    removePermission = false;
    self.newRole     = true;
    self.currentRole = undefined;
    self.currentPermissions = [];

    unselectAllPermissions();
  }

  function selectAllPermissions () {
    unselectAllPermissions();
    angular.forEach(self.permissions, function(permission) {
        self.currentPermissions.push(permission);
        permission.allowed = true;
    });
  }

  function unselectAllPermissions () {
    self.currentPermissions = [];
    angular.forEach(self.permissions, function(permission) {
        permission.allowed = false;
    });
  }

  function getRolesAndPermissions (callback) {
    $http.get('/confs/rolesandpermissions').then(function(data) {
      callback(data.data);
    }).catch(function(err) {
      console.log(err);
    });
  }
}]);