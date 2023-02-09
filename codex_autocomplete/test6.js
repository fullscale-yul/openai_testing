// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema contact which contains name, age, birthday, work_address, email, and contact number and create routes to perform CRUD operations

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
    res.sendFile(__dirname + '/index.html');
});

app.get('/contacts', function(req, res) {
    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log('error');
        } else {
            res.json(contacts);
        }
    });
});

app.post('/contacts', function(req, res) {
    var newContact = new Contact({
        name: req.body.name,
        age: req.body.age,
        birthday: req.body.birthday,
        work_address: req.body.work_address,
        email: req.body.email,
        contact_number: req.body.contact_number
    });
    newContact.save(function(err, contact) {
        if (err) {
            console.log('error');
        } else {
            res.json(contact);
        }
    });
});

app.get('/contacts/:id', function(req, res) {
    Contact.findById(req.params.id, function(err, contact) {
        if (err) {
            console.log('error');
        } else {
            res.json(contact);
        }
    });
});

app.put('/contacts/:id', function(req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body, function(err, contact) {
        if (err) {
            console.log('error');
        } else {
            res.json(contact);
        }
    });
});

app.delete('/contacts/:id', function(req, res) {
    Contact.findByIdAndRemove(req.params.id, function(err, contact) {
        if (err) {
            console.log('error');
        } else {
            res.json(contact);
        }
    });
});

app.listen(3000, function() {
    console.log('server started');
});
// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema contact which contains name, age, birthday, work_address, email, and contact number and create routes to perform CRUD operations