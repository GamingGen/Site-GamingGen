'use strict';
 /**
 * Schéma partenaires
 * @module PartenairesSchema
 */

/**
 * @requires Schema
 */
var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

// Schéma PartenairesSchema
/**
 * @class PartenairesSchema
 * @param {String} name - required: true, unique: true, index: true, trim: true
 * @param {String} description - required: true
 * @param {String} img_path - required: true
 * @param {Date} register_date - required: true
 * @param {String} url - required: true, default: Date.now
 * @param {String} type - required: true
 */
var PartenaireSchema = new Schema({
    name          : { type: String, required: true, unique: true, index: true, trim: true },
    description   : { type: String, required: true },
    img_path      : { type: String, required: true },
    register_date : { type: Date, required: true, default: Date.now },
    url           : { type: String, required: true },
    type          : { type: String, required: true }
});

/**
 * @function postInit
 * @description Affiche l'id du document (permet de vérifier que tous les schémas on bien était chargé)
 */
PartenaireSchema.post('init', function(doc) {
  console.log('PartenaireSchema : ', doc._id);
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description MAJ de la date d'enregistrement
 */
PartenaireSchema.pre('validate', function(next) {
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
PartenaireSchema.pre('save', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
PartenaireSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
PartenaireSchema.post('save', function() {
  console.log('Partenaire saved successfully!');
});


module.exports = mongoose.model('Partenaire', PartenaireSchema);