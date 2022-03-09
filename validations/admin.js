const validator = require('validator');
const { isEmpty } = require('./my_validator');


const validateAdminLogin = (req, res, next) => {
    let errors = {};

    // Validating Username
    req.body.username = req.body.username.toLowerCase();
    if (isEmpty(req.body.username)) {
        errors.username = "Username Should not be Empty";
    } else if (!validator.isEmail(req.body.username)) {
        errors.username = "Username Should be a Valid Email";
    }

    // Validating Password
    if (isEmpty(req.body.password)) {
        errors.password = "Password Should not be Empty";
    } else if (!validator.isLength(req.body.password, { min: 8 })) {
        errors.password = "Password Should be atleast 8 characters long";
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
}

const checkSuperAdmin = (req, res, next) => {
    if (req.user.role !== 0) return res.status(401).json({ msg: "Unauthorized" });
    next();
}


const checkAdmin = (req, res, next) => {
    if (req.user.role !== 0 && req.user.role !== 1) return res.status(401).json({ msg: "Unauthorized" });

    next();
}


const checkSelf = (req, res, next) => {
    if (req.user.username !== req.body.username) return res.status(401).json({ msg: "Unauthorized" });

    next();
}



module.exports = {
    validateAdminLogin,
    checkSuperAdmin,
    checkAdmin,
    checkSelf
}