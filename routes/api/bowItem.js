const express = require('express');
const router = express.Router();

const BowItem = require('../../models/BowItem');
const Order = require('../../models/Order');

//GET /api/bowitem
//get all bowitems
router.get('/all', (req, res, next) => {
    BowItem
        .find()
        .then(bowItem => res.json(bowItem));
});

//GET /api/bowitem/search/:query
//get all bowitems only name, manufacturer, bowType
router.get('/search', (req, res, next) => {
    BowItem
        .find({}, 'name manufacturer bowType')
        .then(bowItem => res.json(bowItem));
})

//GET /api/bowitem/archerystyle/:name
//get bowitems by archery style 
router.get('/archerystyle/:name', (req, res, next) => {
    BowItem
        .find({'archeryStyle': req.params.name})
        .then(bowItem => res.json(bowItem));
});

//GET /api/bowitem/manufacturer/:name
//get bowitems by manufacturer
router.get('/manufacturer/:name', (req, res, next) => {
    BowItem
        .find({'manufacturer': req.params.name})
        .then(bowItem => res.json(bowItem));
})

//GET /api/bowitem/orders
//get all orders
// router.get('/orders', (req, res, next) => {
//     Order
//         .find()
//         .populate('bowItem')
//         .then(orders => res.json(orders));
// })

//test post
router.post('/bowitempost', (req, res, next) => {
    let newBowItem = new BowItem(
        {
            name: req.body.name,
            price: req.body.price,
            manufacturer: req.body.manufacturer,
            archeryStyle: req.body.archeryStyle,
            bowType: req.body.bowType,
            specs: req.body.specs
        }
    );
    newBowItem
        .save()
        .then(BowItem => res.send(res.json(BowItem)));
});

// router.post('/orderpost', (req, res, next) => {
//     let newOrder = new Order(
//         {
//             bowItem: req.body.bowItem_id,
//             quantity: req.body.quantity,
//             message: req.body.message,
//             isPublic: req.body.isPublic
//         }
//     );
//     newOrder
//         .save()
//         .then(order => res.send(res.json(order)));
// })

//test delete
router.delete('/bowitemdelete/:id', (req, res, next) => {
    BowItem
        .findById(req.params.id)
        .then(BowItem => BowItem.remove()
        .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;