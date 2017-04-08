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
 * @param {String} username - required: true
 * @param {Date} register_date - required: true, default: Date.now
 */
var WatchListSchema = new Schema({
    username      : { type: String, required: true },
    register_date : { type: Date, required: true, default: Date.now }
});

/**
 * @function postInit
 * @description Affiche l'id du document (permet de vérifier que tous les schémas on bien était chargé)
 */
// WatchListSchema.post('init', function(doc) {
//   console.log('WatchListSchema : ', doc._id);
// });

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