var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

// TODO Make the Schema
var AccueilSchema = new Schema({
    username      : { type: String, required: true },
    title         : { type: String, required: true },
    text          : { type: String, required: true },
    register_date : { type: Date, required: true }
});

AccueilSchema.pre('validate', function(next) {
  if (!this.register_date) {
    this.register_date = Date.now();
  }
  next();
});

AccueilSchema.pre('save', function(next) {
  next();
});

AccueilSchema.pre('findOneAndUpdate', function(next) {
  next();
});

AccueilSchema.post('save', function(next) {
  console.log('Article saved successfully!');
  next();
});


module.exports = mongoose.model('accueil', AccueilSchema);