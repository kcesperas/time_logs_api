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
const ACCOUNT_MODEL = require("../models/account");

// GET ONE RECORD
app.get('/accounts/:id', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    console.log('params', params)
    params.id = req.params.id || null;

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

// GET RECORDS
app.get('/accounts', verifyAdminToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    try {
        let results = await ACCOUNT_MODEL.get(params);
        
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
app.put('/accounts/:id', verifyAdminToken, async (req, res, next) => {

    let params = {};
    params.id = req.params.id || null;
    // Validataion here
    
    try {
        // Preparations
        params.setSql = await ACCOUNT_MODEL.prepareUpdate(req.body);
        
        // Perform Query
        let results = await ACCOUNT_MODEL.update(params);
        
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
app.post('/accounts', verifyAdminToken, async (req, res, next) => {

    let params = {}
    try {
        // Validataion here
        if ( TEXT_HELPER.isEmpty(req.body) ) {
            console.log('Body',req.body)
            let error =  new Error('Invalid data passed.');
            error.code = 422;
            throw error;
        }

        // Preparations
        params.insertSql = await ACCOUNT_MODEL.prepareSave(req.body);
        console.log('RDB',params)
        
        // Perform Query
        let results = await ACCOUNT_MODEL.save(params);
        
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


module.exports.handler = serverless(app);