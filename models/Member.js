const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const { v4: uuidv1 } = require('uuid');


const memberSchema = new Schema({
    acm_id: {
        type: String,
        default: 'temp_' + Math.floor(Math.random() * 1000000),
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 128
    },
    type: {
        type: String,
        required: true,
        trim: true,
        default: 'local'
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
        required: true,
        min: 1,
        max: 4
    },
    amount: {
        type: Number,
        required: true
    },
    jntu_number: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    sig: {
        type: String
    },
    salt: String,
    encry_password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: Number,
        default: 2,
        required: true
    }
}, { timestamps: true });


memberSchema.methods = {
    securePassword: function (plainPassword) {
        if (!plainPassword) return '';
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    authenticate: function (plainPassword) {
        return crypto.timingSafeEqual(Buffer.from(this.encry_password), Buffer.from(this.securePassword(plainPassword)));
    }
}


memberSchema.virtual('password')
    .set(function (plainPassword) {
        this.salt = uuidv1();
        this.encry_password = this.securePassword(plainPassword);
    });


module.exports = mongoose.model('Member', memberSchema);