const validator = require('validator');
const { isEmpty } = require('./my_validator');


const validateGallery = (req, res, next) => {
    let errors = {};

    // Validating event_name
    if (isEmpty(req.body.event_name)) {
        errors.event_name = "Event Name Should not be Empty";
    } else if (!validator.isLength(req.body.event_name, { min: 3, max: 30 })) {
        errors.event_name = "Event Name Should be between 3 and 30 characters long";
    }

    // Validating date
    if (isEmpty(req.body.date)) {
        errors.date = `Start time is required`;
    } else if (validator.isDate(new Date(req.body.date))) {
        req.body.date = new Date(req.body.date);
    } else {
        errors.date = `Start time must be a valid date`;
    }

    // Validating url
    if (isEmpty(req.body.url)) {
        errors.url = "URL Should not be Empty";
    } else if (!validator.isURL(req.body.url)) {
        errors.url = "URL Should be a valid URL";
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
};


module.exports = validateGallery;