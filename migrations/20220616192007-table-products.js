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
    db.createTable.bind(db, 'products', {
    id: { type:'int', primaryKey: true, autoIncrement: true },
    name: "string",
    description: "string",
    type: "string",
    notes: "string",
    created_at: "datetime",
    deleted_at: "datetime"
  }),
], callback) 
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'products')
  ], callback)
};

exports._meta = {
  "version": 1
};
