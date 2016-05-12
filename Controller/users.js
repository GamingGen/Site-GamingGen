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