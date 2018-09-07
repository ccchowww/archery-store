const express = require('express');
const router = express.Router();

//Item model
const BowItem = require('../../models/BowItem');
// const BowType = require('../../models/BowType');
// const Manufacturer = require('../../models/Manufacturer');

// @route   GET /api/bowitem
// @desc    currently lists bowitems //test homepage
// @access  Public
router.get('/', (req, res, next) => {
    //fetch everything
    BowItem
        .find()
        .populate('manufacturer')
        .sort({ price: -1 })
        .then(bowItem => res.json(bowItem));
});

//test post
router.post('/bowitempost', (req, res, next) => {
    const newBowItem = new BowItem(
        {
            // bowType: req.body.bowType,
            manufacturer: req.body.manufacturer,
            price: req.body.price,
            name: req.body.name
        }
    );
    newBowItem
        .save()
        .then(BowItem => res.send(res.json(BowItem)));
});

//test delete
router.delete('/bowitemdelete/:id', (req, res, next) => {
    BowItem
        .findById(req.params.id)
        .then(BowItem => BowItem.remove()
        .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;