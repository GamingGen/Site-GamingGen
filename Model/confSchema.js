'use strict';

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var ConfSchema = new Schema({
    name    : { type: String, required: true, unique: true, index: true, trim: true },
    teams   : {
                nb_max_teams              : Number,
                nb_max_players_by_team    : Number,
                nb_max_managers_by_team : Number,
                nb_hour_before_team_freez : Number
              },
    users   : {
                 password_min_length : { type: Number, required: true }
              },
    roles     : { type: Array, required: true },
    payment   : {
                  nominal_price             : Number,
                  bonus_price               : Number,
                  minimal_payement_to_bonus : Number
              },
    snack   : {
                nominal_time_preparation      : Number,
                printer_client_length_element : Number,
                printer_cook_length_element   : Number,
                type_menu                     : Array
              }
});


ConfSchema.pre('validate', function(next) {
  if (this.roles.length == 0) {
    this.roles = ['Admin', 'Member'];
  }
  next();
});

ConfSchema.post('save', function() {
  console.log('Conf saved successfully!');
});

module.exports = mongoose.model('Conf', ConfSchema);