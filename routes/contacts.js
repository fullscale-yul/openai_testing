const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Connect to MongoDB 
mongoose.connect('mongodb://localhost/contact_db', { useNewUrlParser: true }); 

// Create a schema for the contact collection 
const contactSchema = new mongoose.Schema({ 
name: String, 
age: Number, 
email: String 
}); 

// Create a model from the schema 
const Contact = mongoose.model('Contact', contactSchema); 

// Create a route for creating contacts in the database  
router.post('/', async (req, res) => {  
    // Create a new contact object with data from the request body  
    const contact = new Contact({  
        name: req.body.name,  
        age: req.body.age,  
        email: req.body.email,  
    });

    // Check if the Contact already exists
    try {
        const existingContact = await Contact.findOne({ email: req.body.email });
        if (existingContact) {
            return res.status(400).send({ message: 'Contact already exists' });
        } else {
            const savedContact = await contact.save();
            return res.status(201).send(savedContact);
        }
    } catch (err) {
        return res.status(500).send({ message: err });    
    }
});

// Create a route for retrieving contacts from the database      
router.get('/', async (req, res) => {
    Contact.find().then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err
        });
    });
});

// Create a route for deleting contacts from the database
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).send({ message: 'No contact found' });
        } else {
            return res.status(200).send({ message: 'Contact deleted successfully' });
        }
    } catch (err) {
        return res.status(500).send({ message: err });    
    } 
});

// Create a route for updating contacts in the database
router.put('/:id', async (req, res) => {
    try {
        let isUnique = false;
        const currentContact = await Contact.findById(req.params.id);
        for (var field in req.body) {
            if (req.body[field] != currentContact[field] && !isUnique) {
                isUnique = true;
            }
            console.log(isUnique);
        }
        if (currentContact && !isUnique) {
            return res.status(200).send({ message: 'No changes made' }); 
        } else {
            const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body);
            if (!updatedContact) {
                return res.status(404).send({ message: 'No contact found' });
            } else {
                return res.status(200).send({ message: 'Contact updated successfully' });
            } 
        }  

    } catch (err) {
        return res.status(500).send({ message: err });    
    } 
    });

module.exports = router;