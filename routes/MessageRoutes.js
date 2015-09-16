var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Couple = mongoose.model('Couple'); //check if name is correct
var Conversation = mongoose.model('Conversation');
var Message = mongoose.model('Message');
var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({
	userProperty : 'payload',
	secret : '_secretdin'
});

router.param('id', function(req, res, next, id) {
	req._id = id;
	next();
});
//add auth?
router.post('/', function(req, res) {
	console.log(req.body);
	//req.body contains the createdBy, createdDate, and body
	var message = new Message(req.body);
	message.save(function(err, result) {
		if(err) return res.status(500).send({err: 'Issues with the Swinder server.'});
		if(!result) return res.status(400).send({err: "Could not send message."})
		Couple.update({_id: message.createdBy}, {$push: { //possibly populate instead of update
		Conversation: { //or should Conversation be messages? Look to change this if there's an error, and on line 44-47
		_id: result._id
	}
}}, function(err, createdBy) {
	if(err) return res.status(500).send({err: "There was an error!"});
	if(!createdBy) return res.status(400).send({err: "This shouldn't be happening."});
	Message.findOne({_id: result._id}).populate('createdBy')
	.exec(function(err, message) {
		res.send(message)
	});
});	
});
	
});

//get all messages
router.get('/', function(req, res) {
	Message.find({}).populate('createdBy')
	.exec(function(err, Conversation) {
		console.log(Conversation);
		if(err) return res.status(500).send({err: "Error getting all messages"});
		if(!Conversation) return res.status(400).send({err: "Messages don't exist"});
		res.send(Conversation);
	})
});

//get one message
router.get('/:id', function(req, res) {
	console.log(req.message);
	res.send(req.message);
});

//edit message
router.put('/:id', function(req, res) {
	Message.update({_id: req._id}, req.body)
	.exec(function(err, result) {
		res.send();
	})
});

//delete a message
router.delete('/:id', function(req, res) {
	Message.remove({_id: req._id})
	.exec(function(err, message) {
		if(err) return res.status(500).send({err: "Error with deleting the posts"});
		if(!message) return res.status(400).send({err: "Messages do not exist!"});
		res.send(message);
	})
})

module.exports = router;