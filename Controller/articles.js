'use strict';

// Récupération des schémas
const articleSchema = require('../Model/articleSchema');

// Récupération des modules
const express = require('express');
const router  = express.Router();
const gm      = require('gm');
const request = require('request');

// -------------------------------------------------------------------------- //
//                                 Init                                       //
// -------------------------------------------------------------------------- //



// -------------------------------------------------------------------------- //
//                                Routes                                      //
// -------------------------------------------------------------------------- //
// Récupère la liste complète des articles
router.get('/', function (req, res) {
  articleSchema.find({}, null, {sort: { update_at: -1 }})
  .populate('comments')
  .exec(function (err, docs) {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({message : err});
    }
    else {
      res.json(docs);
    }
  });
});


// Récupère uniquement les 4 dernier articles (Spécifique pour la Home)
router.get('/home', function (req, res) {
  articleSchema.find({}, {text : 0}, {sort: { update_at: -1 }, limit: 5 }, function (err, docs) {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({message : err});
    }
    else {
      res.json(docs);
    }
  });
});

// Récupère un article suivant l'ID
router.get('/:id', function (req, res) {
  articleSchema.findOne({_id: req.params.id})
  .populate({
    path: 'comments',
    options:  {sort: { register_date: -1 }}
  })
  .exec(function (err, docs) {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({message : err});
    }
    else {
      res.json(docs);
    }
  });
});

// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
let articleEvent = function(ServerEvent) {
  ServerEvent.on('saveArticle', function(data, socket) {
    console.log(socket.request.session.passport);
    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user && socket.request.session.passport.user.permissions && socket.request.session.passport.user.permissions.includes('canCreateArticle')) {
      console.log(socket.request.session.passport.user);
      var newArticle = new articleSchema({
        pseudo        : data.pseudo,
        title         : data.title,
        desc          : data.desc,
        text          : data.text,
        type          : {
          critical_info   : data.type.critical_info,
          hot_news        : data.type.hot_news
        },
        picture       : data.picture
      });
      
      if(data.picture.toLowerCase().includes('.gif')) {
        gm(request(data.picture))
        .selectFrame(0)
        .toBuffer('PNG', function(err, buffer) {
          if (err) {
            console.log('err toBuffer img: ', err);
          }
          newArticle.first_frame_picture.data = buffer.toString('base64');
          newArticle.first_frame_picture.contentType = 'image/png';
          
          saveArticle();
        });
      }
      else {
        saveArticle();
      }
    }
    else {
      ServerEvent.emit('ErrorOnArticleUpdated', 'You are not Authorized', socket);
    }
    
    function saveArticle () {
      newArticle.save(function(err, article) {
        if (err) {
          console.error(err);
          ServerEvent.emit('ErrorOnArticleUpdated', err.message, socket);
        }
        else {
          ServerEvent.emit('ArticleSaved', article, socket);
        }
      });
    }
  });
  ServerEvent.on('updateArticle', function(data, socket) {
    console.log(socket.request.session.passport);
    socket.request.session.reload(err => {
      if (err) {
        console.log(`error on reload session : ${err}`);
      }
      else {
        if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user && socket.request.session.passport.user.permissions && socket.request.session.passport.user.permissions.includes('canEditArticle')) {
          console.log(socket.request.session.passport.user);
          articleSchema.findOneAndUpdate({_id: data._id}, data, {new: true}, function (err, docUpdated) {
            if (err) {
              //throw err;
              console.error(err);
              ServerEvent.emit('ErrorOnArticleUpdated', err.message, socket);
            }
            else {
              if (docUpdated !== null) {
                ServerEvent.emit('ArticleUpdated', docUpdated, socket);
              }
              else {
                console.error(err);
              }
            }
          });
        }
        else {
          ServerEvent.emit('ErrorOnArticleUpdated', 'You are not Authorized', socket);
        }
      }
    });
  });
  ServerEvent.on('rmArticle', function(data, socket) {
    // console.log(socket.request.session.passport);
    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user && socket.request.session.passport.user.permissions && socket.request.session.passport.user.permissions.includes('canRemoveArticle')) {
      articleSchema.findOneAndRemove({_id : data._id}, function (err, result) {
        if (err) {
          console.log('err: ', err);
        }
        else {
          console.log('Article Supprimé: ', result.title);
          ServerEvent.emit('ArticleRemoved', result, socket);
        }
      });
    }
    else {
      ServerEvent.emit('ErrorOnArticleUpdated', 'You are not Authorized', socket);
    }
  });
};

// Export
exports.articleEvent = articleEvent;
exports.router = router;