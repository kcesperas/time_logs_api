const { result, toLower } = require("lodash")
const dottie = require("dottie")
const db = require('../src/helpers/db-connection')
const { Model: SequelizeModel } = require("sequelize")
// const DBAPI = require('../src/helpers/db-api')

class CoreModel extends SequelizeModel {

    static async dbExecute(query, replacements = [], transform = false) {
        query = query.replace(/\s+/g, ' ').trim();
        let result;
        result = await db.query(query, { replacements }); result = result[0];
        // if (toLower(query).includes('select')) { result = await DBAPI.query(query, replacements) }
        // else { result = await db.query(query, { replacements }); result = result[0]; }
        if (transform) return dottie.transform(result);
        return result;
    }

    static async data_pagination(queries = {}, replacements = [], pagination = {}, isTransform = false) {
        const limit = pagination.perPage ? pagination.perPage : 25
        const offset = (pagination.page > 1) ? ((pagination.page * pagination.perPage) - pagination.perPage) : 0
        pagination.page = pagination.page ? pagination.page : 1
        pagination.perPage = pagination.perPage ? pagination.perPage : 25 // DEFAULT OFFSET
        let results = {
            count: 0,
            rows: [],
            totalPages: 0
        }

        // let data = {}
        data.count = await this.dbExecute(queries.count, replacements)
        data.select = await this.dbExecute(queries.select + `\nlimit ${offset}, ${limit}`, replacements)
        queries.count = queries.count.replace(/\s+/g, ' ').trim();
        queries.select = queries.select.replace(/\s+/g, ' ').trim();
        // const data = await DBAPI.multipleQuery([
        //     {
        //         "command": queries.count,
        //         "parameters": replacements,
        //         "name": "count"
        //     },
        //     {
        //         "command": queries.select + `\nlimit ${offset}, ${limit}`,
        //         "parameters": replacements,
        //         "name": "select"
        //     }
        // ])

        results.count = parseInt(data.count[0].count)
        results.rows = isTransform ? dottie.transform(data.select) : data.select
        results.totalPages = Math.ceil(parseInt(data.count[0].count) / pagination.perPage)

        return results
    }

    static async getSequenceId(type = '') {
        let [result] = await db.query(`select sequenceVal('${type}') as sequence_id`)
        return result[0].sequence_id
    }

}

module.exports = CoreModel