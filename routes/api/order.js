const express = require('express');
const router = express.Router();

const Order = require('../../models/Order');

router.get('/', (req, res, next) => {
    Order
        .find()
        .populate('bowItem')
        .then(order => res.json(order));
})

router.get('/:pin', (req, res, next) => {
    Order
        .find({'pin': req.params.pin})
        .populate('bowItem')
        .then(order => res.json(order));
});

router.post('/:pin/post', (req, res, next) => {
    let NewOrder = new Order(
        {
            bowItem: req.body.bowitem_id,
            quantity: req.body.quantity,
            message: req.body.message,
            pin: req.params.pin
        }
    );
    NewOrder
        .save()
        .then(order => res.send(res.json(order)));
})

router.post('/:pin/update', (req, res, next) => {
    let UpdatedOrder = new Order(
        {
            bowItem: req.body.bowitem_id,
            quantity: req.body.quantity,
            message: req.body.message,
            pin: req.params.pin,
            _id: req.body._id
        }
    );

    Order
        .findByIdAndUpdate(req.body._id, UpdatedOrder, {}, function(err, theorder) {
            if (err) { return next(err); }
            res.json({success: true});
        });
        
})


router.delete('/delete', (req, res, next) => {
    Order
        .findById(req.body.id)
        .then(order => order.remove())
        .then(() => res.json({success: true}));
})

module.exports = router;