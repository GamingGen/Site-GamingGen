'use strict';

var express	= require('express');
var router	= express.Router();

var snackSchema = require('../Model/snackSchema');

var exports = module.exports = {};

router.get('/getAllOrders', function (req, res) {
  snackSchema.find({}, null, {sort: {number: -1}}, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getOrders/:year', function (req, res) {
  snackSchema.find({year: req.params.year}, null, {sort: {number: -1}}, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getYears', function (req, res) {
  snackSchema.distinct('year', function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

// router.post('/insert', function(req, res) {
//   var newSnack = new snackSchema({
//     username      : req.query.username,
//     title         : req.query.title,
//     text          : req.query.text
//   });
  
//   newSnack.save(function(err) {
//     if (err) {
//       //throw err;
//       console.log(req.query.name + ' Existe Déjà !');
//     }
//   });
// });


// ------------------------------ Events ------------------------------
var snackEvent = function(ServerEvent) {
  var number = 0;
  // var register_date;
  
  snackSchema.findOne({}, null, {sort: {number: -1}}, function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      if (result !== undefined && result !== null && result.number !== NaN) {
        number = result.number;
      }
    }
  });
  
  
  
  ServerEvent.on('RePrintPDF', function(filter, socket) {
    snackSchema.findOne({number: filter.number, year: filter.year}, null, {sort: {number: -1}}, function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        ServerEvent.emit('RePrintOrderFind', result, socket);
      }
    });
  });
  
  ServerEvent.on('findAllOrders', function(socket) {
    snackSchema.find({}, null, {sort: {number: -1}}, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('All Orders Found');
        ServerEvent.emit('AllOrdersFound', results, socket);
      }
    });
  });
  
  ServerEvent.on('ClientPrinterPrinted', function(number) {
    console.log(number);
    snackSchema.update({number: number}, {$inc: {printed_client: 1}}, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Change Save !');
        ServerEvent.emit('ClientPrinterPrintedDone', number);
      }
    });
  });
  
  // TODO déplacer la gestion de number dans le schéma
  ServerEvent.on('saveOrder', function(data, socket) {
    var newSnack = new snackSchema({
      elements      : data.elements,
      name          : data.name,
      total         : data.total,
      paid          : data.paid,
      free          : data.free,
      number        : ++number,
      // register_date : register_date
    });
      
      
    data = newSnack.CheckOrder(function(err) {
      if(err) {
        console.log(err);
      }
    });
    
    newSnack.save(function(err) {
      if (err) {
        //throw err;
        console.log(err);
      }
      else {
        ServerEvent.emit('OrderSaved', data, socket);
      }
    });
  });
};


exports.snackEvent = snackEvent;
exports.router = router;