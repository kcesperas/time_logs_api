const DB_API = require("../helpers/db-api");
const dottie = require("dottie");
module.exports = {

    update: async function(params) {
        console.log('from: ' + this.getModelName() )
        let results = null;

        let select = params.fields;
        let id = params.id;
        // Let's BEGIN our query builder here.
        try {
            let query = `
                SELECT 
                ${select}
                FROM accounts
                WHERE
                id = ${id}
                `;

            console.log('Final Query: ', query);
            let replacements = [id]
            // if(filters.name) {
            //     query += `where Faculty.fullname = ?`
            //     replacements.push(filters.name)
            // }

            results = await DB_API.query(query, replacements);
            if( typeof results.code !== 'undefined') {
                throw new Error("Unable to perform queries.")
            }
            results = results.length ? dottie.transform(results) : [];
        } catch( error ) {
            throw new Error("Unable to perform queries.")
        }
         
        // No results found
        if ( !results.length ) {
            let error =  new Error('No results found');
            error.code = 404;
            throw error;
        }

        return results[0];
	},

    getOne: async function(params) {
        console.log('from: ' + this.getModelName() )
        let results = null;

        let select = params.fields;
        let id = params.id;
        // Let's BEGIN our query builder here.
        try {
            let query = `
                SELECT 
                ${select}
                FROM accounts
                WHERE
                id = ${id}
                `;

            console.log('Final Query: ', query);
            let replacements = [id]
            // if(filters.name) {
            //     query += `where Faculty.fullname = ?`
            //     replacements.push(filters.name)
            // }

            results = await DB_API.query(query, replacements);
            if( typeof results.code !== 'undefined') {
                throw new Error("Unable to perform queries.")
            }
            results = results.length ? dottie.transform(results) : [];
        } catch( error ) {
            throw new Error("Unable to perform queries.")
        }
         
        // No results found
        if ( !results.length ) {
            let error =  new Error('No results found');
            error.code = 404;
            throw error;
        }

        return results[0];
	},

	get: async function(params) {
        console.log('from: ' + this.getModelName() )
        let results = null;

        let select = params.fields;
        // Let's BEGIN our query builder here.
        try {
            let query = `
                SELECT 
                ${select}
                FROM accounts
                `;

            console.log('Final Query: ', query);
            let replacements = []
            // if(filters.name) {
            //     query += `where Faculty.fullname = ?`
            //     replacements.push(filters.name)
            // }

            results = await DB_API.query(query, replacements);
            if( typeof results.code !== 'undefined') {
                throw new Error("Unable to perform queries.")
            }
            results = results.length ? dottie.transform(results) : [];
        } catch( error ) {
            console.log(error)
            throw new Error("Unable to perform queries.")
        }

        return results;
	},

    getModelName: function() {
        return "Account Model"
    }
}