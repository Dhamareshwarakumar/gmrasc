const express = require('express');
const router = express.Router();
const passport = require('passport');


// Import Models
const Member = require('../../models/Member');
const { checkAdmin } = require('../../validations/admin');



// @route   GET api/members
// @desc    Get all members
// @access  Admin
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    (req, res) => {
        Member.find()
            .then(members => {
                if (members) {
                    res.json(members);
                } else {
                    res.json({ msg: 'No members found' });
                }
            })
            .catch(err => res.json({ err: `INTERNAL SERVER ERROR` }));
    }
);


// @route   GET api/members/:jntu_umber
// @desc    Get a member by JNTU Number
// @access  Admin | self Member
router.get(
    '/:jntu_umber',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    // TODO: check Admin or self Member
    (req, res) => {
        res.send(`Get Member by JNTU Number`);
    }
);


// @route   POST api/members
// @desc    Create a new member
// @access  Admin
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    (req, res) => {
        res.send(`Create a new Member`);
    }
);


// @route   PUT api/members/:jntu_umber
// @desc    Update a member
// @access  Admin | self Member
router.put(
    '/:jntu_umber',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    // TODO: check Admin or self Member
    (req, res) => {
        res.send(`Update a Member`);
    }
);


// @route   DELETE api/members/:jntu_umber
// @desc    Delete a member
// @access  Admin
router.delete(
    '/:jntu_umber',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    (req, res) => {
        res.send(`Delete a Member`);
    }
);




// @route   GET api/members/checkMember:jntu
// @desc    Check if member exists
// @access  Public
router.get(
    '/checkMember/:jntu',
    (req, res) => {
        Member.findOne({ jntu_number: req.params.jntu.toUpperCase() })
            .then(member => {
                if (member) {
                    res.status(200).json({ msg: "Member Verified", acm_id: member.acm_id });
                } else {
                    res.status(404).json({ jntu_number: 'Member not found' });
                }
            })
            .catch(err => {
                res.status(500).json({ err: 'INTERNAL SERVER ERROR' });
            });
    }
);


module.exports = router;