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
  
  
  // ----- Public Méthode -----
  
  
  // ----- Private Méthode -----
  
  
  // ----- jQuery -----
  
  // Gestion du contenu du Modal (Articles)
  $('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    
    var modal = $(this);
    modal.find('.modal-title').text('Work In Progress');
    modal.find('.modal-body').text('Loading...');
    
    $http.get('/articles/' + id).success(function(data) {
      modal.find('.modal-title').text(data.title + ' - ' + $filter('date')(data.register_date, 'MMMM yyyy'));
      modal.find('.modal-body').html(data.text);
      modal.find('.modal-footer').prepend(data.username + ' ');
    });
  });
  
  $('#myModal').on('hide.bs.modal', function () {
    var modal = $(this);
    modal.find('.modal-title').text('');
    modal.find('.modal-body').text('');
    modal.find('.modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
  });
}]);