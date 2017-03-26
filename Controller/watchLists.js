'use strict';

var express	= require('express');
var router	= express.Router();

var watchListSchema = require('../Model/watchListSchema');



router.get('/', function (req, res) {
    watchListSchema.find({}, function (err, docs) {
        res.json(docs);
    });
});

router.post('/insert', function(req, res) {
  var newWatchList = new watchListSchema({
    username      : req.query.username,
    register_date :  req.query.register_date 
  });
  
  newWatchList.save(function(err) {
    if (err) {
      //throw err;
      console.error(req.query.username + ' Existe Déjà !');
    }
  });
});

router.post('/update', function(req, res) {
  watchListSchema.findOne({
    'name': req.query.name
  },
  function(err, user) {
    console.error(user);
  });
});

module.exports = router;