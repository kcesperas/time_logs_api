module.exports = {
    validate: async function(payload) {
        console.log(payload)
        const Validator = require('jsonschema').Validator;

        function preValidateProperty(object, key, schema, options, ctx) {
            let value = object[key];
            console.log(!value)
            if ( typeof value ==='string'){
                return object[key] = value.trim();
            }
    
            return;
        };
  
        let schema = require('../schemas/roles-schema.json');
        let v = new Validator();
        return v.validate(payload, schema, {preValidateProperty });
    },
}