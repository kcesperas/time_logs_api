const DB_API = require("../helpers/db-api");
const dottie = require("dottie");
const TEXT_HELPER = require('../helpers/text');
module.exports = {

    save: async function(params) {
        console.log('from save: ' + this.getModelName(), params )
       
        // Check if there's data to save.
        if ( TEXT_HELPER.isEmpty(params.insertSql.replacements) ) {
            let error =  new Error('Invalid data passed.');
            error.code = 422;
            throw error;
        }
        
        let results = null;
        // Let's BEGIN our query builder here.
        try {
            let query = `
                INSERT INTO accounts (${params.insertSql.INSERT}) 
                VALUES(${params.insertSql.VALUES})
                `;

             results = await DB_API.query(query, params.insertSql.replacements);
            if( typeof results.code !== 'undefined') {
                throw new Error("Unable to perform queries.")
            }
        } catch( error ) {
            throw new Error("Unable to perform queries.")
        }
         
        // No results found
        if ( !results.affectedRows ) {
            let error =  new Error('No record to update.');
            error.code = 404;
            throw error;
        }

        return results;
	},

    update: async function(params) {
        console.log('from update: ' + this.getModelName(), params )
        // Check if there's data to update.
        if ( !params.setSql.replacements.length ) {
            let error =  new Error('Invalid data passed.');
            error.code = 400;
            throw error;
        }

        let results = null;

        let id = parseInt(params.id);
        params.setSql.replacements.push(id);

        // Let's BEGIN our query builder here.
        try {
            let query = `
                UPDATE accounts SET 
                ${params.setSql.SET}
                WHERE
                id = ?
                `;

            results = await DB_API.query(query, params.setSql.replacements);
            if( typeof results.code !== 'undefined') {
                throw new Error("Unable to perform queries.")
            }

        } catch( error ) {
            throw new Error("Unable to perform queries.")
        }
         
        // No results found
        if ( !results.affectedRows ) {
            let error =  new Error('No record to update.');
            error.code = 404;
            throw error;
        }

        return results;
	},

    getOne: async function(params) {
        console.log('from getOne: ' + this.getModelName() )
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

            let replacements = [id]

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
                WHERE deleted_at IS NOT NULL
                `;

            let replacements = []
           
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

    prepareUpdate:  async function(body) {
        let setSql = {
            SET: '',
            replacements: []
        };
        let columns = body

        for ( colname in columns) {
            setSql.SET += setSql.SET ?  ' ,' + colname + ' = ?': colname + ' = ?'
            setSql.replacements.push(columns[colname]);
        }

        return setSql; 
    },

    prepareSave:  async function(body) {
        let insertSql = {
            INSERT: '',
            VALUES: '',
            replacements: []
        };
        let columns = body

        for ( colname in columns) {
            insertSql.INSERT += insertSql.INSERT ?  ' ,' + colname + '': colname + ''
            insertSql.VALUES += insertSql.VALUES ?  ' , ?': '?'
            insertSql.replacements.push(columns[colname]);
        }

        return insertSql; 
    },

    getModelName: function() {
        return "Account Model"
    }


}