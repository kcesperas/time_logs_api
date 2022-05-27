
module.exports = {
    validate: async function(payload) {
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        
        let accountSchema = require('../schemas/account-schema.json');
        return v.validate(payload, accountSchema);
    },
}