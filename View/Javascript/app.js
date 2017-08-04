'use strict';

(function() {
  var app = angular.module('GamingGen', ['ui.router', 'permission', 'permission.ui', 'ui.grid', 'ui.grid.selection', 'ui.grid.pinning', 'ui.grid.autoResize', 'ngclipboard', 'AuthServices', 'ContainerService', 'AppControllers' ,'SocketF', 'RolesS', 'Slider', 'UserS', 'youtube-embed', 'angular-loading-bar', 'cfp.loadingBar', 'ngAnimate', 'duScroll', 'infinite-scroll', 'ngImageAppear', 'ui.bootstrap.datetimepicker']);
  var adminLayout = 'container-fluid admin';
  var normalLayout = 'container';
  
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$compileProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $compileProvider) {
      
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);
      
      // Système de routage
      $stateProvider
        .state('home', {
          url         : '/home',
          templateUrl : '../Partial/home.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In home Section !');
            ManageViewService.setView(normalLayout);
            particlesJS.load('particles-js', 'Conf/particles.json', function() {
              console.log('callback - particles.js config loaded');
            });
          }]
        })
        .state('404', {
          url         : '/404',
          templateUrl : '../Partial/404.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(adminLayout);
          }],
          onExit      : ['ManageViewService', function(ManageViewService) {
            console.log('I am Out 404 Section !');
            ManageViewService.setView(normalLayout);
          }]
        })
        .state('article', {
          url         : '/articles/:id',
          templateUrl : '../Partial/article.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
          controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
             $scope.idArticle = $stateParams.id;
          }]
        })
        .state('news', {
          url         : '/articles',
          templateUrl : '../Partial/news.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('arena', {
          url         : '/arena',
          templateUrl : '../Partial/arena.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('world', {
          url         : '/world',
          templateUrl : '../Partial/world.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('partner', {
          url         : '/partner',
          templateUrl : '../Partial/partners.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('tournaments', {
          url         : '/tournaments',
          templateUrl : '../Partial/tournaments.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('hearthStone', {
          url         : '/hearthStone',
          templateUrl : '../Partial/hearthStone.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('counterStrike', {
          url         : '/counterStrike',
          templateUrl : '../Partial/counterStrike.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('clashRoyale', {
          url         : '/clashRoyale',
          templateUrl : '../Partial/clashRoyale.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('legalNotice', {
          url         : '/legalNotice',
          templateUrl : '../Partial/legalNotice.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('usersValidate', {
          url         : '/users/validate/:hash',
          templateUrl : '../Partial/home.html',
          onEnter     : ['$stateParams', 'UserService', function($stateParams, UserService, ManageViewService) {
            UserService.validate($stateParams.hash);
            ManageViewService.setView(normalLayout);
          }]
        })
        .state('live', {
          url         : '/live',
          templateUrl : '../Partial/live.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('shop', {
          url         : '/shop',
          templateUrl : '../Partial/Shop/shop.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('shop.order', {
          url         : '/order',
          templateUrl : '../Partial/Shop/orderShop.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
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
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
          data        : {
            permissions: {
              only: ['ADMIN', 'ADMIN_VENDEUR', 'VENDEUR'],
              redirectTo: 'home'
            }
          }
        })
        .state('snack', {
          url         : '/snack',
          templateUrl : '../Partial/Snack/snack.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
        })
        .state('snack.staff', {
          url         : '/staff',
          templateUrl : '../Partial/Snack/staff.html',
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
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
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
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
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
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
          onEnter     : ['ManageViewService', function(ManageViewService) {
            console.log('I am In 404 Section !');
            ManageViewService.setView(normalLayout);
          }],
          data        : {
            permissions: {
              only: ['canSeeAdmin']
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
        .state('admin.roles', {
          url         : '/Roles',
          views       : {
            ''  : {
              templateUrl : '../Partial/Admin/adminRoles.html'
            },
            'lstUsers@admin.roles' : {
              templateUrl : '../Partial/Admin/_listUsers.html'
            },
            'lstRoles@admin.roles'  : {
              templateUrl : '../Partial/Admin/_listRoles.html'
            },
            'modifRole@admin.roles' : {
              templateUrl : '../Partial/Admin/_modifRole.html'
            },
            'lstPermissions@admin.roles'  : {
              templateUrl : '../Partial/Admin/_listPermissions.html'
            }
          },
          data        : {
            permissions: {
              only: ['ADMIN_ROLES'],
              redirectTo: {
                
                default: 'home'
              }
            }
          }
        })
        .state('admin.articles', {
          url         : '/adminArticles',
          templateUrl : '../Partial/Admin/adminArticles.html',
          data        : {
            permissions: {
              only: ['REDACTEUR', 'ADMIN_REDACTEUR'],
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
              templateUrl : '../Partial/Admin/adminBan.html'
            },
            'lstNonBanUsers@admin.ban'  : {
              templateUrl : '../Partial/Admin/_listNonBanUsers.html'
            },
            'lstBansUsers@admin.ban'  : {
              templateUrl : '../Partial/Admin/_listBanUsers.html'
            },
          },
          data        : {
            permissions: {
              only: ['canBan', 'canUnBan'],
              redirectTo: 'home'
            }
          }
        });
      
      // Route par defaut
      $urlRouterProvider.otherwise('home');
      
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
            else if (response.status === 404) {
              console.log('404');
              $state.go('404');
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