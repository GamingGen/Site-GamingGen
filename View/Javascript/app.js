'use strict';

(function() {
  var app = angular.module('GamingGen', ['ui.router', 'AuthServices', 'ContainerService', 'AppControllers', 'SocketF', 'RolesS', 'Slider', 'youtube-embed', 'angular-loading-bar', 'ngAnimate']);
  
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
          url         : '/Stream',
          templateUrl : '../Partial/Admin/Stream.html'
        })
        .state('admin.snack', {
          url         : '/Snack',
          templateUrl : '../Partial/Admin/Snack.html',
        })
        .state('admin.accueil', {
          url         : '/Accueil',
          templateUrl : '../Partial/Admin/Accueil.html'
        })
        .state('admin.roles', {
          url         : '/Roles',
          views       : {
            ''  : {
              templateUrl : '../Partial/Admin/Roles.html'
            },
            'lstRoles@admin.roles'  : {
              templateUrl : '../Partial/Admin/ListRoles.html'
            },
            'modifRole@admin.roles' : {
              templateUrl : '../Partial/Admin/ModifRole.html'
            },
            'lstPages@admin.roles'  : {
              templateUrl : '../Partial/Admin/ListPages.html'
            },
          }
        })
        .state('admin.articles', {
          url         : '/Articles',
          templateUrl : '../Partial/Admin/adminArticles.html'
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