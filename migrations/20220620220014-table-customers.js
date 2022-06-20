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
    db.createTable.bind(db, 'customers', {
      id: {      
          type: 'int',
          unsigned: true,
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
          length: 10 
      },
      name: 'string',
      email_address: 'string',
      address: 'string',
      limit: 'string',
      paid_at: { type: 'datetime'},
      deleted_at: { type: 'datetime'},
      notes: 'string'
    }),
  ], callback)
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'customers')
  ], callback)
};

exports._meta = {
  "version": 1
};
