/**
 * Controlleur Article
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('articleListCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  
  // INIT
  var articleListCtrl = this;
  articleListCtrl.lstArticles = [];
  
  $http.get('/articles').success(function(articles) {
    articleListCtrl.lstArticles = articles;
  }).error(function() {
    $("#msgError").html("Erreur lors de la récupération des articles, veuillez réessayer ultérieurement.");
    $("#msgError").show().delay(3000).fadeOut();
  });
  
  // Ecoute de l'ajout d'un article
  socket.on('NewArticle', function(data) {
    articleListCtrl.lstArticles.push(data);
  });
  
  // Ecoute de l'ajout d'un commentaire
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    articleListCtrl.lstArticles.find(function(art) {return art.id === data.articleId}).comments.push(data);
  });
  
}]);