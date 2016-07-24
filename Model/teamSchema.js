'use strict';

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var TeamSchema = new Schema({
    name          : { type: String, required: true, unique: true, index: true, trim: true },
    // members       : { type: Array, required: true },
    members       : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    table         : { type: Number, unique: true },
    leader        : { type: String, required: true, trim: true }
});

TeamSchema.pre('validate', function(next) {
    next();
});

TeamSchema.pre('save', function(next) {
  next();
});

TeamSchema.post('save', function() {
  console.log('User saved successfully!');
});

module.exports = mongoose.model('Team', TeamSchema);