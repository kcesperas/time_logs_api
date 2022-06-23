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
const ORDERS_MODEL = require("../models/orders.model");

// Validator declarations
const ORDERS_VALIDATOR = require("../validators/orders-validator");

// CREATE RECORD
app.post('/admin/orders', async (req, res, next) => {
    let params = {}
    params.body = req.body;

    // Validataion
    try {
        let validator = await ORDERS_VALIDATOR.validate(req.body);
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
        params.insertSql = await ORDERS_MODEL.prepareSave(params);

        // Perform Query
        let results = await ORDERS_MODEL.save(params);
        
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
app.get('/admin/orders/:id',
//  verifyAdminToken, 
 async (req, res, next) => {
    

    let params = await QUERY_HELPER.prepare(req);
    params.conditions = {
        "id": parseInt(req.params.id || 0)
    }

    try {
        let results = await ORDERS_MODEL.getOne(params);
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
app.get('/admin/orders', 
// verifyAdminToken, 
async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);

    try {
        let results = await ORDERS_MODEL.get(params);
        
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
app.put('/admin/orders/:id', 
// verifyAdminToken, 
async (req, res, next) => {

    let params = {};
    params.body = req.body;
    let orders_id = parseInt( req.params.id || 0);
    params.conditions = {
        "id": orders_id
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
        params.setSql = await ORDERS_MODEL.prepareUpdate(params);
        
        // Perform Query
        let results = await ORDERS_MODEL.update(params);
        
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
app.delete('/admin/orders/:id', 
// verifyAdminToken, 
async (req, res, next) => {

    let params = {};
    params.id = req.params.id || 0;
    // Validataion
    
    try {
         // Preparations
         params.deleteSql = await ORDERS_MODEL.prepareDelete(params);

        // Perform Query
        let results = await ORDERS_MODEL.delete(params);
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