/**
 * Controlleur Article
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('articleCtrl', ['$scope', '$http', '$state', 'socket', '$sce', 'UserService', function($scope, $http, $state, socket, $sce, UserService) {
  // ----- Init -----
  var commentsLength            = 0;
  var jump                      = 0;
  $scope.disableInfiniteScroll  = true;
  $scope.step                   = 5;
  $scope.maxlength              = 500;
  $scope.comments               = [];
  var articlesCtrl              = this;
  articlesCtrl.currentArticle   = {};
  articlesCtrl.showCommentZone  = false;
  
  var user = UserService.currentUser;
  

  // ----- GET / SET Data -----
  if ($scope.idArticle !== undefined) {
    $http.get('/articles/' + $scope.idArticle).then(function(article) {
      if (article !== null)
      {
        articlesCtrl.currentArticle = article.data;
        commentsLength = articlesCtrl.currentArticle.comments.length;
        $scope.disableInfiniteScroll = commentsLength < $scope.step;
        $scope.loadMore();
      }
      else
      {
        errorOnPageArticle();
      }
    }).catch(function() {
      errorOnPageArticle();
    });
  }
  
  
  // ----- Public Méthode -----
  $scope.submitComment = function() {
    if (user.isLoggedIn && $scope.commentText && $scope.commentText.length > 0) {
      var comment = {
        article_id  : $('#articleId').val(),
        pseudo      : user.pseudo,
        text        : $scope.commentText
      };
      
      socket.emit('saveComment', comment);
      
      $scope.commentText = "";
      articlesCtrl.showCommentZone = false;
    }
    else {
      errorOnPageArticle("Une erreur c'est produit lors de l'envoit de votre commentaire, veuillez réessayer ultérieurement.");
    }
  };

  $scope.loadMore = function() {
    console.log('loadMore() Fired...');
    if(articlesCtrl.currentArticle.comments) {
      if ($scope.comments.length >= commentsLength) {
        $scope.disableInfiniteScroll = true;
        console.log('infiniteScroll disable');
      }
      else {
        if (($scope.comments.length + $scope.step) > commentsLength) {
          jump = commentsLength;
        }
        else {
          jump = $scope.comments.length + $scope.step;
        }
        $scope.comments = articlesCtrl.currentArticle.comments.slice(0, jump);
      }
    }
  };
  
  // Fonction de rendu HTML
  $scope.renderHtml = function(html_code)
  {
    return $sce.trustAsHtml(html_code);
  };
  
  $scope.toggleCommentZone = function() {
    articlesCtrl.showCommentZone = !articlesCtrl.showCommentZone;
  };
  
  
  // ----- Private Méthode -----
  
  // Gestion des erreurs
  function errorOnPageArticle(text) {
    var message = text || "Erreur lors de la récupération de l'article, veuillez réessayer ultérieurement.";

    $("#msgError").html(message);
    $("#msgError").show().delay(3000).fadeOut();
    if (text === undefined) {
      $state.go('home');
    }
  }
  
  
  // ----- Events -----
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    if (articlesCtrl.currentArticle._id === data.article_id)
      $scope.comments.push(data);
  });
  
  
  // ----- jQuery -----
}]);