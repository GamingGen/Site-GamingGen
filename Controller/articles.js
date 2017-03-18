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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
  
  let id = 0;
  
  articleSchema.findOne({}, null, {sort: {id: -1}}, function(err, result) {
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
  ServerEvent.on('saveArticle', function(data, socket) {
    // data.id = ++id;
    var newArticle = new articleSchema({
      // id            : data.id,
      username      : data.username,
      title         : data.title,
      desc          : data.desc,
      text          : data.text
    });
      
      
    // data = newArticle.CheckOrder(function(err) {
    //   if(err) {
    //     console.log(err);
    //   }
    // });
    
    newArticle.save(function(err) {
      if (err) {
        //throw err;
        console.log(err);
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