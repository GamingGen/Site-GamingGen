'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('liveCtrl', ['$http', '$scope', 'socket', '$filter', '$sce', function($http, $scope, socket, $filter, $sce){
  // ----- Init -----
  var live    = this;
  var options = {};
  var player;
  // ----- GET / SET Data -----
  $scope.playerVars = {
    controls: 1,
    autoplay: 1
  };
  
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
  
  socket.on('toogleLive', function(live) {
    ChangeChannelTwitch(options.channel);
  });
  
  
  // ----- Public Méthode -----
  
  
  // ----- Private Méthode -----
  function ChangeChannelTwitch(channel) {
    options.channel = channel;
    if ($("#TwitchPlayer").length) {
      player = new Twitch.Player("TwitchPlayer", options);
      player.setChannel(channel);
      
      if (player.isPaused()) {
        player.play();
        console.log('Player play ?');
      }
    }
  }
  
  
  // ----- jQuery -----
}]);