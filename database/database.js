const mongoose = require('mongoose')
const Form = require('./models/form')
const FormBackup = require('./models/formBackup')
const User = require('./models/user')
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
            const mobility = form.mobility
            const gender = form.gender
            const age = form.age
            const city = form.city
            const region = form.region
            const houseType = form.houseType
            const phone = form.phone
            const phone2 = (form.phone2 && form.phone2 != form.phone) ? form.phone2 : undefined
            const residents = form.residents
            const experience = form.experience
            const pets = form.pets
            const timePeriod = form.timePeriod
            const comments = form.comments

            // Save to DB
            new Form({ name, dogAge, mobility, size, gender, age, city, region, houseType, phone, phone2, residents, experience, pets, timePeriod, comments })
            .save((err) => {
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

    // Get the total number of Form documents
    getFormCount: function(){
        return new Promise(resolve => {
            Form.countDocuments({adopted: false, deleted: false}, (err, count) => {
                if (err) throw err
                else resolve(count)
            })
        })
    },

    // Query all forms
    getForms: function(criteria){
        return new Promise(resolve => {

            let name, comments, dogAge, size, gender, timePeriod, region, city, houseType, residents, experience, pets, mobility

            // Name
            if (criteria.name === 'הכל') name = {$exists: true}
            else name = {$regex : criteria.name}
            delete criteria.name

            // Comments
            if (criteria.comments !== 'הכל') comments = {$regex : criteria.comments}
            else comments = undefined

            // Loop through the filters
            for (let key in criteria){

                // If the criteria contains 'all', set the key to true
                if (criteria[key].includes('הכל')) criteria[key] = {$exists: true}

                // "all" wasn't selected
                else criteria[key] = { $in: [...criteria[key], 'לא משנה לי']}

                switch(key) {

                    case 'dogAge':
                        dogAge = criteria[key]
                        break

                    case 'mobility':
                        mobility = criteria[key]
                        break

                    case 'size':
                        size = criteria[key]
                        break

                    case 'gender':
                        gender = criteria[key]
                        break

                    case 'timePeriod':
                        timePeriod = criteria[key]
                        break

                    case 'region':
                        region = criteria[key]
                        break

                    case 'city':
                        city = criteria[key]
                        break

                    case 'houseType':
                        houseType = criteria[key]
                        break

                    case 'residents':
                        residents = criteria[key]
                        break

                    case 'experience':
                        experience = criteria[key]
                        break

                    case 'pets':
                        pets = criteria[key]
                        break
                }
            }

            Form.find({name, dogAge, size, mobility, gender, timePeriod, region, city, houseType, residents, experience, pets, adopted: false, deleted: false}, (err, res) => {
                if (err) throw err
                else resolve(res)
            })
        })
    },

    backup: function(){
        return new Promise(async resolve => {
            await this.clear(['formbackups'])
            Form.find({}, async (err, res) => {
                if (err) throw err
                for (let form of res){
                    let newForm = Object.assign({}, form);
                    newForm = newForm._doc
                    delete newForm._id
                    const backupForm = new FormBackup(newForm)
                    await backupForm.save(err => {
                        if (err) throw err
                    })
                }
            })
            resolve(console.log('Backed up all forms'))
        })
    },

    // Delete or hide forms
    hide: function(id, reason){
        return new Promise(resolve => {

            // Set if it is adoption
            const update = {}
            if (reason === 'adoption') update.adopted = true
            else if (reason === 'deletion') update.deleted = true

            // Update
            Form.findByIdAndUpdate(id, update, (err, res) => {
                if (err) throw err
                else resolve()
            })
        })
    },
}