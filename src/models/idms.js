const SUPERAGENT = require('superagent')
const IDMS_URL = process.env.IDMS_URL
const IDMS_APP_KEY = process.env.IDMS_APP_KEY
const TEXT_HELPER = require('../helpers/text');
const QUERY_HELPER = require('../helpers/query-helper');

// Model declarations
// const ACCOUNT_OMS_MODEL = require("../models/account-oms");

module.exports = {
    validate: async function (token, roleNames = [] ) {
        try {
            const res = await SUPERAGENT.post(`${IDMS_URL}/auth/validate`)
                .set("Authorization", token)
                .set("X-APP-KEY", IDMS_APP_KEY)
                // No role restrictions specified. So validated.
                if( !roleNames.length ) {
                    let error = new Error("Not authorized");
                    error.code = 400;
                    error.message = 'Not authorized.';
                    throw error;
                }
                
                if ( res.body.data.role === 'Guest' || res.body.data.role === 'Client' ) {
                    if ( !roleNames.includes(res.body.data.role) ) {
                        let error = new Error("Not authorized.");
                        error.code = 400;
                        error.message = 'Not authorized.';
                        throw error;
                    }

                    return res;
                }
            
                let allowed = false;
                let roles = res.body.data.roles;

                let roleName = roleNames[0]; // 'MBS Admin'

                if ( roles.length ) {
                    for ( role in roles) {
                        if ( roles[role].name == roleName) {
                            allowed = !allowed;
                            break;
                        }
                    }
                } else {
                    let error = new Error("Not authorized");
                    error.code = 400;
                    error.message = 'Not authorized.';
                    throw error;
                }

                if ( !allowed ) {
                    let error = new Error("Not authorized");
                    error.code = 400;
                    error.message = 'Not authorized.';
                    throw error;
                } else {
                    return res;
                }
        } catch ( error) {
            if ( 
                !TEXT_HELPER.isEmpty(error.response)  &&
                error.response.body.message == 'Access Token has expired' ) {
                error.message = error.response.body.message;
                error.tokenExpired = true;
            }
            error.code = error.status ? error.status : 500;
            error.message = error.message ? error.message: null;
            
            throw error;
        }
    },

    // validateApp: async function (token, req) {
    //     try {
    //         let _ob = token.split(' ');
    //         let requestedToken = _ob[1];
    //         console.log('req.params', req.params);
    //         // Get public key
    //         let publicKey = req.params.oms_public_key;

    //         // Check from account_oms if public key exists.
    //         let params = await QUERY_HELPER.prepare(req);
    //         params.conditions = {
    //             "oms_public_key": publicKey
    //         }

    //         try {
    //             // Find soms_acccount
    //             let accountOms = await ACCOUNT_OMS_MODEL.getOne(params);

    //             let convertToHash = publicKey + ':' + accountOms.oms_secret_key;

    //             const crypto = require('crypto');
    //             const hash = 
    //                 crypto.createHash('sha256')
    //                 .update(convertToHash)
    //                 .digest('base64');
                
                
    //             console.log('hash',hash)
    //             console.log('requestedToken',requestedToken)

    //             if ( hash !== requestedToken ) {
    //                 let error = new Error("Not authorized");
    //                 error.code = 400;
    //                 error.message = 'Not authorized.';
    //                 throw error;
    //             }

    //             return accountOms;
                
    //         }  catch( error ) {
    //             error.code = error.status ? error.status : 500;
    //             error.message = error.message ? error.message: null;
    //             throw error;
    //         }

	// 	    console.log('token', token, _ob);
    //     } catch ( error) {
    //         error.code = error.status ? error.status : 500;
    //         error.message = error.message ? error.message: null;
    //         throw error;
    //     }
    // },

    jwtParsePayload: async function(token, parse = false ) {
        var _ob = jwt.split('.');
        var buf = Buffer.from(_ob[1], 'base64').toString("ascii"); // Ta-da
        if ( typeof buf === 'string') {
            buf = JSON.parse(buf);
            return buf;
        } else {
            return buf;
        }
    }
}