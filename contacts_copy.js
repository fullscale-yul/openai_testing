const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/contact_db', {
    useNewUrlParser: true
});

const contactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const Contact = mongoose.model('Contact', contactSchema);

router.post('/', async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
    });

    try {
        const existingContact = await Contact.findOne({
            email: req.body.email
        });
        if (existingContact) {
            return res.status(400).send({
                message: 'Contact already exists'
            })
        } else {
            const savedContact = await contact.save();
            return res.status(201).send(savedContact);
        }
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
});

