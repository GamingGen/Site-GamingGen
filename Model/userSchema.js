'use strict';

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var bcrypt                = require('bcrypt');

const saltRounds          = 10;

var UserSchema = new Schema({
    pseudo    : { type: String, required: true, unique: true, index: true, trim: true },
    password  : { type: String, required: true },
    email     : { type: String, required: true, unique: true, match: /.{2,}\@.{2,10}\..{2,3}/ },
    general   : {
                  first_name    : { type: String, required: true },
                  last_name     : { type: String, required: true },
                  birthday      : { type: Date, required: true },
                  zip           : { type: Number, required: true },
                  update_at     : { type: Date, default: Date.now },
                  register_date : Date
                },
    team      : {
                  name          : { type: String, ref: 'Team' },
                  coach         : Boolean,
                  payment       : Number,
                  presale_snack : Number
                },
    access    : {
                  token   : String,
                  level   : { type: Number, required: true, default: 1 },
                  groups  : { type: Array, required: true, default: ['member'] }, // TODO Save a referential Array in DB
                  ban     : { type: Boolean, required: true, default: false }
                }
});

UserSchema.pre('validate', function(next) {
  if (this.password.length < 8) {
    console.log('This Password: is too short');
    next(new Error('This Password is too short'));
  }
  else {
    next();
  }
});

UserSchema.pre('save', function(next) {
  var dateNow = Date.now();
  //this.general.update_at = dateNow;
  if (this.isNew) {
    this.general.register_date = dateNow;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

UserSchema.pre('findOneAndUpdate', function(next) {
  // User.findOne({'username': this.username}, function(err, user) {
  //   if (!bcrypt.compareSync(this.password, user.password))
  //   {
  //     this.update({}, {$set: {password: bcrypt.hashSync(this.password, saltRounds) } });
  //   }
  // });
  console.log(this.password);
  this.update({}, {$set: { update_at:  Date.now } });
  next();
});

UserSchema.post('save', function() {
  console.log('User saved successfully!');
});



UserSchema.statics.authenticate = function(email, password, callback) {
  console.log(email);
  console.log(password);
	this.findOne({ email: email }, function(error, user) {
		if (user && bcrypt.compareSync(password, user.password)) {
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