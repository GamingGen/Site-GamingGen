'use strict';
 /**
 * Schéma utilisateur
 * @module ArticleSchema
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Comment  = require('./commentSchema');

// Variables
let id = 0;

// Schéma ArticleSchema
/**
 * @class ArticleSchema
 * @param {Number} id - required: true, unique: true, index: true, trim: true
 * @param {String} username - required: true
 * @param {String} desc - required: true
 * @param {String} text - required: true
 * @param {Date} register_date - required: true, default: Date.now
 * @param {Array} comments - Liste des commentaires
 */
let ArticleSchema = new Schema({
    id            : { type: Number, required: true, unique: true, index: true, trim: true },
    username      : { type: String, required: true },
    title         : { type: String, required: true },
    desc          : { type: String, required: true },
    text          : { type: String, required: true },
    update_at     : { type: Date },
    register_date : { type: Date },
    comments      : { type: [Comment.Schema] },
    type          : {
                      hot_news      : { type : Boolean, default : true },
                      critical_info : { type : Boolean, default : false }
                  },
    picture       : String,
});

/**
 * @function postInit
 * @description Affiche l'id du document (permet de vérifier que tous les schémas on bien était chargé) et on le stocke dans la variable id
 */
ArticleSchema.post('init', function(doc) {
  console.log('ArticleSchema : ', doc._id);
  id = doc.id;
  console.log('id: ', id);
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description MAJ de l'id et de la date d'enregistrement
 */
ArticleSchema.pre('validate', function(next) {
  // Set de l'id
  // this.id = id++;
  
  next();
});

/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant l'enregistrement
 */
ArticleSchema.pre('save', function(next) {
  var dateNow = Date.now();
  this.update_at = dateNow;
  if (this.isNew) {
    this.register_date = dateNow;
  }
  if (this.critical_info === false && this.hot_news === false) {
    this.hot_news = true;
  }
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
ArticleSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
ArticleSchema.post('save', function() {
  console.log('Article saved successfully!');
});


module.exports = mongoose.model('Article', ArticleSchema);