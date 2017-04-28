'use strict';

const commentSchema = require('../Model/commentSchema');
const articleSchema = require('../Model/articleSchema');

const express	= require('express');
const router	= express.Router();

let id = 0;

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
      id = Math.max.apply(Math, result.comments.map(function(o){
        return o.y;
      }));
      newComment.id = id++;
      newComment.validate();
      
      console.log(id);
      console.log(newComment);
      console.log(result);
      result.comments.push(newComment);
      result.save(function(err) {
        if (err) {
          //throw err;
          console.error(err);
        }
        else {
          delete data.text;
          ServerEvent.emit('CommentSaved', newComment, socket);
        }
      });
    });
  });
  
  ServerEvent.on('rmComment', function(data, socket) {
    articleSchema.findOne({'id' : data.article.id}, function (err, result) {
      if (err) {
        console.log('err: ', err);
      }
      var rmComment = result.comments.splice(result.comments.findIndex(x => x.id === data.comment.id), 1);
      result.save(function(err) {
        if (err) {
          //throw err;
          console.error('err: ', err);
        }
        else {
          console.log('Commentaire Supprimé: ', rmComment);
        }
      });
    });
  });
};

// Export
exports.commentEvent = commentEvent;
exports.router = router;