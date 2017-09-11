'use strict';
 /**
 * Schéma Session
 * @module SessionSchema
 */

/**
 * @requires Schema
 */
var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

// Schéma SessionSchema
/**
 * @class SessionSchema
 */
var SessionSchema = new Schema();

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
SessionSchema.post('save', function() {
  console.log('Conf saved successfully!');
});

module.exports = mongoose.model('Session', SessionSchema);