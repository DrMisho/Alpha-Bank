const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
    adminname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1
    }
});

adminSchema.plugin(uniqueValidator);

adminSchema.pre('save', function(next) {
    const admin = this;
    bcrypt.hash(admin.password, 10, (error, hash) => {
        admin.password = hash;
        next();
    })
}); 

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
