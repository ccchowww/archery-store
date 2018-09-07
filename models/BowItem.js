const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema
const BowItemSchema = new Schema({
    // bowType: {type: Schema.Types.ObjectId, ref: 'BowType', required: true},
    manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true},
    // archeryStyle: {type: Schema.Types.ObjectId, ref: 'ArcheryStyle', required: true},
    price: {type: Number, required: true},
    name: {type: String, required: true}
});

module.exports = mongoose.model('BowItem', BowItemSchema);