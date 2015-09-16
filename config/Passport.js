var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Couple = mongoose.model('Couple');

passport.use(new LocalStrategy (function(username, password, done) {

}));
