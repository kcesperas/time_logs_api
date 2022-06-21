module.exports = {
    validate: async function(payload) {
        const Validator = require('jsonschema').Validator;

        function preValidateProperty(object, key, schema, options, ctx) {
            let value = object[key];

            if ( typeof value ==='string' )
            return object[key] = value.trim();
    
            return;
        };

        let v = new Validator();
        
        let schema = require('../schemas/phones-schema.json');
        return v.validate(payload, schema, {preValidateProperty});
    },
}