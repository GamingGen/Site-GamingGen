'use strict';
 /**
 * Schéma snack
 * @module SnackSchema
 */

/**
 * @requires Schema
 */
var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;

// Schéma SnackSchema
/**
 * @class SnackSchema
 * @param {Number} year - required: true, unique: true, index: true, trim: true
 * @param {Number} number - required: true
 * @param {Number} elements.quantity - required: true
 * @param {String} elements.name - required: true
 * @param {Number} elements.price - required: true
 * @param {Number} elements.unit_price - required: true
 * @param {String} name - required: true
 * @param {Number} total - required: true
 * @param {Boolean} paid - required: true
 * @param {Boolean} free - required: true
 * @param {Number} printed_client - required: true
 * @param {Number} printed_cook - required: true
 * @param {Date} register_date - required: true, default: Date.now
 */
var SnackSchema = new Schema({
    year            : { type: Number, required: true, trim: true },
    number          : { type: Number, required: true, trim: true },
    elements        : [{ 
                        quantity    : { type: Number, default: 1 },
                        name        : { type: String, required: true },
                        price       : { type: Number, required: true },
                        unit_price  : { type: Number, required: true }
                      }],
    name            : { type: String, required: true },
    total           : { type: Number, required: true },
    paid            : { type: Boolean, required: true },
    free            : { type: Boolean, default: false },
    printed_client  : { type: Number, default: 0 },
    printed_cook    : { type: Number, default: 0 },
    register_date   : { type: Date, required: true }
});

/**
 * @function postInit
 * @description Affiche l'id du document (permet de vérifier que tous les schémas on bien était chargé)
 */
// SnackSchema.post('init', function(doc) {
//   console.log('SnackSchema : ', doc._id);
// });

/**
 * @function CheckOrder
 * @description Permet de vérifier la commande (Nom des items, leur prix et le total).<br />
 * Si jamais il y a une différence, la valeur utiliser sera celle calculé ou récupéré par la BDD.
 * @todo Chexk le nom et le prix de chaque item
 * @static
 */
SnackSchema.methods.CheckOrder = function() {
  // TODO check price and name of each item
  
  var compareTotal = 0;
  for (var item of this.elements) {
    compareTotal += item.unit_price * item.quantity;
  };
  
  if (compareTotal != this.total)
  {
    this.total = compareTotal;
  }
  
  this.total = this.total.toFixed(2);
  return this;
};

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description MAJ de la propriété year et de la date d'enregistrement
 */
SnackSchema.pre('validate', function(next) {
  if (!this.year) {
    this.year = new Date().getFullYear();
  }
  
  // if (!this.number) {
  //   this.number = 0;
  // }
  // else {
  //   this.number++;
  // }
  
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
SnackSchema.pre('save', function(next) {
  this.register_date = Date.now();
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
SnackSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
SnackSchema.post('save', function() {
  console.log('Snack saved successfully!');
});


module.exports = mongoose.model('Snack', SnackSchema);