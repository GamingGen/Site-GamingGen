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
    }
    else {
      console.log('Populate: ', docs);
      res.json(docs);
    }
  });
});

// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
let articleEvent = function(ServerEvent) {
  ServerEvent.on('saveArticle', function(data, socket) {
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
        article = article.toObject();
        delete article.text;
        ServerEvent.emit('ArticleSaved', article, socket);
      }
    });
  });
  ServerEvent.on('updateArticle', function(data, socket) {
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
  });
  
  ServerEvent.on('rmArticle', function(data, socket) {
    articleSchema.findOneAndRemove({_id : data._id}, function (err, result) {
      if (err) {
        console.log('err: ', err);
      }
      else {
        console.log('Article Supprimé: ', result.title);
        ServerEvent.emit('ArticleRemoved', result, socket);
      }
    });
  });
};

// Export
exports.articleEvent = articleEvent;
exports.router = router;