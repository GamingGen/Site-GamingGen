'use strict';

var ListRoles = angular.module('RolesS', []);

ListRoles.service('rolesService', [function () {
  console.log('Service LstRoles Fired...');
  var self = this;
  self.data = {};
}]);