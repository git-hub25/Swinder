//Changed var User to var Couple in all instances for clarity

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Couple = mongoose.model('Couple');
var passport = require('passport');
var Salts = mongoose.model("Salts");

//register
router.post('/register', function(req, res) {
	var couple = new Couple(req.body);
	couple.setPassword(req.body.password);
	//Save couple with passwordHash field blank
	couple.save(function(err, couple) {
		if(err) console.log(err);
		if(err) return res.status(500).send({err: "Issues with Swinder's server :/"});
		if(!couple) return res.status(400).send({err: 'You messed up!'});
		//Creates salt with id from new couple as reference
		var salt = new Salts({coupleId: couple._id});
		//Sets salt string with SaltSchema method on Salts.js with crypto 64 bytes
		salt.setSalt();
		//Saves salt
		salt.save(function(err, salt) {
			if(err) return res.status(500).send({err: "Issues with Swinder's server :/"});
			if(!salt) return res.status(400).send({err: 'You messed up!'});
			//Update scouple with reference to salt with salt._id
			Couple.update({_id: salt.coupleId}, {salt: salt._id}, function(err, coupleWithSaltId) {
				if(err) return res.status(500).send({err: "Issues with Swinder's server :/"});
				if(!coupleWithSaltId) return res.status(400).send({err: 'You messed up!'});
				//Finds couple to populate salt string to change reference id of salt to actual salt string
				Couple.findOne({_id: coupleWithSaltId._id}).populate({
					path: "salt",
					model: "Salts",
					select: "salt"
				}).exec(function(err, coupleWithSaltString) {
					if(err) return res.status(500).send({err: "Issues with Swinder's server :/"});
					if(!coupleWithSaltString) return res.status(400).send({err: 'You messed up!'});
					//Hashes the password with salt with Couple setPassword method defined in Couple.js
					coupleWithSaltString.setPassword(req.body.password, coupleWithSalt.salt)
					res.send();
				});
			});
		});
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

//GET /couples
router.get('/couple', function(req, res) {
	res.send() //do i need to add an array in as the parameter?
});

//GET /couple /{showId}
router.get('/couple/:id', function(req, res) {
	res.send(req.couple);
});

module.exports = router;
