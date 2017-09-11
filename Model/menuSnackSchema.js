'use strict';
 /**
 * Schéma menu Snack
 * @module menuSnackSchema
 */

/**
 * @requires Schema
 */
var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;

// Schéma menuSnackSchema
/**
 * @class menuSnackSchema
 * @param {Number} year - required: true, unique: true, index: true, trim: true
 * @param {String} elements.name - required: true
 * @param {Number} elements.unit_price - required: true
 * @param {String} elements.type - required: true
 * @param {Number} elements.quantity - required: true
 * @param {Number} elements.quantity_min - required: true
 */
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

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Set de la propriété year
 */
MenuSnackSchema.pre('validate', function(next) {
  if (!this.year) {
    this.year = new Date().getFullYear();
  }
  next();
});

/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant l'enregistrement
 */
MenuSnackSchema.pre('save', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
MenuSnackSchema.pre('findOneAndUpdate', function(next) {
  next();
});


/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
MenuSnackSchema.post('save', function() {
  console.log('menuSnack saved successfully!');
});


module.exports = mongoose.model('MenuSnack', MenuSnackSchema);