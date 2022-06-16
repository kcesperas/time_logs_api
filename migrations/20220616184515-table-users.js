'use strict';


const async = require('async')


var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};
`SELECT * FROM businesses WHERE business_id = user_input`
exports.up = function(db, callback) {
  async.series([
    db.createTable.bind(db, 'users', {
    id: { type:'int', primaryKey: true, autoIncrement: true },
    firstName: "string",
    lastName: "string",
    gender: "string",
    contact: "string",
    address: "string",
    email_address: "string",
    username: "string",
    password: "string",
    status: "string",
    dp_url: "string",
    notes: "string",
    birthDate: "datetime",
    suspended_at: "datetime",
    created_at: "datetime",
    updated_at: "datetime",
    deleted_at: "datetime",
   
      
  }),


], callback) 
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'users')
  ], callback)
};

exports._meta = {
  "version": 1
};
