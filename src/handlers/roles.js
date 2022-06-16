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
const ROLE_HELPER = require('../helpers/roles');


// Model declarations
const ROLE_MODEL = require("../models/roles.model");

// Validator declarations
const ROLE_VALIDATOR = require("../validators/roles-validator");

// Lib declarations
const moment = require('moment');

// GET ONE RECORD
app.get('/admin/role/:id', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.conditions = {
        "id": parseInt(req.params.id || 0)
    }
    try {
        let results = await ROLE_MODEL.getOne(params);
        
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
app.get('/admin/roles', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    try {
        let results = await ROLE_MODEL.get(params);
        
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
app.put('/admin/roles/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.body = req.body;
    params.currentRole = req.currentRole;
    let role_id = parseInt( req.params.id || 0);
    params.conditions = {
        "id": role_id
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
        params.setSql = await ROLE_MODEL.prepareUpdate(params);
        
        // Perform Query
        let results = await ROLE_MODEL.update(params);
        
        // Insert user references if not yet exist.
        await ROLE_HELPER.save(params);

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
app.post('/admin/roles', verifyAdminToken, async (req, res, next) => {

    let params = {}
    params.body = req.body;
    params.currentRole = req.currentRole ;
    // Validataion
    try {
        let validator = await ROLE_VALIDATOR.validate(req.body);
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
        params.insertSql = await ROLE_MODEL.prepareSave(params);
        
        // Perform Query
        let results = await ROLE_MODEL.save(params);
        
        // Insert user references if not yet exist.
        await ROLE_HELPER.save(params);
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
app.delete('/admin/roles/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.currentUser = req.currentUser;
    params.id = req.params.id || 0;
    // Validataion
    
    try {
         // Preparations
         params.deleteSql = await ROLE_MODEL.prepareDelete(params);

        // Perform Query
        let results = await ROLE_MODEL.delete(params);
        
        // Insert user references if not yet exist.
        await ROLE_HELPER.save(params);

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