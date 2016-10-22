'use strict';

(function() {
  var app = angular.module('GamingGen', ['ui.router', 'AuthServices', 'ContainerService', 'AppControllers', 'Socket', 'Slider', 'youtube-embed', 'angular-loading-bar', 'ngAnimate',
  'UserS', // Services
  ]);
  
  const adminLayout = 'container-fluid admin';
  const normalLayout = 'container';
  
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      // Système de routage
      $stateProvider
        .state('home', {
          url         : '/home',
          templateUrl : '../Partial/home.html'
        })
        .state('usersValidate', {
          url         : '/users/validate/:hash',
          templateUrl : '../Partial/home.html',
          onEnter     : ['$stateParams', 'UserService', function($stateParams, UserService) {
            UserService.validate($stateParams.hash);
          }]
        })
        .state('live', {
          url         : '/live',
          templateUrl : '../Partial/live.html'
        })
        .state('snack', {
          url         : '/snack',
          templateUrl : '../Partial/Snack/snack.html'
        })
        .state('snack.staff', {
          url         : '/staff',
          templateUrl : '../Partial/Snack/staff.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In Snack Section !');
            ManageViewService.setView(adminLayout);
          }],
          onExit      : ['ManageViewService', function(ManageViewService) {
            console.log('I am Out Snack Section !');
            ManageViewService.setView(normalLayout);
          }]
        })
        .state('snack.staff.commande', {
          url         : '/commande',
          templateUrl : '../Partial/Snack/commande.html'
        })
        .state('snack.staff.histo', {
          url         : '/histoSnack',
          templateUrl : '../Partial/Snack/histoSnack.html',
        })
        .state('admin', {
          url         : '/admin',
          templateUrl : '../Partial/Admin/admin.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In Admin Section !');
            ManageViewService.setView(adminLayout);
          }],
          onExit      : ['ManageViewService', function(ManageViewService) {
            console.log('I am Out Admin Section !');
            ManageViewService.setView(normalLayout);
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
        })
        .state('admin.accueil', {
          url         : '/adminAccueil',
          templateUrl : '../Partial/Admin/adminAccueil.html'
        })
        .state('admin.articles', {
          url         : '/adminArticles',
          templateUrl : '../Partial/Admin/adminArticles.html'
        })
        .state('admin.ban', {
          url         : '/Ban',
          views       : {
            ''  : {
              templateUrl : '../Partial/Admin/Ban.html'
            },
            'lstUsers@admin.ban'  : {
              templateUrl : '../Partial/Admin/ListUsers.html'
            },
            'lstBans@admin.ban'  : {
              templateUrl : '../Partial/Admin/ListBans.html'
            },
          }
        });
      $urlRouterProvider.otherwise('/home');
      
      
      $httpProvider.interceptors.push(function($q, $location, $state, HttpBufferService, $timeout) {
        return {
          "responseError": function(response) {
            var deferred = $q.defer();
            
            console.log('interceptor response :');
            console.log(response);
              
            if (response.status === 401) {
              console.log('401');
              // $location.path('#/home');
              $state.go('snack.staff.commande');
              // $timeout(function(){$state.go('home');});
              
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