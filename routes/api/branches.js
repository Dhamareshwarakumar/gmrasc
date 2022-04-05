const express = require('express');
const router = express.Router();
const passport = require('passport');


// import Models
const Branch = require('../../models/Branch');


// import Validations
const { checkAdmin } = require('../../validations/admin');
const { validateBranch } = require('../../validations/branches');


// @route :  GET api/branch
// @desc  :  Get all branches
// @access:  Public
router.get(
    '/',
    (req, res) => {
        Branch.find()
            .then(branches => {
                if (branches) {
                    return res.json(branches);
                } else {
                    return res.status(404).json({ err: 'No branches found' });
                }
            })
            .catch(err => res.status(500).json({ err: 'INTERNAL SERVER ERROR' }));
    }
);


// @route :  POST api/branch
// @desc  :  Create a branch
// @access:  Admin
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    validateBranch,
    (req, res) => {
        Branch.findOne({ name: req.body.name })
            .then(branch => {
                if (branch) {
                    return res.status(400).json({ branch: 'Branch already exists' });
                } else {
                    const newBranch = new Branch({
                        name: req.body.name
                    });

                    newBranch.save()
                        .then(branch => res.json(branch))
                        .catch(err => res.status(500).json({ err: 'INTERNAL SERVER ERROR' }));
                }
            })
    }
);


// @route :  Put api/branch/:id
// @desc  :  Update a branch
// @access:  Admin
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    validateBranch,
    (req, res) => {
        Branch.findById(req.params.id)
            .then(branch => {
                if (branch) {
                    branch.name = req.body.name;
                    branch.save()
                        .then(branch => res.json(branch))
                        .catch(err => res.status(500).json({ err: 'INTERNAL SERVER ERROR' }));
                } else {
                    return res.status(404).json({ err: 'Branch not found' });
                }
            })
            .catch(err => res.status(500).json({ err: 'INTERNAL SERVER ERROR' }));
    }
);


// @route :  Delete api/branch/:id
// @desc  :  Delete a branch
// @access:  Admin
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    (req, res) => {
        Branch.findById(req.params.id)
            .then(branch => {
                if (branch) {
                    branch.remove()
                        .then(() => res.json({ msg: 'Branch Deleted Successfully' }))
                        .catch(err => res.status(500).json({ err: 'INTERNAL SERVER ERROR' }));
                } else {
                    return res.status(404).json({ err: 'Branch not found' });
                }
            })
            .catch(err => res.status(500).json({ err: 'INTERNAL SERVER ERROR' }));
    }
);



module.exports = router;