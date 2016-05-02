var express	= require('express');
var router	= express.Router();

var userSchema = require('../Model/userSchema');



router.get('/', function (req, res) {
    userSchema.find({}, function (err, docs) {
        res.json(docs);
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

router.get('/:username/:password/:mail', function (req, res) {
  var newUser = new userSchema({
    username  : req.params.username,
    password  : req.params.password,
    email     : req.params.mail,
    general   : {
                  first_name    : 'Jérémy',
                  last_name     : 'Young',
                  birthday      : Date.now(),
                  zip           : 13500,
                  register_date : Date.now()
                },
    access    : {
                  level   :10,
                  groups  : ['Admin'],
                  ban     : false
                }
  });
  
  newUser.save(function(err) {
    if (err) {
      throw err;
      console.log(req.params.username + ' Existe Déjà !');
    }
    // TODO Something if nessesary
  });
});


router.get('/:oldUsername/:newUsername', function (req, res) {
  userSchema.findOneAndUpdate({
    'password': req.params.oldUsername
  },
  {
    'password': req.params.newUsername
  },
  function(err, user) {
    if (err) console.log(err);
    console.log((user));
  });
  
});

module.exports = router;