const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const paymentSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    jntu_number: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    payment_status: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: true,
        unique: true,
        default: 'null'
    },
    payment_mode: {
        type: String,
        required: true,
        default: 'null'
    },
    payment_date: {
        type: String,
        required: true,
        default: 'null'
    }
}, { timestamps: true });


module.exports = mongoose.model("payment", paymentSchema);