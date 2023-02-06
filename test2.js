// create an app that uses Express, Node.js, and MongoDB with routes to create and retrieve entries from the database with schema 'Contact' with fields 'name', 'age', 'email'

// Require the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const contacts = require('./routes/contacts');

 // Create an Express app  
const app = express();

app.use('/contacts', contacts);

 // Parse incoming requests data (https://github.com/expressjs/body-parser)  
app.use(bodyParser.json());

// Start the server on port 3000       
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});