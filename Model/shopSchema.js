'use strict';

var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;


var shopSchema = new Schema({
    year            : { type: Number, required: true, unique: true, index: true, trim: true },
    elements        : [{ 
                        name        : { type: String, required: true, unique: true },
                        unit_price  : { type: Number, required: true },
                        type        : { type: String, required: true },
                        quantity    : { type: Number, required: true },
                        quantity_min: { type: Number, required: true }
                      }]
});

shopSchema.pre('validate', function(next) {
  if (!this.year) {
    this.year = new Date().getFullYear();
  }
  next();
});

shopSchema.pre('save', function(next) {
  next();
});

shopSchema.pre('findOneAndUpdate', function(next) {
  next();
});

shopSchema.post('save', function() {
  console.log('Shop saved successfully!');
});



module.exports = mongoose.model('Shop', shopSchema);