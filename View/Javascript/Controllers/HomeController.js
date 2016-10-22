'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('homeCtrl', ['$http', '$scope', 'socket', '$filter', function($http, $scope, socket, $filter){
  // ----- Init -----
  var news      = this;
  news.articles = [];
  
  
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
    data.register_date = new Date().toISOString();
    // On met à jour l'article dans la liste
    news.articles.find(function(art) {return art.id === data.articleId}).comments.push(data);;
      // On met à jour l'article dans la pop-up
      let articleModal = $('#myModal');
      if (articleModal.is(':visible')) {
        let commentsDiv = articleModal.find('#comments');
        // Si on a déjà des commentaires, on l'ajoute
        if (commentsDiv.find('blockquote').length > 0) {
          commentsDiv.html(commentsDiv.html() + getCommentHTML(data));
        }
        // Sinon on remplace
        else {
          commentsDiv.html('<h4 class="comments-title">Commentaires</h4>' + getCommentHTML(data));
        }
      }
  });
  
  
  // ----- Public Méthode -----
  
  
  // ----- Private Méthode -----
  function getCommentHTML(comment) {
    return '<blockquote>' + comment.text + '<footer>' + comment.username
            + ' le ' + $filter('date')(comment.register_date, 'dd/MM/yyyy') + '</footer></blockquote>'
  }
  
  
  // ----- jQuery -----
  
  // Gestion du contenu du Modal (Articles)
  $('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    
    var modal = $(this);
    modal.find('.modal-title').text('Work In Progress');
    modal.find('.modal-body').text('Loading...');
    $('#modalCommentButton').attr('data-articleid', id);
    
    $http.get('/articles/' + id).success(function(data) {
      modal.find('.modal-title').text(data.title + ' - ' + $filter('date')(data.register_date, 'MMMM yyyy'));
      let comments = '';
      if (data.comments.length === 0) {
        comments += '<span class="text-muted">Aucun commentaire pour le moment !</span>';
      } else {
        comments += '<h4 class="comments-title">Commentaires</h4>';
        for(let i = 0 ; i < data.comments.length ;++ i) {
          comments += getCommentHTML(data.comments[i]);
        }
      }
      modal.find('.modal-body').html(data.text + '<br/><div id="comments">' + comments + "</div>");
      modal.find('.modal-footer').prepend(data.username + ' ');
    });
  });
  
  $('#myModal').on('hide.bs.modal', function () {
    var modal = $(this);
    let id = $('#modalCommentButton').attr('data-articleid');
    modal.find('.modal-title').text('');
    modal.find('.modal-body').text('');
    modal.find('.modal-comments').text('');
    modal.find('.modal-footer').html('<button id="modalCommentButton" type="button" class="btn btn-default" data-toggle="modal" data-target="#modalComment">Commenter</button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
    $('#modalCommentButton').attr('data-articleid', id);
  });
  
  
  $('#modalComment').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('articleid');
    var modal = $(this);
    $('#articleId').val(id);
  });
}]);