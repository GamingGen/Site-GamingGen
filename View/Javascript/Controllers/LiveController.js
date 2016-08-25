'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('liveCtrl', ['$http', '$scope', 'socket', '$filter', '$sce', function($http, $scope, socket, $filter, $sce){
  // ----- Init -----
  var live    = this;
  var options = {};
  var player;
  // ----- GET / SET Data -----
  $scope.playerVars = {
    controls: 0,
    autoplay: 1
  };
  
  // player = new Twitch.Player("TwitchPlayer", options);
  // player.setVolume(1.0);
  
  socket.emit('getLiveSource');
  
  socket.on('getLiveSource', function(data) {
    $scope.youtubeLive = data.id;
  });
  
  socket.on('ChangeLiveSource', function(data) {
    $scope.youtubeLive = data.id;
    console.log(data);
  });
  
  socket.emit('getChannelTwitch');
  
  socket.on('ChangeChannelTwitch', function(data) {
    console.log(data);
    $scope.channel = $sce.trustAsResourceUrl(data.url);
    $scope.chatChannel = $sce.trustAsResourceUrl(data.chat);
    ChangeChannelTwitch(data.name);
  });
  
  
  // ----- Public Méthode -----
  
  
  // ----- Private Méthode -----
  function ChangeChannelTwitch(channel) {
    // player.setChannel(channel);
    
    // if (player.isPaused()) {
    //   player.play();
    //   console.log('Player play ?');
    // }
  }
  
  
  // ----- jQuery -----
}]);