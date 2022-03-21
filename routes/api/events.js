const express = require('express');
const router = express.Router();
const passport = require('passport');


// Load Models
const Event = require('../../models/Event');


// Load Validations
const { checkAdmin } = require('../../validations/admin');
const { validateNewEvent } = require('../../validations/event');


// @route  :: GET api/events/
// @desc   :: Get list of all events
// @access :: Public
router.get(
    '/',
    (req, res) => {
        Event.find()
            .then(events => {
                if (events) {
                    return res.json(events);
                } else {
                    return res.status(404).json({ err: "No events found" });
                }
            })
            .catch(err => res.status(500).json({ err: "Internal Server Error" }));
    }
);


// @route  :: GET api/events/:id
// @desc   :: Get Particular Event
// @access :: Public
router.get(
    '/:id',
    (req, res) => {
        Event.findById(req.params.id)
            .then(event => {
                if (event) {
                    return res.json(event);
                } else {
                    return res.status(404).json({ err: "No event found" });
                }
            })
            .catch(err => res.status(500).json({ err: "Event not Found" }));
    }
)



// @route  :: POST api/events/
// @desc   :: Create a new event
// @access :: Admin
// TODO: Add seperate functions to add resources, resource_persons & results
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    validateNewEvent,
    (req, res) => {
        Event.findOne({ name: req.body.name })
            .then(event => {
                if (event) {
                    // Event Already Exists
                    return res.status(400).json({ name: 'Event Already Exists' });
                } else {
                    // Event not found, create new one
                    const newEvent = new Event({
                        name: req.body.name,
                        venue: req.body.venue,
                        start_time: req.body.start_time,
                        end_time: req.body.end_time,
                        type: req.body.type,
                        category: req.body.category,
                        poster: req.body.poster,
                        description: req.body.description,
                        organisers: req.body.organisers,
                        reg_fee: req.body.reg_fee,
                        reg_link: req.body.reg_link
                    });
                    req.body.resource_persons && (newEvent.resource_persons = req.body.resource_persons);
                    req.body.resources && (newEvent.resources = req.body.resources);
                    req.body.results && (newEvent.results = req.body.results);

                    newEvent.save()
                        .then(event => res.json({ msg: "Event Created Successfully", event }))
                        .catch(err => res.status(500).json({ err: "Internal Server Error" }));
                }

            })
            .catch(err => res.status(500).json({ err: "Internal Server Error" }));
    }
)



// @route  :: PUT api/events/:id
// @desc   :: Update an event
// @access :: Admin
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    // TODO: Add Validation
    (req, res) => {
        Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(event => {
                if (event) {
                    return res.json({ msg: `Update Success`, event });
                } else {
                    return res.status(404).json({ err: "No event found" });
                }
            })
            .catch(err => res.status(500).json({ err: "Internal Server Error" }));
    }
);



// @route  :: DELETE api/events/:id
// @desc   :: Delete an event
// @access :: Admin
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    (req, res) => {
        Event.findById(req.params.id)
            .then(event => {
                if (event) {
                    event.remove()
                        .then(() => res.json({ msg: "Event Removed Successfully" }))
                        .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
                } else {
                    return res.status(404).json({ err: "No event found" });
                }
            })
            .catch(err => res.status(500).json({ err: "INTERNAL SERVER ERROR" }));
    }
);



module.exports = router;