// create an Express app that uses mongoDB
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
 
// Create a schema 
const userSchema = new mongoose.Schema({
    name: String, 
    age: Number, 
    email: String 
}); 

 // Create a model based on the schema 
 const User = mongoose.model('User', userSchema);

 // Create a route for the app 
 app.get('/users', (req, res) => { 

     // Find all users in the database and return them as an array of objects 

     User.find({}, (err, users) => { 
         if(err) {  
             res.status(500).send(err);  
         } else {  
             res.send(users);  
         }  
     });  
 });  

 // Start the server on port 3000  
 app.listen(3000, () => console.log('Server listening on port 3000!'));