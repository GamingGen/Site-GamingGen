'use strict';

var express	= require('express');
var router	= express.Router();

var shopSchema = require('../Model/shopSchema');

var exports = module.exports = {};

router.get('/', function (req, res) {
  shopSchema.find({}, null, {sort: {$natural: -1}}, function(err, results) {
      if (err) {
        console.error(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getProducts', function (req, res) {
  shopSchema.findOne({}, null, {sort: {$natural: -1}}, function(err, results) {
      if (err) {
        console.error(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getProduct/:name', function (req, res) {
  shopSchema.findOne({}, function(err, results) {
      if (err) {
        console.error(err);
      }
      else {
        var result = null;
        results.elements.forEach(function(element) {
          if (element.name === req.params.name) {
            result = element;
          }
        });
        res.json(result);
      }
    });
});


// ------------------------------ Events ------------------------------
var shopEvent = function(ServerEvent) {
  ServerEvent.on('saveOrder', function(data, socket) {
    var newShopSchema = new shopSchema({
      elements  : data,
    });
    
    newShopSchema.save(function(err) {
      if (err) {
        //throw err;
        console.error(err);
      }
      else {
        ServerEvent.emit('saveSaved', data, socket);
      }
    });
  });
};


exports.shopEvent = shopEvent;
exports.router = router;