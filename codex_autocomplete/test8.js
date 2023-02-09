// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema 'contact' which contains name, age, birthday, work_address, email, and contact number
// create routes to perform CRUD operations
// when creating a new contact, check if the contact is already in the database

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
  contact_number: Number
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
  Contact.findOne({ name: req.body.name, email: req.body.email }, function(err, contact) {
    if (err) {
      res.send(err);
    } else if (contact) {
      res.send('Contact already exists!');
    } else {
      var newContact = new Contact(req.body);
      newContact.save(function(err, contact) {
        if (err) {
          res.send(err);
        } else {
          res.json(contact);
        }
      });
    }
  });
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
// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema 'contact' which contains name, age, birthday, work_address, email, and contact number
// create routes to perform CRUD operations
// when creating a new contact, check if the contact is already in the database