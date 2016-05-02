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
    name  : req.params.name,
    teams   : {
                  nb_max_player               : req.params.max_player,
                  nb_max_manager              : req.params.max_manager,
                  nb_hour_before_team_freez   : req.params.before_team_freez
                },
    users    : {
                  password_min_length   : req.params.password_min_length
                }
  });
  
  newConf.save(function(err) {
    if (err) {
      throw err;
      console.log(req.params.name + ' Existe Déjà !');
    }
    
    console.log('User saved successfully!');
  });
});

router.post('/update', function(req, res) {
  confSchema.findOne({
    'name': req.params.name
  },
  function(err, user) {
    console.log((user));
  });
});

module.exports = router;