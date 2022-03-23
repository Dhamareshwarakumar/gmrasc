const express = require('express');
const router = express.Router();
const https = require('https');
const { v4: uuidv4 } = require('uuid');

const PaytmChecksum = require('paytmchecksum');


router.post(
    '/',
    (req, res) => {

        var paytmParams = {};
        const orderId = uuidv4();

        paytmParams.body = {
            requestType: "Payment",
            mid: process.env.PAYTM_MERCHANT_ID,
            websiteName: "WEBSTAGING",
            orderId: orderId,
            callbackUrl: "http://localhost:3000/api/payment",
            txnAmount: {
                value: req.body.amount,
                currency: "INR",
            },
            userInfo: {
                custId: req.body.custId,
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
                    hostname: 'securegw-stage.paytm.in',
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

                        // Internal Request 

                        var paytmParams2 = {};
                        paytmParams2.body = {
                            "mid": process.env.PAYTM_MERCHANT_ID,
                            "orderId": orderId,
                            "returnToken": "true"
                        };
                        paytmParams2.head = {
                            "tokenType": "TXN_TOKEN",
                            "token": txnToken
                        };
                        var post_data2 = JSON.stringify(paytmParams2);
                        var options2 = {
                            hostname: 'securegw-stage.paytm.in',
                            port: 443,
                            path: `/theia/api/v2/fetchPaymentOptions?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${orderId}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': post_data2.length
                            }
                        };

                        var response2 = "";
                        var post_req2 = https.request(options2, function (post_res2) {
                            post_res2.on('data', function (chunk) {
                                response2 += chunk;
                            });

                            post_res2.on('end', function () {
                                console.log('Response: ', JSON.parse(response2));
                                res.send(JSON.parse(response2));
                            });
                        });
                        post_req2.write(post_data2);
                        post_req2.end();
                        // Internal Request end
                    });
                });

                post_req.write(post_data);
                post_req.end();
            });
    }
)

module.exports = router;