var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

passport.use(new LocalStrategy (function(username, password, done) {

}));


