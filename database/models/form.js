const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    region: String,
    city: String,
    houseType: String,
    phone: String,
    residents: String,
    experience: String,
    pets: Array,
    size: Array,
    dogAge: Array,
    timePeriod: String,
    comments: String
});

module.exports = mongoose.model('Form', Schema);