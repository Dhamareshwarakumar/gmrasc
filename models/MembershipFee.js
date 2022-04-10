const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const membershipFeeSchema = new Schema({
    academic_year: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    one_year: {
        type: Number,
        required: true
    },
    two_years: {
        type: Number,
        required: true
    },
    three_years: {
        type: Number,
        required: true
    },
    current_academic_year: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });


module.exports = mongoose.model('MembershipFee', membershipFeeSchema);