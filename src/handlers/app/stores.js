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
const BRAND_MODEL = require("../../models/brand");
const STORE_MODEL = require("../../models/store");

// Validator declarations
const MERCHANT_GROUP_VALIDATOR = require("../../validators/merchant-group-validator");

// Lib declarations
const moment = require('moment');

// GET ONE RECORD
app.get('/app/:oms_public_key/merchant-groups/:merchant_group_id/brands/:brand_id/stores/:id', verifyAppToken, async (req, res, next) => {
    let params = await QUERY_HELPER.prepare(req);
    params.merchant_group_id = parseInt(req.params.merchant_group_id || 0);
    params.brand_id = parseInt(req.params.brand_id || 0);
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

    // Now get one merchant record.
    let merchant = null;
    try {
        params.conditions = {
            "account_oms_id": accountOms.id,
            "id": params.merchant_group_id
        }

        merchant = await MERCHANT_GROUP_MODEL.getOne(params);
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }

    // Now get one brand record.
    let brand = null;
    try {
        params.conditions = {
            "merchant_group_id": params.merchant_group_id,
            "id": params.brand_id
        }
        brand = await BRAND_MODEL.getOne(params);
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }

     // Now get records based on stores.
     try {
        params.conditions = {
            "brand_id": params.brand_id,
            "id": params.id
        }

        let results = await STORE_MODEL.getOne(params);
        console.log('RYAN',results);
        
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
app.get('/app/:oms_public_key/merchant-groups/:merchant_group_id/brands/:brand_id/stores', verifyAppToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.merchant_group_id = parseInt(req.params.merchant_group_id || 0);
    params.brand_id = parseInt(req.params.brand_id || 0);


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

    // Now get one merchant record.
    let merchant = null;
    try {
        params.conditions = {
            "account_oms_id": accountOms.id,
            "id": params.merchant_group_id
        }

        merchant = await MERCHANT_GROUP_MODEL.getOne(params);
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }

    // Now get one brand record.
    let brand = null;
    try {
        params.conditions = {
            "merchant_group_id": params.merchant_group_id,
            "id": params.brand_id
        }
        brand = await BRAND_MODEL.getOne(params);
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }

     // Now get records based on stores.
     try {
        params.conditions = {
            "brand_id": params.brand_id
        }

        let results = await STORE_MODEL.get(params);
        
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