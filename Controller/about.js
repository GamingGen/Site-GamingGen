'use strict';

var express	= require('express');
var router	= express.Router();

const modules = require('../package.json');

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

router.get('/', function (req, res) {
  let about = {
    name        : modules.name,
    version     : modules.version,
    author      : modules.author,
    contributors: modules.contributors,
    env: process.env.NODE_ENV || 'development'
  };
  res.json(about);
});

exports.router = router;