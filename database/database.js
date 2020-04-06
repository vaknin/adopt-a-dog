const mongoose = require('mongoose');
const Form = require('./models/form.js');
const User = require('./models/user.js');

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

    // Log a user in
    validateUser: function(username, password){
        return new Promise(resolve => {
            User.findOne({username, password}, (err, res) => {
                if (err) throw err
                else if (res === null) resolve(false)
                else resolve(true)
            })
        })
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
            new Form({
                name,
                dogAge,
                size,
                gender,
                age,
                city,
                houseType,
                phone,
                residents,
                experience,
                pets,
                timePeriod,
                comments,
                adopted: false
            }).save((err) => {
                if (err) throw(err)
                else resolve()
            })
        })
    },

    // Wipes the entire database
    clear: function(collectionsArray){

        return new Promise(resolve => {

            for (let collection of collectionsArray){
                db.dropCollection(collection, err => {
                    if (err) console.log(`- ${collection} was already empty`);
                    else console.log(`- Removed ${collection} collection`);

                    // Last iteration
                    if (collectionsArray.indexOf(collection) == collectionsArray.length - 1){
                        resolve();
                    }
                });
            }
        })
    },

    createUser: function(username, password){
        return new Promise(resolve => {
            new User({username, password}).save(err => {
                if (err) throw err
                else{
                    console.log(`successfully created the user '${username}'.`)
                    resolve()
                }
            })
        })
    },

    // Log a user in
    getNumberOfForms: function(){
        return new Promise(resolve => {
            Form.countDocuments({}, (err, count) => {
                if (err) throw err
                else resolve(count)
            })
        })
    },
}