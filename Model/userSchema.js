'use strict';
 /**
 * Schéma utilisateur
 * @module userSchema
 */

/**
 * @requires Général
 */
const bcrypt    = require('bcrypt');

/**
 * @requires Schema
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

// Variables
const saltRounds  = 10;

// Schéma UserSchema
/**
 * @class UserSchema
 * @param {String} pseudo - required: true, unique: true, index: true, trim: true
 * @param {String} password - required: true
 * @param {String} email - required: true, unique: true, match: /.{2,}\@.{2,10}\..{2,3}/
 * @param {String} general.first_name - required: true
 * @param {String} general.last_name - required: true
 * @param {Date} general.birthday - required: true
 * @param {Number} general.zip - required: true
 * @param {Date} general.update_at - default: Date.now
 * @param {Date} general.register_date - default: Date.now
 * @param {String} team.name - ref: 'Team'
 * @param {Boolean} team.coach - 
 * @param {Number} team.payment - 
 * @param {Number} team.presale_snack - 
 * @param {String} access.token - 
 * @param {Number} access.level - required: true, default: 0
 * @param {Array} access.groups - required: true, default: ['member']
 * @param {Boolean} access.ban - required: true, default: false
 * @param {String} access.validationKey - 
 */
let UserSchema = Schema({
    pseudo    : { type: String, required: true, unique: true, index: true, trim: true },
    password  : { type: String, required: true },
    email     : { type: String, required: true, unique: true, match: /.{2,}\@.{2,10}\..{2,3}/ },
    general   : {
                  first_name    : { type: String, required: true },
                  last_name     : { type: String, required: true },
                  birthday      : { type: Date, required: true },
                  zip           : { type: Number, required: true },
                  update_at     : { type: Date, default: Date.now },
                  register_date : { type: Date, default: Date.now }
                },
    team      : {
                  name          : { type: String, ref: 'Team' },
                  coach         : Boolean,
                  payment       : Number,
                  presale_snack : Number
                },
    access    : {
                  token         : String,
                  level         : { type: Number, required: true, default: 0 },
                  groups        : { type: Array, required: true, default: ['member'] }, // TODO Save a referential Array in DB
                  ban           : { type: Boolean, required: true, default: false },
                  validationKey : String
                }
});

/**
 * @function postInit
 * @description Ici seul un console.log affiche l'id du document (permet de vérifier que tous les schémas on bien était chargé)
 */
UserSchema.post('init', function(doc) {
  console.log('UserSchema : ', doc._id);
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @return {null | expextion} retourne une exception en cas de MDP trop cours
 * @description Verifie la longueur du MDP ne soit pas trop court (inférieur à 8 caractères)
 */
UserSchema.pre('validate', function(next) {
  if (this.password.length < 8) {
    console.log('This Password: is too short');
    next(new Error('This Password is too short'));
  }
  else {
    next();
  }
});

/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Chiffre le MDP et enregistre nouvel utilisateur
 */
UserSchema.pre('save', function(next) {
  var dateNow = Date.now();
  this.general.update_at = dateNow;
  if (this.isNew) {
    this.general.register_date = dateNow;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Tente de mêttre à jour un utilisateur
 * @todo terminer l'implémentation
 */
UserSchema.pre('findOneAndUpdate', function(next) {
  console.log(this.password);
  this.update({}, {$set: { update_at:  Date.now } });
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
UserSchema.post('save', function(error, doc, next) {
  // Gestion en cas d'une clé dupliquée
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    console.log('User saved successfully!');
    next(error);
  }
});


/**
 * @function authenticate
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - MDP de l'utilisateur
 * @param {function} callback - 
 * @description Tente de retrouver un utilisateur avec son email et le MDP reçu
 * @static
 */
UserSchema.statics.authenticate = function(email, password, callback) {
  console.log(email);
  console.log(password);
	this.findOne({ email: email }, function(error, user) {
    console.log('CallbackFindOne: ', error, user)
		if (user && bcrypt.compareSync(password, user.password)) {
		  // Remove Password before send to the client
      user = user.toObject();
      delete user.password;
      
		  console.log('user after delete: ', user);
			callback(null, user);
		} else if (user || !error) {
			// Email or password was invalid (no MongoDB error)
			error = new Error("Your email address or password is invalid. Please try again.");
			callback(error, null);
		} else {
			// Something bad happened with MongoDB. You shouldn't run into this often.
			callback(error, null);
		}
	});
};

module.exports = mongoose.model('User', UserSchema);