// create an Express app that uses mongoDB that connects to the database 'contacts'

var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contacts');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
// create an Express app that uses mongoDB that connects to the database 'contacts'