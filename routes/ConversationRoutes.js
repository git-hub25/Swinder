var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Couple = mongoose.model('Couple'); //check if name is correct
var Conversation = mongoose.model('Conversation')
var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({
  userProperty: 'payload',
  secret: '_secretdin'
});
//Hacky way of getting by recipientId and loggedInUserId into the the router with just a get called.
//Refer to MessageFactory enterConversation function on line 27* -may change
router.param('id', function(req, res, next, id) {
  req.recipientId = id.split("|")[0];
  req.createdById = id.split("|")[1];
  next();
})

//ref conversation routes
router.post('/', auth, function(req, res) {
  console.log(req.body);
  //req.body has the properties createdBy, createdDate and recipient
  var conversation = new Conversation(req.body);
  conversation.save(function(err, result) {
    if (err) return res.status(500).send({
      err: "There is a problem!"
    });
    if (!result) return res.status(400).send({
      err: 'Could not initiate a conversation!'
    });
  });
  res.send();
});

//get all conversations
router.get('/', function(req, res) {
  Conversation.find({}).populate('user')
    .exec(function(err, conversations) {
      if (err) return res.status(500).send({
        err: "error getting all conversations"
      });
      if (!conversations) return res.status(500).send({
        err: "conversations do not exist"
      });
      res.send(conversations);
    });
});

//get a unique conversation
router.post('/conversationStart', function(req, res) {
  Conversation.findOne(req.body).populate('messages')
    .exec(function(err, conversation) {
      if (err) return res.status(500).send({
        err: "error getting all conversations"
      });
      if (!conversation) return res.status(500).send({
        err: "conversations do not exist"
      });
      conversation.populate({
        path: "message",
        model: "Message"
      }, function(err, conversationWithMessages) {
        if (err) return res.status(500).send({
          err: "error pouplating conversation"
        });
        if (!conversationWithMessages) return res.status(500).send({
          err: "conversations do not exist"
        });
        conversationWithMessages.populate({
          path: "message.createdBy",
          model: "Couple"
        }, function(err, conversationWithMessagesWithUsers) {
          if (err) return res.status(500).send({
            err: "error pouplating conversation"
          });
          if (!conversationWithMessagesWithUsers) return res.status(500).send({
            err: "conversations do not exist"
          });
          res.send(conversationWithMessagesWithUsers);
        });
      });
    });
});


//get one conversation with some Logic ;)
//It searches the the Conversation collection for a converstaion between individual and recipient
//If the converstaion exists, great, it returns it on line 57
//If not it creates one with the recipientId and the loggedInUserId as recipient and createdBy property respectively
router.get('/:id', function(req, res) {
  Conversation.findOne({
    recipient: req.recipientId,
    createdBy: req.createdById
  }, function(err, convoAlreadyThere) {
    if (err) return res.status(500).send({
      err: "There was an error on the server getting the conversation"
    });
    if (!convoAlreadyThere) {
      var conversation = new Conversation({
        createdBy: req.createdById,
        recipient: req.recipientId
      });
      conversation.createdDate = new Date();
      conversation.save(function(err, newConvoCreated) {
        if (err) return res.status(500).send({
          err: "There was an error saving the new converstaion!!"
        });
        if (!newConvoCreated) return res.status(500).send({
          err: "Umm not sure what happened but saving the conversation went wrong"
        });
        Couple.update({
            _id: req.recipientId
          }, {
            $push: {
              conversation: {
                _id: newConvoCreated._id
              }
            }
          },
          function(err, result) {
            if (err) return res.status(500).send({
              err: "There was an error updating the new converstaion!!"
            });
            if (!result) return res.status(500).send({
              err: "Umm not sure what happened but updating the conversation went wrong"
            });
          });
        Couple.update({
            _id: req.createdById
          }, {
            $push: {
              conversation: {
                _id: newConvoCreated._id
              }
            }
          },
          function(err, result) {
            if (err) return res.status(500).send({
              err: "There was an error updating the new converstaion!!"
            });
            if (!result) return res.status(500).send({
              err: "Umm not sure what happened but updating the conversation went wrong"
            });
          });
        return res.send(newConvoCreated);
      })
    } else res.send(convoAlreadyThere);
  });
});

//edit conversation
router.put('/:id', function(req, res) {
  Conversation.update({
    _id: req._id
  }, req.body).exec(function(err, result) {
    res.send();
  });
});

//delete conversation
router.delete('/:id', function(req, res) {
  Conversation.remove({
      _id: req._id
    })
    .exec(function(err, conversation) {
      if (err) return res.status(500).send({
        err: "error removing all conversations"
      });
      if (!conversations) return res.status(500).send({
        err: "Conversations do not exist"
      });
      res.send(conversations);
    });
});

module.exports = router;
