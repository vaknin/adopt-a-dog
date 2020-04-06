const express = require('express');
const database = require('../database/database')
const routes = express.Router();

routes.post('/login', async (req, res) => {

    // Log in
    const username = req.body.username;
    const password = req.body.password;
    const logged = await database.validateUser(username, password);
    res.send(logged);
});

routes.post('/form', async (req, res) => {
    const form = req.body.form
    await database.submit(form).then(() => res.end())
});

module.exports = routes;