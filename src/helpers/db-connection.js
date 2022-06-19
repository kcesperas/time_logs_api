const Sequelize = require('sequelize')
const { camelCase } = require("lodash")

const dbConfigs = require("../configs/database")

Object.keys(dbConfigs).forEach(key => {
    const config = dbConfigs[key], exportName = camelCase(key)
    const connection = new Sequelize(config)

    if(key == 'default') {
        module.exports = connection
    } else {
        module.exports[exportName] = connection
    }
})