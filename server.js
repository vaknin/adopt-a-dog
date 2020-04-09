if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const database = require('./database/database.js')
const router = require('./scripts/router.js')
const fetch = require('node-fetch')
const express = require('express')

// Heroku goes idle after 30 minutes, keep it awake by sending a GET request every ~30 minutes
async function keepHerokuUp(url){
    setTimeout(() => {
        fetch(url)
        return keepHerokuUp(url)
    }, 1500000)
    await database.backup()
}

async function main(){

    // Connect to database
    await database.connect(process.env.DB_PASS)
    
    // Create the server
	const port = process.env.PORT || 5000
    const app = express()
    
    // Routing and middleware
    app.use(express.json())
    app.use('/', router)
    
    // Start the server
    app.listen(port, () => console.log('the server is running'))

    // Production build
    if (process.env.NODE_ENV == 'production'){
        app.use(express.static('client/build'))

        const path = require('path')
        app.get('*', (req,res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        });

        // Keep Heroku awake
        keepHerokuUp('https://just-adopt-a-dog.herokuapp.com/')
    }
}

main();