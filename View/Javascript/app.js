'use strict';

(function() {
  var app = angular.module('GamingGen', ['ui.router', 'permission', 'permission.ui', 'ngclipboard', 'AuthServices', 'AppControllers' ,'Socket', 'Slider', 'UserS', 'youtube-embed', 'angular-loading-bar', 'cfp.loadingBar', 'ngAnimate', 'duScroll', 'infinite-scroll', 'ngImageAppear']);
  
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      
      // Système de routage
      $stateProvider
        .state('home', {
          url         : '/home',
          templateUrl : '../Partial/home.html',
          onEnter     : function() {
            particlesJS.load('particles-js', 'particles.json', function() {
              console.log('callback - particles.js config loaded');
            });
          }
        })
        .state('article', {
          url         : '/articles/:id',
          templateUrl : '../Partial/article.html',
          controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
             $scope.idArticle = $stateParams.id;
          }]
        })
        .state('news', {
          url         : '/articles',
          templateUrl : '../Partial/news.html',
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
        .state('shop', {
          url         : '/shop',
          templateUrl : '../Partial/Shop/shop.html'
        })
        .state('shop.order', {
          url         : '/order',
          templateUrl : '../Partial/Shop/orderShop.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'ADMIN_VENDEUR', 'VENDEUR'],
              redirectTo: 'home'
            }
          }
        })
        .state('shop.histo', {
          url         : '/histo',
          templateUrl : '../Partial/Shop/histoShop.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'ADMIN_VENDEUR', 'VENDEUR'],
              redirectTo: 'home'
            }
          }
        })
        .state('snack', {
          url         : '/snack',
          templateUrl : '../Partial/Snack/snack.html'
        })
        .state('snack.staff', {
          url         : '/staff',
          templateUrl : '../Partial/Snack/staff.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'SNAC_STAFF'],
              redirectTo: 'home'
            }
          }
        })
        .state('snack.staff.commande', {
          url         : '/commande',
          templateUrl : '../Partial/Snack/commande.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'SNAC_STAFF'],
              redirectTo: 'home'
            }
          }
        })
        .state('snack.staff.histo', {
          url         : '/histoSnack',
          templateUrl : '../Partial/Snack/histoSnack.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'SNAC_STAFF'],
              redirectTo: 'home'
            }
          }
        })
        .state('admin', {
          url         : '/admin',
          templateUrl : '../Partial/Admin/admin.html',
          data        : {
            permissions: {
              only: ['ADMIN']
            }
          }
        })
        .state('admin.stream', {
          url         : '/adminStream',
          templateUrl : '../Partial/Admin/adminStream.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'ADMIN_STREAM'],
              redirectTo: 'home'
            }
          }
        })
        .state('admin.snack', {
          url         : '/adminSnack',
          templateUrl : '../Partial/Admin/adminSnack.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'ADMIN_SNACK'],
              redirectTo: 'home'
            }
          }
        })
        .state('admin.accueil', {
          url         : '/adminAccueil',
          templateUrl : '../Partial/Admin/adminAccueil.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'ADMIN_ACCUEIL'],
              redirectTo: 'home'
            }
          }
        })
        .state('admin.articles', {
          url         : '/adminArticles',
          templateUrl : '../Partial/Admin/adminArticles.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'REDACTEUR', 'ADMIN_REDACTEUR'],
              redirectTo: {
                
                default: 'home'
              }
            }
          }
        })
        .state('admin.shop', {
          url         : '/adminShop',
          templateUrl : '../Partial/Admin/adminShop.html',
          data        : {
            permissions: {
              only: ['ADMIN', 'ADMIN_VENDEUR'],
              redirectTo: 'home'
            }
          }
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
      
      // Route par defaut
      $urlRouterProvider.otherwise('/home');
      
      // Supprime le caractère ! dans l'url
      $locationProvider.hashPrefix('');
      
      $httpProvider.interceptors.push(['$q', '$location', '$state', 'HttpBufferService', '$timeout', 'cfpLoadingBar', function($q, $location, $state, HttpBufferService, $timeout, cfpLoadingBar) {
        return {
          "responseError": function(response) {
            var deferred = $q.defer();
            
            console.log('interceptor response :');
            console.log(response);
            
            if (response.status !== 200) {
              console.log('Stop Chargement Animation');
              
              errorOnGetArticle(response.statusText);
              
              $timeout(function () {
                cfpLoadingBar.complete();
              }, 500);
            }
            
            if (response.status === 401) {
              console.log('401');
              $state.go('home');
              // $timeout(function(){$state.go('home');});
              
              // TODO à voir si utile
              // HttpBufferService.storeRequest({
              //   config: response.config,
              //   deferred: deferred
              // });
            }
            else if (response.status === 500) {
              console.log('500');
              $state.go('home');
            }
            return deferred.promise;
          }
        };
      }]);
      
      function errorOnGetArticle(err) {
        $("#msgError").html(err);
        $("#msgError").show().css('display', 'flex').delay(3000).fadeOut();
      }
      
      // TODO Trouver comment intercepter le CTRL + R || F5
      // $locationProvider.html5Mode(true);
    }
  ])
  .run(['UserService', function (UserService) {
    if (UserService.currentUser.isLoggedIn) {
      UserService.MajCurrentUser();
    }
  }]);
})();