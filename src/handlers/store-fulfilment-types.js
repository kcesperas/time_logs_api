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
const STORE_FULFILMENT_TYPE_MODEL = require("../models/store-fulfilment-type");
const STORE_MODEL = require("../models/store");

// Validator declarations
const STORE_CONFIG_VALIDATOR = require("../validators/store-fulfilment-type-validator");

// Lib declarations
const moment = require('moment');

// GET ONE RECORD
app.get('/admin/store-fulfilment-types/:id', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.conditions = {
        "id": parseInt(req.params.id || 0)
    }

    try {
        let results = await STORE_FULFILMENT_TYPE_MODEL.getOne(params);
        
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
app.get('/admin/store-fulfilment-types', verifyAdminToken, async (req, res, next) => {
    let params = await QUERY_HELPER.prepare(req);

    try {
        let results = await STORE_FULFILMENT_TYPE_MODEL.get(params);
        
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
app.put('/admin/store-fulfilment-types/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.body = req.body;
    params.currentUser = req.currentUser;
    let store_id = parseInt( req.params.id || 0);
    
    // Validataion
    params.conditions = {
        "id": store_id
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
        params.setSql = await STORE_FULFILMENT_TYPE_MODEL.prepareUpdate(params);
        
        // Perform Query
        let results = await STORE_FULFILMENT_TYPE_MODEL.update(params);
        
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
app.post('/admin/store-fulfilment-types', verifyAdminToken, async (req, res, next) => {

    let params = {}
    params.body = req.body;
    params.currentUser = req.currentUser;
    // Validataion
    try {
        let validator = await STORE_CONFIG_VALIDATOR.validate(req.body);
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

    // Now, we need to check if store exist or not
    let storeParams = await QUERY_HELPER.prepare(req);

    // Find soms_acccount
    storeParams.conditions = {
        "id": ( req.body.store_id || null )
    }
    let store = null;

    try {
        store = await STORE_MODEL.getOne(storeParams);
    }  catch( error ) {
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
        params.insertSql = await STORE_FULFILMENT_TYPE_MODEL.prepareSave(params);
        
        // Perform Query
        let results = await STORE_FULFILMENT_TYPE_MODEL.save(params);
        
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
app.delete('/admin/store-fulfilment-types/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.currentUser = req.currentUser;
    params.id = req.params.id || 0;
    // Validataion
    
    try {
         // Preparations
         params.deleteSql = await STORE_FULFILMENT_TYPE_MODEL.prepareDelete(params);

        // Perform Query
        let results = await STORE_FULFILMENT_TYPE_MODEL.delete(params);
        
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