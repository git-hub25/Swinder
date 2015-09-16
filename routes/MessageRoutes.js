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

//.populate({_id: conversation.user})