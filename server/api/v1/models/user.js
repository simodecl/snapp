const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const config = require('../../../config/config');

const UserSchema = mongoose.Schema(
  {
    email: { 
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    localProvider: {
      password: { 
        type: String, 
        required: false 
      }
    },
    facebookProvider: {
      id: { type: String, required: false },
      token: { type: String, required: false }
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('localProvider.password')) return next();// only hash the password if it has been modified (or is new)

  bcrypt.genSalt(config.auth.bcrypt.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.localProvider.password, salt, function(err, hash) {
      if (err) return next(err);

      user.localProvider.password = hash;
      next();
    });
  });
});

UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
  var User = this;
  return User.findOne({
      'facebookProvider.id': profile.id
  }, function(err, user) {
    if(user) { return cb(err, user); }
    // Check if a user exists with the same email
    return User.findOne({'email': profile.emails[0].value}, function(err2, user2) {
      if(user2) {
        user2.facebookProvider.id = profile.id;
        user2.facebookProvider.token = accessToken;
        user2.save(function(err3, savedUser) {
          return cb(err3, savedUser);
        });
      } else {
        var newUser = new User({
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });
        newUser.save(function(err3, savedUser) {
          return cb(err3, savedUser);
        });
      }
    });
  });
};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) return cb(err, null);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);