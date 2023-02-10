// create an Express app that uses mongoDB to connect to the database 'contacts' which contains name, age, birthday, work_address, email, and contact number
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/contacts', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
});

 // Create a schema for contacts 
 const contactSchema = new mongoose.Schema({ 
    name: String, 
    age: Number, 
    birthday: Date, 
    work_address: String, 
    email: String, 
    contact_number: Number
 });

 // Create a model from the schema 
 const Contact = mongoose.model('Contact', contactSchema);

 // Create an endpoint to get all contacts from the database 

app.get('/contacts', (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(contacts);
    });
});

 // Create an endpoint to add a new contact to the database
app.post('/contacts', (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save((err, contact) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(contact);
    });
});

 // Start the server on port 3000
 app.listen(3000, () => console.log("Server listening on port 3000"));