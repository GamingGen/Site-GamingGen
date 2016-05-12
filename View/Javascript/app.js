(function() {
  var app = angular.module('articles', []);
  
  
  // Find the right method, call on correct element
  function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  
  // Whack fullscreen
  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  
  app.controller('myCtrl', function($scope){
    // Launch fullscreen for browsers that support it!
    $scope.FullScreen = function() {
        launchIntoFullscreen(document.documentElement);
    };
    // Cancel fullscreen for browsers that support it!
    $scope.ExitFullScreen = function() {
        exitFullscreen();
    };
  });
  
  app.controller('NewsController', ['$http', '$scope', function($http, $scope){
    var news = this;
    news.articles = [];
    
    $http.get('/articles').success(function(data) {
      news.articles = data;
      //console.log(JSON.stringify(data));
    });
  }]);
})();