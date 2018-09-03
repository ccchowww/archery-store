const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema
const ManufacturerSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);