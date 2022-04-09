const validator = require('validator');
const { isEmpty } = require('./my_validator');


const checkMessage = (req, res, next) => {
    let errors = {};

    if (isEmpty(req.body.name) || req.body.name.length < 3) {
        errors.name = 'Name must be at least 3 characters';
    }

    if (isEmpty(req.body.email)) {
        errors.email = 'Email is required';
    } else if (!validator.isEmail(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    if (isEmpty(req.body.query)) {
        errors.query = 'Query is required';
    } else if (!validator.isLength(req.body.query, { min: 10 })) {
        errors.query = 'Message must be at least 10 characters';
    }

    if (Object.keys(errors).length === 0) {
        return next();
    }
    return res.json(errors)
}


module.exports = {
    checkMessage
}