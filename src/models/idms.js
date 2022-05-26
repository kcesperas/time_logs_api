const SUPERAGENT = require('superagent')
const IDMS_URL = process.env.IDMS_URL
const IDMS_APP_KEY = process.env.IDMS_APP_KEY
module.exports = {
    validate: async function (token) {
        try {
            const res = await SUPERAGENT.get(`${IDMS_URL}/auth/validate`)
                .set("Authorization", token)
                .set("X-APP-KEY", IDMS_APP_KEY)

                return res;
        } catch ( error) {
            console.log('here????', error)
            error.code = error.code ? error.code : 500;
            throw error;
        }
    },

    jwtParsePayload: function(token, parse = false ) {
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