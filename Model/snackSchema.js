var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

// TODO Make the Schema
var SnackSchema = new Schema({
    order         : [{ 
                      element : { type: Array, required: true },
                      price   : { type: Number, required: true }
                    }],
    name          : { type: String, required: true },
    register_date : { type: Date, required: true }
});

SnackSchema.pre('validate', function(next) {
  if (!this.register_date) {
    this.register_date = Date.now();
  }
  next();
});

SnackSchema.pre('save', function(next) {
  this.register_date = Date.now();
  next();
});

SnackSchema.pre('findOneAndUpdate', function(next) {
  next();
});

SnackSchema.post('save', function(next) {
  console.log('Article saved successfully!');
  next();
});


module.exports = mongoose.model('snack', SnackSchema);