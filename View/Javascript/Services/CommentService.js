'use strict';

var ListComment = angular.module('CommentS', []);

ListComment.service('commentsService', [function () {
  var self = this;
  
  self.addCommentToList = function(comment, isBanned) {
    if (isBanned)
      self.banList.push(comment);
    else
      self.userList.push(comment);
  };
}]);