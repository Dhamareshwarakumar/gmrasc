const express = require('express');
const router = express.Router();
const passport = require('passport');


// Import Models
const MembershipFee = require('../../models/MembershipFee');


// Import Validations
const { checkAdmin } = require('../../validations/admin');
const { validateMembershipFee } = require('../../validations/membershipFee');


// @route   :: GET api/membershipFee
// @desc    :: Get all membership fees Info
// @access  :: Admin
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    (req, res) => {
        MembershipFee.find({}, null, { sort: { updatedAt: -1 } })
            .then(membershipFees => {
                if (membershipFees) {
                    res.json(membershipFees);
                } else {
                    res.json({ msg: 'No membership fees found' });
                }
            })
            .catch(err => res.json({ err: `INTERNAL SERVER ERROR` }));
    }
);


// @route   :: GET api/membershipFee/:academic_year
// @desc    :: Get membership fee Info by academic year
// @access  :: Admin
router.get(
    '/:academic_year',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    (req, res) => {
        MembershipFee.findOne({ academic_year: req.params.academic_year })
            .then(membershipFee => {
                if (membershipFee) {
                    res.json(membershipFee);
                } else {
                    res.json({ msg: 'No membership fee found' });
                }
            })
            .catch(err => res.json({ err: `INTERNAL SERVER ERROR` }));
    }
);


// @route   :: POST api/membershipFee
// @desc    :: Create a new membership fee
// @access  :: Admin
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    validateMembershipFee,
    (req, res) => {
        MembershipFee.findOne({ academic_year: req.body.academic_year })
            .then(membershipFee => {
                if (membershipFee) {
                    res.json({ msg: 'Membership fee already exists' });
                } else {
                    const newMembershipFee = new MembershipFee({
                        academic_year: req.body.academic_year,
                        one_year: req.body.one_year,
                        two_years: req.body.two_years,
                        three_years: req.body.three_years,
                        current_academic_year: req.body.current_academic_year
                    });

                    newMembershipFee.save()
                        .then(membershipFee => res.json(membershipFee))
                        .catch(err => res.json({ err: `INTERNAL SERVER ERROR` }));
                }
            })
            .catch(err => res.json({ err: `INTERNAL SERVER ERROR` }));
    }
);


// @route   :: PUT api/membershipFee/:id
// @desc    :: Update a membership fee
// @access  :: Admin
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    validateMembershipFee,
    (req, res) => {
        MembershipFee.findById(req.params.id)
            .then(membershipFee => {
                if (membershipFee) {
                    membershipFee.academic_year = req.body.academic_year;
                    membershipFee.one_year = req.body.one_year;
                    membershipFee.two_years = req.body.two_years;
                    membershipFee.three_years = req.body.three_years;
                    membershipFee.current_academic_year = req.body.current_academic_year;

                    membershipFee.save()
                        .then(membershipFee => res.json({
                            msg: 'Membership fee updated successfully',
                            membershipFee
                        }))
                        .catch(err => res.json({ err: err + `INTERNAL SERVER ERROR` }));
                } else {
                    res.json({ msg: 'No membership fee found' });
                }
            })
            .catch(err => res.json({ err: `INTERNAL SERVER ERROR` }));
    }
);


// @route   :: DELETE api/membershipFee/:id
// @desc    :: Delete a membership fee
// @access  :: Admin
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    (req, res) => {
        MembershipFee.findById(req.params.id)
            .then(membershipFee => {
                if (membershipFee) {
                    membershipFee.remove()
                        .then(() => res.json({ msg: 'Membership fee deleted successfully' }))
                        .catch(err => res.json({ err: `INTERNAL SERVER ERROR` }));
                } else {
                    res.json({ msg: 'No membership fee found' });
                }
            })
            .catch(err => res.json({ err: `INTERNAL SERVER ERROR` }));
    }
);


module.exports = router;