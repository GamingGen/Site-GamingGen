var express	= require('express');
var router	= express.Router();

var articleSchema = require('../Model/articleSchema');



router.get('/', function (req, res) {
    articleSchema.find({}, function (err, docs) {
        res.json(docs);
        console.log(docs);
    });
});

router.post('/insert', function(req, res) {
  var newArticle = new articleSchema({
    username      : req.query.username,
    title         : req.query.title,
    text          : req.query.text
  });
  
  newArticle.save(function(err) {
    if (err) {
      //throw err;
      console.log(req.query.name + ' Existe Déjà !');
    }
  });
});

module.exports = router;