'use strict';

// Récupération des schémas
const homeSchema = require('../Model/homeSchema');

// Récupération des modules
const express = require('express');
const router  = express.Router();

// -------------------------------------------------------------------------- //
//                                 Init                                       //
// -------------------------------------------------------------------------- //



// -------------------------------------------------------------------------- //
//                                Routes                                      //
// -------------------------------------------------------------------------- //


// Récupère les infos de la home
router.get('/info', (req, res) => {
  homeSchema.find({}, {}, { sort: { update_at: -1 }, limit: 1 }, function (err, [doc]) {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({ message : err });
    }
    else {
      res.json(doc);
    }
  });
});




// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
let homeEvent = function(ServerEvent) {
  ServerEvent.on('getCurrentHome', function(data, socket) {
    console.log('home.js: getCurrentHome Fired !!!!');
    homeSchema.find({}, {}, { sort: { update_at: -1 }, limit: 1 }, function (err, [doc]) {
      if (err) {
        console.error(err);
      }
      else {
        console.log('curentHome doc: ', doc);
        ServerEvent.emit('currentHome', doc, socket);
      }
    });
  });
  
  ServerEvent.on('updateInfoHome', function(data, socket) {
    var newHomeInfo = new homeSchema({
      title        : data.title,
      mainInfo         : data.mainInfo,
      detail1          : data.detail1,
      detail2          : data.detail2
    });
    
    
      newHomeInfo.save(function(err, info) {
        if (err) {
          console.error(err);
          ServerEvent.emit('ErrorOnInfoUpdated', err.message, socket);
        }
        else {
          ServerEvent.emit('InfoSaved', info);
        }
      });
  });
};

// Export
exports.homeEvent = homeEvent;
exports.router = router;