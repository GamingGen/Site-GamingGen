'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('mainCtrl', ['UserService', 'ManageViewService', '$location', '$state', '$scope', 'socket', '$window', function(UserService, ManageViewService, $location, $state, $scope, socket, $window) {
  // ----- Init -----
  var user        = {};
  var pages       = {};
  pages.admin     = [];
  pages.gaminggen = [];
  pages.snack     = [];
  pages.snackRPI  = [];
  
  
  // ----- GET / SET Data -----
  $scope.User = UserService.currentUser;
  $scope.isMailExist = false;
  $scope.isPseudoExist = false;
  ManageViewService.setView('container');
  
  // Pour récupérer les infos en cas de coupure réseau
  socket.on('connect', function() {
    socket.emit('getLive');
    console.log('Connexion || Reconnexion');
  });
  
  socket.on('toogleLive', function(live) {
    $scope.live = live;
  });
  
  socket.on('isMailExist', function(data) {
    $scope.isMailExist = data;
  });
  
  socket.on('isPseudoExist', function(data) {
    console.log(data);
    $scope.isPseudoExist = data;
  });
  
  $scope.$watch('email', isMailExist);
  $scope.$watch('pseudo', isPseudoExist);
  
  $scope.connectionEmail = 'darkterra01@gmail.com';
  $scope.connectionPassword = 'darkterra';
  
  
  // ----- Public Méthode -----
  
  // Submit Login Modal
  $scope.submitLogin = function() {
    console.log('submitLogin Call');
    
    user.email = $scope.connectionEmail;
    user.password = $scope.connectionPassword;
    
    UserService.login(user)
    .success(function() {
      console.log('Connexion !!!');
      UserService.MajCurrentUser();
      $scope.User = UserService.currentUser;
      console.log($scope.User);
    })
    .error(function() {
      console.log('Connexion Error -_-');
    });
    
    // $scope.connectionEmail = '';
    // $scope.connectionPassword = '';
  };
  
  // Submit Register Modal
  $scope.submitRegister = function() {
    console.log('submitRegister Call');
    
    
    $scope.firstName = '';
    $scope.lastName  = '';
    $scope.pseudo    = '';
    $scope.password  = '';
    $scope.zip       = '';
    $scope.birthday  = '';
    $scope.email     = '';
  };
  
  
  // Submit Logout
  $scope.Logout = function() {
    console.log('Logout Call');
    
    UserService.logout()
    .success(function() {
      $state.go('home');
    });
  };
  
  // TEST RAZ Register Modal
  $scope.closeRegister = function() {
    console.log('closeRegister Call');
    // $scope.firstName = '';
    // $scope.lastName = '';
    // $scope.pseudo = '';
    // $scope.password = '';
    // $scope.zip = '';
    // $scope.birthday = '';
    // $scope.email = '';
    
    // $scope.isMailExist = false;
    // $scope.isPseudoExist = false;
  };
  
  // Launch fullscreen for browsers that support it!
  $scope.FullScreen = function() {
    launchIntoFullscreen(document.documentElement);
  };
  
  // Cancel fullscreen for browsers that support it!
  $scope.ExitFullScreen = function() {
    exitFullscreen();
  };
  
  $scope.needFullScreen = function() {
    // if ($location.path() === '/snack') {
    //   launchIntoFullscreen(document.documentElement);
    //   console.log('Go to FullScreen');
    // }
    // else {
    //   exitFullscreen();
    //   console.log('Go to Normal Screen');
    // };
  };
  
  
  // ----- Private Méthode -----
  function isMailExist(newValue, oldValue, scope) {
    if (newValue) {
      socket.emit('isMailExist', newValue);
    }
  };
  
  function isPseudoExist(newValue, oldValue, scope) {
    if (newValue) {
      socket.emit('isPseudoExist', newValue);
    }
  };
  
  
  // ----- jQuery -----
  
  // Collapse Menu responsive
  $('.dropdown-menu a, .navbar-brand, .autoCollapse, .toCollapse').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });
  
  // Modal Register Modal
  $('#closeRegister').click(function () {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#pseudo').val('');
    $('#password').val('');
    $('#zip').val('');
    $('#birthday').val('');
    $('#email').val('');
    
    $scope.isMailExist = false;
    $scope.isPseudoExist = false;
    $scope.$apply();
  });
  
  // RAZ Connection Modal
  $('#closeConnection').click(function () {
    $('#connectionEmail').val('');
    $('#connectionPassword').val('');
  });
}]);


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