const express = require('express');
const router = express.Router();


// Import Models
const Member = require('../../models/Member');


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