const serverless = require('serverless-http');
const body_parser = require('body-parser');
const express = require('express');
const app = express();
app.use(body_parser.json({ strict: false }));
app.use(body_parser.urlencoded({ extended: true }));

// Middlewares
var verifyAdminToken = require('../middlewares/verifyAdminToken');

// Helper declarations
const API_RESPONSE = require('../helpers/api-response');
const QUERY_HELPER = require('../helpers/query-helper');
const TEXT_HELPER = require('../helpers/text');
const USER_REFERENCE_HELPER = require('../helpers/user-reference');


// Model declarations
const MERCHANT_GROUP_MODEL = require("../models/merchant-group");
const ACCOUNT_OMS_MODEL = require("../models/account-oms");
const BRAND_MODEL = require("../models/brand");
const STORE_MODEL = require("../models/store");

// Validator declarations
const MERCHANT_GROUP_VALIDATOR = require("../validators/merchant-group-validator");

// Lib declarations
const moment = require('moment');

// GET ONE RECORD
app.get('/admin/merchant-groups/:id', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.conditions = {
        "id": parseInt(req.params.id || 0)
    }

    try {
        let results = await MERCHANT_GROUP_MODEL.getOne(params);
        
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

// GET RECORDS
app.get('/admin/merchant-groups', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    try {
        let results = await MERCHANT_GROUP_MODEL.get(params);
        
        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Data successfully retrieved.',
            'data': results,
        })
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
    }
});


// UPDATE RECORD
app.put('/admin/merchant-groups/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.body = req.body;
    params.currentUser = req.currentUser;
    let merchant_group_id = parseInt( req.params.id || 0);
    
    // Validataion
    params.conditions = {
        "id": merchant_group_id
    }

    if ( !params.conditions.id ) {
        API_RESPONSE.send(res, {
            'status': 404,
            'success': false,
            'message': 'Unable to process request.',
        });
        return;
    }
    
    try {
        // Preparations
        params.setSql = await MERCHANT_GROUP_MODEL.prepareUpdate(params);

        // Perform Query
        let results = await MERCHANT_GROUP_MODEL.update(params);

        // Account account_oms_id changed?
        if (  !TEXT_HELPER.isEmpty(req.body.account_oms_id) ) {
            try {
                // Preparations
                let updateParams = params;
                updateParams.body = {};
                updateParams.body.account_oms_id = req.body.account_oms_id;
                updateParams.conditions = {
                    "merchant_group_id": merchant_group_id
                }
                updateParams.setSql = await BRAND_MODEL.prepareUpdate(updateParams);

                console.log('updateParams',updateParams);

                // Perform Query
                await BRAND_MODEL.update(updateParams);
                await STORE_MODEL.update(updateParams);
            }  catch( error ) {
                console.log('BRAND_MODEL error', error);
            }
        }
        
        // Insert user references if not yet exist.
        await USER_REFERENCE_HELPER.save(params);

        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Record successfully updated.',
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


// CREATE RECORD
app.post('/admin/merchant-groups', verifyAdminToken, async (req, res, next) => {

    let params = {}
    params.body = req.body;
    params.currentUser = req.currentUser;
    // Validataion
    try {
        let validator = await MERCHANT_GROUP_VALIDATOR.validate(req.body);
        if ( !validator.valid ) {
            API_RESPONSE.send(res, {
                'status': 422,
                'success': false,
                'errors': validator.errors,
                'message': 'Invalid data.',
            });
            return;
        } 
    } catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }

    // Now, we need to check if account exist or not
    let accountOmsparams = await QUERY_HELPER.prepare(req);

    // Find soms_acccount
    accountOmsparams.conditions = {
        "id": ( req.body.account_oms_id || null )
    }
    let accountOms = null;

    try {
        accountOms = await ACCOUNT_OMS_MODEL.getOne(accountOmsparams);
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }

    console.log('accountOms', accountOms);


    // Let's go
    try {
        // Preparations
        params.body.account_id = accountOms.account_id;
        params.insertSql = await MERCHANT_GROUP_MODEL.prepareSave(params);
        
        // Perform Query
        let results = await MERCHANT_GROUP_MODEL.save(params);
        
        // Insert user references if not yet exist.
        await USER_REFERENCE_HELPER.save(params);

        API_RESPONSE.send(res, {
            'status': 201,
            'success': true,
            'message': 'Record successfully created.',
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


// DELETE RECORD
app.delete('/admin/merchant-groups/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.currentUser = req.currentUser;
    params.id = req.params.id || 0;
    // Validataion
    
    try {
         // Preparations
         params.deleteSql = await MERCHANT_GROUP_MODEL.prepareDelete(params);

        // Perform Query
        let results = await MERCHANT_GROUP_MODEL.delete(params);
        
        // Insert user references if not yet exist.
        await USER_REFERENCE_HELPER.save(params);

        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Record successfully deleted.',
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