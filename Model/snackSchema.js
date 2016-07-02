var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;

var SnackSchema = new Schema({
    year            : { type: Number, required: true, trim: true },
    number          : { type: Number, required: true, trim: true },
    elements        : [{ 
                        quantity    : { type: Number, default: 1 },
                        name        : { type: String, required: true },
                        price       : { type: Number, required: true },
                        unit_price  : { type: Number, required: true }
                      }],
    name            : { type: String, required: true },
    total           : { type: Number, required: true },
    paid            : { type: Boolean, required: true },
    free            : { type: Boolean, default: false },
    printed_client  : { type: Number, default: 0 },
    printed_cook    : { type: Number, default: 0 },
    register_date   : { type: Date, required: true }
});

SnackSchema.methods.CheckOrder = function() {
  // TODO check price and name of each item
  
  
  var compareTotal = 0;
  for (var item of this.elements) {
    compareTotal += item.unit_price * item.quantity;
  };
  
  if (compareTotal != this.total)
  {
    this.total = compareTotal;
  }
  
  this.total = this.total.toFixed(2);
  return this;
};

SnackSchema.pre('validate', function(next) {
  if (!this.year) {
    this.year = new Date().getFullYear();
  }
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

SnackSchema.post('save', function() {
  console.log('Snack saved successfully!');
});



module.exports = mongoose.model('Snack', SnackSchema);