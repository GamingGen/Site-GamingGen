'use strict';
 /**
 * Schéma listeGrise
 * @module WatchListSchema
 */

/**
 * @requires Schema
 */
var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

// Schéma WatchListSchema
/**
 * @class WatchListSchema
 * @param {String} pseudo - required: true
 * @param {Date} register_date - required: true, default: Date.now
 */
var WatchListSchema = new Schema({
    pseudo        : { type: String, required: true },
    register_date : { type: Date, required: true, default: Date.now }
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description MAJ de la date d'enregistrement
 */
WatchListSchema.pre('validate', function(next) {
  if (!this.register_date) {
    this.register_date = Date.now();
  }
  next();
});

/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant l'enregistrement
 */
WatchListSchema.pre('save', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
WatchListSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
WatchListSchema.post('save', function() {
  console.log('WatchList saved successfully!');
});


module.exports = mongoose.model('WatchList', WatchListSchema);