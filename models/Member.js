const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const memberSchema = new Schema({
    acm_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    enrolled_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    valid_upto: {
        type: Date,
        required: true
    },
    no_of_years: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    jntu_number: {
        type: String,
        required: true,
        uppercase: true
    },
    department: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    sig: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model('Member', memberSchema);