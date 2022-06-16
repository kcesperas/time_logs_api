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
    db.createTable.bind(db, 'purchases', {
    id: { type:'int', primaryKey: true, autoIncrement: true },
    qty: "string",
    price: "string",
    total: "string",
    type: "string",
    purchaseBy: "string",
    notes: "string",
    created_at: "datetime",
    deleted_at: "datetime"
  }),
], callback) 
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'purchases')
  ], callback)
};

exports._meta = {
  "version": 1
};
