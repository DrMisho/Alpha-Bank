const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ESPSchema = new Schema({
    Governorate: String,
    MAC: {
        type: String,
        unique: true },
    Status: {
        type: Number,
        default: 0
    } ,
    Log: {
        type: Date,
        default: Date.now()
    },
    LOC: String
})


const ESP = mongoose.model('ESP',ESPSchema);
module.exports = ESP;