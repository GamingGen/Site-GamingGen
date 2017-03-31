'use strict';

// Récupération des schémas
const articleSchema = require('../Model/articleSchema');

// Récupération des modules
const express	= require('express');
const router	= express.Router();

// -------------------------------------------------------------------------- //
//                                Routes                                      //
// -------------------------------------------------------------------------- //
// Récupère la liste complète des articles
router.get('/', function (req, res) {
  articleSchema.find({}, function (err, docs) {
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
  articleSchema.findOne({id: req.params.id}, function (err, docs) {
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
  articleSchema.find({}, null, {sort: { register_date: -1 }, limit: 4 }, function (err, docs) {
    if (err) {
      console.error(err);
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
    var newArticle = new articleSchema({
      username      : data.username,
      title         : data.title,
      desc          : data.desc,
      text          : data.text
    });
      
      
    // data = newArticle.CheckOrder(function(err) {
    //   if(err) {
    //     console.error(err);
    //   }
    // });
    
    newArticle.save(function(err) {
      if (err) {
        //throw err;
        console.error(err);
      }
      else {
        delete data.text;
        ServerEvent.emit('ArticleSaved', data, socket);
      }
    });
  });
};

// Export
exports.articleEvent = articleEvent;
exports.router = router;