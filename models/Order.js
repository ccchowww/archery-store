const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema
const OrderSchema = new Schema(
    {
        bowItem: {type: Schema.Types.ObjectId, ref: 'BowItem'},
        quantity: {type: Number, max: 100},
        message: {type: String, max: 140},
        isPublic: {type: Boolean, required: true}
    }
);

module.exports = mongoose.model('Order', OrderSchema);