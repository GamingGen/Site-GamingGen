/**
 * Controlleur Article
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('newsCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  var newsCtrl                 = this;
  newsCtrl.lstArticles         = [];
  var newsLength               = 0;
  var jump                     = 0;
  $scope.disableInfiniteScroll = true;
  $scope.step                  = 5;
  $scope.news                  = [];
  
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
          jump = newsLength;
        }
        else {
          jump = $scope.news.length + $scope.step;
        }
        $scope.news = newsCtrl.lstArticles.slice(0, jump);
      }
    }
  };

  
  // ----- Private Méthode -----
  
  
  // ----- Events -----
  // Ecoute de l'ajout d'un article
  socket.on('NewArticle', function(data) {
    $scope.news.push(data);
    newsCtrl.lstArticles.unshift(data);
  });
  
  socket.on('ArticleUpdated', function(articleUpdated) {
    var indexAll = newsCtrl.lstArticles.map(function(element) { return element.id; }).indexOf(articleUpdated.id);
    var indexPartial = $scope.news.map(function(element) { return element.id; }).indexOf(articleUpdated.id);
    newsCtrl.lstArticles[indexAll] = articleUpdated;
    $scope.news[indexPartial] = articleUpdated;
  });
  
  // Ecoute de l'ajout d'un commentaire
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    $scope.news.find(function(art) {return art.id === data.articleId}).comments.push(data);
  });
  
  // ----- jQuery -----
}]);