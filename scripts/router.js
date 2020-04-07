const express = require('express');
const database = require('../database/database')
const routes = express.Router();

// Agency log in
routes.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const logged = await database.validateUser(username, password)
    const formCount = logged ? await database.getFormCount() : undefined
    res.send({logged, formCount})
});

// Agency search
routes.post('/search', async (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const logged = await database.validateUser(username, password)
    
    // Invalid credentials
    if (!logged) return res.end
    
    // Get results from database
    const criteria = req.body.criteria
    const results = await database.getForms(criteria)

    // Return results
    res.send({results})
});

// Submit form
routes.post('/form', async (req, res) => {
    const form = req.body.form
    await database.submit(form).then(() => res.end())
});

module.exports = routes;