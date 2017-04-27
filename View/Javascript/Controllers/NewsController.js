/**
 * Controlleur Article
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('newsCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var newsLength                = 0;
  var jump                      = 0;
  $scope.disableInfiniteScroll  = true;
  $scope.step                   = 5;
  $scope.news                   = [];
  var newsCtrl = this;
  newsCtrl.lstArticles = [];
  
  // ----- GET / SET Data -----
  $http.get('/articles').success(function(articles) {
    newsCtrl.lstArticles = articles;

    // Triage des commentaire du plus récent au plus ancien
    newsCtrl.lstArticles.sort(function (a, b) {
      return b.id - a.id;
    });
    newsLength = newsCtrl.lstArticles.length;
    $scope.disableInfiniteScroll = newsLength < $scope.step;
    $scope.loadMore();
  }).error(function() {
    $("#msgError").html("Erreur lors de la récupération des articles, veuillez réessayer ultérieurement.");
    $("#msgError").show().delay(3000).fadeOut();
  });

  
  // ----- Public Méthode -----
  $scope.loadMore = function() {
    console.log('loadMore() Fired...');
    if(newsCtrl.lstArticles) {
      if ($scope.news.length >= newsLength) {
        $scope.disableInfiniteScroll = true;
        console.log('infiniteScroll disable');
      }
      else {
        if (($scope.news.length + $scope.step) > newsLength) {
          jump = newsLength
        }
        else {
          jump = $scope.news.length + $scope.step
        }
        $scope.news = newsCtrl.lstArticles.slice(0, jump);
      }
    }
  };

  
  // ----- Private Méthode -----
  
  
  // ----- Events -----
  // Ecoute de l'ajout d'un article
  socket.on('NewArticle', function(data) {
    data.register_date = new Date().toISOString();
    $scope.news.push(data);
    newsCtrl.lstArticles.unshift(data);
  });
  
  // Ecoute de l'ajout d'un commentaire
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    $scope.news.find(function(art) {return art.id === data.articleId}).comments.push(data);
  });
  
  // ----- jQuery -----
}]);