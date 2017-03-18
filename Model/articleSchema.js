'use strict';

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var Comment               = require('./commentSchema');

var ArticleSchema = new Schema({
    id            : { type: Number, required: true, unique: true, index: true, trim: true },
    username      : { type: String, required: true },
    title         : { type: String, required: true },
    desc          : { type: String, required: true },
    text          : { type: String, required: true },
    register_date : { type: Date, required: true },
    comments      : { type: [Comment.Schema] }
});

ArticleSchema.pre('validate', function(next) {
  console.log('ArticleID: ' + this.id);
  if (!this.id) {
    this.id = 0;
  }
  else {
    this.id++;
  }
  
  if (!this.register_date) {
    this.register_date = Date.now();
  }
  next();
});

ArticleSchema.pre('save', function(next) {
  next();
});

ArticleSchema.pre('findOneAndUpdate', function(next) {
  next();
});

ArticleSchema.post('save', function() {
  console.log('Article saved successfully!');
});


module.exports = mongoose.model('Article', ArticleSchema);