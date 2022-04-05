const express = require('express');
const router = express.Router();
const passport = require('passport');


// import models
const Gallery = require('../../models/Gallery');

// import Validations
const { checkAdmin } = require('../../validations/admin');
const validateGallery = require('../../validations/gallery');


// @route   GET api/gallery
// @desc    Get all gallery
// @access  Public
router.get('/', (req, res) => {
    Gallery.find()
        .sort({ date: -1 })
        .then(gallery => res.json(gallery))
        .catch(err => res.status(500).json({ err: 'No gallery found' }));
});


// @route   POST api/gallery
// @desc    Add Image to Gallery
// @access  Admin/Super Admin
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkAdmin,
    validateGallery,
    (req, res) => {
        const newGallery = new Gallery({
            event_name: req.body.event_name,
            date: req.body.date,
            url: req.body.url
        })

        newGallery.save()
            .then(gallery => res.json(gallery))
            .catch(err => res.status(500).json({ err: 'Error adding image to gallery' }));
    });


// @route   PUT api/gallery/:id
// @desc    Update Image in Gallery
// @access  Admin/Super Admin
router.put('/:id', (req, res) => {
    Gallery.findById(req.params.id)
        .then(gallery => {
            gallery.event_name = req.body.event_name;
            gallery.date = req.body.date;
            gallery.url = req.body.url;

            gallery.save()
                .then(gallery => res.json(gallery))
                .catch(err => res.status(500).json({ err: 'Error updating image in gallery' }));
        })
        .catch(err => res.status(500).json({ err: 'Error finding image in gallery' }));
});


// @route   DELETE api/gallery/:id
// @desc    Delete Image in Gallery
// @access  Admin/Super Admin
router.delete('/:id', (req, res) => {
    Gallery.findById(req.params.id)
        .then(gallery => gallery.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(500).json({ err: 'Error deleting image in gallery' }));
});



module.exports = router;