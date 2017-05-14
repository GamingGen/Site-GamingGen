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

router.get('/shop', function (req, res) {
    confSchema.findOne({}, 'shop', {sort: {$natural: -1}}, function (err, docs) {
      console.log(docs);
      res.json(docs.shop.type_order);
    });
});

router.get('/roles', function (req, res) {
    confSchema.findOne({}, {_id: false, roles: true}, {sort: {$natural: -1}}, function (err, docs) {
      res.json(docs.roles);
    });
});

router.get('/roles', function (req, res) {
  confSchema.findOne({}, {roles : 1}, {sort: {$natural: -1}}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    // console.log(docs);
    res.json(docs);
  });
});

// var users = {
// 		password_min_length: 8
// 	};
// var roles = ["Admin", "Player"];
// var snack = {
// 		nominal_time_preparation: 10,
// 		printer_client_length_element: 12,
// 		printer_cook_length_element: 18,
// 		type_menu: ["Plat", "Accompagnement", "Boisson", "Dessert", "Encas"]
// 	};

// router.post('/insert', function(req, res) {
//   var newConf = new confSchema({
//     name    : req.query.name,
//     teams   : req.query.teams,
//     users   : req.query.users,
//     roles   : req.query.roles,
//     payment : req.query.payement,
//     snack   : req.query.snack
//   });
  
//   console.log(newConf);
//   console.log(req.query);
//   console.log();
  
//   newConf.save(function(err) {
//     if (err) {
//       //throw err;
//       console.log(err);
//       res.sendStatus(500);
//     }
//     else
//     {
//       res.sendStatus(200);
//     }
//   });
// });

// router.post('/update', function(req, res) {
//   confSchema.findOne({
//     'name': req.query.name
//   },
//   function(err, user) {
//     console.log((user));
//   });
// });
router.get('/permissions', function (req, res) {
  confSchema.findOne({}, {permissions : 1}, {sort: {$natural: -1}}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    // console.log(docs);
    res.json(docs);
  });
});

router.get('/rolesandpermissions', function (req, res) {
  confSchema.findOne({}, {roles: 1, permissions : 1}, {sort: {$natural: -1}}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    // console.log(docs);
    res.json(docs);
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
  ServerEvent.on('UpdateRoles', function(data, socket) {
    confSchema.findOneAndUpdate({_id: data._id}, {roles: data.roles}, {new: true}, function (err, rowUpdated) {
      if (err) {
        //throw err;
        console.error(err);
        ServerEvent.emit('ErrorOnRolesUpdated', err.message, socket);
      }
      else {
        if (rowUpdated !== null) {
          ServerEvent.emit('RolesUpdated', rowUpdated, socket);
        }
        else {
          console.error(err);
        }
      }
    });
  });
  ServerEvent.on('UpdatePermissions', function(data, socket) {
    confSchema.findOneAndUpdate({_id: data._id}, {permissions: data.permissions}, {new: true}, function (err, rowUpdated) {
      if (err) {
        //throw err;
        console.error(err);
        ServerEvent.emit('ErrorOnPermissionsUpdated', err.message, socket);
      }
      else {
        if (rowUpdated !== null) {
          ServerEvent.emit('PermissionsUpdated', rowUpdated, socket);
        }
        else {
          console.error(err);
        }
      }
    });
  });
};


exports.confEvent = confEvent;
exports.router = router;