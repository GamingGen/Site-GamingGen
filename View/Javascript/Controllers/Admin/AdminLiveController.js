'use strict';

var AppControllers = angular.module('AppControllers');

AppControllers.controller('adminLiveCtrl', ['$scope', '$http', 'socket', '$sce', function($scope, $http, socket, $sce) {
  // ----- Init -----
  var twitch  = {};
  var youtube = {};
  var options = {};
  var playerAdmin;
  $scope.tab  = 1;
  
  // ----- GET / SET Data -----
  $scope.playerVars = {
    controls: 1,
    autoplay: 1
  };
  
  socket.emit('getLiveSource');
  
  socket.on('ChangeLiveSource', function(data) {
    $scope.AdminYoutubeLive = data.id;
    $scope.idYoutube        = data.id;
    $("#btnRefreshYoutube").removeClass("fa-spin");
  });
  
  socket.emit('getChannelTwitch');
  
  socket.on('ChangeChannelTwitch', function(data) {
    $scope.channel          = data.name;
    $scope.AdminChatChannel = $sce.trustAsResourceUrl(data.chat);
    $scope.AdminChannel     = $sce.trustAsResourceUrl(data.url);
    ChangeChannelTwitch(data.name);
    $("#btnRefreshTwitch").removeClass("fa-spin");
  });
  
  socket.on('toogleLive', function(live) {
    $scope.live = live;
  });
  
  
  // ----- Public Méthode -----
  $scope.selectTab = function(setTab) {
    $scope.tab = setTab;
  };
  
  $scope.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  };
  
  $scope.LiveOff = function() {
    socket.emit('LiveOff');
  };
  
  $scope.muteYoutube = function() {
    $scope.bestPlayer.mute();
    // player.setMuted(false);
  };
  
  $scope.unmuteYoutube = function() {
    $scope.bestPlayer.unMute();
    // player.setMuted(true);
  };
  
  $scope.setIdYoutube = function() {
    $("#btnRefreshYoutube").addClass("fa-spin");
    // idLive = "L4x7NOl2_To";
    youtube.id = $scope.idYoutube;
    socket.emit('ChangeLiveSource', youtube);
  };
  
  $scope.LiveYoutube = function() {
    socket.emit('LiveYoutube');
  };
  
  $scope.setChannelTwitch = function() {
    $("#btnRefreshTwitch").addClass("fa-spin");
    twitch.name = $scope.channel;
    twitch.url  = "https://player.twitch.tv/?channel=" + $scope.channel;
    twitch.chat = "https://www.twitch.tv/" + $scope.channel + "/chat?popout=";
    socket.emit('ChangeChannelTwitch', twitch);
  };
  
  $scope.LiveTwitch = function() {
    socket.emit('LiveTwitch');
  };
  
  // ----- Private Méthode -----
  function ChangeChannelTwitch(channel) {
    playerAdmin = new Twitch.Player("adminTwitchPlayer", options);
    playerAdmin.setChannel(channel);
    // playerAdmin.setVolume(1.0);
    playerAdmin.setMuted(false);
    if (playerAdmin.isPaused()) {
      playerAdmin.play();
      console.log('Player play ?');
    }
  }
}]);