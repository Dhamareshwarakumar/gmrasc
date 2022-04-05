const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const branchSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    }
}, { timestamps: true });


module.exports = mongoose.model('Branch', branchSchema);