const SUPERAGENT = require('superagent')
const IDMS_URL = process.env.IDMS_URL
const IDMS_APP_KEY = process.env.IDMS_APP_KEY
const TEXT_HELPER = require('../helpers/text')
module.exports = {
    validate: async function (token) {
        try {
            const res = await SUPERAGENT.post(`${IDMS_URL}/auth/validate`)
                .set("Authorization", token)
                .set("X-APP-KEY", IDMS_APP_KEY)

                let allowed = false;
                let roles = res.body.data.roles;
                if ( roles.length ) {
                    for ( role in roles) {
                        if ( roles[role].name == 'SOMS Admin') {
                            allowed = !allowed;
                            break;
                        }
                    }
                } else {
                    let error = new Error("Not authorized");
                    error.code = 400;
                    error.message = 'Not authorized';
                    throw error;
                }

                if ( !allowed ) {
                    let error = new Error("Not authorized");
                    error.code = 400;
                    error.message = 'Not authorized';
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