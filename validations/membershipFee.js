const { isEmpty } = require('./my_validator');

const academicYearRegex = /^[0-9]{4} ?- ?[0-9]{4}$/;

const validateMembershipFee = (req, res, next) => {
    const errors = {};

    // Validating Academic Year
    if (isEmpty(req.body.academic_year)) {
        errors.academic_year = 'Academic Year is required';
    } else if (!academicYearRegex.test(req.body.academic_year)) {
        errors.academic_year = 'Expected Format: YYYY - YYYY';
    } else {
        // remove all spaces
        req.body.academic_year = req.body.academic_year.replace(/\s/g, '');
    }

    // Validating Amount (one Year)
    if (isEmpty(req.body.one_year)) {
        errors.one_year = 'Amount (one year) is required';
    } else if (isNaN(req.body.one_year)) {
        errors.one_year = 'Amount (one year) must be a number';
    } else if (req.body.one_year < 0) {
        errors.one_year = 'Amount (one year) must be a positive number';
    }

    // Validating Amount (two Year)
    if (isEmpty(req.body.two_years)) {
        errors.two_years = 'Amount (two years) is required';
    } else if (isNaN(req.body.two_years)) {
        errors.two_years = 'Amount (two years) must be a number';
    } else if (req.body.two_years < 0) {
        errors.two_years = 'Amount (two years) must be a positive number';
    }

    // Validating Amount (three Year)
    if (isEmpty(req.body.three_years)) {
        errors.three_years = 'Amount (three years) is required';
    } else if (isNaN(req.body.three_years)) {
        errors.three_years = 'Amount (three years) must be a number';
    } else if (req.body.three_years < 0) {
        errors.three_years = 'Amount (three years) must be a positive number';
    }

    // Validating Current Academic Year
    if (isEmpty(req.body.current_academic_year)) {
        errors.current_academic_year = 'Current Academic Year is required';
    } else if (!academicYearRegex.test(req.body.current_academic_year)) {
        errors.current_academic_year = 'Expected Format: YYYY - YYYY';
    } else {
        // remove all spaces
        req.body.current_academic_year = req.body.current_academic_year.replace(/\s/g, '');
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
};


module.exports = {
    validateMembershipFee
};