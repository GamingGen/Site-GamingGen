'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('commentCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket) {
  // ----- Init -----
  tinymce.init({
    selector: 'textarea',
    height: 500,
    menubar:false,
    statusbar: false,
    plugins: [
      'advlist autolink lists link image',
      'searchreplace visualblocks',
      'contextmenu paste emoticons textcolor colorpicker textpattern imagetools'
    ],
    toolbar: 'insertfile undo redo | backcolor forecolor emoticons | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    content_css: [
    ]
  });
  
  // ----- Public Méthode -----
  $scope.getContent = function() {
    var text = tinymce.activeEditor.getContent().replace(new RegExp('<img', 'g'), '<img class="img-responsive"');
    var comment = {
          articleId : Number($('#articleId').val()),
          username  : 'DarkTerra',
          text      : text
        };
    
    socket.emit('saveComment', comment);
    
    tinymce.activeEditor.setContent('<p></p>');
  };
  
  
  // ----- Private Méthode -----
}]);