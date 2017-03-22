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
 * @param {Number} name - required: true, unique: true, index: true, trim: true
 * @param {string} teams.nb_max_teams - WIP
 * @param {string} teams.nb_max_players_by_team - WIP
 * @param {string} teams.nb_max_managers_by_team - WIP
 * @param {Date} teams.nb_hour_before_team_freez - WIP
 * @param {Array} users.password_min_length - WIP
 * @param {Array} roles - WIP
 * @param {Array} payment.nominal_price - WIP
 * @param {Array} payment.bonus_price - WIP
 * @param {Array} payment.minimal_payement_to_bonus - WIP
 * @param {Array} snack.nominal_time_preparation - WIP
 * @param {Array} snack.printer_client_length_element - WIP
 * @param {Array} snack.printer_cook_length_element - WIP
 * @param {Array} snack.type_menu - WIP
 * @param {Array} roles.name - WIP
 * @param {Array} roles.pages.name - WIP
 * @param {Array} roles.pages.allowed - WIP
 * @param {Array} roles.level - WIP
 * @param {Array} pages.name - WIP
 * @param {Array} shop.type_order.name - WIP
 */
var ConfSchema = new Schema({
    name      : { type: String, required: true, unique: true, index: true, trim: true },
    teams     : {
                  nb_max_teams              : Number,
                  nb_max_players_by_team    : Number,
                  nb_max_managers_by_team   : Number,
                  nb_hour_before_team_freez : Number
                },
    users     : {
                   password_min_length : { type: Number, required: true }
                },
    roles                     : { type: Array, required: true },
    payment                   : {
                                  nominal_price             : Number,
                                  bonus_price               : Number,
                                  minimal_payement_to_bonus : Number
                },
    snack     : {
                  nominal_time_preparation      : Number,
                  printer_client_length_element : Number,
                  printer_cook_length_element   : Number,
                  type_menu                     : Array
                },
    roles     : [{
                  name  : String,
                  pages : [{
                            name    : String,
                            allowed : Boolean
                          }],
                  level : Number
                }],
    pages     : [{
                  name  : String
                }],
    shop      : {
                  type_order  : [{
                                  name  : String
                                }]
                }
});

/**
 * @function postInit
 * @description Affiche l'id du document (permet de vérifier que tous les schémas on bien était chargé) et on le stocke dans la variable id
 */
ConfSchema.post('init', function(doc) {
  console.log('ConfSchema : ', doc._id);
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