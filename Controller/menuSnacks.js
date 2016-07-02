var express	= require('express');
var router	= express.Router();

var menuSnackSchema = require('../Model/menuSnackSchema');

var exports = module.exports = {};

router.get('/', function (req, res) {
  menuSnackSchema.find({}, null, {sort: {$natural: -1}}, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getLastMenu', function (req, res) {
  menuSnackSchema.findOne({}, null, {sort: {$natural: -1}}, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getMenu/:year', function (req, res) {
  menuSnackSchema.findOne({year: req.params.year}, null, null, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results);
      }
    });
});

router.get('/getYears', function (req, res) {
  menuSnackSchema.findOne({}, null, {sort: {$natural: -1}}, function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(results.year);
      }
    });
});


// ------------------------------ Events ------------------------------
var menuSnackEvent = function(ServerEvent) {
  ServerEvent.on('saveMenuSnack', function(data, socket) {
    var newMenuSnack = new menuSnackSchema({
      elements  : data,
    });
    
    newMenuSnack.save(function(err) {
      if (err) {
        //throw err;
        console.log(err);
      }
      else {
        ServerEvent.emit('MenuSnackSaved', data, socket);
      }
    });
  });
};


exports.menuSnackEvent = menuSnackEvent;
exports.router = router;