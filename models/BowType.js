const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema
const BowTypeSchema = new Schema({
    bowType: {type: String, required: true}
});

module.exports = mongoose.model('BowType', BowTypeSchema);