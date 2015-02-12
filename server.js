var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./lib/models/usersModel.js');


var port = 8080;
var mongoUri = 'mongodb://localhost:27034/client-user'

var app = express();

app.use(bodyParser.json());

mongoose.connect(mongoUri);

db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log('connected to db');

});


app.post('/api/users', function(req, res) {
	User.create(req.body).then(function(response) {
		res.status(200).json(response);
	},
	function(err) {
		res.status(500).json(err);
	})

	//var user = new User(req.body);
	//user.save(function(err, response) {
	//	  if (!err) {
	//		res.status(200).json(user);
	//	} else {
	//		res.status(500).json(err);
	//	}
	//})
})

app.get('/api/users', function(req, res) {
	User.find({}, function(err, docs) {
		if (!err) {
			if (docs.length === 0) {
				res.status(404).send("No documents found");
			} else {
				res.status(200).json(docs);
			} 
		} else {
			res.status(500).json(err);
		}
	})
})


app.listen(port, function() {
	console.log('Listening on port ' + 8080);
});