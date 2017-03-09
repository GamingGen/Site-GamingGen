'use strict';

var AppControllers = angular.module('AppControllers');
AppControllers.controller('homeCtrl', ['$http', '$scope', 'socket', '$filter', '$location', '$anchorScroll', function($http, $scope, socket, $filter, $location, $anchorScroll){
  // ----- Init -----
  var news      = this;
  news.articles = [];
  news.defaultPicture = "Img/Articles/default-thumbnail.jpg";
  
  
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
  
  $http.get('/articles').success(function(data) {
    news.articles = data;
  });
  
  socket.on('NewArticle', function(data) {
    data.register_date = new Date().toISOString();
    console.log(data);
    news.articles.push(data);
  });
  
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    news.articles.find(function(art) {return art.id === data.articleId}).comments.push(data);
  });
  
  
  // ----- Public Méthode -----
  $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   };
  
  // ----- Private Méthode -----
  
  // ----- jQuery -----
  
}]);