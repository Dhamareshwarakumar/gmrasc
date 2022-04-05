const { isEmpty } = require('./my_validator');
const { NAME_REGEX } = require('./regex');



const validateBranch = (req, res, next) => {
    const errors = {};

    if (isEmpty(req.body.name)) {
        errors.name = `Branch name is required`;
    } else if (!NAME_REGEX.test(req.body.name)) {
        errors.name = `Branch name must be alphanumeric`;
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateBranch
}