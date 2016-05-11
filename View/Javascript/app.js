(function() {
  var app = angular.module('store', []);
  
  
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
  
  app.controller('StoreController', function(){
    this.products = gems;
  });
  
  var gems = [
    {
      name: 'Dodecahedron',
      price: 2.95,
      description: '1. 2. 3.',
      canPurchase: true
    },
    {
      name: 'Pentagonal Gem',
      price: 5.95,
      description: '. . .',
      canPurchase: false
    }
  ];
  
})();

var tests = [];

for(var test of tests){
  console.log(test);
}