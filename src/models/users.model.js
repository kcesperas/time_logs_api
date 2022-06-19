const { uniq, isUndefined } = require("lodash");
const CoreModel = require("../../core/model");
const TEXT_HELPER = require('../helpers/text');
const moment = require('moment');
let userSchema = require('../schemas/users-schema.json');



class RoleModel extends CoreModel {

    static async save(params) {
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
            let query = `INSERT INTO users (${params.insertSql.INSERT}) VALUES(${params.insertSql.VALUES})`;

             results = await this.dbExecute(query, params.insertSql.replacements);
             
             params.conditions = {
                "id": parseInt(results || 0)
            }
        return await this.getOne(params);
        } catch( error ) {
            console.log(error)
            throw new Error("Unable to perform queries.")
        }
         
      
    }

    static async update(params) {
        console.log('from update: ' + this.getModelName(), params )
        // Check if there's data to update.
        if ( !params.setSql.replacements.length ) {
            let error =  new Error('Invalid data passed.');
            error.code = 400;
            throw error;
        }

        let results = null;

        // let id = parseInt(params.id);

        let conditions = params.conditions || [];
        let conditionsSql = '';
        let replacements = params.setSql.replacements;

        if (  !TEXT_HELPER.isEmpty(conditions) ) {
            for (let colname in conditions) {
                conditionsSql += conditionsSql ?  ' AND ' + colname + ' = ?':'' + colname + ' = ?'
                replacements.push(conditions[colname]);
            }
            conditionsSql = 'AND ' + conditionsSql
        } else {
            throw new Error("Unable to perform queries. No conditions.")
        }

        // Let's BEGIN our query builder here.
        try {
            let query = `
                UPDATE users SET 
                ${params.setSql.SET}
                WHERE deleted_at IS NULL
                ${conditionsSql}
                `;

            results = await this.dbExecute(query, replacements);
          
            return await this.getOne(params);
        } catch( error ) {
            throw new Error("Unable to perform queries.")
        }
    }

    static async getOne(params) {
        console.log('from getOne: ' + this.getModelName() )
        let results = null;

        let select = params.fields || '*';
        
        let conditions = params.conditions || [];
        let conditionsSql = '';
        let replacements = [];

        if (  !TEXT_HELPER.isEmpty(conditions) ) {
            for (let colname in conditions) {
                conditionsSql += conditionsSql ?  ' AND ' + colname + ' = ?':'' + colname + ' = ?'
                replacements.push(conditions[colname]);
            }
            conditionsSql = 'AND ' + conditionsSql
        }

        // Let's BEGIN our query builder here.
        try {
            let query = `
                SELECT 
                ${select}
                FROM users
                WHERE deleted_at IS NULL
                ${conditionsSql}
                LIMIT 1
                `;

            results = await this.dbExecute(query, replacements);
            return results;

            } catch( error ) {
                console.log(error)
            throw new Error("Unable to perform queries.")
        }
        // No results found
    }

    static async get(params) {
        console.log('from get: ' + this.getModelName() )
        let results = null;
        let clause = {
            table: 'users',
            select: params.fields || '*',
            join: '',
            where: 'deleted_at IS NULL'

        }
        
        let conditions = params.conditions || [];
        let conditionsSql = '';
        let replacements = [];

        if (  !TEXT_HELPER.isEmpty(conditions) ) {
            for (let colname in conditions) {
                conditionsSql += conditionsSql ?  ' AND ' + colname + ' = ?':'' + colname + ' = ?'
                replacements.push(conditions[colname]);
            }
            conditionsSql = 'AND ' + conditionsSql
        }
        
        // Let's BEGIN our query builder here.
        try {
            let query = `
                SELECT 
                ${clause.select}
                FROM ${clause.table}
                ${clause.join}
                WHERE ${clause.where}
                ${conditionsSql}
                `;

            results = await this.dbExecute(query, replacements);


        return results;

        } catch( error ) {
            console.log(error)
            throw new Error("Unable to perform queries.")
        }

    }

    static async delete(params) {
        console.log('from delete: ' + this.getModelName(), params )
        let results = null;

        // Let's BEGIN our query builder here.
        try {
            let query = `
                UPDATE users SET 
                ${params.deleteSql.SET}
                WHERE deleted_at IS NULL AND
                id = ?
                `;
            console.log('DELETE QUERY', query, params.deleteSql.replacements)

         results = await this.dbExecute(query, params.deleteSql.replacements);

            return { affectedRows: results.affectedRows};
        } catch( error ) {
            console.log(results)
            throw new Error("Unable to perform queries.")
        }
    }


    
    static async prepareUpdate(params) {
        let setSql = {
            SET: '',
            replacements: []
        };
        let columns = params.body;
        console.log('params.currentUser', params.currentUser)
        for (let colname in columns) {
            if ( !userSchema.updateColums.includes(colname) )
            continue;
            setSql.SET += setSql.SET ?  ' ,' + colname + ' = ?': colname + ' = ?'
            setSql.replacements.push(columns[colname]);
        }
        return setSql; 
    }

    static async prepareDelete(params) {
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
        }

        for (let colname in forUpdating) {
            deleteSql.SET += deleteSql.SET ?  ' ,' + colname + ' = ?': colname + ' = ?'
            deleteSql.replacements.push(forUpdating[colname]);
        }
        deleteSql.replacements.push(id);

        return deleteSql; 
    }

    static async prepareSave(params) {
        let insertSql = {
            INSERT: '',
            VALUES: '',
            replacements: []
        };
        let columns = params.body;

        for (let colname in columns) {
            if ( !userSchema.createColums.includes(colname) )
            continue;


            insertSql.INSERT += insertSql.INSERT ?  ',' + colname + '': colname + ''
            insertSql.VALUES += insertSql.VALUES ?  ',?': '?'
            insertSql.replacements.push(columns[colname]);
        }

        let d = new Date;
        let now = moment(d).format("YYYY-MM-DD HH:mm:ss")
         // Internal updating
        let forUpdating = {
            "created_at": now,
        }

        for (let colname in forUpdating) {
            insertSql.INSERT += insertSql.INSERT ?  ',' + colname + '': colname + ''
            insertSql.VALUES += insertSql.VALUES ?  ',?': '?'
            insertSql.replacements.push(forUpdating[colname]);
        }   

        return insertSql; 
    }

    static async getModelName() {
        return "Users Model"
    }


}

module.exports = RoleModel