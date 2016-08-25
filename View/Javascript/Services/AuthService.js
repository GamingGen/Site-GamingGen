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
.service("UserService", function($http, $location, SessionService, HttpBufferService) {
  var level = 0;
  
  if (SessionService.getValue("session.access") !== null) {
    level = JSON.parse(SessionService.getValue("session.access")).level;
  }
  this.currentUser = {
      email       : SessionService.getValue("session.email") || "",
      pseudo      : SessionService.getValue("session.pseudo") || "",
      accessLvl   : level || 0,
      general     : SessionService.getValue("session.general") || "",
      team        : SessionService.getValue("session.team") || "",
      isLoggedIn  : (SessionService.getValue("session.email") ? true : false)
  };
  
  this.MajCurrentUser = function() {
    if (SessionService.getValue("session.access") !== null) {
      level = JSON.parse(SessionService.getValue("session.access")).level;
    }
    
    this.currentUser = {
      email       : SessionService.getValue("session.email") || "",
      pseudo      : SessionService.getValue("session.pseudo") || "",
      accessLvl   : level || 0,
      general     : SessionService.getValue("session.general") || "",
      team        : SessionService.getValue("session.team") || "",
      isLoggedIn  : (SessionService.getValue("session.email") ? true : false)
    };
  };
  
  this.login = function(user) {
      var self = this;
      
      return $http.post("/users/login", {
          "email": user.email,
          "password": user.password
      }).then(function success(response) {
        
        console.log('response:');
        console.log(response);
        
        self.currentUser.email = response.email;
        self.currentUser.isLoggedIn = true;
        SessionService.setValue("session.email", response.email);
        SessionService.setValue("session.pseudo", response.pseudo);
        SessionService.setValue("session.access", JSON.stringify(response.access));
        SessionService.setValue("session.general", JSON.stringify(response.general));
        SessionService.setValue("session.team", JSON.stringify(response.team));
        // $location.path("/");
        // or
        // HttpBufferService.retryLastRequest();
      }, function error(err) {
        console.log('err');
        console.log(err);
        
      });
      
  };
  
  this.logout = function() {
      var self = this;
      return $http.post("/users/logout").success(function() {
          self.currentUser.isLoggedIn = false;
          SessionService.destroyItem("session.email");
          SessionService.destroyItem("session.pseudo");
          SessionService.destroyItem("session.access");
          SessionService.destroyItem("session.general");
          SessionService.destroyItem("session.team");
      });
  };


  // this.loginShowing = false;

  // this.setLoginState = function(state) {
  //     this.loginShowing = state;
  // };
})
.factory("HttpBufferService", function($injector) {

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
});