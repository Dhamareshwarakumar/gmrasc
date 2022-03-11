const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// TODO: Delete Current Loggedin Admin

// Import Validations
const { validateAdminLogin, checkSuperAdmin, checkAdmin, checkSelf } = require('../../validations/admin');

// Import Models
const Admin = require('../../models/Admin');


// @route  :: GET api/admin/
// @desc   :: Get List of Admins
// @access :: Super Admin
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkSuperAdmin,
    (req, res) => {
        Admin.find()
            .then(admins => {
                if (admins) {
                    res.json(admins.map(admin => ({
                        username: admin.username,
                        id: admin._id,
                        role: admin.role
                    })));
                } else {
                    res.status(400).json({ err: "No Admin Found" });
                }
            })
            .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
    }
);


// @route  :: POST api/admin/
// @desc   :: Admin Login
// @access :: Public
router.post(
    '/',
    validateAdminLogin,
    (req, res) => {
        Admin.findOne({ username: req.body.username })
            .then(admin => {
                if (admin) {
                    // Admin Found, Check Password
                    if (admin.authenticate(req.body.password)) {
                        // Password Matched, Send JWT Token
                        const payload = {
                            role: admin.role,
                            username: admin.username,
                            id: admin._id
                        };

                        jwt.sign(
                            payload,
                            process.env.JWT_KEY,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                return res.json({
                                    msg: "success",
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    } else {
                        // Password Not Matched
                        res.status(400).json({ password: 'Invalid Password' });
                    }
                } else {
                    // Admin not Found
                    return res.status(400).json({ username: 'Admin not found' });
                }
            })
            .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
    }
);


// @route   :: PUT api/admin/:username
// @desc    :: Update Password
// @access  :: Self Admin
router.put(
    '/',
    validateAdminLogin,
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    checkSelf,
    (req, res) => {
        Admin.findOne({ username: req.user.username })
            .then(admin => {
                admin.password = req.body.password;

                admin.save()
                    .then(admin => {
                        if (admin) res.json({ msg: "Password Updated" })
                        else res.status(400).json({ err: "Password Not Updated" });
                    })
                    .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
            })
            .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
    }
)


// @route  :: DELETE api/admin/:username
// @desc   :: Delete Admin
// @access :: Super Admin
router.delete(
    '/:username',
    passport.authenticate('jwt', { session: false }),
    checkSuperAdmin,
    (req, res) => {
        Admin.findOneAndDelete({ username: req.params.username })
            .then(admin => {
                if (admin) {
                    if (admin.role === '0') {
                        res.status(400).json({ err: "Cannot Delete Super Admin" });
                    }
                    return res.json({ msg: `${admin.username} Deleted` });
                } else {
                    return res.status(400).json({ err: "Admin not found" });
                }
            })
            .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
    }
);


// @route :: POST api/admin/createAdmin
// @desc  :: Create Admin
// @access :: Super Admin
router.post(
    '/createAdmin',
    passport.authenticate('jwt', { session: false }),
    checkSuperAdmin,
    validateAdminLogin,
    (req, res) => {

        Admin.findOne({ username: req.body.username })
            .then(admin => {
                if (admin) {
                    // Username Already Exists
                    return res.status(400).json({ username: 'Admin already exists' });
                } else {
                    // Admin Not Found, Create New Admin
                    const newAdmin = new Admin({
                        username: req.body.username,
                        password: req.body.password
                    });

                    newAdmin.save()
                        .then(admin => {
                            if (admin) {
                                return res.json({ msg: "Admin Created Successfully" });
                            } else {
                                return res.status(400).json({ msg: "Admin Creation Failed" });
                            }
                        })
                        .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
                }
            })
            .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
    }
);



module.exports = router;