'use strict';

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var PartenaireSchema = new Schema({
    name          : { type: String, required: true },
    description   : { type: String, required: true },
    img_path      : { type: String, required: true },
    register_date : { type: Date, required: true },
    url           : { type: String, required: true }
});

PartenaireSchema.pre('validate', function(next) {
  if (!this.register_date) {
    this.register_date = Date.now();
  }
  next();
});

PartenaireSchema.pre('save', function(next) {
  next();
});

PartenaireSchema.pre('findOneAndUpdate', function(next) {
  next();
});

PartenaireSchema.post('save', function(next) {
  console.log('Partenaire saved successfully!');
});


module.exports = mongoose.model('Partenaire', PartenaireSchema);