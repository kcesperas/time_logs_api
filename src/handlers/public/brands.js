const serverless = require('serverless-http');
const body_parser = require('body-parser');
const express = require('express');
const app = express();
app.use(body_parser.json({ strict: false }));
app.use(body_parser.urlencoded({ extended: true }));

// Middlewares
var verifyPublicToken = require('../../middlewares/verifyPublicToken');

// Helper declarations
const API_RESPONSE = require('../../helpers/api-response');
const QUERY_HELPER = require('../../helpers/query-helper');
const TEXT_HELPER = require('../../helpers/text');

// Model declarations
const MERCHANT_GROUP_MODEL = require("../../models/merchant-group");
const ACCOUNT_OMS_MODEL = require("../../models/account-oms");
const BRAND_MODEL = require("../../models/brand");

// Validator declarations
const MERCHANT_GROUP_VALIDATOR = require("../../validators/merchant-group-validator");

// Lib declarations
const moment = require('moment');

// GET ONE RECORD
app.get('/public/:oms_public_key/merchant-groups/:merchant_group_id/brands/:id', verifyPublicToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.id = parseInt(req.params.id || 0);
    params.merchant_group_id = parseInt(req.params.merchant_group_id || 0);

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
            'message': error.message + '',
        });
        return;
    }

    // Now one get records based on merchant_group_id.
    try {
        params.conditions = {
            // "account_oms_id": accountOms.id,
            "merchant_group_id": params.merchant_group_id,
            "id": params.id
        }

        let results = await BRAND_MODEL.getOne(params);
        
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
app.get('/public/:oms_public_key/merchant-groups/:merchant_group_id/brands', verifyPublicToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.merchant_group_id = parseInt(req.params.merchant_group_id || 0);


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

    // Now get records based on merchant_group_id.
    try {
        params.conditions = {
            "merchant_group_id": params.merchant_group_id
        }

        let results = await BRAND_MODEL.get(params);
        
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