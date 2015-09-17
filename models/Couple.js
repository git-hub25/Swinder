var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var CoupleSchema = new mongoose.Schema({
  name1: String,
  name2: String,
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    lowercase: true
  },
  profilePic: String,
  otherPics: [{
    type: String
  }],
  passwordHash: String,
  salt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salts"
  },
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Couple"
  }],
  about: String,
  conversation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation"
  }],
  relationshipType: String,
  socialLinks: [{
    facebook: {
      type: String
    }
  }, {
    twitter: {
      type: String
    }
  }, {
    instagram: {
      type: String
    }
  }]
});

CoupleSchema.methods.setPassword = function(password, salt) {
//this.salt needs to be set and retrieved in the create user route to create user password
var passwordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString("hex");
this.passwordHash = passwordHash;
}

CoupleSchema.methods.checkPassword = function(password, salt) {
//this.salt needs to be set and retrieved in the create user route to create user password
var checkPasswordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString("hex");
return this.passwordHash === checkPasswordHash;
}

CoupleSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 36500);
  return jwt.sign({
    username: this.username,
    id : this._id,
    email: this.email,
    exp: exp.getTime() / 1000
  }, "_secretdin");
}

mongoose.model("Couple", CoupleSchema);
