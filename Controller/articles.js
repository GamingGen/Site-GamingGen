'use strict';

var express	= require('express');
var router	= express.Router();

var articleSchema = require('../Model/articleSchema');

var exports = module.exports = {};

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

router.get('/id/:id', function (req, res) {
  articleSchema.findOne({id: req.params.id}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(docs);
    }
  });
});

// Demande spécifique par la DA pour avoir des articles de deux types ordonancé de la manière suivante a,a,b,b
router.get('/home', function (req, res) {
  articleSchema.find({ 'type.hot_news': true }, null, {sort: { register_date: -1 }, limit: 2 }, function (err, docsHotNews) {
    if (err) {
      console.log(err);
    }
    else {
      articleSchema.find({ 'type.critical_info': true }, null, {sort: { register_date: -1 }, limit: 2 }, function (err, docsCriticalInfo) {
        if (err) {
          console.log(err);
        }
        else {
          // var lastItem  = docsHotNews.splice(1, 1);
          // var fistItems = docsHotNews.concat(docsCriticalInfo);
          // res.json(fistItems.concat(lastItem));
          
          var allDocs = docsHotNews.concat(docsCriticalInfo);
          res.json(allDocs);
        }
      });
    }
  });
});

// router.post('/insert', function(req, res) {
//   var newArticle = new articleSchema({
//     username      : req.query.username,
//     title         : req.query.title,
//     text          : req.query.text
//   });
  
//   newArticle.save(function(err) {
//     if (err) {
//       //throw err;
//       console.log(req.query.name + ' Existe Déjà !');
//     }
//   });
// });

var articleEvent = function(ServerEvent) {
  
  var id = 0;
  
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
    data.id = ++id;
    var newArticle = new articleSchema({
      id            : data.id,
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


exports.articleEvent = articleEvent;
exports.router = router;