const mongoose = require('mongoose');
const Form = require('./models/form.js');
const db = mongoose.connection;

module.exports = {

    // Connect to the database
    connect: function(password){

        return new Promise(resolve => {

            // Connect
            const connectionString = `mongodb+srv://vaknin:${password}@cluster-bdg8l.mongodb.net/Forms?retryWrites=true&w=majority`;
            mongoose.connect(connectionString,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            mongoose.set('useFindAndModify', false);

            db.once('open', async () => {
                resolve();
            });
        });
    },

    // Save the form to the database
    submit: function(form){

        return new Promise(resolve => {

            // Prepare the parameters
            const name = form.name
            const dogAge = form.dogAge
            const size = form.size
            const gender = form.gender
            const age = form.age
            const city = form.city
            const houseType = form.houseType
            const phone = form.phone
            const residents = form.residents
            const experience = form.experience
            const pets = form.pets
            const timePeriod = form.timePeriod
            const comments = form.comments

            // Save to DB
            new Form({name, dogAge, size, gender, age, city, houseType, phone, residents, experience, pets, timePeriod, comments}).save((err) => {
                if (err) throw(err);
                else resolve();
            });
        });
    },

    // Wipes the entire database
    clear: function(){

        return new Promise(resolve => {

            const collections = ['forms'];
            for (let collection of collections){
                db.dropCollection(collection, err => {
                    if (err) console.log(`- ${collection} was already empty`);
                    else console.log(`- Removed ${collection} collection`);

                    // Last iteration
                    if (collections.indexOf(collection) == collections.length - 1){
                        resolve();
                    }
                });
            }
        })
    },
};