'use strict';

var express	= require('express');
var router	= express.Router();

var orderSchema = require('../Model/orderSchema');

var exports = module.exports = {};

router.get('/getAllOrders', function (req, res) {
  orderSchema.find({}, null, {sort: {number: -1}}, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getOrders/:year', function (req, res) {
  orderSchema.find({year: req.params.year}, null, {sort: {number: -1}}, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getYears', function (req, res) {
  orderSchema.distinct('year', function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

// ------------------------------ Events ------------------------------
var orderEvent = function(ServerEvent) {
  var number = 0;
  // var register_date;
  
  orderSchema.findOne({}, null, {sort: {number: -1}}, function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      if (result !== undefined && result !== null && result.number !== NaN) {
        number = result.number;
      }
    }
  });
  
  
  
  ServerEvent.on('RePrintShopPDF', function(filter, socket) {
    orderSchema.findOne({number: filter.number, year: filter.year}, null, {sort: {number: -1}}, function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        ServerEvent.emit('RePrintShopOrderFind', result, socket);
      }
    });
  });
  
  ServerEvent.on('findAllOrders', function(socket) {
    orderSchema.find({}, null, {sort: {number: -1}}, function(err, results) {
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
    orderSchema.update({number: number}, {$inc: {printed_client: 1}}, function(err) {
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
  ServerEvent.on('saveShopOrder', function(data, socket) {
    var newOrder = new orderSchema({
      elements      : data.elements,
      name          : data.name,
      total         : data.total,
      paid          : data.paid,
      free          : data.free,
      number        : ++number,
      // register_date : register_date
    });
      
      
    data = newOrder.CheckOrder(function(err) {
      if(err) {
        console.log(err);
      }
    });
    
    newOrder.save(function(err) {
      if (err) {
        //throw err;
        console.log(err);
      }
      else {
        ServerEvent.emit('shopOrderSaved', data, socket);
      }
    });
  });
};


exports.orderEvent = orderEvent;
exports.router = router;