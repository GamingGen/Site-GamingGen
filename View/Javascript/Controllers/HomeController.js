'use strict';

var AppControllers = angular.module('AppControllers');
AppControllers.controller('homeCtrl', ['$http', '$scope', 'socket', '$filter', function($http, $scope, socket){
  // ----- Init -----
  var news      = this;
  news.articles = [];
  news.defaultPicture = "Img/Articles/default-thumbnail.jpg";
  news.moreArticles = "https://overwatch-a.akamaihd.net/img/logos/overwatch-share-3d5a268515283007bdf3452e877adac466d579f4b44abbd05aa0a98aba582eeaebc4541f1154e57ec5a43693345bebda953381a7b75b58adbd29d3f3eb439ad2.jpg";
  
  
  // ----- GET / SET Data -----
  $scope.videoPresentation = "dGRWO7C6m6M";
  // $scope.videoPresentation = "https://www.youtube.com/watch?v=Im4TO03CuF8&feature=youtu.be";
  // $scope.videoPresentation = "MUg1WBEPLCE";
  $scope.playerVars = {
    controls: 1,
    autoplay: 1
  };
  
  $scope.$on('youtube.player.ready', function ($event, player) {
    player.mute();
  });
  
  $http.get('/articles/home').then(function(data) {
    news.articles = data.data;
  }).catch(function(err) {
    console.log(err);
  });
  
  socket.on('NewArticle', function(data) {
    news.articles.push(data);
  });
  
  socket.on('ArticleUpdated', function(articleUpdated) {
    var index = news.articles.map(function(element) { return element._id; }).indexOf(articleUpdated._id);
    if (index !== -1) {
      news.articles[index] = articleUpdated;
    }
    else {
      news.articles.push(articleUpdated);
    }
  });
  
  socket.on('ArticleRemoved', function(id) {
    // var index = news.articles.map(function(element) { return element._id; }).indexOf(id);
    // news.articles.splice(index, 1);
      $http.get('/articles/home').then(function(data) {
      news.articles = data.data;
    }).catch(function(err) {
      console.log(err);
    });
  });
  
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    news.articles.find(function(article) {return article._id === data.article_id}).comments.push(data);
  });
  
  
  // ----- Public Méthode -----
  
  // ----- Private Méthode -----
  
  // ----- jQuery -----
  
}]);