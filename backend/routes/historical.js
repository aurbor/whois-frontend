const router = require('express').Router();
let Lookup = require('../models/lookup.model');

router.route('/').get((req, res) => {
    Lookup.find()
    .then(hostname => res.json(hostname))
    .catch(err => console.error(err));
});