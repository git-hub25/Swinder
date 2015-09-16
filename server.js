var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');

//add requiring models and configs here----------------------------------------------------------------------
require('./models/Conversation');
require('./models/Couple');
require('./models/Message');
require('./models/Salts');
require('./config/passport');

mongoose.connect('mongodb://localhost/swinder');


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//-------------------------DEFINING ROUTES--------------------------------------------------------
var coupleRoutes = require('./routes/CoupleRoutes');
var conversationRoutes = require('./routes/ConversationRoutes');
var messageRoutes = require('./routes/MessageRoutes');

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

//--------------------------SETTING UP PATHS----------------------------------------------------------
app.use('/api/couple', coupleRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/conversation', conversationRoutes);
//-----------------------------------------------------------------------------------------------------

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});