'use strict';

var express	= require('express');
var router	= express.Router();

const modules = require('../package.json');


router.get('/', function (req, res) {
  let about = {
    name        : modules.name,
    version     : modules.version,
    author      : modules.author,
    contributors: modules.contributors
  };
  res.json(about);
});

exports.router = router;