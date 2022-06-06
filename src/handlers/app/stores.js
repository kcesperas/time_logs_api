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
let pointInPolygon = require('point-in-polygon');


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

     // Now get records based on stores.
     try {
        params.conditions = {
            "merchant_group_id": params.merchant_group_id,
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

     // Now get records based on stores.
     try {
        params.conditions = {
            "merchant_group_id": params.merchant_group_id,
            "brand_id": params.brand_id,
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

// SERVICABLE-STORES
app.get('/app/:oms_public_key/merchant-groups/:merchant_group_id/brands/serviceable-stores', verifyAppToken, async (req, res, next) => {

    let params = await QUERY_HELPER.prepare(req);
    params.merchant_group_id = parseInt(req.params.merchant_group_id || 0);
    params.brand_id = parseInt(req.params.brand_id || 0);

    params.latitude = parseFloat(req.query.latitude || 0)+0;
    params.longitude = parseFloat(req.query.longitude || 0)+0;

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

     // Now get records based on stores.
     try {
        params.conditions = {
            "merchant_group_id": params.merchant_group_id
        }

        let results = await STORE_MODEL.get(params);
        let servicableStores = [];

        // TODO: put this on module and promise.
        if ( results.length ) {
            for ( index in results ) {
                let store = results[index];
                let service_area = store.service_area;
                if (  !TEXT_HELPER.isEmpty(service_area) ) {

                    let polygon = [];
                    let points = service_area.split(' ');
                    for ( pointIndex in points ) {
                        let point = points[pointIndex];
                        let p = point.split(',');
                        let pArray = [];
                        pArray.push(parseFloat(p[0]));
                        pArray.push(parseFloat(p[1]));
                        polygon.push(pArray);
                    }

                    // console.log("params.latitude", params.latitude)
                    // console.log("params.longitude", params.longitude)
                
                    let isPointInPolygon = pointInPolygon([ params.latitude, params.longitude ], polygon);
                    if ( isPointInPolygon ) {
                        console.log('Polygon here');
                        servicableStores.push(store);
                    }
                }
            }
        }


        API_RESPONSE.send(res, {
            'status': 200,
            'success': true,
            'message': 'Data successfully retrieved.',
            'data': servicableStores,
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