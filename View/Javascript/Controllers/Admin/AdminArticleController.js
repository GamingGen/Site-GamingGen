'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminArticleCtrl', ['$scope', '$http', 'socket', 'UserService', function($scope, $http, socket, UserService) {
  // ----- Init -----
  var articleCtrl        = this;
  $scope.tab             = 1;
  $scope.newArticle      = true;
  var user               = UserService.currentUser;
  $scope.selectedArticle = {};
  
  tinymce.init({
    selector: 'textarea',
    height: 500,
    // plugins: [
    //   'advlist autolink lists link image charmap print preview anchor',
    //   'searchreplace visualblocks code fullscreen',
    //   'insertdatetime media table contextmenu paste code'
    // ],
    plugins: [
      'advlist autolink lists link image',
      'searchreplace visualblocks',
      'contextmenu paste emoticons textcolor colorpicker textpattern imagetools'
    ],
    // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar: 'insertfile undo redo | backcolor forecolor emoticons | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    content_css: [
      // '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
      // '//www.tinymce.com/css/codepen.min.css'
    ]
  });
  
  
  // ----- GET / SET Data -----
  $scope.tinymceModel = "<p>Il suffit d'écrire l'article ici ^^</p>";
  $scope.type = {
    name   : 'hot_news'
  };
  
  $http.get('/articles').then(function(articles) {
    articleCtrl.lstArticles = articles.data;
  }).catch(function() {
    $("#msgError").html("Erreur lors de la récupération des articles, veuillez réessayer ultérieurement.");
    $("#msgError").show().delay(3000).fadeOut();
  });
  
  socket.on('ArticleUpdated', function(articleUpdated) {
    var index = articleCtrl.lstArticles.map(function(element) { return element._id; }).indexOf(articleUpdated._id);
    articleCtrl.lstArticles[index] = articleUpdated;
  });
  
  socket.on('ErrorOnArticleUpdated', function(data) {
    errorOnPageAdminArticle(data);
  });
  
  socket.on('NewArticle', function(data) {
    articleCtrl.lstArticles.unshift(data);
  });
  
  // Ecoute de l'ajout d'un commentaire
  socket.on('NewComment', function(data) {
    // On met à jour le commentaire dans la liste
    articleCtrl.lstArticles.find(function(article) {return article._id === data.article_id}).comments.push(data);
  });
  
  
  // ----- Public Méthode -----
  $scope.setSelected = function (index, selectedElement) {
    if (selectedElement != undefined){
      $scope.selectedArticle = selectedElement;
      $scope.idSelectedElement = index;
      $scope.idChildSelectedElement = undefined;
    }
  };
  
  $scope.setChildSelected = function (idChildSelectedElement) {
    if (idChildSelectedElement != undefined){
      $scope.idChildSelectedElement = idChildSelectedElement;
    }
  };
  
  $scope.setArticleSelected = function (idArticleSelected) {
    if (idArticleSelected != undefined){
      $scope.selectedArticle = idArticleSelected;
    }
  };
  
  $scope.getContent = function() {
    if (user && user.isLoggedIn) {
      var text = "<img class=\"img-responsive\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"" + $scope.picture + "\" alt=\"\"/></p>\n";
      text += tinymce.activeEditor.getContent().replace(new RegExp('<img', 'g'), '<img class="img-responsive"');
      // TODO Récupérer l'pseudo une fois la partie gestion des connexions fonctionnel
      var article = {
            pseudo    : user.pseudo,
            title     : $scope.title,
            desc      : $scope.desc,
            text      : text,
            type          : {
              critical_info   : $scope.type.name === 'critical_info',
              hot_news        : $scope.type.name === 'hot_news'
            },
            picture       : $scope.picture
          };
      
      if ($scope.newArticle) {
        socket.emit('saveArticle', article);
      }
      else {
        article._id = $scope.idArticle;
        socket.emit('updateArticle', article);
      }
      socket.on('articleOk', function() {
        $scope.newArticle = true;
        $scope.title = '';
        $scope.desc = '';
        $scope.picture = '';
        $scope.type.name = "hot_news";
        tinymce.activeEditor.setContent('<p></p>');
      });
    }
    else {
      // TODO Deco + redirection home
    }
  };
  
  $scope.selectTab = function(setTab) {
    $scope.tab = setTab;
    $scope.newArticle = true;
    $scope.title = '';
    $scope.desc = '';
    $scope.picture = '';
    $scope.type.name = "hot_news";
    tinymce.activeEditor.setContent('<p></p>');
    $scope.selectedArticle = undefined;
    $scope.idChildSelectedElement = undefined;
    $scope.idSelectedElement = undefined;
  };
  
  $scope.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  };
  
  $scope.removeComment = function(comment) {
    if (comment != undefined) {
      var index = articleCtrl.lstArticles[articleCtrl.lstArticles.indexOf($scope.selectedArticle)].comments.map(function(element) { return element._id; }).indexOf(comment._id);
      var rmComment = articleCtrl.lstArticles[articleCtrl.lstArticles.indexOf($scope.selectedArticle)].comments.splice(index, 1);
      socket.emit('rmComment', rmComment[0]);
    }
  };
  
  $scope.editArticle = function(article) {
    console.log('article: ', article);
    if (article != undefined) {
      tinymce.activeEditor.setContent(article.text);
      $scope.title = article.title;
      $scope.desc = article.desc;
      $scope.picture = article.picture;
      $scope.type = {
        name   : article.type.hot_news === true ? 'hot_news' : 'critical_info'
      };
      $scope.newArticle = false;
      $scope.idArticle = article._id;
      $scope.tab = 1;
    }
  };
  
  $scope.removeArticle = function(article) {
    if (article != undefined) {
      articleCtrl.lstArticles.splice(articleCtrl.lstArticles.indexOf(article), 1);
      socket.emit('rmArticle', article);
    }
  };
  
  
  
  // ----- Private Méthode -----// Gestion des erreurs
  function errorOnPageAdminArticle(text) {
    var message = "Erreur lors de la récupération de l'article, veuillez réessayer ultérieurement.";
    if (text) {
      message = text;
    }
    $("#msgError").html(message);
    $("#msgError").show().delay(3000).fadeOut();
  }
}]);