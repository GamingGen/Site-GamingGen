'use strict';
 /**
 * Schéma Commentaire
 * @module CommentSchema
 */

/**
 * @requires Schema
 */
const mongoose              = require('mongoose');
const Schema                = mongoose.Schema;

// Variables
let id = 0;

// Schéma CommentSchema
/**
 * @class CommentSchema
 * @param {Number} id - required: true, unique: true, index: true, trim: true
 * @param {String} username - required: true
 * @param {String} text - required: true
 * @param {Date} register_date - required: true, default: Date.now
 * @param {Number} articleId - Id de l'article associé
 */
var CommentSchema = new Schema({
    id            : { type: Number, required: true, unique: true, index: true, trim: true },
    username      : { type: String, required: true },
    text          : { type: String, required: true },
    register_date : { type: Date, required: true, default: Date.now },
    articleId     : { type: Number, required: true }
});

/**
 * @function postInit
 * @description Affiche l'id du document (permet de vérifier que tous les schémas on bien était chargé) et on le stocke dans la variable id
 */
// CommentSchema.post('init', function(doc) {
//   console.log('CommentSchema : ', doc._id);
//   id = doc.id;
// });

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description MAJ de l'id et de la date d'enregistrement
 */
CommentSchema.pre('validate', function(next) {
  // Set de l'id
  this.id = id++;
  
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
CommentSchema.pre('save', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
CommentSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
CommentSchema.post('save', function() {
  console.log('Comment saved successfully!');
});


module.exports = mongoose.model('Comment', CommentSchema);