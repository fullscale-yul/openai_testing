// create an app that uses Express, Node.js, and MongoDB with routes to create and retrieve entries from the database


// Require dependencies 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 
// Create an Express application 
const app = express();
 
// Connect to MongoDB 
mongoose.connect('mongodb://localhost/myDatabase', { useNewUrlParser: true });
 
// Use body-parser to parse requests of content-type - application/x-www-form-urlencoded and application/json  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 // Create a schema for our data 
const entrySchema = new mongoose.Schema({ name: String, description: String });

 // Create a model based on the schema   
const Entry = mongoose.model('Entry', entrySchema);

 // Create routes for our API   
app.route('/entries')   // Route for both POST and GET requests  

    .post((req, res) => {    // Handle POST requests  

        // Get data from the request     
        const entryData = req.body;

        // Create a new entry with the data     
        const newEntry = new Entry(entryData);

        // Save the entry to the database     
        newEntry.save((err, savedEntry) => {

            if (err) { res.status(500).send(err); } else { res.send(savedEntry); }

        });

    })

    .get((req, res) => {     // Handle GET requests  

        Entry.find((err, entries) => {

            if (err) { res.status(500).send(err); } else { res.send(entries); }

        });

    });    

     // Start the server on port 3000   
app.listen(3000, () => console.log('Server listening on port 3000!')); 		