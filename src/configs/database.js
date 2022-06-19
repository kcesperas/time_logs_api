// const isProduction = (process.env.NODE_ENV == "production")
// const defaultLogging = isProduction ? null : msg => console.log(msg)
let sls = {}

if(process.env.NODE_ENV) {
    sls = require('../../serverless.yml')
}

const dbConfig = {
    default: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT || '3306',
        pool: {
            max: 30,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        timezone: "+08:00",
        get replication() {
            return {
                write: {
                    host: this.host,
                    port: this.port,
                    username: this.username,
                    password: this.password,
                    database: this.database
                },
                read: [
                    {
                        host: this.host,
                        port: this.port,
                        username: this.username,
                        password: this.password,
                        database: this.database
                    }
                ]
            }
        },
        // logging: defaultLogging
        migrationStorageTableName: 'sequelize_migration_meta',
        seederStorage: 'sequelize',
        seederStorageTableName: 'sequelize_seeder_meta'
    },
}

module.exports = dbConfig