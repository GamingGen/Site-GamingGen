var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;


var MenuSnackSchema = new Schema({
    year            : { type: Number, required: true, unique: true, index: true, trim: true },
    elements        : [{ 
                        name        : { type: String, required: true },
                        unit_price  : { type: Number, required: true },
                        type        : { type: String, required: true },
                        quantity    : { type: Number, required: true },
                        quantity_min: { type: Number, required: true }
                      }]
});

MenuSnackSchema.pre('validate', function(next) {
  if (!this.year) {
    this.year = new Date().getFullYear();
  }
  next();
});

MenuSnackSchema.pre('save', function(next) {
  next();
});

MenuSnackSchema.pre('findOneAndUpdate', function(next) {
  next();
});

MenuSnackSchema.post('save', function() {
  console.log('menuSnack saved successfully!');
});



module.exports = mongoose.model('MenuSnack', MenuSnackSchema);