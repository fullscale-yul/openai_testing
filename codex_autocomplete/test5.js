// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema contact which contains name, age, birthday, work_address, email, and contact number

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/contacts');

app.use(bodyParser.urlencoded({ extended: true }));

var contactSchema = mongoose.Schema({
  name: String,
  age: Number,
  birthday: Date,
  work_address: String,
  email: String,
  contact_number: Number
});

var Contact = mongoose.model('Contact', contactSchema);

app.get('/', function(req, res) {
  res.send('Hello World!')
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
  contact.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send('Contact created!');
    }
  });
});

app.put('/contacts/:id', function(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if (err) {
      res.send(err);
    } else {
      contact.name = req.body.name;
      contact.age = req.body.age;
      contact.birthday = req.body.birthday;
      contact.work_address = req.body.work_address;
      contact.email = req.body.email;
      contact.contact_number = req.body.contact_number;
      contact.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.send('Contact updated!');
        }
      });
    }
  });
});

app.delete('/contacts/:id', function(req, res) {
  Contact.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send('Contact deleted!');
    }
  });
});


// create routes to perform CRUD operations

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema contact which contains name, age, birthday, work_address, email, and contact number