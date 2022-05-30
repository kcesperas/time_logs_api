const DB_API = require("../helpers/db-api");
const dottie = require("dottie");
const TEXT_HELPER = require('../helpers/text');
const moment = require('moment');
let accountSchema = require('../schemas/account-schema.json');
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
                WHERE deleted_at IS NULL AND
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
                WHERE deleted_at IS NULL AND
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
                WHERE deleted_at IS NULL
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

    delete: async function(params) {
        console.log('from delete: ' + this.getModelName(), params )

        // Let's BEGIN our query builder here.
        try {
            let query = `
                UPDATE accounts SET 
                ${params.deleteSql.SET}
                WHERE deleted_at IS NULL AND
                id = ?
                `;
            console.log('DELETE QUERY', query, params.deleteSql.replacements)

            results = await DB_API.query(query, params.deleteSql.replacements);
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

    prepareUpdate:  async function(params) {
        let setSql = {
            SET: '',
            replacements: []
        };
        let columns = params.body;
        let now = new Date();
        console.log('params.currentUser', params.currentUser)
        for ( colname in columns) {
            if ( !accountSchema.updateColums.includes(colname) )
            continue;

            setSql.SET += setSql.SET ?  ' ,' + colname + ' = ?': colname + ' = ?'
            setSql.replacements.push(columns[colname]);
        }

        // Internal updating
        let forUpdating = {
            "modified_at": moment(now).format("YYYY-MM-DD HH:mm:ss"),
            "modified_by": params.currentUser.user_id
        }
        
        for ( colname in forUpdating) {
            setSql.SET += setSql.SET ?  ' ,' + colname + ' = ?': colname + ' = ?'
            setSql.replacements.push(forUpdating[colname]);
        }

        return setSql; 
    },

    prepareDelete:  async function(params) {
        let deleteSql = {
            SET: '',
            replacements: []
        };

        let id = parseInt(params.id);
        let d = new Date();
        let now = moment(d).format("YYYY-MM-DD HH:mm:ss")
         // Internal updating
        let forUpdating = {
            "deleted_at": now,
            "modified_at": now,
            "modified_by": params.currentUser.user_id,
        }

        for ( colname in forUpdating) {
            deleteSql.SET += deleteSql.SET ?  ' ,' + colname + ' = ?': colname + ' = ?'
            deleteSql.replacements.push(forUpdating[colname]);
        }
        deleteSql.replacements.push(id);

        return deleteSql; 
    },

    prepareSave:  async function(params) {
        let insertSql = {
            INSERT: '',
            VALUES: '',
            replacements: []
        };
        let columns = params.body;

        for ( colname in columns) {
            if ( !accountSchema.createColums.includes(colname) )
            continue;

            insertSql.INSERT += insertSql.INSERT ?  ' ,' + colname + '': colname + ''
            insertSql.VALUES += insertSql.VALUES ?  ' , ?': '?'
            insertSql.replacements.push(columns[colname]);
        }

        let d = new Date();
        let now = moment(d).format("YYYY-MM-DD HH:mm:ss")
         // Internal updating
        let forUpdating = {
            "modified_at": now,
            "modified_by": params.currentUser.user_id,
            "created_at": now,
            "created_by": params.currentUser.user_id,
        }

        for ( colname in forUpdating) {
            insertSql.INSERT += insertSql.INSERT ?  ' ,' + colname + '': colname + ''
            insertSql.VALUES += insertSql.VALUES ?  ' , ?': '?'
            insertSql.replacements.push(forUpdating[colname]);
        }

        return insertSql; 
    },

    getModelName: function() {
        return "Account Model"
    }


}