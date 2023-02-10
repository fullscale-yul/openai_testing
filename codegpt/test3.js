// create an Express app that uses mongoDB that connects to the database 'contacts'
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/contacts', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log("Connected to MongoDB") });

 // Define a schema 
 const contactSchema = new mongoose.Schema({ 
     name: String, 
     email: String, 
     phone: String, 
     address: String
 });

 // Compile model from schema 
 const Contact = mongoose.model('Contact', contactSchema);

 // Routes for the API 

 // Get all contacts from the database 
app.get('/contacts', (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(contacts);
    });
});

 // Create a new contact in the database
app.post('/contacts', (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save((err, contact) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(contact);
    });
});

 // Update an existing contact in the database
app.put('/contacts/:id', (req, res) => {
    Contact.findByIdAndUpdate(req.params._id, req.body, { new: true }, (err, contact) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ 'contact': 'Contact updated successfully' });
    });
});

 // Delete a contact from the database
app.delete('/contacts/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params._id, (err, contact) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Contact successfully deleted",
            id: contact._id
        };
        return res.status(200).send(response);
    });
});

 // Start server on port 3000 
 app.listen(3000, () => console.log('Server started on port 3000'));