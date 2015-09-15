var mongoose = require('mongoose') ;

var ConversationSchema = new mongoose.Schema({
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Couple'},
	body: String,
	recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'Couple'},
	message: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'}
}) ;

mongoose.model('Conversation', ConversationSchema) ;