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

//get all conversations
router.post('/', function(req, res) {
	Couple.findOne(req.body).populate('conversations')
	.exec(function(err, result) {
		if(err) return res.status(500).send({err: "Error getting all messages"});
		if(!result) return res.status(400).send({err: "Messages don't exist"});
		res.send(result.conversations);
	})
});

router.post('/newMessage', auth, function(req, res) {

	//req.body contains the createdBy, createdDate, and body
	var message = new Message(req.body.actualMessage);
	message.save(function(err, messageResult) {
		if(err) return res.status(500).send({err: 'Issues with the Swinder server.'});
		if(!messageResult) return res.status(400).send({err: "Could not send message."})
			Conversation.update({_id: req.body.conversationId}, {$push: {
				message: {
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

router.post('/conversation', function(req, res) {
	console.log(req.body);
	var conversation = new Conversation(req.body) ;
	conversation.createdDate = new Date() ;
	conversation.save(function(err, result) {
		if(err) return res.status(500).send({ err: 'Server error' });
		if(!result) return res.status(400).send({ err: 'Server error' });;
		res.send() ;
	})
})



//get one message


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
