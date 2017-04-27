'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminArticleCtrl', ['$scope', '$http', 'socket', 'UserService', function($scope, $http, socket, UserService) {
  // ----- Init -----
  var user = UserService.currentUser;
  
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
  $scope.tinymceModel = "Il suffit d'écrire l'article ici ^^";
  $scope.type = {
    name   : 'hot_news'
  };
  
  
  // ----- Public Méthode -----
  $scope.getContent = function() {
    if (user && user.isLoggedIn) {
      var text = tinymce.activeEditor.getContent().replace(new RegExp('<img', 'g'), '<img class="img-responsive"');
      // TODO Récupérer l'username une fois la partie gestion des connexions fonctionnel
      var article = {
            username  : user.pseudo,
            title     : $scope.title,
            desc      : $scope.desc,
            text      : text,
            type          : {
              critical_info   : $scope.type.name === 'critical_info',
              hot_news        : $scope.type.name === 'hot_news'
            },
            picture       : $scope.picture
          };
      
      socket.emit('saveArticle', article);
      
      $scope.title = '';
      $scope.desc = '';
      $scope.picture = '';
      $scope.type.name = "hot_news"
      tinymce.activeEditor.setContent('<p></p>');
    }
    else {
      // TODO Deco + redirection home
    }
  };
  
  
  // ----- Private Méthode -----
}]);