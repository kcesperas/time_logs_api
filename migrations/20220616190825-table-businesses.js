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

exports.up = function(db, callback) {
  async.series([
    db.createTable.bind(db, 'businesses', {
    id: { type:'int', primaryKey: true, autoIncrement: true },
    name: "string",
    address: "string",
    contact: "string",
    email_address: "string",
    type: "string",
    notes: "string",
    verified_at: "datetime",
    banned_at: "datetime",
    created_at: "datetime",
    deleted_at: "datetime"
  }),
], callback) 
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'businesses')
  ], callback)
};

exports._meta = {
  "version": 1
};
