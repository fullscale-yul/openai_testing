var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/contacts');

var contactSchema = new mongoose.Schema({
  name: String,
  age: Number,
  birthday: Date,
  work_address: String,
  email: String,
  contact_number: String
});

var Contact = mongoose.model('Contact', contactSchema);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/contacts', function(req, res) {
  Contact.find({}, function(err, contacts) {
    if (err) {
      res.send(err);
    } else {
      res.json(contacts);
    }
  });
});

app.get('/contacts/:id', function(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if (err) {
      res.send(err);
    } else {
      res.json(contact);
    }
  });
});

app.post('/contacts', function(req, res) {
  var contact = new Contact(req.body);
  Contact.findOne({ email: contact.email }, function(err, contact) {
    if (contact) {
      res.send('Contact already exists');
    } else { 
      contact.save(function(err, contact) {
        if (err) {
          res.send(err);
        } else {
          res.json(contact);
        }
      });
    } 
  })
});

app.put('/contacts/:id', function(req, res) {
  Contact.findByIdAndUpdate(req.params.id, req.body, function(err, contact) {
    if (err) {
      res.send(err);
    } else {
      res.json(contact);
    }
  });
});

app.delete('/contacts/:id', function(req, res) {
  Contact.findByIdAndRemove(req.params.id, function(err, contact) {
    if (err) {
      res.send(err);
    } else {
      res.json(contact);
    }
  });
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});