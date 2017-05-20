'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminArticleCtrl', ['$scope', '$http', '$location', 'socket', 'UserService', 'PermPermissionStore', 'uiGridConstants', function($scope, $http, $location, socket, UserService, PermPermissionStore, uiGridConstants) {
  // ----- Init -----
  var articleCtrl            = this;
  articleCtrl.lstArticles    = [];
  $scope.tab                 = 1;
  $scope.newArticle          = true;
  var user                   = UserService.currentUser;
  var selectedArticleToRm    = undefined;
  $scope.baseArticleUrl      = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/#/articles/';
  $scope.user                = user;
  $scope.selectedArticle     = {};
  $scope.canEditArticle      = PermPermissionStore.getPermissionDefinition('canEditArticle') !== undefined;
  $scope.canEditOtherArticle = PermPermissionStore.getPermissionDefinition('canEditOtherArticle') !== undefined;
  
  var today = new Date();
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  
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
  $scope.tinymceModel = "<br /><p><strong><em>--</em></strong><strong><em><br /></em></strong><strong><em>Gaming Gen, le jeu est dans nos g&egrave;nes !</em></strong></p>";
  $scope.type = {
    name   : 'hot_news'
  };
  
  $http.get('/articles').then(function(articles) {
    articleCtrl.lstArticles = articles.data;
    $scope.gridOptions.data = articles.data;
  }).catch(function() {
    $("#msgError").html("Erreur lors de la récupération des articles, veuillez réessayer ultérieurement.");
    $("#msgError").show().delay(3000).fadeOut();
  });

  socket.on('NewArticle', function(data) {
    articleCtrl.lstArticles.unshift(data);
  });
  
  socket.on('ArticleUpdated', function(articleUpdated) {
    var index = articleCtrl.lstArticles.map(function(element) { return element._id; }).indexOf(articleUpdated._id);
    articleCtrl.lstArticles[index] = articleUpdated;
    successOnPageAdminArticle("L'article à bien était mis à jour");
  });
  
  socket.on('ErrorOnArticleUpdated', function(data) {
    errorOnPageAdminArticle(data);
  });
  
  socket.on('ArticleRemoved', function(data) {
    var index = articleCtrl.lstArticles
      .findIndex(function(article) { return article._id === data; });

    articleCtrl.lstArticles.splice(index, 1);
    successOnPageAdminArticle("L'article à bien était supprimé");
  });
  
  // Mise à jour le commentaire dans la liste
  socket.on('NewComment', function(data) {
    articleCtrl.lstArticles.find(function(article) {return article._id === data.article_id}).comments.push(data);
  });
  
  socket.on('CommentRemoved', function(data) {
    var index = articleCtrl.lstArticles
      .find(function(article) { return article._id === data.article_id; })
      .comments
      .findIndex(function(comment) {
        return comment._id === data._id;
      });

    articleCtrl.lstArticles
      .find(function(article) { return article._id === data.article_id; })
      .comments.splice(index, 1);
    successOnPageAdminArticle("Le commentaire à bien était supprimé");
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
        tinymce.activeEditor.setContent($scope.tinymceModel);
        successOnPageAdminArticle("L'article à bien était enregistré");
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
      socket.emit('rmComment', comment);
    }
  };
  
  $scope.editArticle = function(article) {
    if (article != undefined) {
      console.log('article: ', article);
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
  
  $scope.prepareRemoveArticle = function(article) {
    if (article != undefined) {
      selectedArticleToRm = article;
    }
  };
  
  $scope.removeArticle = function() {
    if (selectedArticleToRm != undefined) {
      socket.emit('rmArticle', selectedArticleToRm);
      selectedArticleToRm = undefined;
    }
  };
  
  
  
  $scope.gridOptions = {
    enableFiltering          : true,
    enableRowSelection       : true,
    enableRowHeaderSelection : false,
    noUnselect               : true,
    modifierKeysToMultiSelect: false,
    multiSelect              : false,
    showGridFooter           : true,
    data                     : articleCtrl.lstArticles,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };
  
  $scope.gridOptions.columnDefs = [
    {
      name: '#',
      enableFiltering: false,
      enableSorting: false,
      enableColumnMenu: false,
      minWidth:100,
      width:'7%',
      cellTemplate: '<button ngclipboard data-clipboard-text="{{grid.appScope.baseArticleUrl}}{{row.entity._id}}" ngclipboard-success="onSuccess(e);" ngclipboard-error="onError(e);" class="btn btn-primary btn-sm" title="Copier le lien"><i class="fa fa-clipboard" aria-hidden="true"></i></button>'
      + '<button permission permission-only="\'ADMIN_REDACTEUR\'" ng-click="grid.appScope.prepareRemoveArticle(row.entity)" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#rmModal" title="Supprimer l\'article"><i class="fa fa-trash" aria-hidden="true"></i></button>'
      + '<button ng-show="(grid.appScope.user.isLoggedIn && grid.appScope.canEditArticle && row.entity.pseudo === grid.appScope.user.pseudo) || grid.appScope.canEditOtherArticle" class="btn btn-warning btn-sm" ng-click="grid.appScope.editArticle(row.entity)" title="modifier l\'article"><i class="fa fa-pencil" aria-hidden="true"></i></button>',
    },
    {
      name: 'Titre',
      field: 'title',
      enableColumnMenu: false,
      minWidth:200,
      width:'15%',
    },
    {
      name: 'Desc',
      field: 'desc',
      enableColumnMenu: false,
      enableFiltering: false,
      minWidth:300,
      width: '48%',
    },
    {
      name: 'Auteur',
      field: 'pseudo',
      enableColumnMenu: false,
      minWidth:130,
      width:'8%',
    },
    {
      name: 'Date de Création',
      field: 'register_date',
      cellFilter: 'date:"dd MMM yyyy - HH:mm:ss"',
      enableColumnMenu: false,
      enableFiltering: false,
      minWidth:140,
      width:'10%',
    },
    {
      name: 'Date de Modification',
      field: 'update_at',
      cellFilter: 'date:"dd MMM yyyy - HH:mm:ss"',
      enableColumnMenu: false,
      enableFiltering: false,
      minWidth:170,
      width:'12%',
    }
  ];
  
  
  
  
  
  
  

  // ----- Private Méthode -----
  // Gestion des erreurs
  function errorOnPageAdminArticle(text) {
    var message = "Erreur lors de la récupération de l'article, veuillez réessayer ultérieurement.";
    if (text) {
      message = text;
    }
    $("#msgError").html(message);
    $("#msgError").show().delay(3000).fadeOut();
  }
  // Gestion des success
  function successOnPageAdminArticle(text) {
    var message = "...";
    if (text) {
      message = text;
    }
    $("#msgInfo").html(message);
    $("#msgInfo").show().delay(3000).fadeOut();
  }
}]);