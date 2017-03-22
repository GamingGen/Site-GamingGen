'use strict';
 /**
 * Schéma Commande
 * @module OrderSchema
 */

/**
 * @requires Schema
 */
var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;

// Schéma OrderSchema
/**
 * @class OrderSchema
 * @param {Number} year - required: true, trim: true
 * @param {Number} number - required: true, trim: true
 * @param {Number} elements.quantity - default: 1
 * @param {String} elements.name - required: true
 * @param {Number} elements.price - required: true
 * @param {Number} elements.unit_price - required: true
 * @param {String} name - required: true
 * @param {Number} total - required: true
 * @param {Boolean} paid - required: true
 * @param {Boolean} free - default: false
 * @param {Number} printed_order - default: 0
 * @param {Date} register_date - required: true, default: Date.now
 */
var OrderSchema = new Schema({
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
    printed_order  : { type: Number, default: 0 },
    register_date   : { type: Date, required: true, default: Date.now }
});

/**
 * @function postInit
 * @description Affiche l'id du document (permet de vérifier que tous les schémas on bien était chargé)
 */
OrderSchema.post('init', function(doc) {
  console.log('OrderSchema : ', doc._id);
});

/**
 * @function CheckOrder
 * @description Permet de vérifier la commande (Nom des items, leur prix et le total).<br />
 * Si jamais il y a une différence, la valeur utiliser sera celle calculé ou récupéré par la BDD.
 * @todo Chexk le nom et le prix de chaque item
 * @static
 */
OrderSchema.methods.CheckOrder = function() {
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
 * @description MAJ de l'année et de la date d'enregistrement
 */
OrderSchema.pre('validate', function(next) {
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
OrderSchema.pre('save', function(next) {
  this.register_date = Date.now();
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Pour l'instant aucune vérification avant la MAJ
 */
OrderSchema.pre('findOneAndUpdate', function(next) {
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
OrderSchema.post('save', function() {
  console.log('Order saved successfully!');
});



module.exports = mongoose.model('Order', OrderSchema);