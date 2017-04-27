/**
 * Controlleur Article
 */
 
'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('articleCtrl', ['$scope', '$http', 'socket', '$sce', 'UserService', function($scope, $http, socket, $sce, UserService) {
  // ----- Init -----
  var commentsLength            = 0;
  var jump                      = 0;
  $scope.disableInfiniteScroll  = true;
  $scope.step                   = 5;
  $scope.comments               = [];
  var articlesCtrl              = this;
  articlesCtrl.currentArticle   = {};
  articlesCtrl.showCommentZone  = false;
  
  var user = UserService.currentUser;
  

  // ----- GET / SET Data -----
  if ($scope.idArticle !== undefined) {
    $http.get('/articles/' + $scope.idArticle).success(function(article) {
      if (article !== null)
      {
        articlesCtrl.currentArticle = article;
        
        // Triage des commentaire du plus récent au plus ancien
        articlesCtrl.currentArticle.comments.sort(function (a, b) {
          return b.id - a.id;
        });
        commentsLength = articlesCtrl.currentArticle.comments.length;
        $scope.disableInfiniteScroll = commentsLength < $scope.step;
        $scope.loadMore();
      }
      else
      {
        errorOnGetArticle();
      }
    }).error(function() {
      errorOnGetArticle();
    });
  }
  
  
  // ----- Public Méthode -----
  $scope.submitComment = function() {
    if ($scope.commentData && $scope.commentData.length > 0) {
      var comment = {
            articleId : Number($('#articleId').val()),
            username  : user.isLoggedIn ? user.pseudo : 'Un visiteur du futur',
            text      : $scope.commentData
          };
      
      socket.emit('saveComment', comment);
      
      $scope.commentData = "";
      articlesCtrl.showCommentZone = false;
    }
    else {
      errorOnGetArticle();
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
  function errorOnGetArticle() {
    $("#msgError").html("Erreur lors de la récupération de l'article, veuillez réessayer ultérieurement.");
    $("#msgError").show().delay(3000).fadeOut();
  }
  
  
  // ----- Events -----
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    if (articlesCtrl.currentArticle.id === data.articleId)
      $scope.comments.push(data);
  });
  
  
  // ----- jQuery -----
}]);