/**
 * Controlleur Article
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('articleCtrl', ['$scope', '$http', 'socket', '$sce', function($scope, $http, socket, $sce) {
  
  // INIT
  var articlesCtrl = this;
  articlesCtrl.currentArticle = undefined;
  
  if ($scope.idArticle !== undefined) {
    $http.get('/articles/id/' + $scope.idArticle).success(function(art) {
      if (art !== null)
        articlesCtrl.currentArticle = art;
      else
        errorOnGetArticle();
    }).error(function() {
      errorOnGetArticle();
    });
  }
  
  // Fonction de rendu HTML
  $scope.renderHtml = function(html_code)
  {
      return $sce.trustAsHtml(html_code);
  };
  
  // Gestion des erreurs
  function errorOnGetArticle() {
    $("#msgError").html("Erreur lors de la récupération de l'article, veuillez réessayer ultérieurement.");
    $("#msgError").show().delay(3000).fadeOut();
  }
  
  // Ecoute de l'ajout d'un commentaire
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    if (articlesCtrl.currentArticle.id === data.articleId)
      articlesCtrl.currentArticle.comments.push(data);
  });
  
  // Reset de la modale des commentaires
  $('#modalComment').on('hide.bs.modal', function () {
    tinymce.activeEditor.setContent('<p></p>');
  });
  
}]);