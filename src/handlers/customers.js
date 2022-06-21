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
const TEXT_HELPER = require('../helpers/text');
const QUERY_HELPER = require('../helpers/query-helper');



// Model declarations
const CUSTOMER_MODEL = require("../models/customers.model");

// Validator declarations
const CUSTOMER_VALIDATOR = require("../validators/customer-validator");

// CREATE RECORD
app.post('/admin/customers', async (req, res, next) => {
    let params = {}
    params.body = req.body;

    // Validataion
    try {
        let validator = await CUSTOMER_VALIDATOR.validate(req.body);
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
        console.log('validation Error')
        console.log(error)
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
        params.insertSql = await CUSTOMER_MODEL.prepareSave(params);

        // Perform Query
        let results = await CUSTOMER_MODEL.save(params);
        
        API_RESPONSE.send(res, {
            'status': 201,
            'success': true,
            'message': 'Record successfully created.',
            'data': results,
        });
    }  catch( error ) {
        console.log('Saving Error')
        console.log(error)
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
    }
});


// GET ONE RECORD
app.get('/admin/customers/:id',
//  verifyAdminToken, 
 async (req, res, next) => {
    

    let params = await QUERY_HELPER.prepare(req);
    params.conditions = {
        "id": parseInt(req.params.id || 0)
    }

    try {
        let results = await CUSTOMER_MODEL.getOne(params);
            if(results.length == 0){
               return API_RESPONSE.send(res, {
                    'status': 400,
                    'success': true,
                    'message': "Can't Find Record.",
                    'data': [],
                });
            } 


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
app.get('/admin/customers ', 
// verifyAdminToken, 
async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    try {
        let results = await CUSTOMER_MODEL.get(params);
        
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
app.put('/admin/customers/:id', 
// verifyAdminToken, 
async (req, res, next) => {

    let params = {};
    params.body = req.body;
    let customers_id = parseInt( req.params.id || 0);
    params.conditions = {
        "id": customers_id
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
        params.setSql = await CUSTOMER_MODEL.prepareUpdate(params);
        
        // Perform Query
        let results = await CUSTOMER_MODEL.update(params);
        
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





// DELETE RECORD
app.delete('/admin/customers/:id', 
// verifyAdminToken, 
async (req, res, next) => {

    let params = {};
    params.id = req.params.id || 0;
    // Validataion
    
    try {
         // Preparations
         params.deleteSql = await CUSTOMER_MODEL.prepareDelete(params);

        // Perform Query
        let results = await CUSTOMER_MODEL.delete(params);
            console.log(results)
        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Record successfully deleted.',
            'data': results,
        });
    }  catch( error ) {
        console.log(error)
        API_RESPONSE.send(res, {
            'status': error.code ? error.code : 500,
            'success': false,
            'message': error.message,
        });
    }
});


module.exports.handler = serverless(app);