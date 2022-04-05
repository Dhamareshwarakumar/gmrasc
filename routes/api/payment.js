const express = require('express');
const router = express.Router();
const https = require('https');
const { v4: uuidv4 } = require('uuid');

const PaytmChecksum = require('../../config/paytm_checksum');


// @route   POST api/payment/verify
// @desc    Verify payment Checksum
// @access  Public

router.post(
    '/verify',
    (req, res) => {
        console.log(req.body);
        const paytmParams = req.body;

        const checkSumStatus = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MERCHANT_KEY, paytmParams.CHECKSUMHASH);

        res.json({
            status: checkSumStatus,
            message: checkSumStatus ? 'Checksum Matched' : 'Checksum Mismatched',
            data: paytmParams
        });
    }
);


router.post(
    '/',
    (req, res) => {

        var paytmParams = {};
        const orderId = uuidv4();

        paytmParams.body = {
            requestType: "Payment",
            mid: process.env.PAYTM_MERCHANT_ID,
            websiteName: process.env.PAYTM_WEBSITE,
            orderId: orderId,
            callbackUrl: process.env.PAYTM_CALLBACK_URL,
            txnAmount: {
                value: req.body.amount,
                currency: "INR",
            },
            userInfo: {
                custId: req.body.jntu_number,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
            },
        };


        PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MERCHANT_KEY)
            .then(function (checksum) {

                paytmParams.head = {
                    "signature": checksum
                };

                var post_data = JSON.stringify(paytmParams);

                var options = {
                    hostname: 'securegw.paytm.in',
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${orderId}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        const txnToken = JSON.parse(response).body.txnToken;

                        res.json({
                            txnToken: txnToken,
                            orderId: orderId,
                            mid: process.env.PAYTM_MERCHANT_ID
                        });
                    });
                });

                post_req.write(post_data);
                post_req.end();
            });
    }
);





module.exports = router;