'use strict';

var express   = require('express');
var router    = express.Router();
var passport  = require('passport');

var userSchema = require('../Model/userSchema');

var exports = module.exports = {};

router.post('/login', 
function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    console.log(info);
    if (!user) {
      return res.sendStatus(401) ;
    }
    if (err) {
      return next(err);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.end(JSON.stringify(user));
      // return res.sendStatus(200);
    });
  })(req, res, next);
});

// passport.authenticate('local'), (req, res) => {
//   if (req.user) {
//     console.log('User: ' + req.user.pseudo + ' Connecté');
//     res.sendStatus(200);
//   }
//   else {
//     res.sendStatus(401);
//   }
// });

// router.post('/login', (req, res) => {
//   console.log('Bad Auth');
//   res.sendStatus(401);
// });

router.post('/logout', (req, res) => {
  console.log(req.user);
  req.logout();
  res.sendStatus(200);
});

router.get('/', (req, res) => {
    userSchema.findOne({pseudo: 'DarkTerra'}).populate('name').exec(function (err, docs) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(docs);
      }
    });
});

// router.post('/update', function(req, res) {
//   userSchema.findOneAndUpdate({
//     req.params.oldParametterToFind: req.params.oldValueToFind
//   },
//   {
//     req.params.newParametterToFind: req.params.newValueToFind
//   },
//   function(err, user) {
//     console.log((user));
//   });
// });

router.post('/insert', function (req, res) {
  var newUser = new userSchema({
    pseudo    : req.body.pseudo,
    password  : req.body.password,
    email     : req.body.email,
    general   : {
                  first_name    : req.body.general.first_name,
                  last_name     : req.body.general.last_name,
                  birthday      : req.body.general.birthday,
                  zip           : req.body.general.zip
                }
  });
  
  newUser.save(function(err) {
    if (err) {
      //throw err;
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      res.sendStatus(200);
    }
  });
});

// ------------------------------ Events ------------------------------
var userEvent = function(ServerEvent) {
  ServerEvent.on('isMailExist', function(email, socket) {
    email = email.toLowerCase();
    userSchema.findOne({email: email}, function (err, doc) {
      if (err) {
        console.log(err);
      }
      else if (doc != null && doc.email === email) {
        ServerEvent.emit('isMailExistResult', true, socket);
      }
      else {
        ServerEvent.emit('isMailExistResult', false, socket);
      }
    });
  });
  
  ServerEvent.on('isPseudoExist', function(pseudo, socket) {
    userSchema.findOne({pseudo: pseudo}, function (err, doc) {
      if (err) {
        console.log(err);
      }
      else if (doc != null && doc.pseudo === pseudo) {
        ServerEvent.emit('isPseudoExistResult', true, socket);
      }
      else {
        ServerEvent.emit('isPseudoExistResult', false, socket);
      }
    });
  });
};


exports.userEvent = userEvent;
exports.router = router;