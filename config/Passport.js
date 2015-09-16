var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Couple = mongoose.model('Couple');

passport.use(new LocalStrategy (function(username, password, done) {
Couple.findOne({username: username}) //find the username in the model from where it's being called. 
.exec(function(err, couple) {  
	console.log("line9 passport")
	if(err) return done({err: "Server has issues."});
	if(!couple) return done({err: "Couple does not exist"});
	// if(!couple.checkPassword(password)) return done({err: "Invalid couplename and password combination."});
	return done(null, couple);
});
}));
