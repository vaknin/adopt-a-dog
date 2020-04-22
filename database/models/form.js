const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    region: String,
    city: String,
    mobility: String,
    houseType: String,
    phone: String,
    phone2: String,
    residents: String,
    experience: String,
    pets: Array,
    size: Array,
    dogAge: Array,
    timePeriod: String,
    comments: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    adopted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Form', Schema);