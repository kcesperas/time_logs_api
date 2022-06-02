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

// Model declarations
const MERCHANT_GROUP_MODEL = require("../../models/merchant-group");
const ACCOUNT_OMS_MODEL = require("../../models/account-oms");

// Validator declarations
const MERCHANT_GROUP_VALIDATOR = require("../../validators/merchant-group-validator");

// Lib declarations
const moment = require('moment');

// GET ONE RECORD
app.get('/app/:oms_public_key/merchant-groups/:id', verifyAppToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.id = parseInt(req.params.id || 0);

    console.log('oms_public_key', req.params.oms_public_key)

    // Find soms_acccount
    params.conditions = {
        "oms_public_key": ( req.params.oms_public_key || null )
    }
    let accountOms = null;

    try {
        accountOms = await ACCOUNT_OMS_MODEL.getOne(params);
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }


    // Now get records based on account_oms_id.
    try {
        params.conditions = {
            "account_oms_id": accountOms.id,
            "id": params.id
        }

        let results = await MERCHANT_GROUP_MODEL.getOne(params);
        
        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Data successfully retrieved.',
            'data': results,
        })
        return;
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }
});

// GET RECORDS
app.get('/app/:oms_public_key/merchant-groups', verifyAppToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    console.log('oms_public_key2', req.params.oms_public_key)

    // Find soms_acccount
    params.conditions = {
        "oms_public_key": ( req.params.oms_public_key || null )
    }
    let accountOms = null;
    console.log('params', params)

    try {
        accountOms = await ACCOUNT_OMS_MODEL.getOne(params);
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }

    console.log('accountOms1', accountOms)


    // Now get records based on account_oms_id.
    try {
        params.conditions = {
            "account_oms_id": accountOms.id
        }

        let results = await MERCHANT_GROUP_MODEL.get(params);
        
        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Data successfully retrieved.',
            'data': results,
        })
        return;
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }
});

module.exports.handler = serverless(app);