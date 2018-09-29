const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema
const OrderSchema = new Schema(
    {
        bowItem: {type: Schema.Types.ObjectId, ref: 'BowItem'},
        quantity: {type: Number, min: 1, max: 100},
        message: {type: String, max: 140},
        pin: {type: Number, min: 1, max: 9999, unique: true, required: true}
    }
);

OrderSchema
    .virtual('url')
    .get(function() {
        return (this._id);
})


module.exports = mongoose.model('Order', OrderSchema);