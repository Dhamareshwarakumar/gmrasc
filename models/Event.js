const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        trim: true
    },
    venue: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    poster: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    resource_persons: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 2
            },
            designation: {
                type: String,
                required: true,
                trim: true,
                minlength: 2
            },
            avatar: String
        }
    ],
    resources: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            },
            url: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            }
        }
    ],
    results: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            },
            position: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
            designation: {
                type: String,
                required: true,
                trim: true,
                minlength: 2
            },
            college: {
                type: String,
                required: true,
                trim: true,
                minlength: 2
            },
            avatar: String
        }
    ],
    organisers: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 2
            },
            designation: {
                type: String,
                required: true,
                trim: true,
                minlength: 2
            },
            contact: {
                type: String,
                required: true,
                trim: true,
                minlength: 10
            },
            avatar: {
                type: String
            }
        }
    ],
    reg_fee: {
        acm_member: {
            type: Number,
            required: true
        },
        non_acm_member: {
            type: Number,
            required: true
        }
    },
    reg_link: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
}, { timestamps: true });


module.exports = mongoose.model('Event', EventSchema);