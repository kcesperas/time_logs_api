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
    db.createTable.bind(db, 'orders', {
      id: {      
          type: 'int',
          unsigned: true,
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
          length: 10 
      },
      description: 'string',
      order_no: 'string',
      total_amount: 'string',
      notes: 'string',
      created_by: 'string',
      paid_at: { type: 'datetime'},
      created_at: { type: 'timestamp' },
      deleted_at: { type: 'datetime'},
      notes: 'string'
    }),
  ], callback)
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'orders')
  ], callback)
};

exports._meta = {
  "version": 1
};
