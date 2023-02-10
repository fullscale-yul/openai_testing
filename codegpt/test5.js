// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema 'contact' which contains name, age, birthday, work_address, email, and contact number


const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/contacts', { useNewUrlParser: true, useUnifiedTopology: true}); 
 
// Create Contact Schema 
const contactSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    age: { type: Number, required: true }, 
    birthday: { type: Date, required: true }, 
    work_address : { type : String, required : true}, 
    email : { type : String, required : true}, 
    contact_number : { type : Number, required : true}   });

 // Create Model from Schema 
 const Contact = mongoose.model('Contact', contactSchema);

 // Routes

 // Get all contacts from database 

 app.get('/contacts', async (req, res) => {   try{     const contacts = await Contact.find();     res.json(contacts);   } catch(err){     res.status(500).json({ message: err.message });   } });

 // Get one contact from database

 app.get('/contact/:id', getContact, (req, res) => {   res.json(res.contact); });

 async function getContact(req, res, next){   try{     contact = await Contact.findById(req.params.id);     if (contact == null){       return res.status(404).json({ message: 'Cannot find contact'});     }   } catch(err){     return res.status(500).json({ message: err.message });   }   res.contact = contact;   next(); }

 // Add new contact to database

 app.post('/contacts', async (req, res) => {   const contact = new Contact({     name : req.body.name ,      age : req .body .age ,      birthday : req .body .birthday ,      work_address : req .body .work_address ,      email : req .body .email ,      contact_number : req .body .contact_number    });   try{     const newContact = await contact.save();     res.status(201).json(newContact);   } catch(err){     res.status(400).json({ message: err.message })   } });

 // Update existing contact in database

 app .patch (' / contacts / : id ', getContact , async ( req ,res ) =>{ try{ if (req . body .name != null ){res .contact .name= req . body .name ;} if (req . body .age != null ){res .contact .age= req . body .age ;} if (req