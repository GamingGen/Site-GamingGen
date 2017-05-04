'use strict';

// var AuthService = angular.module('AuthService', []);

// AuthService.service("SessionService", function() {
//   this.setValue = function(key, value) {
//     localStorage.setItem(key, value);
//   };
//   this.getValue = function(key) {
//     return localStorage.getItem(key);
//   };
//   this.destroyItem = function(key) {
//     localStorage.removeItem(key);
//   };
// });

// AuthService.service("UserService", function($http, $location, SessionService, HttpBufferService) {
//   this.currentUser = {
//     email: SessionService.getValue("session.email") || "",
//     isLoggedIn: (SessionService.getValue("session.email") ? true : false)
//   };
  
//   this.login = function(user) {
//     var _this = this;
//     return $http.post("/users/login", {
//       "email": user.email,
//       "password": user.pass
//     }).success(function(response) {
//       _this.currentUser.email = response.useremail;
//       _this.currentUser.isLoggedIn = true;
//       SessionService.setValue("session.email", response.useremail);
//       $location.path("/");
//       // or
//       HttpBufferService.retryLastRequest();
//     });
//   };
  
//   this.logout = function() {
//     var _this = this;
//     return $http.post("/users/logout").success(function() {
//       _this.currentUser.isLoggedIn = false;
//       SessionService.destroyItem("session.email");
//     });
//   };
  
//   this.loginShowing = false;
  
//   this.setLoginState = function(state) {
//     this.loginShowing = state;
//   };
// });

// AuthService.factory("HttpBufferService", function($injector) {
//   var $http;
//   var buffer = {};
  
//   return {
//     storeRequest: function(request) {
//       buffer = request;
//     },
//     retryLastRequest: function() {
      
//       function successCallback(response) {
//         buffer.deferred.resolve(response);
//       }
      
//       function errorCallback(response) {
//         buffer.deferred.reject(response);
//       }
//       $http = $http || $injector.get("$http");
//       $http(buffer.config).then(successCallback, errorCallback);
//     }
//   };
// });




angular.module("AuthServices", [])
.service("SessionService", function() {
    this.setValue = function(key, value) {
        localStorage.setItem(key, value);
    };
    this.getValue = function(key) {
        return localStorage.getItem(key);
    };
    this.destroyItem = function(key) {
        localStorage.removeItem(key);
    };
})
.service("UserService", ['$http', '$location', 'SessionService', 'HttpBufferService', 'PermPermissionStore', 'PermRoleStore', function($http, $location, SessionService, HttpBufferService, PermPermissionStore, PermRoleStore) {
  var level = 0;
  if (SessionService.getValue("session.access") !== null) {
    level = JSON.parse(SessionService.getValue("session.access")).level;
  }
  this.currentUser = {
      email       : SessionService.getValue("session.email") || "",
      pseudo      : SessionService.getValue("session.pseudo") || "",
      access      : JSON.parse(SessionService.getValue("session.access")) || "",
      accessLvl   : level || 0,
      general     : JSON.parse(SessionService.getValue("session.general")) || "",
      team        : SessionService.getValue("session.team") || "",
      isLoggedIn  : (SessionService.getValue("session.email") ? true : false)
  };
  
  this.MajCurrentUser = function() {
    console.log('MajCurrentUser !!!');
    var that = this;
    
    if (SessionService.getValue("session.access") !== null) {
      level = JSON.parse(SessionService.getValue("session.access")).level;
    }
    
    that.currentUser = {
      email       : SessionService.getValue("session.email") || "",
      pseudo      : SessionService.getValue("session.pseudo") || "",
      access      : JSON.parse(SessionService.getValue("session.access")) || "",
      accessLvl   : level || 0,
      general     : JSON.parse(SessionService.getValue("session.general")) || "",
      team        : SessionService.getValue("session.team") || "",
      isLoggedIn  : (SessionService.getValue("session.email") ? true : false)
    };
    
    if (that.currentUser.isLoggedIn && that.currentUser.access && that.currentUser.access.permissions) {
      // Suppression des permissions et roles
      PermPermissionStore.clearStore();
      
      // Gestion des permissions
      PermPermissionStore
      .defineManyPermissions(that.currentUser.access.permissions, function (permissionName) {
        return that.currentUser.access.permissions.indexOf(permissionName) !== -1;
      });
    }
    
    // Gestion des roles
    $http.get("/confs/roles").then(function (result) {
      // Suppression des roles
      PermRoleStore.clearStore();
      
      // Ajout des roles
      if (that.currentUser.access && that.currentUser.access.roles) {
        angular.forEach(that.currentUser.access.roles, function(value, key) {
          result.data[key] = value;
        });
      }
      PermRoleStore
      .defineManyRoles(result.data);
    });
  };
  
  this.login = function(user) {
    var self = this;
    
    return $http.post("/users/login", {
        "email": user.email,
        "password": user.password
    }).then(function success(response) {
      console.log('response: ', response);
      
      user.password = '';
      self.currentUser.email = response.data.email;
      self.currentUser.isLoggedIn = true;
      SessionService.setValue("session.email", response.data.email);
      SessionService.setValue("session.pseudo", response.data.pseudo);
      SessionService.setValue("session.access", JSON.stringify(response.data.access));
      SessionService.setValue("session.general", JSON.stringify(response.data.general));
      SessionService.setValue("session.team", JSON.stringify(response.data.team));
      // $location.path("/");
      // or
      // HttpBufferService.retryLastRequest();
    }, function error(err) {
      console.log('err: ', err);
    });
  };
  
  this.logout = function() {
    var self = this;
    return $http.post("/users/logout").then(function() {
      console.log('ClearSession');
      self.currentUser.isLoggedIn = false;
      SessionService.destroyItem("session.email");
      SessionService.destroyItem("session.pseudo");
      SessionService.destroyItem("session.access");
      SessionService.destroyItem("session.general");
      SessionService.destroyItem("session.team");
    });
  };
  
  this.validate = function(hash) {
      var self = this;
      return $http.post("/users/validate", {hash: hash})
        // TODO quand le bypass de connexion sera implémenté
        /*
        .success(function(user) {
          self.login(user);
        })*/
        .then(function() {
          $("#msgInfo").html("Compte validé !");
          $("#msgInfo").show().delay(3000).fadeOut();
        })
        .catch(function() {
          $("#msgError").html("Validation du compte impossible.");
          $("#msgError").show().delay(3000).fadeOut();
      });
  };


  // this.loginShowing = false;

  // this.setLoginState = function(state) {
  //     this.loginShowing = state;
  // };
}])
.factory("HttpBufferService", [ '$injector', function($injector) {

    var $http;
    var buffer = {};


    return {
      storeRequest: function(request) {
          buffer = request;
      },
      retryLastRequest: function() {

        function successCallback(response) {
            buffer.deferred.resolve(response);
        }

        function errorCallback(response) {
            buffer.deferred.reject(response);
        }
        $http = $http || $injector.get("$http");
        $http(buffer.config).then(successCallback, errorCallback);
      }
    };
}]);