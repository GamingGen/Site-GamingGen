'use strict';

// Récupération des schémas
const articleSchema = require('../Model/articleSchema');

// Récupération des modules
const express	= require('express');
const router	= express.Router();

// -------------------------------------------------------------------------- //
//                                 Init                                       //
// -------------------------------------------------------------------------- //



// -------------------------------------------------------------------------- //
//                                Routes                                      //
// -------------------------------------------------------------------------- //
// Récupère la liste complète des articles
router.get('/', function (req, res) {
  articleSchema.find({})
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
  articleSchema.find({}, null, {sort: { register_date: -1 }, limit: 4 })
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

// Récupère un article suivant l'ID
router.get('/:id', function (req, res) {
  articleSchema.findOne({_id: req.params.id})
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

// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
let articleEvent = function(ServerEvent) {
  ServerEvent.on('saveArticle', function(data, socket) {
    if (socket.request.session.passport.user.roles && socket.request.session.passport.user.roles.includes('Rédacteur')) {
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
      
      newArticle.save(function(err, article) {
        if (err) {
          //throw err;
          console.error(err);
          ServerEvent.emit('ErrorOnArticleUpdated', err.message, socket);
        }
        else {
          ServerEvent.emit('ArticleSaved', article, socket);
        }
      });
    }
    else {
      ServerEvent.emit('ErrorOnArticleUpdated', 'You are not Authorized', socket);
    }
  });
  ServerEvent.on('updateArticle', function(data, socket) {
    if (socket.request.session.passport.user.roles && socket.request.session.passport.user.roles.includes('Rédacteur')) {
      articleSchema.findOneAndUpdate({_id: data._id}, data, {new: true}, function (err, rowUpdated) {
        if (err) {
          //throw err;
          console.error(err);
          ServerEvent.emit('ErrorOnArticleUpdated', err.message, socket);
        }
        else {
          if (rowUpdated !== null) {
            ServerEvent.emit('ArticleUpdated', rowUpdated, socket);
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
  });
  ServerEvent.on('rmArticle', function(data, socket) {
    if (socket.request.session.passport.user.roles && socket.request.session.passport.user.roles.includes('AdminRédacteur')) {
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