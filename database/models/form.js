const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    dogAge: String,
    size: String,
    gender: String,
    age: String,
    city: String,
    houseType: String,
    phone: String,
    residents: String,
    experience: String,
    pets: String,
    timePeriod: String,
    comments: String
});

module.exports = mongoose.model('Form', Schema);