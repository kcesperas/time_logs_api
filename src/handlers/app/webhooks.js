const serverless = require('serverless-http');
const body_parser = require('body-parser');
const express = require('express');
const app = express();
app.use(body_parser.json({ strict: false }));
app.use(body_parser.urlencoded({ extended: true }));

// Middlewares
var verifyAppToken = require('../../middlewares/verifyAppToken');

// Helper declarations
const API_RESPONSE = require('../../helpers/api-response');
const QUERY_HELPER = require('../../helpers/query-helper');
const TEXT_HELPER = require('../../helpers/text');
const USER_REFERENCE_HELPER = require('../../helpers/user-reference');


// Model declarations
const ACCOUNT_MODEL = require("../../models/account");


// GET ONE RECORD
app.post('/app/:mbs_public_key/webhook/before_order_create', verifyAppToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
  
    try {

        let results = await ACCOUNT_MODEL.getOne(params);
        
        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Data successfully retrieved.',
            'data': results,
        });
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
    }
});


app.post('/app/:mbs_public_key/webhook/after_order_create', verifyAppToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    try {

        let results = await ACCOUNT_MODEL.getOne(params);
        
        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Data successfully retrieved.',
            'data': results,
        });
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
    }
});

app.post('/app/:mbs_public_key/webhook/order_updated', verifyAppToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
   try {

        let results = await ACCOUNT_MODEL.getOne(params);
        
        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Data successfully retrieved.',
            'data': results,
        });
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
    }
});

module.exports.handler = serverless(app);