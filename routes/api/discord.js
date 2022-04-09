const express = require('express');
const router = express.Router();
const { Webhook, MessageBuilder } = require('discord-webhook-node');


// Import Validations
const { checkMessage } = require('../../validations/discord');



// @route   : POST /api/discord
// @desc    : Send Message to the Discord Channel
// @access  : Public
router.post(
    '/',
    checkMessage,
    (req, res) => {
        // Send Message to Discord using hooks
        const hook = new Webhook("https://discord.com/api/webhooks/961155979574120511/kU-4lZ5mjg7UBZIgkzgR6Jmjn2RyhDjKtBFLbCrmVVVWW62l-PG4_E1khcJ7NA1QmBQH");
        hook.setUsername('GMRASC Contact-Me Bot');
        const IMAGE_URL = 'https://gmritchapter.acm.org/img/logo/acm.png';
        hook.setAvatar(IMAGE_URL);

        // Custom Embeds
        const embed = new MessageBuilder()
            .setTitle('Message From GMRASC Contact Me')
            .setAuthor(req.body.name, null, null)
            .setColor('#00b0f4')
            .setDescription(req.body.query)
            .setFooter(req.body.email)
            .setTimestamp();
        hook.send(embed)
            .then(() => res.json({ success: true }))
            .catch(err => res.status(500).json({ err }));
    }
);




module.exports = router;