
module.exports = {
    validate: async function(payload) {
        let Validator = require('jsonschema').Validator;
        let v = new Validator();
        
        let storeSchema = require('../schemas/store-schema.json');
        return v.validate(payload, storeSchema);
    },
}