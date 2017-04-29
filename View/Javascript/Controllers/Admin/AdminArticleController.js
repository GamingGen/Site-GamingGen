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
  
  $http.get('/articles').success(function(articles) {
    articleCtrl.lstArticles = articles;
  }).error(function() {
    $("#msgError").html("Erreur lors de la récupération des articles, veuillez réessayer ultérieurement.");
    $("#msgError").show().delay(3000).fadeOut();
  });
  
  socket.on('ArticleUpdated', function(articleUpdated) {
    var index = articleCtrl.lstArticles.map(function(element) { return element.id; }).indexOf(articleUpdated.id);
    articleCtrl.lstArticles[index] = articleUpdated;
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
      var text = tinymce.activeEditor.getContent().replace(new RegExp('<img', 'g'), '<img class="img-responsive"');
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
        article.id = $scope.idArticle;
        socket.emit('updateArticle', article);
      }
      
      $scope.newArticle = true;
      $scope.title = '';
      $scope.desc = '';
      $scope.picture = '';
      $scope.type.name = "hot_news";
      tinymce.activeEditor.setContent('<p></p>');
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
      var index = articleCtrl.lstArticles[articleCtrl.lstArticles.indexOf($scope.selectedArticle)].comments.map(function(element) { return element.id; }).indexOf(comment.id);
      var rmComment = articleCtrl.lstArticles[articleCtrl.lstArticles.indexOf($scope.selectedArticle)].comments.splice(index, 1);
      console.log('index: ', index);
      console.log('rmComment: ', rmComment);
      // socket.emit('rmComment', {article: $scope.selectedArticle, comment: rmComment[0]});
    }
  };
  
  $scope.editArticle = function(article) {
    if (article != undefined) {
      tinymce.activeEditor.setContent(article.text);
      $scope.title = article.title;
      $scope.desc = article.desc;
      $scope.picture = article.picture;
      $scope.type = {
        name   : article.type.hot_news === true ? 'hot_news' : 'critical_info'
      };
      $scope.newArticle = false;
      $scope.idArticle = article.id;
      $scope.tab = 1;
    }
  };
  
  $scope.removeArticle = function(article) {
    if (article != undefined) {
      articleCtrl.lstArticles.splice(articleCtrl.lstArticles.indexOf(article), 1);
      socket.emit('rmArticle', article);
    }
  };
  
  
  
  // ----- Private Méthode -----
}]);