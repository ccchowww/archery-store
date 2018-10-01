const express = require('express');
const router = express.Router();

const Order = require('../../models/Order');

router.get('/', (req, res, next) => {
    Order
        .find()
        .populate('bowItem')
        .then(order => res.json(order));
})

router.get('/pin/:pin', (req, res, next) => {
    Order
        .find({pin: req.params.pin})
        .populate('bowItem')
        .then(order => res.json(order));
})


router.post('/post', (req, res, next) => {
    let NewOrder = new Order(
        {
            bowItem: req.body.bowitem_id,
            quantity: req.body.quantity,
            message: req.body.message,
            pin: req.body.pin
        }
    );
    NewOrder
        .save(function(err, savedOrder) {
            if (err) {return console.log(err);}
            savedOrder.populate('bowItem', function(err, theorder) {
                res.send(theorder);
            })
        })
    })

router.post('/update', (req, res, next) => {
    let UpdatedOrder = new Order(
        {
            bowItem: req.body.bowitem_id,
            quantity: req.body.quantity,
            message: req.body.message,
            pin: req.body.pin,
            _id: req.body._id
        }
    );

    Order
        .findByIdAndUpdate(req.body._id, UpdatedOrder, {new: true}, function(err, theorder) {
            if (err) { return next(err); }
            
            Order
                .findById(req.body._id)
                .populate('bowItem')
                .then(order => res.json(order));
        });
        
})


router.delete('/delete', (req, res, next) => {
    console.log(req.body);
    Order
        .findByIdAndRemove(req.body._id, {select: "_id"}, function(err, deletedorder) {
            res.send(deletedorder)
        });

        // .findById(req.body._id)
        // .then(order => order.remove())
        // .then(() => res.json({success: true}));
        
})

module.exports = router;