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

// Model declarations
const BRAND_MODEL = require("../models/brand");
const MERCHANT_GROUP_MODEL = require("../models/merchant-group");
const STORE_MODEL = require("../models/store");

// Validator declarations
const BRAND_VALIDATOR = require("../validators/brand-validator");

// Lib declarations
const moment = require('moment');

// GET ONE RECORD
app.get('/admin/brands/:id', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.conditions = {
        "id": parseInt(req.params.id || 0)
    }

    try {
        let results = await BRAND_MODEL.getOne(params);
        
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
app.get('/admin/brands', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    try {
        let results = await BRAND_MODEL.get(params);
        
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
app.put('/admin/brands/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.body = req.body;
    params.currentUser = req.currentUser;
    let brand_id = parseInt( req.params.id || 0);

    // Validataion
    params.conditions = {
        "id": brand_id
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
        params.setSql = await BRAND_MODEL.prepareUpdate(params);
        
        // Perform Query
        let results = await BRAND_MODEL.update(params);

        // Account merchant_group_id changed?
        if (  !TEXT_HELPER.isEmpty(req.body.merchant_group_id) ) {
            try {
                // Preparations
                let updateParams = params;
                updateParams.body = {};
                updateParams.body.merchant_group_id = req.body.merchant_group_id;
                updateParams.conditions = {
                    "brand_id": brand_id
                }
                updateParams.setSql = await STORE_MODEL.prepareUpdate(updateParams);

                console.log('updateParams',updateParams);

                // Perform Query
                await STORE_MODEL.update(updateParams);
            }  catch( error ) {
                console.log('STORE_MODEL error', error);
            }
        }
        
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
app.post('/admin/brands', verifyAdminToken, async (req, res, next) => {

    let params = {}
    params.body = req.body;
    params.currentUser = req.currentUser;
    // Validataion
    try {
        let validator = await BRAND_VALIDATOR.validate(req.body);
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


    // Now, we need to check if merchant exist or not
    let merchantOmsparams = await QUERY_HELPER.prepare(req);

    // Find soms_acccount
    merchantOmsparams.conditions = {
        "id": ( req.body.merchant_group_id || null )
    }
    let merchantOms = null;

    try {
        merchantOms = await MERCHANT_GROUP_MODEL.getOne(merchantOmsparams);
    }  catch( error ) {
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
        return;
    }

    console.log('merchantOms', merchantOms);

    // Let's go
    try {
        // Preparations
        params.body.account_id = merchantOms.account_id;
        params.body.account_oms_id = merchantOms.account_oms_id;
        params.body.merchant_group_id = merchantOms.id;
        params.insertSql = await BRAND_MODEL.prepareSave(params);
        
        // Perform Query
        let results = await BRAND_MODEL.save(params);
        
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
app.delete('/admin/brands/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.currentUser = req.currentUser;
    params.id = req.params.id || 0;
    // Validataion
    
    try {
         // Preparations
         params.deleteSql = await BRAND_MODEL.prepareDelete(params);

        // Perform Query
        let results = await BRAND_MODEL.delete(params);
        
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