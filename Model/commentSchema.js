'use strict';

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var CommentSchema = new Schema({
    id            : { type: Number, required: true, unique: true, index: true, trim: true },
    username      : { type: String, required: true },
    text          : { type: String, required: true },
    register_date : { type: Date, required: true },
    articleId     : { type: Number, required: true }
});

CommentSchema.pre('validate', function(next) {
  if (!this.register_date) {
    this.register_date = Date.now();
  }
  next();
});

CommentSchema.pre('save', function(next) {
  next();
});

CommentSchema.pre('findOneAndUpdate', function(next) {
  next();
});

CommentSchema.post('save', function() {
  console.log('Comment saved successfully!');
});


module.exports = mongoose.model('Comment', CommentSchema);