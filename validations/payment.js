const { isEmpty } = require('./my_validator');
const { NAME_REGEX, PH_NO_REGEX, JNTU_REGEX } = require('./regex');
const validator = require('validator');

const paymentValidation = (req, res, next) => {
    const errors = {};

    // Validating Name
    if (isEmpty(req.body.name)) {
        errors.name = 'Name field is required';
    } else if (!NAME_REGEX.test(req.body.name)) {
        errors.name = 'Name must be a valid name';
    }


    // Validating Phone
    if (isEmpty(req.body.phone)) {
        errors.phone = 'Phone field is required';
    } else if (!PH_NO_REGEX.test(req.body.phone)) {
        errors.phone = 'Phone must be a valid phone number';
    }

    // Validating Email
    if (isEmpty(req.body.email)) {
        errors.email = 'Email field is required';
    } else if (!validator.isEmail(req.body.email)) {
        errors.email = 'Email must be a valid email';
    }

    // Validating JNTU Number
    if (isEmpty(req.body.jntu_number)) {
        errors.jntu_number = 'JNTU Number field is required';
    } else if (!JNTU_REGEX.test(req.body.jntu_number)) {
        errors.jntu_number = 'JNTU Number must be a valid JNTU Number';
    }

    // Validating Years
    if (isEmpty(req.body.years)) {
        errors.years = 'Years field is required';
    } else if (req.body.years < 1 || req.body.years > 3) {
        errors.years = 'Years must be between 1 and 3';
    }

    // Validating Amount
    if (isEmpty(req.body.amount)) {
        errors.amount = 'Amount field is required';
    } else if (req.body.amount < 1) {
        errors.amount = 'Enter Valid Amount';
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
}


module.exports = {
    paymentValidation
}