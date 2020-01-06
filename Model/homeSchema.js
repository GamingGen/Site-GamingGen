'use strict';
 /**
 * Schéma home
 * @module HomeSchema
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Variables

// Schéma ArticleSchema
/**
 * @class ArticleSchema
 * @param {String} title - required: true
 * @param {String} mainInfo - required: true
 * @param {String} detail1 - required: true
 * @param {String} detail2 - required: true
 */
let HomeSchema = new Schema({
    title         : { type: String, required: true },
    mainInfo      : { type: String, required: true },
    detail1       : { type: String, required: true },
    detail2       : { type: String, required: true },
    update_at     : { type: Date },
    register_date : { type: Date },
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description WIP
 */
HomeSchema.pre('validate', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
HomeSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant l'enregistrement
 */
HomeSchema.pre('save', function(next) {
  this.update_at = Date.now();
  if (this.isNew) {
    this.register_date = this.update_at;
  }
  next();
});

/**
 * @function findOneAndRemove
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Permet de supprimer la reference de l'article
 */
HomeSchema.pre('findOneAndRemove', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
HomeSchema.post('save', function() {
  console.log('Home saved successfully!');
});


module.exports = mongoose.model('Home', HomeSchema);