const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema
const BowItemSchema = new Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        manufacturer: {type: String, required: true},
        archeryStyle: {type: String, required: true},
        bowType: {type: String, required: true},
        specs: {type: Map, of: String}
    }
);


module.exports = mongoose.model('BowItem', BowItemSchema);