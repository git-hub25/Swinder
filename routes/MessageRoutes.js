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
//Populate not working!!!!!!
router.post('/', auth, function(req, res) {

	//req.body contains the createdBy, createdDate, and body
	var message = new Message(req.body);
	console.log(message, "line 24 CoupleREoutes");
	message.save(function(err, messageResult) {
		if(err) return res.status(500).send({err: 'Issues with the Swinder server.'});
		if(!messageResult) return res.status(400).send({err: "Could not send message."})
		Couple.update({_id: message.createdBy}, {$push: {
		conversation: {
		_id: messageResult._id
	}
}}, function(err, createdBy) {
	if(err) return res.status(500).send({err: "There was an error!"});
	if(!createdBy) return res.status(400).send({err: "This shouldn't be happening."});
	Message.findOne({_id: messageResult._id})
	.exec(function(err, message) {
		message.populate({path:'createdBy', model: "Couple", select: "username"}, function (err, populatedMessage) {
			if(err) return res.status(500).send({err: "There was an error!"});
			if(!populatedMessage) return res.status(400).send({err: "This shouldn't be happening."});
				res.send(populatedMessage);
		})

	});
});
});

});

//get all messages
router.get('/', function(req, res) {
	Message.find({}).populate('createdBy')
	.exec(function(err, Conversation) {
		if(err) return res.status(500).send({err: "Error getting all messages"});
		if(!Conversation) return res.status(400).send({err: "Messages don't exist"});
		res.send(Conversation);
	})
});

//get one message
router.get('/:id', function(req, res) {
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
