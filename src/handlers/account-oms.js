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
const ACCOUNT_OMS_MODEL = require("../models/account-oms");
const MERCHANT_GROUP_MODEL = require("../models/merchant-group");
const BRAND_MODEL = require("../models/brand");
const STORE_MODEL = require("../models/store");

// Validator declarations
const ACCOUNT_VALIDATOR = require("../validators/account-oms-validator");

// Lib declarations
const moment = require('moment');

// GET ONE RECORD
app.get('/admin/account-oms/:id', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.conditions = {
        "id": parseInt(req.params.id || 0)
    }
    try {
        // Find soms_acccount
        let results = await ACCOUNT_OMS_MODEL.getOne(params);
        
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
app.get('/admin/account-oms', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    try {
        let results = await ACCOUNT_OMS_MODEL.get(params);
        
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
app.put('/admin/account-oms/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    let account_oms_id = parseInt( req.params.id || 0);
    params.body = req.body;
    params.currentUser = req.currentUser;

    params.conditions = {
        "id": account_oms_id
    }

    if ( !params.conditions.id ) {
        API_RESPONSE.send(res, {
            'status': 404,
            'success': false,
            'message': 'Unable to process request.',
        });
        return;
    }
    
    // Validataion
    try {
        // Preparations
        params.setSql = await ACCOUNT_OMS_MODEL.prepareUpdate(params);
        
        // Perform Query
        let results = await ACCOUNT_OMS_MODEL.update(params);


        // Account ID changed?
        if (  !TEXT_HELPER.isEmpty(req.body.account_id) ) {
            // MERCHANT: Update Account ID
            try {
                // Preparations
                let updateParams = params;
                updateParams.body = {};
                updateParams.body.account_id = req.body.account_id;
                updateParams.conditions = {
                    "account_oms_id": account_oms_id
                }
                updateParams.setSql = await MERCHANT_GROUP_MODEL.prepareUpdate(updateParams);

                // Perform Query
                await MERCHANT_GROUP_MODEL.update(updateParams);
            }  catch( error ) {
                console.log('MERCHANT_GROUP_MODEL error', error);
            }

            // BRAND: Update Account ID
            try {
                // Preparations
                let updateParams = params;
                updateParams.body = {};
                updateParams.body.account_id = req.body.account_id;
                updateParams.conditions = {
                    "account_oms_id": account_oms_id
                }
                updateParams.setSql = await BRAND_MODEL.prepareUpdate(updateParams);

                // Perform Query
                await BRAND_MODEL.update(updateParams);
            }  catch( error ) {
                console.log('BRAND_MODEL error', error);
            }

            // STORE: Update Account ID
            try {
                // Preparations
                let updateParams = params;
                updateParams.body = {};
                updateParams.body.account_id = req.body.account_id;
                updateParams.conditions = {
                    "account_oms_id": account_oms_id
                }
                updateParams.setSql = await STORE_MODEL.prepareUpdate(updateParams);

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
app.post('/admin/account-oms', verifyAdminToken, async (req, res, next) => {

    let params = {}
    params.body = req.body;
    params.currentUser = req.currentUser;
    // Validataion
    try {
        let validator = await ACCOUNT_VALIDATOR.validate(req.body);
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

    // Let's go
    try {
        // Preparations
        params.insertSql = await ACCOUNT_OMS_MODEL.prepareSave(params);
        
        // Perform Query
        let results = await ACCOUNT_OMS_MODEL.save(params);
        
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
app.delete('/admin/account-oms/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.currentUser = req.currentUser;
    params.id = req.params.id || 0;
    // Validataion
    
    try {
         // Preparations
         params.deleteSql = await ACCOUNT_OMS_MODEL.prepareDelete(params);

        // Perform Query
        let results = await ACCOUNT_OMS_MODEL.delete(params);
        
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