'use strict';

var ListRoles = angular.module('RolesS', []);

ListRoles.service('rolesService', [function () {
  console.log('Service LstRoles Fired...');
  var self = this;
  
  self.selectAll = function() {
    if (self.selectedRole !== undefined) {
      angular.forEach(self.pageList, function(value) {
        value.allowed = true;
      });
      
      angular.forEach(self.selectedRole.pages, function(value) {
        value.allowed = true;
      });
      // self.selectedRole.pages = self.pageList;
    }
  };
  
  self.unselectAll = function() {
    if (self.selectedRole !== undefined) {
      angular.forEach(self.pageList, function(value) {
        value.allowed = false;
      });
      
      
      angular.forEach(self.selectedRole.pages, function(value) {
        value.allowed = false;
      });
      // self.selectedRole.pages = self.pageList;
      console.log(self.selectedRole);
    }
  };
  
  self.togglePage = function(selectedElement) {
    console.log(self.selectedRole);
    console.log(self.pageList);
    
    angular.forEach(self.selectedRole.pages, function(value) {
      value.allowed = false;
      angular.forEach(self.pageList, function(valueSelectedRole) {
        if (valueSelectedRole.allowed === true) {
          value.allowed = true;
        }
        // else {
        //   value.allowed = false;
        // }
      });
    });
    // self.selectedRole.pages = self.pageList;
  };
  
  self.copyAllouedPages = function() {
    angular.forEach(self.pageList, function(value) {
      value.allowed = false;
      angular.forEach(self.selectedRole.pages, function(valueSelectedRole) {
        if (valueSelectedRole.name === value.name && valueSelectedRole.allowed === true) {
          value.allowed = true;
        }
      });
    });
  };
  
  
  // Private methode
  
}]);