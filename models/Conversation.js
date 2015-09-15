var mongoose = require('mongoose') ;

var ConversationSchema = new mongoose.Schema({
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Couple'},
	createdDate: Date,
	recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'Couple'},
	message: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'}
}) ;

mongoose.model('Conversation', ConversationSchema) ;