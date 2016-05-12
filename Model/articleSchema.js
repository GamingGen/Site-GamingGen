var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var ArticleSchema = new Schema({
    username      : { type: String, required: true },
    title         : { type: String, required: true },
    text          : { type: String, required: true },
    register_date : { type: Date, required: true }
});

ArticleSchema.pre('validate', function(next) {
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

ArticleSchema.post('save', function(next) {
  console.log('Article saved successfully!');
  next();
});


module.exports = mongoose.model('article', ArticleSchema);