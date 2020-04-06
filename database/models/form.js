const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    region: String,
    city: String,
    houseType: String,
    phone: String,
    phone2: String,
    residents: String,
    experience: String,
    pets: Array,
    size: Array,
    dogAge: Array,
    timePeriod: String,
    comments: String,
    date: { type: Date, default: Date.now },
    adopted: Boolean
});

module.exports = mongoose.model('Form', Schema);