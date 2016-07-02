// var HttpBufferFactory = angular.module('HttpBufferFactory', []);

// HttpBufferFactory.factory("httpBufferService", function($injector) {
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