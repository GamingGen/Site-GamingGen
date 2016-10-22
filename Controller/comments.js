'use strict';

var express	= require('express');
var router	= express.Router();

var commentSchema = require('../Model/commentSchema');
var articleSchema = require('../Model/articleSchema');

var exports = module.exports = {};

var commentEvent = function(ServerEvent) {
  
  var id = 0;
  
  commentSchema.findOne({}, null, {sort: {id: -1}}, function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      if (result !== undefined && result !== null && result.id !== NaN) {
        id = result.id;
      }
    }
  });
  
  // TODO déplacer la gestion de id dans le schéma
  ServerEvent.on('saveComment', function(data, socket) {
    data.id = ++id;
    var newComment = new commentSchema({
      id            : data.id,
      username      : data.username,
      text          : data.text,
      articleId     : data.articleId
    });
    articleSchema.findOne({'id' : data.articleId}, function (err, result) {
      newComment.validate();
      result.comments.push(newComment);
      result.save(function(err) {
        if (err) {
          //throw err;
          console.log(err);
        }
        else {
          delete data.text;
          ServerEvent.emit('CommentSaved', newComment, socket);
        }
      });
    });
  });
};


exports.commentEvent = commentEvent;
exports.router = router;