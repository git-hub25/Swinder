var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('Couple'); //check if name is correct
var Conversation = mongoose.model('Conversation')
var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({
	userProperty : 'payload',
	secret : '_secretdin'
});

router.param('id', function(req, res, next, id) {
	req._id = id;
	next();
})

//ref post routes
router.post('/', auth, function(req, res) {
	console.log(req.body);
	//req.body has the properties createdBy, createdDate and recipient
	var conversation = new Conversation(req.body);
	conversation.save(function(err, result) {
		if (err) return res.status(500).send({err: "There is a problem!"});
		if(!result) return res.status(400).send({err: 'Could not initiate a conversation!'});
	});
	res.send();
});

//get all conversations
/*router.get('/', function(req, res) {
	Conversation.find({})

});*/
