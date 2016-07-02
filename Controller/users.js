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
      return res.send(401) ;
    }
    if (err) {
      return next(err);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.end(JSON.stringify(user));
      // return res.send(200);
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
    userSchema.findOne({username: 'DarkTerra'}).populate('name').exec(function (err, docs) {
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
    username  : req.query.username,
    password  : req.query.password,
    email     : req.query.email,
    general   : {
                  first_name    : req.query.first_name,
                  last_name     : req.query.last_name,
                  birthday      : req.query.birthday,
                  zip           : req.query.zip
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