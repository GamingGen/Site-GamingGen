'use strict';
 /**
 * Schéma Commentaire
 * @module CommentSchema
 */

/**
 * @requires Schema
 */
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

// Variables

// Schéma CommentSchema
/**
 * @class CommentSchema
 * @param {ObjectID} article_id - Id de l'article associé
 * @param {String} pseudo - required: true
 * @param {String} text - required: true
 * @param {Date} register_date - required: true
 */
var CommentSchema = new Schema({
    article_id    : { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    pseudo        : { type: String, required: true },
    text          : { type: String, required: true },
    register_date : { type: Date, required: true }
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description MAJ de l'id et de la date d'enregistrement
 */
CommentSchema.pre('validate', function(next) {
  // Set de l'id
  // this.id = id++;
  
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
 * @function findOneAndRemove
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Permet de supprimer la reference de l'article
 */
// CommentSchema.pre('findOneAndRemove', function(next) {
//   this.model('Article').remove({})
//   next();
// });

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
CommentSchema.post('save', function() {
  console.log('Comment saved successfully!');
});


module.exports = mongoose.model('Comment', CommentSchema);