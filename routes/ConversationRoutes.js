var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Couple = mongoose.model('Couple'); //check if name is correct
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

//ref conversation routes
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
router.get('/', function(req, res) {
	Conversation.find({}).populate('user')
	.exec(function(err, conversations) {
		if(err) return res.status(500).send({err: "error getting all conversations"});
		if(!conversations) return res.status(500).send({err: "conversations do not exist"});
		res.send(conversations);
	});
});

//get one conversation
router.get('/:id', function(req, res) {
	console.log(req.conversation);
	res.send(req.conversation);
});

//edit conversation
router.put('/:id', function(req, res) {
	Conversation.update({_id: req._id}, req.body).exec(function(err, result) {
		res.send();
	});
});

//delete conversation
router.delete('/:id', function(req, res) {
	Conversation.remove({_id: req._id})
	.exec(function(err, conversation) {
		if(err) return res.status(500).send({err: "error removing all conversations"});
		if(!conversations) return res.status(500).send({err: "Conversations do not exist"});
		res.send(conversations);
	});
});

module.exports = router;
