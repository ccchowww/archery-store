const express = require('express');
const router = express.Router();

//Item model
const Test = require('../../models/Test');

// @route   GET /api/testes
// @desc    test homepage
// @access  Public
router.get('/', (req, res, next) => {
    Test
        .find()
        .then(test => res.json(test));
});

//test post
router.get('/testpost/:name', (req, res, next) => {
    const testpost = new Test(
        {
            name: req.params.name
        }
    );
    testpost.save()
            .then(testpost => res.send(res.json(testpost)));
});

//test delete
router.delete('/:id', (req, res, next) => {
    Test
        .findById(req.params.id)
        .then(test => test.remove()
        .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;