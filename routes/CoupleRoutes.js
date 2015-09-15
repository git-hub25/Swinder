var express = require('express');
var router = express.router();
var mongoose = require('mongoose');
var User = mongoose.model('Couple');
var passport = require('passport');

//register
router.post('/register', function(req, res) {
	var couple = new User(req.body);
	couple.setPassword(req.body.password);
	couple.save(function(err, result) {
		if(err) console.log(err);
		if(err) return res.status(500).send({err: "Issues with Swinder's server :/"});
		if(!result) return res.status(400).send({err: 'You messed up!'});
		res.send()
	});
});

//local passport
router.post('/login', function(req, res) {
	passport.authenticate('local', function(err, couple, info) {
		if(!couple) return res.status(400).send(info);
		res.send({token: couple.generateJWT()});
	})(req, res, next)
});

//getting an individual couple
router.param('id', function(req, res, next, id) {
	shows.findcouple(req.params.id, function(err, couple) {
		if(err) return next({err: err, type: 'client'});
		req.couple = couple;
		next();
	});
});

//GET /shows
router.get('/couple', function(req, res) {
	res.send() //do i need to add an array in as the parameter?
});

//GET /show/{showId}
router.get('/couple/:id', function(req, res) {
	res.send(req.couple);
});

module.exports = router;
