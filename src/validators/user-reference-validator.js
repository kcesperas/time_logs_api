
module.exports = {
    validate: async function(payload) {
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        
        let schema = require('../schemas/user-reference-schema.json');
        return v.validate(payload, schema);
    },
}