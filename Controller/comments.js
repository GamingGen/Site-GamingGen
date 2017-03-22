'use strict';

const commentSchema = require('../Model/commentSchema');
const articleSchema = require('../Model/articleSchema');

const express	= require('express');
const router	= express.Router();

// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
let commentEvent = function(ServerEvent) {
  
  ServerEvent.on('saveComment', function(data, socket) {
    var newComment = new commentSchema({
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

// Export
exports.commentEvent = commentEvent;
exports.router = router;