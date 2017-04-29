'use strict';
 /**
 * Schéma équipe
 * @module TeamSchema
 */

/**
 * @requires Schema
 */
var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

// Schéma TeamSchema
/**
 * @class TeamSchema
 * @param {String} name - required: true, unique: true, index: true, trim: true
 * @param {Ref} members - => UserSchema
 * @param {Number} table - required: true
 * @param {String} leader - required: true, trim: true
 * @param {Date} register_date - required: true, default: Date.now
 */
var TeamSchema = new Schema({
    name            : { type: String, required: true, unique: true, index: true, trim: true },
    members         : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    table           : { type: Number, unique: true },
    leader          : { type: String, required: true, trim: true },
    register_date   : { type: Date, required: true, default: Date.now }
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description WIP
 */
TeamSchema.pre('validate', function(next) {
    next();
});
/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant l'enregistrement
 */
TeamSchema.pre('save', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
TeamSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
TeamSchema.post('save', function() {
  console.log('User saved successfully!');
});


module.exports = mongoose.model('Team', TeamSchema);