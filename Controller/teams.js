var express	= require('express');
var router	= express.Router();

var teamSchema = require('../Model/teamSchema');

var exports = module.exports = {};

router.get('/', function (req, res) {
    teamSchema.find({}, function (err, docs) {
        res.json(docs);
    });
});

router.post('/insert', function(req, res) {
  var newTeam = new teamSchema({
    name    : req.query.name,
    members : req.query.members,
    table   : req.query.table
  });
  
  newTeam.save(function(err) {
    if (err) {
      console.log(err);
    }
  });
});


// ------------------------------ Events ------------------------------
var teamEvent = function(ServerEvent) {
  // TODO Créer la gestion des events Team
  // ServerEvent.on('isMailExist', function(email, socket) {
  //   teamSchema.findOne({email: email}, function (err, doc) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     else if (doc != null && doc.email === email) {
  //       ServerEvent.emit('isMailExistResult', true, socket);
  //     }
  //     else {
  //       ServerEvent.emit('isMailExistResult', false, socket);
  //     }
  //   });
  // });
};


exports.teamEvent = teamEvent;
exports.router = router;