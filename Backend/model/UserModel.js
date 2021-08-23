const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
    min: 8,
  },
  resetToken: String,
  expireToken: Date,
  folders: [],
  files: [
    {
      path: String,
      file: {
        filename: String,
        title: String,
        descreption: String,
      },
    },
  ],
});

const saltRound = 12;
/*
userSchema.path("email").validate(function (value, respond) {
  return mongoose
    .model("User")
    .countDocuments({ email: value })
    .exec()
    .then(function (count) {
      return !count;
    })
    .catch(function (err) {
      throw err;
    });
}, "Email already exists.");
*/
/*
userSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email.text); 
}, 'Please type correct email');
*/

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, saltRound, function (err, hash) {
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
