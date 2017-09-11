'use strict';
 /**
 * Schéma Accueil
 * @module AccueilSchema
 */

/**
 * @requires Schema
 */
const mongoose              = require('mongoose');
const Schema                = mongoose.Schema;


// Schéma AccueilSchema
/**
 * @class AccueilSchema
 * @param {String} pseudo - required: true
 * @param {String} title - required: true
 * @param {String} text - required: true
 * @param {Date} register_date - required: true, default: Date.now
 */
let AccueilSchema = new Schema({
    pseudo        : { type: String, required: true },
    title         : { type: String, required: true },
    text          : { type: String, required: true },
    register_date : { type: Date, required: true, default: Date.now }
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description MAJ de la date d'enregistrement
 */
AccueilSchema.pre('validate', function(next) {
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
AccueilSchema.pre('save', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
AccueilSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
AccueilSchema.post('save', function(next) {
  console.log('Article saved successfully!');
});


module.exports = mongoose.model('Accueil', AccueilSchema);