var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Couple = mongoose.model('Couple');
var Salts = mongoose.model('Salts');


passport.use(new LocalStrategy(function(username, password, done) {
  Couple.findOne({
      username: username
    }) //find the username in the model from where it's being called.
    .populate({
      path: "salt",
      model: 'Salts',
      select: 'salt'
    })
    .exec(function(err, couple) {
      if (err) return done({
        err: "Server has issues."
      });
      if (!couple) return done({
        err: "Couple does not exist"
      });
      if(!couple.checkPassword(password, couple.salt.salt)) return done({err: "Invalid couplename and password combination."});
      return done(null, couple);
    });
}));
