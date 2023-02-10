// create an Express app that uses mongoDB to connect to the database 'contacts' which follows schema 'contact' which contains name, age, birthday, work_address, email, and contact number


const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB 
mongoose.connect('mongodb://localhost/contacts', { useNewUrlParser: true }); 
 
// Create Contact Schema 
const contactSchema = new mongoose.Schema({ 
    name: String, 
    age: Number, 
    birthday: Date, 
    work_address: String, 
    email: String, 
    contact_number: Number  
}); 

 // Create Model from the Schema  
const Contact = mongoose.model('Contact', contactSchema);  

 // Create a new contact in the database  

 app.post('/contact', (req, res) => {  
     const newContact = new Contact({  
         name: req.body.name,  
         age: req.body.age,  
         birthday: req.body.birthday,  
         work_address: req.body.work_address,  
         email: req.body.email,  
         contact_number : req.body.contact_number    
     });  

     newContact .save() // Save to database  

         .then(contact => {
             res.json(contact);
         }) // Return json response with newly created object in db      
         .catch(err => console.log(err)); // Log any errors that occur if something goes wrong      
 });