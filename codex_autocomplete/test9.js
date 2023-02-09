// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema 'contact' which contains name, age, birthday, work_address, email, and contact number
// create routes to perform CRUD operations
// when creating a new contact, check if the contact is already in the database by comparing their email
// when creating a new contact, make sure that the request body contains all of the fields in the schema provided

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

Contact = require('./models/contact');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/contacts');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/contacts');
});

app.get('/api/contacts', (req, res) => {
	Contact.getContacts((err, contacts) => {
		if(err){
			throw err;
		}
		res.json(contacts);
	});
});

app.get('/api/contacts/:_id', (req, res) => {
	Contact.getContactById(req.params._id, (err, contact) => {
		if(err){
			throw err;
		}
		res.json(contact);
	});
});

app.post('/api/contacts', (req, res) => {
	var contact = req.body;
	Contact.addContact(contact, (err, contact) => {
		if(err){
			throw err;
		}
		res.json(contact);
	});
});

app.put('/api/contacts/:_id', (req, res) => {
	var id = req.params._id;
	var contact = req.body;
	Contact.updateContact(id, contact, {}, (err, contact) => {
		if(err){
			throw err;
		}
		res.json(contact);
	});
});

app.delete('/api/contacts/:_id', (req, res) => {
	var id = req.params._id;
	Contact.removeContact(id, (err, contact) => {
		if(err){
			throw err;
		}
		res.json(contact);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema 'contact' which contains name, age, birthday, work_address, email, and contact number
// create routes to perform CRUD operations
// when creating a new contact, check if the contact is already in the database by comparing their email
// when creating a new contact, make sure that the request body contains all of the fields in the schema provided