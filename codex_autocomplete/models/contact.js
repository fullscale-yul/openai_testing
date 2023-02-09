// create a mongoDB schema 'Contact' which contains the fields name: String, age: Number, email: String, address: String
// export the schema

const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    address: String
});

module.exports = mongoose.model('Contact', Contact);
// create a mongoDB schema 'Contact' which contains the fields name: String, age: Number, email: String, address: String
// export the schema