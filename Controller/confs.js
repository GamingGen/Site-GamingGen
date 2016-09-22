'use strict';

var express	= require('express');
var router	= express.Router();

var confSchema = require('../Model/confSchema');

var exports = module.exports = {};

router.get('/', function (req, res) {
  confSchema.find({}, function (err, docs) {
  if (err) {
    console.log(err);
  }
      res.json(docs);
  });
});

router.get('/typeMenu', function (req, res) {
  confSchema.findOne({}, 'snack', {sort: {$natural: -1}}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    console.log(docs);
    res.json(docs.snack.type_menu);
  });
});

router.get('/roles', function (req, res) {
  confSchema.findOne({}, 'roles', {sort: {$natural: -1}}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    // console.log(docs);
    res.json(docs.roles);
  });
});

router.get('/pages', function (req, res) {
  confSchema.findOne({}, 'pages', {sort: {$natural: -1}}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    // console.log(docs);
    res.json(docs.pages);
  });
});


// ------------------------------ Events ------------------------------
var confEvent = function(ServerEvent) {
  ServerEvent.on('saveConf', function(data, socket) {
    var newConf = new confSchema({
      name    : data.name,
      teams   : data.teams,
      users   : data.users,
      roles   : data.roles,
      payment : data.payement,
      snack   : data.snack
    });
    
    console.log(newConf);
    console.log(data);
    console.log();
    
    newConf.save(function(err) {
      if (err) {
        //throw err;
        console.log(err);
        console.log('Ko');
      }
      else
      {
        console.log('Ok');
      }
    });
  });
};


exports.confEvent = confEvent;
exports.router = router;