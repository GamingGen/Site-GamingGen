'use strict';
 /**
 * Schéma Configuration
 * @module ConfSchema
 */

/**
 * @requires Schema
 */
var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

// Schéma ConfSchema
/**
 * @class ConfSchema
 * @param {String} name - required: true, unique: true, index: true, trim: true
 * @param {Number} teams.nb_max_teams - WIP
 * @param {Number} teams.nb_max_players_by_team - WIP
 * @param {Number} teams.nb_max_managers_by_team - WIP
 * @param {Number} teams.nb_hour_before_team_freez - WIP
 * @param {Number} users.password_min_length - required: true WIP
 * @param {Number} payment.nominal_price - WIP
 * @param {Number} payment.bonus_price - WIP
 * @param {Number} payment.minimal_payement_to_bonus - WIP
 * @param {Number} snack.nominal_time_preparation - WIP
 * @param {Number} snack.printer_client_length_element - WIP
 * @param {Number} snack.printer_cook_length_element - WIP
 * @param {Array} snack.type_menu - WIP
 * @param {String} permission.name - WIP
 * @param {String} roles.name - WIP
 * @param {Number} roles.level - WIP
 * @param {String} permissions.name - WIP
 * @param {String} shop.type_order.name - WIP
 */
var ConfSchema = new Schema({
    name        : { type: String, required: true, unique: true, index: true, trim: true },
    teams       : {
                    nb_max_teams              : Number,
                    nb_max_players_by_team    : Number,
                    nb_max_managers_by_team   : Number,
                    nb_hour_before_team_freez : Number
                  },
    users       : {
                    password_min_length : { type: Number, required: true }
                  },
    payment     : {
                    nominal_price             : Number,
                    bonus_price               : Number,
                    minimal_payement_to_bonus : Number
                  },
    snack       : {
                    nominal_time_preparation      : Number,
                    printer_client_length_element : Number,
                    printer_cook_length_element   : Number,
                    type_menu                     : Array
                  },
    roles       : { type: Object, required: true, default: '"MEMBRE": ["canDoNothing"]'},
    permissions : [{
                    name  : { type: Object, required: true, default: '"name": "canDoNothing"'}
                  }],
    shop        : {
                    type_order  : [{
                                    name  : String
                                  }]
                  }
});


/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description WIP
 */
ConfSchema.pre('validate', function(next) {
  if (this.roles.length == 0) {
    this.roles = ['Admin', 'Member'];
  }
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
ConfSchema.post('save', function() {
  console.log('Conf saved successfully!');
});

module.exports = mongoose.model('Conf', ConfSchema);