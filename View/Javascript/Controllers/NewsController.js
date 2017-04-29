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
  
  function getObject(theObject, value) {
    var result = null;
    if(theObject instanceof Array) {
        for(var i = 0; i < theObject.length; i++) {
            result = getObject(theObject[i]);
        }
    }
    else
    {
        for(var prop in theObject) {
            console.log(prop + ': ' + theObject[prop]);
            if(prop == '_id') {
                if(theObject[prop] === value) {
                    return theObject;
                }
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array)
                result = getObject(theObject[prop]);
        }
    }
    return result;
  }
  
  
  // ----- Events -----
  // Ecoute de l'ajout d'un article
  socket.on('NewArticle', function(data) {
    $scope.news.push(data);
    newsCtrl.lstArticles.unshift(data);
  });
  
  socket.on('ArticleUpdated', function(articleUpdated) {
    var indexAll = newsCtrl.lstArticles.map(function(element) { return element._id; }).indexOf(articleUpdated._id);
    var indexPartial = $scope.news.map(function(element) { return element._id; }).indexOf(articleUpdated._id);
    newsCtrl.lstArticles[indexAll] = articleUpdated;
    $scope.news[indexPartial] = articleUpdated;
  });
  
  socket.on('ArticleRemoved', function(id) {
    var indexAll = $scope.news.map(function(element) { return element._id; }).indexOf(id);
    var indexPartial = $scope.news.map(function(element) { return element._id; }).indexOf(id);
    newsCtrl.lstArticles.splice(indexAll, 1);
    $scope.news.splice(indexPartial, 1);
  });
  
  // Ecoute de l'ajout d'un commentaire
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    $scope.news.find(function(article) {return article._id === data.article_id}).comments.push(data);
  });
  
  socket.on('CommentRemoved', function(id) {
    console.log(getObject(newsCtrl.lstArticles, id), id);
    // var indexPartial = $scope.news.map(function(element) { return element._id; }).indexOf(id);
    // $scope.news[indexPartial] = articleUpdated;
    // var index = $scope.news[$scope.news.indexOf($scope.selectedArticle)].comments.map(function(element) { return element._id; }).indexOf(id);
    // $scope.news[$scope.news.indexOf($scope.selectedArticle)].comments.splice(index, 1);
  });
  
  // ----- jQuery -----
}]);