var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var ConfSchema = new Schema({
    name  : { type: String, required: true, unique: true, index: true, trim: true },
    teams : {
              nb_max_player             : Number,
              nb_max_manager            : Number,
              nb_hour_before_team_freez : Number
            },
    users : {
               password_min_length : { type: Number, required: true }
            },
    roles :  { type: Array, required: true }
});


ConfSchema.pre('validate', function(next) {
  if (this.roles.length == 0) {
    this.roles = ['member'];
  }
  next();
});

ConfSchema.post('save', function(next) {
  console.log('User saved successfully!');
});

module.exports = mongoose.model('conf', ConfSchema);