'use strict';

const commentSchema = require('../Model/commentSchema');
const articleSchema = require('../Model/articleSchema');

const express	= require('express');
const router	= express.Router();

// -------------------------------------------------------------------------- //
//                                 Init                                       //
// -------------------------------------------------------------------------- //


// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
let commentEvent = function(ServerEvent) {
  
  ServerEvent.on('saveComment', function(data, socket) {
    var newComment = new commentSchema({
      article_id    : data.article_id,
      pseudo        : data.pseudo,
      text          : data.text
    });
    
    newComment.save(function(err) {
      if (err) {
        //throw err;
        console.error(err);
      }
      else {
        articleSchema.findOneAndUpdate({_id: newComment.article_id}, {$push: {comments: newComment._id}}, {new: true}, function(err) {
          if (err) {
            console.log('err: ', err);
          }
          else {
            ServerEvent.emit('CommentSaved', newComment, socket);
          }
        });
      }
    });
  });
  
  // TODO : Clear article.comments[]
  ServerEvent.on('rmComment', function(data, socket) {
    commentSchema.findOneAndRemove({_id: data._id}, function (err, comment) {
      if (err) {
        console.log('err: ', err);
      }
      else {
        ServerEvent.emit('CommentRemoved', comment, socket);
      }
    });
  });
};

// Export
exports.commentEvent = commentEvent;
exports.router = router;