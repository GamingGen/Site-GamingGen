'use strict';

var express	= require('express');
var router	= express.Router();

var partenaireSchema = require('../Model/confSchema');



router.get('/', function (req, res) {
    partenaireSchema.find({}, function (err, docs) {
        res.json(docs);
    });
});

router.post('/insert', function(req, res) {
  var newPartenaire = new partenaireSchema({
    name          : req.query.name,
    description   : req.query.description,
    img_path      : req.query.img_path,
    register_date :  req.query.register_date,
    url           : req.query.url
  });
  
  newPartenaire.save(function(err) {
    if (err) {
      //throw err;
      console.error(req.query.name + ' Existe Déjà !');
    }
  });
});

router.post('/update', function(req, res) {
  partenaireSchema.findOne({
    'name': req.query.name
  },
  function(err, user) {
    console.error((user));
  });
});

module.exports = router;