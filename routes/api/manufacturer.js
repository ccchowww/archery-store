const express = require('express');
const router = express.Router();

const Manufacturer = require('../../models/Manufacturer');

router.get('/', (req, res, next) => {
    Manufacturer
        .find()
        .then(manufacturers => res.json(manufacturers));
});

router.post('/manufacturerpost', (req, res, next) => {
    const newManufacturer = new Manufacturer({
        name: req.body.name
    });

    newManufacturer
        .save()
        .then(Manufacturer => res.send(res.json(Manufacturer)));
});

module.exports = router;