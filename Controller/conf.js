var express	= require('express');
var router	= express.Router();

var confSchema = require('../Model/confSchema');



router.get('/', function (req, res) {
    confSchema.find({}, function (err, docs) {
        res.json(docs);
    });
});

router.post('/insert', function(req, res) {
  var newConf = new confSchema({
    name  : req.query.name,
    teams   : {
                  nb_max_player               : req.query.max_player,
                  nb_max_manager              : req.query.max_manager,
                  nb_hour_before_team_freez   : req.query.before_team_freez
                },
    users    : {
                  password_min_length   : req.query.password_min_length
                },
    roles :  req.query.roles || []
  });
  
  newConf.save(function(err) {
    if (err) {
      //throw err;
      console.log(req.query.name + ' Existe Déjà !');
    }
  });
});

router.post('/update', function(req, res) {
  confSchema.findOne({
    'name': req.query.name
  },
  function(err, user) {
    console.log((user));
  });
});

module.exports = router;