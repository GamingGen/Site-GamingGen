'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminArticleCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
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
  $scope.tinymceModel = 'https://nodeblog.files.wordpress.com/2011/07/nodejs.png';
  
  
  // ----- Public Méthode -----
  $scope.getContent = function() {
    // console.log('Editor Title:', $scope.title);
    // console.log('Editor Desc:', $scope.desc);
    // console.log('Editor Content:', tinymce.activeEditor.getContent());
    var text = tinymce.activeEditor.getContent().replace(new RegExp('<img', 'g'), '<img class="img-responsive"');
    // TODO Récupérer l'username une fois la partie gestion des connexions fonctionnel
    var article = {
          username  : 'DarkTerra',
          title     : $scope.title,
          desc      : $scope.desc,
          text      : text
        };
    
    socket.emit('saveArticle', article);
    
    $scope.title = '';
    $scope.desc = '';
    tinymce.activeEditor.setContent('<p></p>');
  };
  
  
  // ----- Private Méthode -----
}]);