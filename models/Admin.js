const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const { v4: uuidv1 } = require('uuid');


const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 32,
        lowercase: true
    },
    encry_password: {
        type: String,
        required: true,
        minlength: 8
    },
    salt: String,
    role: {
        type: Number,
        default: 1,
        required: true
    }
}, { timestamps: true });


AdminSchema.methods = {
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


AdminSchema.virtual('password')
    .set(function (plainPassword) {
        this.salt = uuidv1();
        this.encry_password = this.securePassword(plainPassword);
    });


module.exports = mongoose.model('Admin', AdminSchema);