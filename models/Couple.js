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
    unique: true
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

CoupleSchema.methods.setPassword = function(salt, password) {
//this.salt needs to be set and retrieved in the create user route to create user password
  var passwordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString("hex");
  this.passwordHash = passwordHash;
}

CoupleSchema.methods.checkPassword = function(salt, password) {
//this.salt needs to be set and retrieved in the create user route to create user password
  var checkPasswordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString("hex");
  return this.passwordHash === checkPasswordHash;
}


mongoose.model("Couple", CoupleSchema);
