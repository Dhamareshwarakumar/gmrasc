const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const https = require('https');


const paytmChecksum = require('../../config/paytm_checksum');
// const paytmChecksum = require("paytmchecksum");


router.get('/', (req, res) => {

    /* initialize JSON String */
    body = {
        requestType: 'Payment',
        mid: 'pXFkWF09846720611407',
        orderId: '12356485A',
        callbackUrl: 'http://localhost:3333/api/payment',
        websiteName: 'WEBSTAGING',
        txnAmount: {
            value: '1.00',
            currency: 'INR'
        },
        userInfo: {
            custId: 'CUST_001',
            mobile: '9866233109'
        }
    }


    paytmChecksum.generateSignature(JSON.stringify(body), "GEyLWBcbVw_E1RIE")
        .then(function (result) {
            console.log("generateSignature Returns: " + result);
        }).catch(function (error) {
            console.log(error);
        });
})


// router.post(
//     '/',
//     (req, res) => {
//         params = {
//             "requestType": "Payment",
//             "mid": process.env.PAYTM_MERCHANT_ID,
//             "orderId": uuidv4(),
//             "callbackUrl": "http://localhost:3333/api/payment",
//             "websiteName": "WEBSTAGING",
//             "txnAmount": {
//                 "value": req.body.amount,
//                 "currency": "INR",
//             },
//             "userInfo": {
//                 "custId": req.body.customer_id,
//                 "mobile": req.body.contact,
//                 "email": req.body.email,
//                 "firstName": req.body.name
//             },
//         };

//         paytmChecksum.generateSignature(JSON.stringify(params), process.env.PAYTM_MERCHANT_KEY)
//             .then(function (checksum) {
//                 fetch(`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${params.orderId}`, {
//                     method: 'POST',
//                     body: JSON.stringify(params),
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'signature': checksum,
//                         'requestTimeStamp': Date.now(),
//                         'channelId': 'WEB'
//                     },
//                 })
//                     .then(res => res.json())
//                     .then(res => {
//                         res.json(res);
//                     })
//                     .catch(err => {
//                         console.log(err);
//                     });
//             });
//     }
// )







// router.post(
//     '/',
//     (req, res) => {
//         var paytmParams = {};

//         paytmParams.body = {
//             "requestType": "Payment",
//             "mid": process.env.PAYTM_MERCHANT_ID,
//             "orderId": uuidv4(),
//             "callbackUrl": "http://localhost:3333/api/payment",
//             "websiteName": "WEBSTAGING",
//             "txnAmount": {
//                 "value": req.body.amount,
//                 "currency": "INR",
//             },
//             "userInfo": {
//                 "custId": req.body.customer_id,
//                 "mobile": req.body.contact,
//                 "email": req.body.email,
//                 "firstName": req.body.name
//             },
//         };

//         paytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MERCHANT_KEY)
//             .then(function (checksum) {
//                 paytmParams.head = {
//                     'Content-Type': 'application/json',
//                     "signature": checksum,
//                     "requestTimeStamp": Date.now(),
//                     "channelId": "WEB"
//                 };

//                 var post_data = JSON.stringify(paytmParams);

//                 var options = {

//                     /* for Staging */
//                     hostname: 'securegw-stage.paytm.in',

//                     /* for Production */
//                     // hostname: 'securegw.paytm.in',

//                     port: 443,
//                     path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${paytmParams.body.orderId}`,
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         "signature": checksum,
//                         "requestTimeStamp": Date.now(),
//                         "channelId": "WEB"
//                     }
//                 };

//                 var response = "";
//                 var post_req = https.request(options, function (post_res) {
//                     post_res.on('data', function (chunk) {
//                         response += chunk;
//                     });

//                     post_res.on('end', function () {
//                         console.log(JSON.parse(response));
//                         res.json(response);
//                     });
//                 });

//                 post_req.write(post_data);
//                 post_req.end();
//             });
//     }
// );



module.exports = router;