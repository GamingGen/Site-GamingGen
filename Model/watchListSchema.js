var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt                = require('bcrypt');

const saltRounds          = 10;

var UserSchema = new Schema({
    username  : { type: String, required: true, unique: true, index: true, trim: true },
    password  : { type: String, required: true },
    email     : { type: String, required: true, unique: true, match: /.{2,}\@.{2,10}\..{2,3}/ },
    general   : {
                  first_name    : { type: String, required: true },
                  last_name     : { type: String, required: true },
                  birthday      : { type: Date, required: true },
                  zip           : { type: Number, required: true },
                  register_date : { type: Date },
                  update_at     : { type: Date }
                },
    team      : {
                  name          : String,
                  leader        : Boolean,
                  members       : Array,
                  table         : Number
                },
    access    : {
                  level   : { type: Number, required: true },
                  groups  : { type: Array, required: true, default: ['member'] }, // TODO Save a referential Array in DB
                  ban     : { type: Boolean, required: true }
                }
});

UserSchema.pre('validate', function(next) {
  if (this.password.length > 8) {
    console.log('This Password: ' + this.password + ' is too short');
    next(new Error('This Password is too short'));
  }
  else {
    next();
  }
});

UserSchema.pre('save', function(next) {
  // if (this.isNew) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  // }
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
  this.update({}, {$set: { update_at:  Date.now() } });
  next();
});

UserSchema.post('save', function(next) {
  console.log('User saved successfully!');
  // next();
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);