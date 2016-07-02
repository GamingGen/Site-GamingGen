(function() {
  var app = angular.module('GamingGen', ['ui.router', 'AuthServices', 'AppControllers', 'Socket', 'Slider', 'youtube-embed', 'angular-loading-bar', 'ngAnimate']);
  
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      // Système de routage
      $stateProvider
        .state('home', {
          url         : '/home',
          templateUrl : '../Partial/home.html'
        })
        .state('live', {
          url         : '/live',
          templateUrl : '../Partial/live.html'
        })
        .state('snack', {
          url         : '/snack',
          templateUrl : '../Partial/Admin/admin.html'
        })
        .state('snack.staff', {
          url         : '/snack',
          templateUrl : '../Partial/Snack/staff.html'
        })
        .state('snack.staff.commande', {
          url         : '/commande',
          templateUrl : '../Partial/Snack/commande.html'
        })
        .state('snack.histo', {
          url         : '/histoSnack',
          templateUrl : '../Partial/Snack/histoSnack.html',
        })
        .state('admin', {
          url         : '/admin',
          templateUrl : '../Partial/Admin/admin.html',
          onEnter     : ['UserService', function(UserService) {
            console.log('I am In !');
            // UserService.setLoginState(true);
          }],
          onExit      : ['UserService', function(UserService) {
            console.log('I am Out !');
            // UserService.setLoginState(false);
          }]
          // authorized  : true
        })
        .state('admin.stream', {
          url         : '/adminStream',
          templateUrl : '../Partial/Admin/adminStream.html'
        })
        .state('admin.snack', {
          url         : '/adminSnack',
          templateUrl : '../Partial/Admin/adminSnack.html',
          // controllerAs: 'adminMenuSnackCtrl as menuSnack'
        })
        .state('admin.accueil', {
          url         : '/adminAccueil',
          templateUrl : '../Partial/Admin/adminAccueil.html'
        })
        .state('admin.articles', {
          url         : '/adminArticles',
          templateUrl : '../Partial/Admin/adminArticles.html'
        });
      $urlRouterProvider.otherwise('/home');
      
      
      $httpProvider.interceptors.push(function($q, $location, $state, HttpBufferService, $timeout) {
        return {
          "responseError": function(response) {
            var deferred = $q.defer();
              
            if (response.status === 401) {
              // $location.path('#/home');
              // $state.go('home');
              $timeout(function(){$state.go('home');});
              
              // TODO à voir si utile
              // HttpBufferService.storeRequest({
              //   config: response.config,
              //   deferred: deferred
              // });
            }
            return deferred.promise;
          }
        };
      });
      
      // TODO Trouver comment intercepter le CTRL + R || F5
      // $locationProvider.html5Mode(true);
    }
  ]);
})();