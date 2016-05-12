var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var WatchListSchema = new Schema({
    username      : { type: String, required: true },
    register_date : { type: Date, required: true }
});

WatchListSchema.pre('validate', function(next) {
  if (!this.register_date) {
    this.register_date = Date.now();
  }
  next();
});

WatchListSchema.pre('save', function(next) {
  next();
});

WatchListSchema.pre('findOneAndUpdate', function(next) {
  next();
});

WatchListSchema.post('save', function(next) {
  console.log('WatchList saved successfully!');
  next();
});


module.exports = mongoose.model('watchList', WatchListSchema);